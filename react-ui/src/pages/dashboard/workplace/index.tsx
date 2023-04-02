import type { FC } from 'react';
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import { Radar } from '@ant-design/charts';

import {Link, useHistory, useRequest} from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import type { ActivitiesType, CurrentUser } from './data.d';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import WrapContent from '@/components/WrapContent';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];


function dateState() {
  let date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 12) {
    return "上午好"
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午好"
  } else {
    return "晚上好"
  }
}


const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {dateState()+"，"}
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="出勤率" value={75} suffix="%" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="班级内排名" value={8} suffix="/ 30" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="状态" suffix="-正常" />
    </div>
  </div>
);

const Workplace: FC = (info) => {
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  const { data } = useRequest(fakeChartData);
  const history = useHistory();

  console.log(info)
  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  function handleClickOne() {
    history.push("/clock")
  }

  function handleClickTwo() {
    history.push("/submit")
  }

  function handleClickThree() {
    history.push("/affairs")
  }

  return (
    <div>
    <WrapContent>
      <PageContainer
        title="实习管理-学生端"
        content={
          <PageHeaderContent
            currentUser={{
              avatar: info.info?.user?.avatar,
              name: info.info?.user?.nickName,
              userid: '00000001',
              email: 'antdesign@alipay.com',
              signature: '海纳百川，有容乃大',
              title: info.info?.user?.dept.deptName,
              group: " "+info.info?.postInfo.postName+ " - " + info.info?.postInfo.depName + " - " + info.info?.postInfo.companyName,
            }}
          />
        }
        extraContent={<ExtraContent />}
      >
      </PageContainer>
    </WrapContent>
      <div style={{margin:"0px 24px 0px 24px"}}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="快捷导航"
              bordered={false}
              // extra={<Link to="/">待办事项</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
                <Card.Grid style={{background:"#aed0d0"}} className={styles.projectGrid} key="card1" hoverable onClick={handleClickOne}>
                  打卡签到
                </Card.Grid>

              <Card.Grid style={{background:"#dec3a7"}} className={styles.projectGrid} key="card2" hoverable onClick={handleClickTwo}>
                提交报告
              </Card.Grid>

              <Card.Grid style={{background:"#d3aad0"}} className={styles.projectGrid} key="card3" hoverable onClick={handleClickThree}>
                事务申请
              </Card.Grid>

            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="待办事项"
              loading={activitiesLoading}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={(item) => renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            {/*<Card*/}
            {/*  style={{ marginBottom: 24 }}*/}
            {/*  title="快速开始 / 便捷导航"*/}
            {/*  bordered={false}*/}
            {/*  bodyStyle={{ padding: 0 }}*/}
            {/*>*/}
            {/*  <EditableLinkGroup onAdd={() => { }} links={links} linkElement={Link} />*/}
            {/*</Card>*/}
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="实习概况"
              loading={data?.radarData?.length === 0}
            >
              <div className={styles.chart}>
                <Radar
                  height={343}
                  data={data?.radarData || []}
                  angleField="label"
                  seriesField="name"
                  radiusField="value"
                  area={{
                    visible: false,
                  }}
                  point={{
                    visible: true,
                  }}
                  legend={{
                    position: 'bottom-center',
                  }}
                />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map((item) => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Workplace;
