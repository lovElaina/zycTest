import React, { useEffect, useState } from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage, getLocale } from 'umi';
import type { DataNode } from 'antd/lib/tree';
import type { MenuType } from '../data.d';
import IconSelector from '@/components/IconSelector';
import { createIcon } from '@/utils/IconUtil';
import { IntlProvider } from 'react-intl';


export type MenuFormValueType = Record<string, unknown> & Partial<MenuType>;

export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormValueType) => void;
  onSubmit: (values: MenuFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<MenuType>;
  visibleOptions: any;
  statusOptions: any;
  menuTree: DataNode[];
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const [form] = Form.useForm();

  const [menuTypeId, setMenuTypeId] = useState<any>('');
  const [menuIconName, setMenuIconName] = useState<any>();

  const [previewModalVisible, setPreviewModalVisible] = useState<boolean>(false);

  const { menuTree, visibleOptions, statusOptions } = props;
  useEffect(() => {
    form.resetFields();
    setMenuTypeId(props.values.menuType?props.values.menuType:'C');
    setMenuIconName(props.values.icon);
    form.setFieldsValue({
      menuId: props.values.menuId,
      menuName: props.values.menuName,
      parentId: props.values.parentId,
      orderNum: props.values.orderNum,
      path: props.values.path,
      component: props.values.component,
      isFrame: props.values.isFrame,
      isCache: props.values.isCache,
      menuType: props.values.menuType,
      visible: props.values.visible,
      status: props.values.status,
      perms: props.values.perms,
      icon: props.values.icon,
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
    props.onSubmit(values as MenuFormValueType);
  };

  return (
    <Modal
      width={680}
      title={intl.formatMessage({
        id: 'system.Menu.modify',
        defaultMessage: '????????????',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Modal
        width={1200}
        visible={previewModalVisible}
        onCancel={() => {
          setPreviewModalVisible(false);
        }}
        footer={null}
      >
        <IntlProvider locale={getLocale()}>
          <IconSelector
            onSelect={(name: string) => {
              form.setFieldsValue({ icon: name });
              setMenuIconName(name);
              setPreviewModalVisible(false);
            }}
          />
        </IntlProvider>
      </Modal>

      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={16} order={1}>
            <ProFormDigit
              name="menuId"
              label={intl.formatMessage({
                id: 'system.Menu.menu_id',
                defaultMessage: '??????ID',
              })}
              width="xl"
              placeholder="???????????????ID"
              disabled
              hidden={true}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="???????????????ID???" defaultMessage="???????????????ID???" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} order={1}>
            <ProFormTreeSelect
              name="parentId"
              label={intl.formatMessage({
                id: 'system.Menu.parent_id',
                defaultMessage: '?????????:',
              })}
              request={async () => {
                return menuTree;
              }}
              width="xl"
              placeholder="??????????????????"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="?????????????????????" defaultMessage="?????????????????????" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              valueEnum={{
                M: '??????',
                C: '??????',
                F: '??????',
              }}
              name="menuType"
              label={intl.formatMessage({
                id: 'system.Menu.menu_type',
                defaultMessage: '????????????',
              })}
              fieldProps={{
                onChange: (e) => {
                  setMenuTypeId(e.target.value);
                },
              }}
              initialValue="C"
              width="xl"
              labelCol={{ span: 24 }}
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
              name="icon"
              labelCol={{ span: 24 }}
              allowClear={true}
              hidden={menuTypeId === 'F'}
              addonBefore={createIcon(menuIconName)}
              fieldProps={{
                onClick: () => {
                  setPreviewModalVisible(true);
                },
              }}
              label={intl.formatMessage({
                id: 'system.Menu.icon',
                defaultMessage: '????????????:',
              })}
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
              name="menuName"
              label={intl.formatMessage({
                id: 'system.Menu.menu_name',
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
          <Col span={12} order={2}>
            <ProFormDigit
              name="orderNum"
              label={intl.formatMessage({
                id: 'system.Menu.order_num',
                defaultMessage: '????????????',
              })}
              initialValue="0"
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
            <ProFormRadio.Group
              name="isFrame"
              valueEnum={{
                0: '???',
                1: '???',
              }}
              initialValue="1"
              label={intl.formatMessage({
                id: 'system.Menu.is_frame',
                defaultMessage: '???????????????',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId === 'F'}
              placeholder="????????????????????????"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="???????????????????????????" defaultMessage="???????????????????????????" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="path"
              label={intl.formatMessage({
                id: 'system.Menu.path',
                defaultMessage: '????????????',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="?????????????????????"
              hidden={menuTypeId === 'F'}
              rules={[
                {
                  required: menuTypeId !== 'F',
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
              name="perms"
              label={intl.formatMessage({
                id: 'system.Menu.perms',
                defaultMessage: '????????????',
              })}
              width="xl"
              placeholder="?????????????????????"
              hidden={menuTypeId === 'M'}
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
              name="component"
              label={intl.formatMessage({
                id: 'system.Menu.component',
                defaultMessage: '????????????',
              })}
              width="xl"
              placeholder="?????????????????????"
              hidden={menuTypeId !== 'C'}
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
              name="query"
              label={intl.formatMessage({
                id: 'system.Menu.query',
                defaultMessage: '????????????',
              })}
              width="xl"
              placeholder="????????????????????????"
              hidden={menuTypeId !== 'C'}
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
            <ProFormRadio.Group
              name="isCache"
              valueEnum={{
                0: '??????',
                1: '?????????',
              }}
              initialValue="0"
              label={intl.formatMessage({
                id: 'system.Menu.is_cache',
                defaultMessage: '????????????',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId !== 'C'}
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
            <ProFormRadio.Group
              valueEnum={visibleOptions}
              name="visible"
              label={intl.formatMessage({
                id: 'system.Menu.visible',
                defaultMessage: '????????????',
              })}
              initialValue="0"
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId === 'F'}
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
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.Menu.status',
                defaultMessage: '????????????',
              })}
              initialValue="0"
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId === 'F'}
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
      </Form>
    </Modal>
  );
};

export default MenuForm;
