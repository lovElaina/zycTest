import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormDigit,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col, Tree } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { RoleType } from '../data.d';
import type { DataNode } from 'antd/lib/tree';


export type RoleFormValueType = Record<string, unknown> & Partial<RoleType>;

export type RoleFormProps = {
  onCancel: (flag?: boolean, formVals?: RoleFormValueType) => void;
  onSubmit: (values: RoleFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<RoleType>;
  menuTree: DataNode[];
  menuCheckedKeys: number[];
  statusOptions: any;
};

const RoleForm: React.FC<RoleFormProps> = (props) => {
  const [form] = Form.useForm();

  const { menuTree, menuCheckedKeys } = props;
  const [menuIds, setMenuIds] = useState<any>();
  const { statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      roleId: props.values.roleId,
      roleName: props.values.roleName,
      roleKey: props.values.roleKey,
      roleSort: props.values.roleSort,
      dataScope: props.values.dataScope,
      menuCheckStrictly: props.values.menuCheckStrictly,
      deptCheckStrictly: props.values.deptCheckStrictly,
      status: props.values.status,
      delFlag: props.values.delFlag,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
      menuIds: props.values.menuIds,
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
  const handleFinish = (values: Record<string, any>) => {
    props.onSubmit({ ...values, menuIds } as RoleFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.Role.modify_info',
        defaultMessage: '??????????????????',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="roleId"
              label={intl.formatMessage({
                id: 'system.Role.role_id',
                defaultMessage: '??????ID',
              })}
              width="xl"
              placeholder="???????????????ID"
              disabled
              hidden={!props.values.roleId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="???????????????ID???" defaultMessage="???????????????ID???" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="roleName"
              label={intl.formatMessage({
                id: 'system.Role.role_name',
                defaultMessage: '????????????',
              })}
              width="xl"
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
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="roleKey"
              label={intl.formatMessage({
                id: 'system.Role.role_key',
                defaultMessage: '?????????????????????',
              })}
              width="xl"
              placeholder="??????????????????????????????"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="?????????????????????????????????"
                      defaultMessage="?????????????????????????????????"
                    />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="roleSort"
              label={intl.formatMessage({
                id: 'system.Role.role_sort',
                defaultMessage: '????????????',
              })}
              width="xl"
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
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.Role.status',
                defaultMessage: '????????????',
              })}
              labelCol={{ span: 24 }}
              width="xl"
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
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProForm.Item
              // width="xl"
              name="menuIds"
              label={intl.formatMessage({
                id: 'system.Role.auth',
                defaultMessage: '????????????',
              })}
            >
              <Tree
                checkable={true}
                multiple={true}
                checkStrictly={true}
                defaultExpandAll={false}
                treeData={menuTree}
                defaultCheckedKeys={menuCheckedKeys}
                onCheck={( keys: any) => {
                  setMenuIds(keys.checked);
                }}
              />
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="remark"
              label={intl.formatMessage({
                id: 'system.Role.remark',
                defaultMessage: '??????',
              })}
              width="xl"
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
      </Form>
    </Modal>
  );
};

export default RoleForm;
