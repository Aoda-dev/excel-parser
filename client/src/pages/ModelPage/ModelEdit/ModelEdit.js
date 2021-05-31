import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);

let uniqueId = 0;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Код',
        dataIndex: 'code',
        width: '10%',
        editable: true,
        fixed: 'left',
      },
      {
        title: 'Компания',
        dataIndex: 'name',
        width: '10%',
        editable: true,
        fixed: 'left',
      },
      {
        title: 'Описание',
        dataIndex: 'description',
        width: '14%',
        editable: true,
      },
      {
        title: 'Количество',
        dataIndex: 'counts',
        width: '10%',
        editable: true,
      },
      {
        title: 'Диллерская цена',
        dataIndex: 'dillerPrice',
        width: '10%',
        editable: true,
      },
      {
        title: 'Розничная цена',
        dataIndex: 'price',
        width: '10%',
        editable: true,
      },
      {
        title: 'Доступность',
        dataIndex: 'availability',
        width: '10%',
        editable: true,
      },
      {
        title: 'В коробке',
        dataIndex: 'inBox',
        width: '10%',
        editable: true,
      },
      {
        title: 'Гарантия',
        dataIndex: 'guarantee',
        width: '10%',
        editable: true,
      },
      {
        title: 'Код в компаний',
        dataIndex: 'codeInCompany',
        width: '10%',
        editable: true,
      },
      {
        title: 'Артикль в компаний',
        dataIndex: 'articleInCompany',
        width: '10%',
        editable: true,
      },
      {
        title: 'Операций',
        fixed: 'right',
        width: '10%',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title='Хотите удалить?' onConfirm={() => this.handleDelete(record.id)}>
              <a href='/#'>Удалить</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
      count: 2,
    };
  }

  handleDelete = async (id) => {
    try {
      const dataSource = [...this.state.dataSource];

      await axios.delete(`${process.env.REACT_APP_API_URL}/company/${id}`);

      this.setState({
        dataSource: dataSource.filter((item) => item.id !== id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleAdd = async () => {
    const { count, dataSource } = this.state;
    const lastIndex = dataSource.length;
    const lastItem = dataSource[lastIndex - 1];
    const iD = lastItem?.id ? lastItem.id + 1 : 0;
    const newData = {
      key: iD,
      id: iD,
      code: 'Код',
      name: 'Название',
      description: 'Описание',
      counts: 'Количество',
      dillerPrice: 'Диллерская цена',
      price: 'Розничная цена',
      availability: 'Доступность',
      inBox: 'В коробке',
      guarantee: 'Гарантия',
      codeInCompany: 'Код в компаний',
      articleInCompany: 'Артикль в компаний',
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/company/`, {
        data: newData,
      });
      await axios.get(`${process.env.REACT_APP_API_URL}/company/`).then((res) => {
        this.setState({
          dataSource: [...res.data],
          count: count + 1,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleSave = async (row) => {
    try {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      this.setState({
        dataSource: newData,
      });
      await axios.post(`${process.env.REACT_APP_API_URL}/company/`, {
        data: newData[index],
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/company`).then((result) => {
      const data = result.data.map((item) => {
        return {
          key: item.id,
          ...item,
        };
      });
      this.setState({
        dataSource: data,
      });
    });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type='primary'
          style={{
            marginBottom: 16,
          }}
        >
          Добавить поле
        </Button>
        <Table
          components={components}
          rowKey={(record) => {
            if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
            return record.__uniqueId;
          }}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1500 }}
          sticky
        />
      </div>
    );
  }
}

export default EditableTable;
