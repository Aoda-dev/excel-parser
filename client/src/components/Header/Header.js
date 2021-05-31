import React from 'react';
import { Layout } from 'antd';

import './Header.css';

const { Header } = Layout;

const HeaderLayout = () => {
  return (
    <Header className='site-layout-background header-layout' style={{ padding: '0 40px' }}>
      <h1>Header</h1>
    </Header>
  );
};

export default HeaderLayout;
