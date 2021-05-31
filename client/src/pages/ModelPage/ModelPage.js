import React from 'react';
import { Layout } from 'antd';
import EditableTable from './ModelEdit/ModelEdit';

const { Content } = Layout;

const ModePage = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <div
        className='site-layout-background'
        style={{ padding: 24, margin: '16px 0', minHeight: 360 }}
      >
        <h1>Модели</h1>
        <EditableTable />
      </div>
    </Content>
  );
};

export default ModePage;
