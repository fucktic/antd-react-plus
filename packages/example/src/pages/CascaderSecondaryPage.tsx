import React from 'react';
import { Card, Typography, Divider } from 'antd';
import { CascaderSecondary } from 'antd-react-plus-ui';

const { Title, Paragraph } = Typography;

const CascaderSecondaryPage: React.FC = () => {
  const handleSelectChange = (selectedAccounts: any[]) => {
    console.log('已选择的账户:', selectedAccounts);
  };

  return (
    <div className="p-6">
      <Title level={2}>二级级联选择器组件</Title>
      <Paragraph>
        这个组件实现了一个三级级联选择器，包括授权账户、推广账户和已选账户三个部分。
        用户可以先选择授权账户，然后在对应的推广账户中进行选择，最后添加到已选列表中。
      </Paragraph>
      <Divider />

      <Card>
        <CascaderSecondary
          header={
            {
              title: '授权账户',
              customTitle: '推广账户',
              selectedTitle: '已选',
            }
          }
        />
      </Card>

      <div className="mt-8">
        <Title level={4}>组件特性</Title>
        <ul className="list-disc pl-6 space-y-2">
          <li>级联选择：先选择授权账户，才能选择对应的推广账户</li>
          <li>多选功能：支持同时选择多个账户</li>
          <li>数量限制：可以设置最大选择数量</li>
          <li>已选管理：可以从已选列表中移除单个账户或清空所有</li>
          <li>状态提示：显示当前选择数量和最大限制</li>
          <li>回调通知：选择变更时触发回调函数</li>
        </ul>
      </div>
    </div>
  );
};

export default CascaderSecondaryPage;