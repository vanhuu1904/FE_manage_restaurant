import React, { useEffect, useState } from "react";
import { Table, Row, Col, Popconfirm, message } from "antd";
import { Button } from "antd";
import { IoReloadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { getAllOrder } from "../../services/orderService";
import OrderModalUpdate from "./OrderModalUpdate";
const Order = () => {
  const [listOrder, setListOrder] = useState([]);
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
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await getAllOrder();
    console.log(">>>check res: ", res);

    if (res && res.EC === 0) {
      const data = res.DT.map((item) => {
        return {
          id: item.id,
          status: item.status,
          name: item.Orders[0].name,
          phone: item.Orders[0].phone,
          address: item.Orders[0].address,
          totalPrice: item.Orders[0].totalPrice,
        };
      });
      setListOrder(data);
    }
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Food</span>
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

  const handleDeleteFood = async (id) => {
    let res = await deleteFood(id);
    if (res.EC === 0) {
      message.success("Xóa đồ ăn thành công");
      // fetchFoods();
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
      title: "Tên",
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
      title: "Trạng thái",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            {/* <Popconfirm
              placement="topLeft"
              title="Xác nhận xóa món ăn"
              onConfirm={() => handleDeleteFood(record.id)}
              description="Bạn có chắc chắn muốn xóa món ăn này?"
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
            </Popconfirm> */}
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
            dataSource={listOrder}
            // onChange={onChange}
            rowKey="foodID"
          />
        </Col>
      </Row>
      <OrderModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchOrder={fetchOrder}
      />
    </>
  );
};

export default Order;
