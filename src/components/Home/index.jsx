import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllFoods, getFoodsByName } from "../../services/foodService";
const Home = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };
  const [food, setFood] = useState("all");
  const [listFood, setListFood] = useState([]);
  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    // const res = await
    const res = await fetchAllFoods();
    console.log(">>>> check res: ", res);
    if (res && res.EC === 0) {
      setListFood(res.DT);
    }
  };

  const onFinish = (values) => {};

  const onChange = async (key) => {
    console.log(key);
    let res = await getFoodsByName(key);
    console.log(">>>>check res data by name: ", res);
    if (res && res.EC === 0) {
      setListFood(res.DT);
    }
  };

  const items = [
    {
      key: "all",
      label: `Tất cả`,
      children: <></>,
    },
    {
      key: "Phở",
      label: `Phở`,
      children: <></>,
    },
    {
      key: "Cơm",
      label: `Cơm`,
      children: <></>,
    },
    {
      key: "Bún",
      label: `Bún`,
      children: <></>,
    },
    {
      key: "nuoc",
      label: `Nước`,
      children: <></>,
    },
    {
      key: "another",
      label: `Khác`,
      children: <></>,
    },
  ];
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirectFood = (food) => {
    console.log(">>> check food: ", food);
    const slug = convertSlug(food.name);
    navigate(`food/${slug}?id=${food.id}`);
    // navigate(`food/a?id=${food.id}`);
  };
  return (
    <div
      className="homepage-container"
      style={{ maxWidth: 1250, margin: "0 auto" }}
    >
      <Row gutter={[20, 20]}>
        {/* <Col md={4} sm={0} xs={0} style={{ border: "1px solid green" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {" "}
              <FilterTwoTone /> Bộ lọc tìm kiếm
            </span>
            <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
          </div>
          <Form
            onFinish={onFinish}
            form={form}
            onValuesChange={(changedValues, values) =>
              handleChangeFilter(changedValues, values)
            }
          >
            <Form.Item
              name="category"
              label="Danh mục sản phẩm"
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group>
                <Row>
                  <Col span={24}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="F">F</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Divider />
            <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Form.Item name={["range", "from"]}>
                  <InputNumber
                    name="from"
                    min={0}
                    placeholder="đ TỪ"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item name={["range", "to"]}>
                  <InputNumber
                    name="to"
                    min={0}
                    placeholder="đ ĐẾN"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
              </div>
              <div>
                <Button
                  onClick={() => form.submit()}
                  style={{ width: "100%" }}
                  type="primary"
                >
                  Áp dụng
                </Button>
              </div>
            </Form.Item>
            <Divider />
            <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
              <div>
                <Rate
                  value={5}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
                <span className="ant-rate-text"></span>
              </div>
              <div>
                <Rate
                  value={4}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
                <span className="ant-rate-text">trở lên</span>
              </div>
              <div>
                <Rate
                  value={3}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
                <span className="ant-rate-text">trở lên</span>
              </div>
              <div>
                <Rate
                  value={2}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
                <span className="ant-rate-text">trở lên</span>
              </div>
              <div>
                <Rate
                  value={1}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
                <span className="ant-rate-text">trở lên</span>
              </div>
            </Form.Item>
          </Form>
        </Col> */}
        <Col md={20} xs={24} style={{ border: "1px solid white" }}>
          <Row>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Row>
          <Row className="customize-row">
            {listFood &&
              listFood.length > 0 &&
              listFood.map((item, index) => {
                return (
                  <div
                    className="column"
                    key={`food-${index}`}
                    onClick={() => handleRedirectFood(item)}
                  >
                    <div className="wrapper">
                      <div className="thumbnail">
                        <img src={item.image} alt="food" />
                      </div>
                      <div className="text">{item.name}</div>
                      <div className="price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </div>
                      <div className="rating">
                        <Rate
                          value={4}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 10 }}
                        />
                        <span>đã bán {item.sold}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Row>
          <Divider />
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Pagination defaultCurrent={6} total={1} responsive />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
