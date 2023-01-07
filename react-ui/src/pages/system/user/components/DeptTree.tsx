import React, { useState, useEffect } from 'react';
import { Tree, message } from 'antd';
import { getDeptTree } from '../service';

const { DirectoryTree } = Tree;

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */


export type TreeProps = {
  onSelect: (values: any) => Promise<void>;
};

const DeptTree: React.FC<TreeProps> = (props) => {
  const [treeData, setTreeData] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const fetchDeptList = async () => {
    const hide = message.loading('正在查询');
    try {
      await getDeptTree({}).then((res: any) => {
        const exKeys = [];
        exKeys.push('1');
        setTreeData(res);
        console.log(res);
        exKeys.push(res[0].children[0].id);
        exKeys.push('2');
        exKeys.push(res[0].children[1].id);
        exKeys.push('3');
        exKeys.push(res[0].children[2].id);
        exKeys.push('4');
        exKeys.push(res[0].children[3].id);
        exKeys.push('5');
        exKeys.push(res[0].children[4].id);
        setExpandedKeys(exKeys);
        props.onSelect(res[0]);
      });
      hide();
      // message.success('数据查询成功');
      return true;
    } catch (error) {
      hide();
      // message.error('数据查询失败');
      return false;
    }
  };

  useEffect(() => {
    fetchDeptList();
  }, []);

  const onSelect = (keys: React.Key[], info: any) => {
    props.onSelect(info.node);
  };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  return (
    <DirectoryTree
      // multiple
      defaultExpandAll
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};

export default DeptTree;
