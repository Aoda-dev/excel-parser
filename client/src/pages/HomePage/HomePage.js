import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const HomePage = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Amd</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
        Bill is a cat.
      </div>
    </Content>
  );
};

export default HomePage;
