import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Upload, message, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Content } = Layout;
const { Option } = Select;

const props = {
  name: 'file',
  multiple: false,
  action: `${process.env.REACT_APP_API_URL}/upload`,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadPage = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/company/`).then((res) => {
      setCompanies(res.data);
    });
  }, []);

  function onChange(value) {
    console.log(`selected ${value}`);
    setCompany(value);
  }

  return (
    <Content style={{ margin: '0 16px' }}>
      <div
        className='site-layout-background'
        style={{ padding: 24, marginTop: '24px', minHeight: 360 }}
      >
        <h1>Загрузить</h1>
        {company ? (
          <Dragger {...props} data={{ company: company }}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Щелкните или перетащите файл в эту область, чтобы загрузить
            </p>
            <p className='ant-upload-hint'>
              Поддержка только одиночной загрузки. Нельзя загружать несколько или более файлов
            </p>
          </Dragger>
        ) : (
          <h1 style={{ textAlign: 'center', margin: '50px' }}>Выберите компанию</h1>
        )}
        <Select
          showSearch
          style={{ width: 200, marginTop: '15px' }}
          placeholder='Выберите модель'
          optionFilterProp='children'
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {companies.map((item, index) => {
            return (
              <Option key={index} value={item.name}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </div>
    </Content>
  );
};

export default UploadPage;
