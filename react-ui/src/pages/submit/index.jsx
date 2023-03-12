import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
//import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
//import type { PostType, PostListParams } from './data.d';
import {getPostList, removePost, addPost, updatePost, exportPost, getAttendList} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../system/dict/service'
import moment from "moment";


/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addPost({ ...fields });
    hide();
    if(resp.code === 200) {
      message.success('添加成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updatePost(fields);
    hide();
    if(resp.code === 200) {
      message.success('配置成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removePost(selectedRows.map((row) => row.postId).join(','));
    hide();
    if(resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveOne = async (selectedRow) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.postId];
    const resp = await removePost(params.join(','));
    hide();
    if(resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 导出数据
 *
 * @param id
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportPost();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

const PostTableList = () => {
  const formTableRef = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const [statusOptions, setStatusOptions] = useState([]);

  const [internshipStatusOptions, setInternshipStatusOptions] = useState([]);

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

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



  const tableListDataSource = [];

  const student_name = ["刘乐"];
  const student_id = ["2100022123"];
  const status = ["实习中"];
  const intern_day = ["48"];
  const need_day = ["35"];
  const actual_day = ["7"];
  const need_week = ["6"];
  const actual_week = ["1"];
  const need_month = ["2"];
  const actual_month = ["1"];

  for(let i=0;i<1;i++){
    tableListDataSource.push({
      student_name:student_name[i],
      student_id:student_id[i],
      status:status[i],
      intern_day:intern_day[i],
      need_day:need_day[i],
      actual_day:actual_day[i],
      need_week:need_week[i],
      actual_week:actual_week[i],
      need_month:need_month[i],
      actual_month:actual_month[i]
    })
  }

  const columns = [
    {
      title: "学生姓名",
      dataIndex: 'student_name',
      valueType: 'text',
    },
    {
      title: "学号",
      dataIndex: 'student_id',
      valueType: 'text',
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueType: 'text',
    },
    {
      title: "实习天数",
      dataIndex: 'intern_day',
      valueType: 'text',
    },
    {
      title: "应交日报",
      dataIndex: 'need_day',
      valueType: 'text',
    },
    {
      title: "实交日报",
      dataIndex: 'actual_day',
      valueType: 'text',
    },
    {
      title: "应交周报",
      dataIndex: 'need_week',
      valueType: 'text',
    },
    {
      title: "实交周报",
      dataIndex: 'actual_week',
      valueType: 'text',
    },
    {
      title: "应交月报",
      dataIndex: 'need_month',
      valueType: 'text',
    },
    {
      title: "实交月报",
      dataIndex: 'actual_month',
      valueType: 'text',
    },



    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          //hidden={!access.hasPerms('system:post:edit')}
          onClick={() => {
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          批阅报告
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:post:remove')}
          onClick={async () => {
            Modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        </Button>,
      ],
    },
  ];


  /**
   * 定义延时函数
   * delaytime 延时时长，单位毫秒
   */
  let sleep = (delaytime = 500) => {
    return new Promise(function (resolve){
      setTimeout(resolve,delaytime)
    })
  }

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable
          headerTitle="报告管理"
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="postId"
          key="postList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:post:add')}
              onClick={async () => {
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:post:remove')}
              onClick={async () => {
                const success = await handleRemove(selectedRowsState);
                if (success) {
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }
              }}
            >
              <DeleteOutlined />
              删除
            </Button>,
            <Button
              type="primary"
              key="export"
              hidden={!access.hasPerms('system:post:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              导出
            </Button>,
          ]}
          request={(params) =>{
            return sleep().then(()=>{
              return Promise.resolve({
                data: tableListDataSource,
                success: true,
              });
            })
          }

            // getAttendList().then((res) => {
            //   return {
            //     data: res.rows,
            //     total: res.total,
            //     success: true,
            //   };
            // })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </div>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!access.hasPerms('system:post:remove')}
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemove(selectedRowsState);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.postId) {
            success = await handleUpdate(values);
          } else {
            success = await handleAdd(values);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        visible={modalVisible}
        //////////////////注意这一行////////////////////////////////////////////////
        values={currentRow || {}}
        statusOptions={statusOptions}

      />



    </WrapContent>
  );
};

export default PostTableList;
