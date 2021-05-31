import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

const { Content } = Layout;

const FilesPage = () => {
  //Доделать
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/files/`).then((res) => {
      setFiles(res.data);
    });
  }, []);

  return (
    <Content style={{ margin: '0 16px' }}>
      <div
        className='site-layout-background'
        style={{ marginTop: '15px', padding: 24, minHeight: 360 }}
      >
        <h1>Файлы</h1>
        <ul style={{ marginTop: '20px' }}>
          {files.map((file, index) => {
            return <li key={index}>{file}</li>;
          })}
        </ul>
      </div>
    </Content>
  );
};

export default FilesPage;
