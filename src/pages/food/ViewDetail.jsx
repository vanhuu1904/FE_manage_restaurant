import { Row, Col, Rate, Divider, Button } from "antd";
import "./book.scss";
import { useEffect, useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { doAddFoodAction } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";

const ViewDetail = (props) => {
  const { dataFood } = props;
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const refGallery = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = (value) => {
    console.log("changed", value);
  };
  const handleAddToCart = (quantity, food) => {
    dispatch(doAddFoodAction({ quantity, detail: food, foodID: food?.id }));
  };
  const handleChangeButton = (type) => {
    if (type === "MINUS") {
      if (currentQuantity - 1 < 0) return;
      setCurrentQuantity(currentQuantity - 1);
    }
    if (type === "PLUS") {
      if (currentQuantity > 100) return;
      setCurrentQuantity(currentQuantity + 1);
    }
  };
  const handleChangeInput = (value) => {
    if (!isNaN(value)) {
      if (+value < 0 && +value < 100) {
        setCurrentQuantity(+value);
      }
    }
  };
  const handleBuy = () => {
    handleAddToCart(currentQuantity, dataFood);
    navigate("/order");
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="view-detail-book"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div style={{ padding: "20px", background: "#fff", borderRadius: 5 }}>
          <Row gutter={[20, 20]}>
            <Col md={10} sm={0} xs={0}>
              <img
                src={dataFood?.image}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                alt=""
              />
            </Col>
            <Col md={14} sm={24}>
              <Col span={24}>
                <div className="title">{dataFood?.name}</div>
                <div className="rating">
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 12 }}
                  />
                  <span className="sold">
                    <Divider type="vertical" />
                    Đã bán {dataFood?.sold}
                  </span>
                </div>
                <div className="price">
                  <span className="currency">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(dataFood?.price)}
                  </span>
                </div>
                <div className="delivery">
                  <div>
                    <span className="left">Vận chuyển</span>
                    <span className="right">Miễn phí vận chuyển</span>
                  </div>
                </div>
                <div className="quantity">
                  <span className="left">Số lượng</span>
                  <span className="right">
                    <button onClick={() => handleChangeButton("MINUS")}>
                      <MinusOutlined />
                    </button>
                    <input
                      onChange={(e) => handleChangeInput(e.target.value)}
                      value={currentQuantity}
                    />
                    <button onClick={() => handleChangeButton("PLUS")}>
                      <PlusOutlined />
                    </button>
                  </span>
                </div>
                <div className="buy">
                  <button
                    className="cart"
                    onClick={() => handleAddToCart(currentQuantity, dataFood)}
                  >
                    <BsCartPlus className="icon-cart" />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                  <button className="now" onClick={handleBuy}>
                    Mua ngay
                  </button>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
