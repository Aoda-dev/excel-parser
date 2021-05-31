import React from 'react';
import { Input } from 'antd';

const SearchInput = ({ search, setSearch }) => {
  const onSearch = async (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Input
      value={search}
      onChange={onSearch}
      style={{ marginTop: '10px' }}
      placeholder='Введите имя товара'
    />
  );
};

export default SearchInput;
