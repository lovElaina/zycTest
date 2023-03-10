import React, {useEffect, useState} from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormTreeSelect
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { TutorType } from '../data.d';
import {DataNode} from "antd/lib/tree";


export type TutorFormValueType = Record<string, unknown> & Partial<TutorType>;

export type TutorFormProps = {
  onCancel: (flag?: boolean, formVals?: TutorFormValueType) => void;
  onSubmit: (values: TutorFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<TutorType>;
  sexOptions: any;
  statusOptions: any;
  postIds: string[];
  posts: string[];
  roleIds: string[];
  roles: string[];
  depts: DataNode[];
  internshipStatusOptions:any;
};

const TutorForm: React.FC<TutorFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');
  const { depts } = props;
  const { sexOptions, statusOptions, internshipStatusOptions } = props;

  useEffect(() => {
    form.resetFields();
    setUserId(props.values.userId);
    form.setFieldsValue({
      userId: props.values.userId,
      studentId: props.values.studentId,
      deptId: props.values.deptId,
      postIds: props.postIds,
      roleIds: props.roleIds,
      userName: props.values.userName,
      nickName: props.values.nickName,
      userType: props.values.userType,
      email: props.values.email,
      phonenumber: props.values.phonenumber,
      sex: props.values.sex,
      avatar: props.values.avatar,
      password: props.values.password,
      status: props.values.status,
      internshipStatus:props.values.internshipStatus,
      delFlag: props.values.delFlag,
      loginIp: props.values.loginIp,
      loginDate: props.values.loginDate,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
    });
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as TutorFormValueType);
    return true;
  };

  return (
    <Modal
      width={640}
      title="??????????????????"
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>

          <Col span={12} order={1}>
            <ProFormDigit
              name="studentId"
              label="??????"
              width="xl"
              placeholder="???????????????"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="??????????????????" defaultMessage="??????????????????" />,
                },
              ]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormSelect
              name="internshipStatus"
              mode="single"
              valueEnum={internshipStatusOptions}
              width="xl"
              label="??????"
              placeholder="???????????????"
              rules={[{ required: true, message: '???????????????' }]}
            />
          </Col>


        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="nickName"
              label={intl.formatMessage({
                id: 'system.User.nick_name',
                defaultMessage: '??????',
              })}
              width="xl"
              placeholder="???????????????"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="???????????????" defaultMessage="???????????????" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormTreeSelect
              name="deptId"
              label="??????"
              request={async () => {
                return depts;
              }}
              width="xl"
              placeholder="???????????????"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="???????????????" defaultMessage="???????????????" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="phonenumber"
              label={intl.formatMessage({
                id: 'system.User.phonenumber',
                defaultMessage: '????????????',
              })}
              width="xl"
              placeholder="?????????????????????"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="????????????????????????" defaultMessage="????????????????????????" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="email"
              label={intl.formatMessage({
                id: 'system.User.email',
                defaultMessage: '????????????',
              })}
              width="xl"
              placeholder="?????????????????????"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="????????????????????????" defaultMessage="????????????????????????" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="userName"
              label={intl.formatMessage({
                id: 'system.User.user_name',
                defaultMessage: '????????????',
              })}
              width="xl"
              hidden={userId}
              placeholder="?????????????????????"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="????????????????????????" defaultMessage="????????????????????????" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="password"
              label={intl.formatMessage({
                id: 'system.User.password',
                defaultMessage: '??????',
              })}
              width="xl"
              hidden={userId}
              placeholder="???????????????"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="??????????????????" defaultMessage="??????????????????" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormSelect
              valueEnum={sexOptions}
              name="sex"
              label={intl.formatMessage({
                id: 'system.User.sex',
                defaultMessage: '??????',
              })}
              width="xl"
              placeholder="?????????????????????"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="????????????????????????" defaultMessage="????????????????????????" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.User.status',
                defaultMessage: '????????????',
              })}
              width="xl"
              placeholder="?????????????????????"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="????????????????????????" defaultMessage="????????????????????????" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24} order={1}>*/}
        {/*    <ProFormText*/}
        {/*      name="avatar"*/}
        {/*      label={intl.formatMessage({*/}
        {/*        id: 'system.User.avatar',*/}
        {/*        defaultMessage: '????????????',*/}
        {/*      })}*/}
        {/*      width="xl"*/}
        {/*      placeholder="?????????????????????"*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: false,*/}
        {/*          message: (*/}
        {/*            <FormattedMessage id="????????????????????????" defaultMessage="????????????????????????" />*/}
        {/*          ),*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        <Row gutter={[16, 16]}>
        </Row>



        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="remark"
              label="????????????"
              width="xl"
              placeholder="?????????????????????"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="??????????????????" defaultMessage="??????????????????" />,
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TutorForm;
