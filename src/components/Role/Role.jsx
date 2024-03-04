import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Table,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { IoAddCircle, IoReloadOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { createRoles, fetchAllRoles } from "../../services/roleService";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import RoleImport from "./data/RoleImport";
const Role = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const defaulValueChild = {
    url: "",
    description: "",
    isValidUrl: true,
  };
  const [listChilds, setListChilds] = useState({
    child1: defaulValueChild,
  });
  const childRef = useRef();
  const [listRole, setListRole] = useState([]);
  useEffect(() => {
    fetchRoles();
  }, []);
  const fetchRoles = async () => {
    let res = await fetchAllRoles();
    if (res && res.EC === 0) {
      setListRole(res.DT);
    }
    console.log(">>>check res: ", res);
  };
  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value !== "") {
      _listChilds[key].isValidUrl = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = defaulValueChild;
    setListChilds(_listChilds);
  };
  const handleRemoveInput = (key) => {
    console.log(">>>check key: ", key);
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };
  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };
  const handleSave = async () => {
    let check = true;
    let invalidObj = {};
    Object.entries(listChilds).find(([key, child], index) => {
      if (child && !child.url) {
        invalidObj[key] = child;
      }
    });
    if (Object.entries(invalidObj).length > 0) {
      // error
      let _listChilds = _.cloneDeep(listChilds);
      Object.entries(invalidObj).map(([key, child]) => {
        _listChilds[key].isValidUrl = false;
      });
      setListChilds(_listChilds);
      message.error("url cannot be empty");
      return;
    } else {
      // call api
      let data = buildDataToPersist();
      console.log(">>>check data: ", data);
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        message.success(res.EM);
        setListChilds({ child1: defaulValueChild });
        await fetchRoles();
        console.log(">>>check list child: ", listChilds);
      } else {
        message.error(res.EM);
      }
    }
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Role</span>
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
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        console.log(
          ">>>check text: ",
          text,
          "check record: ",
          record,
          "index: ",
          index
        );
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
      <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Col span={24}>
          <h3 style={{ paddingLeft: "20px", marginBottom: "20px" }}>
            Add a new role...
          </h3>
        </Col>

        {Object.entries(listChilds).map(([key, child]) => {
          return (
            <>
              <Col span={10} style={{ paddingLeft: "20px" }}>
                <Form layout="vertical">
                  <Form.Item label="URL: ">
                    <Input
                      value={child.url}
                      onChange={(e) =>
                        handleOnChangeInput("url", e.target.value, key)
                      }
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={10} style={{ paddingLeft: "20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Description: ">
                    <Input
                      value={child.description}
                      onChange={(e) =>
                        handleOnChangeInput("description", e.target.value, key)
                      }
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={4} style={{ marginTop: "33px" }}>
                <span
                  style={{
                    cursor: "pointer",
                    paddingLeft: "20px",
                    paddingRight: "5px",
                  }}
                  onClick={() => handleAddNewInput()}
                >
                  <IoAddCircle fontSize={"25px"} color="#07bc0c" />
                </span>
                {listChilds && Object.keys(listChilds).length > 1 && (
                  <span
                    className="mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveInput(key)}
                  >
                    <FaTrashAlt fontSize={"25px"} color="#e74c3c" />
                  </span>
                )}
              </Col>
            </>
          );
        })}

        <Col span={24}>
          <Button
            type="primary"
            style={{ marginLeft: "20px" }}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Table
            className="def"
            title={renderHeader}
            columns={columns}
            loading={isLoading}
            dataSource={listRole}
            pagination={{ pageSize: 5 }}
            // onChange={onChange}
            rowKey="id"
          />
        </Col>
      </Row>
      <RoleImport
        fetchRoles={fetchRoles}
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />
    </>
  );
};

export default Role;
