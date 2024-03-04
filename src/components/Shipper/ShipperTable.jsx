import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Popover,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { deleteAUser, fetchListUser } from "../../services/api";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import ShipperModalUpdate from "./ShipperModalUpdate";
import ShipperModalCreate from "./ShipperModalCreate";
import ShipperViewDetail from "./ShipperViewDetail";
// https://stackblitz.com/run?file=demo.tsx
const ShipperTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  // View Detail
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState();

  // Update
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  // import excel
  const [openModalImport, setOpenModalImport] = useState(false);

  // useEffect(() => {
  //   fetchUsers();
  // }, [current, pageSize, filter, sortQuery]);

  const handleExportData = () => {
    return "abc";
  };
  const fetchUsers = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await fetchListUser(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List User</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData()}
          >
            Export
          </Button>
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalCreate(true)}
          >
            Thêm mới
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <IoReloadOutline />
          </Button>
        </span>
      </div>
    );
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  // const handleDeleteUser = async (_id) => {
  //   const res = await deleteAUser(_id);
  //   if (res && res.data) {
  //     message.success("Xóa user thành công");
  //     fetchUsers();
  //   } else {
  //     notification.error({
  //       message: "Có lỗi xảy ra",
  //       description: res.message,
  //     });
  //   }
  // };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title="Xác nhận xóa user"
              // onConfirm={() => handleDeleteUser(record._id)}
              description="Bạn có chắc chắn muốn xóa user này?"
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span>
                <MdDeleteOutline
                  style={{ cursor: "pointer" }}
                  color="red"
                  size={20}
                />
              </span>
            </Popconfirm>
            <BiEditAlt
              style={{ cursor: "pointer", marginLeft: 20 }}
              color="#f57800"
              size={20}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
          </>
        );
      },
    },
  ];

  // const onChange = (pagination, filters, sorter, extra) => {
  //   if (pagination && pagination.current !== current) {
  //     setCurrent(pagination.current);
  //   }
  //   if (pagination && pagination.pageSize !== pageSize) {
  //     setPageSize(pagination.pageSize);
  //     setCurrent(1);
  //   }
  //   if (sorter && sorter.field) {
  //     const q =
  //       sorter.order === "ascend"
  //         ? `sort=${sorter.field}`
  //         : `sort=-${sorter.field}`;
  //     setSortQuery(q);
  //   }
  // };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        {/* <Col span={12}>
          <h3 style={{ marginLeft: 10 }}>Table User</h3>
        </Col>
        <Col span={12}>
          <Button
            style={{ marginLeft: 110 }}
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData()}
          >
            Export
          </Button>
          <Button
            style={{ marginLeft: 16 }}
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>
          <Button
            style={{ marginLeft: 16 }}
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalCreate(true)}
          >
            Thêm mới
          </Button>
          <Button
            style={{ marginLeft: 16 }}
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <IoReloadOutline />
          </Button>
        </Col> */}
        <Col span={24}>
          <Table
            className="def"
            title={renderHeader}
            columns={columns}
            loading={isLoading}
            // dataSource={listUser}
            // onChange={onChange}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
              pageSizeOptions: [1, 2, 3, 5],
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]} - {range[1]} trên {total} rows
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
      <ShipperViewDetail
        setDataViewDetail={setDataViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        openViewDetail={openViewDetail}
      />
      <ShipperModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUsers={fetchUsers}
      />
      <ShipperModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        fetchUsers={fetchUsers}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default ShipperTable;
