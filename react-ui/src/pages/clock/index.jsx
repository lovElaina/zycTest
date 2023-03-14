import {CoffeeOutlined, FormOutlined} from '@ant-design/icons';
import {Button, Col, Modal, Row, message} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage, useAccess, useIntl} from 'umi';
import WrapContent from '@/components/WrapContent';
import ProTable from '@ant-design/pro-table';
import {addLog, getAttendLogListByUserId, queryCurrentUserInfo, updateLog} from './service';
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

  const [stuInfo, setStuInfo] = useState()

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  const {data: userInfo, loading} = useRequest(() => {
    return queryCurrentUserInfo();
  });
  console.log(userInfo);

  useEffect(() => {
    setStuInfo(userInfo)
  }, [userInfo])

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
      render: (_) => {
        let d = new Date(_ - 0);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      }
    },
    {
      title: '上班时间',
      dataIndex: 'workTime',
      render: (_) => {
        if (_ === "-") return "-- : -- : --"
        let d = new Date(_ - 0);
        return (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds())
      }
    },
    {
      title: '下班时间',
      dataIndex: 'restTime',
      render: (_) => {
        if (_ === "-") return "-- : -- : --"
        let d = new Date(_ - 0);
        return (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds())
      }
    },
    {
      title: '状态',
      dataIndex: 'result',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        "2": {text: '缺勤', status: 'Default'},
        "1": {text: '请假', status: 'Processing'},
        "0": {text: '出勤', status: 'Success'},
        "3": {text: '迟到', status: 'Error'},
      },
    }
  ];


  async function signOn() {
    let val = {}
    val.attendId = stuInfo.attendId;
    val.attendDate = new Date() - 0;
    if (new Date().getHours() > 9) {
      val.result = "3"
    } else val.result = "1";

    val.workTime = new Date() - 0;
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
    } catch (error) {
      hide();
      message.error('打卡失败，请重试');
      return false;
    }
  }


  async function signOff() {
    let val = {}
    val.attendId = stuInfo.attendId;
    val.logId = getCurLogId(logList);
    val.endTime = new Date() - 0;
    const hide = message.loading('请稍候')
    try {
      const resp = await updateLog(val);
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
    } catch (error) {
      hide();
      message.error('打卡失败，请重试');
      return false;
    }
  }


  function getCurLogId(logList) {
    if (!logList) {
      return null;
    } else {
      for (let i = 0; i < logList.rows.length; i++) {
        if (new Date(logList.rows[i].attendDate).toDateString() === new Date().toDateString()) return logList.rows[i].logId;
      }

    }
    return null;
  }

  //禁止下班打卡的条件
  //1、没有今天的出勤记录
  //2、有记录，但状态为请假和缺勤
  //3、没到下班时间（5点前）
  //4、实习状态不为进行中
  function isForbid(logList) {
    if (!logList) {
      return true;
    }
    for (let i = 0; i < logList.rows.length; i++) {
      if (new Date(logList.rows[i].attendDate).toDateString() === new Date().toDateString()) {
        if ((logList.rows[i].result !== "1") && (logList.rows[i].result !== "2")) return false;
      }
    }
    return true;
  }


  //今天存在打卡记录，则无法签到
  //其余逻辑：
  //实习状态不为”实习中“，则无法签到
  //打卡时间早于上午6：00，则无法签到
  function isToday(logList) {
    if (!logList) {
      return true;
    } else {
      for (let i = 0; i < logList.rows.length; i++) {
        if (new Date(logList.rows[i].attendDate).toDateString() === new Date().toDateString()) return true;
      }

    }
    return false;
  }

  return (
    <WrapContent>
      <Row gutter={16}>

        <Col span={6}>
          <Button type="primary"
                  disabled={(logList ? isToday(logList) : true) || new Date().getHours() < 6 || stuInfo.user.internshipStatus !== "1"}
                  onClick={signOn} block icon={<FormOutlined/>} style={{height: "100%", fontSize: "24px"}}>上班打卡</Button>
        </Col>
        <Col span={6}>
          <Button type="primary" block
                  disabled={(logList ? isForbid(logList) : true) || new Date().getHours() < 17 || stuInfo.user.internshipStatus !== "1"}
                  onClick={signOff} danger icon={<CoffeeOutlined/>} style={{height: "100%", fontSize: "24px"}}>下班打卡</Button>
        </Col>

        <Col span={8}>
          <Card title="提示信息" bordered={false}>
            {
              (logList ? isToday(logList) : true) || new Date().getHours() < 6 || stuInfo.user.internshipStatus !== "1" ?
                <div style={{color: "purple", fontWeight: "bold"}}>无法进行上班打卡，原因：</div> : <div/>
            }
            {
              (logList ? isToday(logList) : true) ? <div>今天已经存在打卡记录</div> : <div/>
            }
            {
              new Date().getHours() < 6 ? <div>未到上班打卡时间（6：00）</div> : <div/>
            }
            {
              stuInfo?.user?.internshipStatus !== "1" ? <div>当前未开始实习，请联系导师或教务处</div> : <div/>
            }


            {
              (logList ? isForbid(logList) : true) || new Date().getHours() < 17 || stuInfo.user.internshipStatus !== "1" ?
                <div style={{color: "purple", fontWeight: "bold"}}>无法进行下班打卡，原因：</div> : <div/>
            }

            {
              (logList ? isForbid(logList) : true) ? <div>今天请假或缺勤</div> : <div/>
            }
            {
              new Date().getHours() < 6 ? <div>未到下班打卡时间（17：00）</div> : <div/>
            }
            {
              stuInfo?.user?.internshipStatus !== "1" ? <div>当前未开始实习，请联系导师或教务处</div> : <div/>
            }

          </Card>
        </Col>

      </Row>
      <div style={{width: '100%', float: 'right', marginTop: "24px"}}>

        {stuInfo ?

          <ProTable
            headerTitle="打卡记录"
            actionRef={actionRef}
            formRef={formTableRef}
            rowKey="postId"
            key="postList"
            search={false}

            request={(params) =>
              getAttendLogListByUserId(params, stuInfo.user.userId).then((res) => {
                setLogList(res)
                console.log(res)
                return {
                  data: res.rows,
                  total: res.total,
                  success: true
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
