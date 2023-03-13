import {CoffeeOutlined, FormOutlined} from '@ant-design/icons';
import {Button, Col, Modal, Row, message} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage, useAccess, useIntl} from 'umi';
import WrapContent from '@/components/WrapContent';
import ProTable from '@ant-design/pro-table';
import {addLog, getAttendLogListByUserId, queryCurrentUserInfo} from './service';
import {getDict} from '../system/dict/service'
import Card from "antd/es/card";
import {useRequest} from "@@/plugin-request/request";
import {updateAttendLog} from "@/pages/internship/attendance/service";


const PostTableList = () => {
  const formTableRef = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  const actionRef = useRef();

  const [logList, setLogList] = useState();

  const [statusOptions, setStatusOptions] = useState([]);

  const [internshipStatusOptions, setInternshipStatusOptions] = useState([]);

  const [stuInfo,setStuInfo] = useState()

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  const { data: userInfo, loading } = useRequest(() => {
    return queryCurrentUserInfo();
  });
  console.log(userInfo);

  useEffect(()=>{
    setStuInfo(userInfo)
  },[userInfo])

  useEffect(() => {
    getDict('sys_normal_disable').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setStatusOptions(opts);
      }
    });

    getDict('sys_user_internship').then((res) => {
      if (res.code === 200) {
        console.log(res)
        const opts = {};
        res.data.forEach((item) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setInternshipStatusOptions(opts);
      }
    });

  }, []);




  const columns = [
    {
      title: '日期',
      dataIndex: 'attendDate',
      //render: (_) => <a>{_}</a>,
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: '上班时间',
      dataIndex: 'workTime',
      render:(_)=>{
        if(_ ==="-")return "-- : -- : --"
        let d = new Date(_-0);
        return (d.getHours()<10? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes()<10? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds()<10? "0" + d.getSeconds():d.getSeconds())
      }
    },
    {
      title: '下班时间',
      dataIndex: 'restTime',
      render:(_)=>{
        if(_ ==="-")return "-- : -- : --"
        let d = new Date(_-0);
        return (d.getHours()<10? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes()<10? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds()<10? "0" + d.getSeconds():d.getSeconds())
      }
    },
    {
      title: '状态',
      dataIndex: 'result',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        "2": { text: '缺勤', status: 'Default' },
        "1": { text: '请假', status: 'Processing' },
        "0": { text: '出勤', status: 'Success' },
        "3": { text: '迟到', status: 'Error' },
      },
    }
  ];



  async function signOn() {
    let val = {}
    val.attendId = stuInfo.attendId;
    val.attendDate = new Date()-0;
    if(new Date().getHours()>9){
      val.result = "1"
    }else val.result = "3";

    val.workTime = new Date()-0;
    const hide = message.loading('请稍候')
    try {
      const resp = await addLog(val);
      hide();
      if (resp.code === 200) {
        message.success('打卡成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(resp.msg);
      }
      return true;
    }catch (error){
      hide();
      message.error('打卡失败，请重试');
      return false;
    }
  }

  //今天存在打卡记录
  function isToday(logList){
    if(!logList){
      return false;
    }
    else{
      for(let i = 0;i<logList.rows.length;i++){
        if(new Date(logList.rows[i].attendDate).toDateString() === new Date().toDateString())return true;
      }

    }
    return false;
  }

  return (
    <WrapContent>
      <Row gutter={16}>

        <Col span={6}>
      <Button type="primary" disabled={(logList ? isToday(logList) : true) || new Date().getHours()<6} onClick={signOn} block icon={<FormOutlined />} style={{height:"100%",fontSize:"24px"}}>上班打卡</Button>
        </Col>
        <Col span={6}>
      <Button type="primary" block disabled danger icon={<CoffeeOutlined />} style={{height:"100%",fontSize:"24px"}}>下班打卡</Button>
        </Col>

        <Col span={8}>
          <Card title="提示信息" bordered={false}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
        </Col>

      </Row>
      <div style={{ width: '100%', float: 'right',marginTop:"24px" }}>

        {stuInfo ?

          <ProTable
            headerTitle="打卡记录"
            actionRef={actionRef}
            formRef={formTableRef}
            rowKey="postId"
            key="postList"
            search={false}

            request={(params) =>
              getAttendLogListByUserId(params,stuInfo.user.userId).then((res)=>{
                setLogList(res)
                console.log(res)
                return{
                  data:res.rows,
                  total:res.total,
                  success:true
                }
              })

            }
            columns={columns}
          />

          : <div>loading...</div>}

      </div>



    </WrapContent>
  );
};

export default PostTableList;
