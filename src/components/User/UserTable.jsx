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
import { deleteAUser, fetchListUser, getAllUser } from "../../services/api";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import UserViewDetail from "./UserViewDetail";
import UserModelCreate from "./UserModalCreate";
import UserModalUpdate from "./UserModalUpdate";
import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserImport from "./data/UserImport";
import { deleteUser, fetchAllUsers } from "../../services/userService";
// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
  const [listUser, setListUser] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const res = await fetchAllUsers();
    if (res && res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const handleExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
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

  const handleDeleteUser = async (id) => {
    let res = await deleteUser(id);
    if (res && res.EC === 0) {
      message.success("Xóa user thành công");
      fetchUsers();
    } else {
      notification.error(res.EM);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (text, record, index) => {
        return (
          <a
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record.id}
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
              onConfirm={() => handleDeleteUser(record.id)}
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

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Table
            className="def"
            title={renderHeader}
            columns={columns}
            loading={isLoading}
            dataSource={listUser}
            // onChange={onChange}
            rowKey="accountID"
          />
        </Col>
      </Row>
      <UserViewDetail
        setDataViewDetail={setDataViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        openViewDetail={openViewDetail}
      />
      <UserModelCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUsers={fetchUsers}
      />
      <UserModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        fetchUsers={fetchUsers}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
      <UserImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />
    </>
  );
};

export default UserTable;
