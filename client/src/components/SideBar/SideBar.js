import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { SearchOutlined, CodeOutlined, FileOutlined, UploadOutlined } from '@ant-design/icons';

import logo from '../../assets/logo/logo.jpg';
import './SideBar.css';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsed={collapsed} onCollapse={onCollapse}>
      <div className='logo' style={{ background: 'transparent' }}>
        <img
          src={logo}
          alt='logo'
          style={
            collapsed
              ? { width: '100%', transition: 'all ease 0.3s' }
              : { width: '100%', transition: 'all ease 0.3s' }
          }
        />
      </div>
      <Menu
        theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
        style={
          collapsed
            ? { marginTop: '0px', transition: 'all ease 0.3s' }
            : { marginTop: '50px', transition: 'all ease 0.3s' }
        }
      >
        <Menu.Item key='1' icon={<SearchOutlined />}>
          <Link to='/search'>Поиск</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<CodeOutlined />}>
          <Link to='/models'>Модели</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<FileOutlined />}>
          <Link to='/files'>Файлы</Link>
        </Menu.Item>
        <Menu.Item key='5' icon={<UploadOutlined />}>
          <Link to='/upload'>Загрузить файл</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
