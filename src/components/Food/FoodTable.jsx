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

import FoodModalUpdate from "./FoodModalUpdate";
import FoodModalCreate from "./FoodModalCreate";
import FoodViewDetail from "./FoodViewDetail";
import FoodImport from "./data/FoodImport";
import { deleteFood, fetchAllFoods } from "../../services/foodService";
const FoodTable = () => {
  const [listFood, setListFood] = useState([]);
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
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const res = await fetchAllFoods();
    console.log(">>> check res: ", res);
    if (res && res.EC === 0) {
      setListFood(res.DT);
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
    console.log(">>>check res: ", res);
    if (res.EC === 0) {
      message.success("Xóa đồ ăn thành công");
      fetchFoods();
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
              console.log(">>> check data: ", record);
            }}
          >
            {record.id}
          </a>
        );
      },
    },
    {
      title: "Món ăn",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "sold",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
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
            dataSource={listFood}
            // onChange={onChange}
            rowKey="foodID"
          />
        </Col>
      </Row>
      <FoodViewDetail
        setDataViewDetail={setDataViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        openViewDetail={openViewDetail}
      />
      <FoodModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchFoods={fetchFoods}
      />
      <FoodModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        fetchFoods={fetchFoods}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
      <FoodImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        fetchFoods={fetchFoods}
      />
    </>
  );
};

export default FoodTable;
