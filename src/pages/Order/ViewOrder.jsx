import {
  Button,
  Checkbox,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Steps,
  message,
} from "antd";
import "./order.scss";
import {
  DeleteOutlined,
  DeleteTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  doDeleteItemCartAction,
  doResetCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";
import { createOrder } from "../../services/orderService";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const user = useSelector((state) => state.account.user);

  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item?.quantity * item?.detail?.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);
  const handleOnChangeInput = (value, food) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({
          quantity: value,
          detail: food,
          foodID: food?.foodID,
        })
      );
    }
  };
  const onFinish = async (values) => {
    let userId = user?.id;
    const { name, phone, address } = values;
    const data = carts.map((item) => ({
      foodID: item.foodID,
      quantity: item.quantity,
      name,
      phone,
      address,
      payments: "Thanh toán khi nhận hàng",
      totalPrice: totalPrice,
    }));
    let raw = {
      userId: userId,
      OrderItemsIN: data,
    };
    let res = await createOrder(raw);
    if (res && res.EC === 0) {
      message.success("thanh cong");
      setCurrentStep(2);
      dispatch(doResetCartAction());
    }
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="order-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row gutter={[20, 20]}>
          <Col md={18} xs={24} style={{ marginBottom: "20px" }}>
            <Steps
              size="small"
              current={currentStep}
              status="finish"
              items={[
                {
                  title: "Đơn hàng",
                },
                {
                  title: "Đặt hàng",
                },
                {
                  title: "Thanh toán",
                },
              ]}
            />
          </Col>
        </Row>
        {currentStep !== 2 ? (
          <Row gutter={[20, 20]}>
            <Col md={18} xs={24}>
              {carts &&
                carts?.map((item, index) => {
                  // (">>> check item: ", item);
                  let tong = +item?.quantity * +item?.detail?.price;
                  return (
                    <div className="order-book">
                      <div className="book-content">
                        <img src={item?.detail?.image} />
                        <div className="title">{item?.detail?.name}</div>
                        <div className="price">{item?.detail?.price}</div>
                      </div>
                      <div className="action">
                        <div className="quantity">
                          <InputNumber
                            onChange={(value) =>
                              handleOnChangeInput(value, item)
                            }
                            value={item?.quantity}
                          />
                        </div>
                        <div className="sum">Tổng: {tong} ₫</div>
                        <DeleteTwoTone
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch(
                              doDeleteItemCartAction({ foodID: item.foodID })
                            )
                          }
                          twoToneColor="#eb2f96"
                        />
                      </div>
                    </div>
                  );
                })}
              {carts.length === 0 && (
                <div>
                  <Empty description={"Không có sản phẩm nào trong giỏ hàng"} />
                </div>
              )}
            </Col>
            {currentStep === 0 && (
              <Col md={6} xs={24}>
                <div className="order-sum">
                  <div className="calculate">
                    {/* <span> Tạm tính</span>
                <span> 1.055.400đ</span> */}
                  </div>
                  <Divider style={{ margin: "10px 0" }} />
                  <div className="calculate">
                    <span> Tổng tiền</span>
                    <span className="sum-final"> {totalPrice} ₫</span>
                  </div>
                  <Divider style={{ margin: "10px 0" }} />
                  <button onClick={() => setCurrentStep(1)}>
                    Mua Hàng ({carts.length})
                  </button>
                </div>
              </Col>
            )}
            {currentStep === 1 && (
              <Col md={6} xs={24}>
                <div className="order-sum">
                  <Form
                    name="basic"
                    // style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label="Tên người nhận"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Họ tên không được để trống!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label="Số điện thoại"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Tên đăng nhập không được để trống!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label="Địa chỉ"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Địa chỉ không được để trống!",
                        },
                      ]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                    // wrapperCol={{ offset: 6, span: 16 }}
                    >
                      <Checkbox checked={true}>
                        Thanh toán khi nhận hàng
                      </Checkbox>
                    </Form.Item>
                    <hr />
                    <div
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Tổng</div>
                      <div>
                        <span style={{ color: "red", fontSize: "18px" }}>
                          {totalPrice}đ
                        </span>
                      </div>
                    </div>
                    <hr />
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmit}
                      >
                        Đặt hàng
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            )}
          </Row>
        ) : (
          <Row gutter={[20, 20]}>
            <Col md={24} xs={24}>
              <Result
                icon={<SmileOutlined />}
                title={"Đơn hàng đã được đặt thành công"}
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/history");
                    }}
                  >
                    Xem lịch sử
                  </Button>
                }
              />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
