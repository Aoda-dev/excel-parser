import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Layout, Table } from 'antd';

import sortArray from '../../components/SortArray';
import SearchInput from '../../components/SearchInput/SearchInput';
import './SearchPage.css';

const { Content } = Layout;

let uniqueId = 0;

const columns = [
  {
    title: 'Код',
    dataIndex: 'code',
    width: '5%',
    fixed: 'left',
    key: 'code',
  },
  {
    title: 'Название',
    dataIndex: 'name',
    width: '20%',
    key: 'name',
  },
  {
    title: 'Компания',
    dataIndex: 'company',
    width: '10%',
    key: 'company',
  },
  {
    title: 'Количество',
    dataIndex: 'counts',
    width: '10%',
    key: 'counts',
  },
  {
    title: 'Диллерская цена',
    dataIndex: 'dillerPrice',
    width: '12%',
    key: 'dillerPrice',
  },
  {
    title: 'Розничная цена',
    dataIndex: 'price',
    width: '12%',
    key: 'price',
  },
  {
    title: 'Доступность',
    dataIndex: 'availability',
    width: '10%',
    key: 'availability',
  },
  {
    title: 'В коробке',
    dataIndex: 'inBox',
    width: '9%',
    key: 'inBox',
  },
  {
    title: 'Гарантия',
    dataIndex: 'guarantee',
    width: '8%',
    key: 'guarantee',
  },
  {
    title: 'Код в компаний',
    dataIndex: 'codeInCompany',
    width: '8%',
    key: 'codeInCompany',
  },
  {
    title: 'Артикль в компаний',
    dataIndex: 'articleInCompany',
    width: '10%',
    key: 'articleInCompany',
  },
];

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  let splitArr = [];
  splitArr = search.split(' ');
  const searchArr = splitArr.filter((entry) => entry.trim() !== '');
  //Оптимизация поиска
  const memoizedValue = useMemo(() => sortArray(data, searchArr), [data, searchArr]);

  useEffect(() => {
    let mounted = true;
    axios.get(`${process.env.REACT_APP_API_URL}/search/`).then((res) => {
      if (mounted) {
        setData(res.data);
      }
    });

    console.log(document.querySelector('.table-row'));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <Content style={{ margin: '0 16px' }}>
      <div className='site-layout-background search-page'>
        <h1>Поиск</h1>
        <SearchInput search={search} setSearch={setSearch} />
        <Table
          rowKey={(record) => {
            if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
            return record.__uniqueId;
          }}
          rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
          style={{ marginTop: '15px' }}
          dataSource={memoizedValue}
          columns={columns}
          pagination={{ pageSizeOptions: [10, 20] }}
          scroll={{ x: 1500 }}
          sticky
        />
      </div>
    </Content>
  );
};

export default SearchPage;
