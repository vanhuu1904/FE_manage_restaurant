import React, { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message, Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import "./header.scss";
import { doLogoutAction } from "../../redux/account/accountSlice";
import "../../styles/global.scss";
import urlAvatar from "../../../public/anh.jpg";
import { Link } from "react-router-dom";
import { logout } from "../../services/authServices";
const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const account = useSelector((state) => state.account);

  const carts = useSelector((state) => state.order.carts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await logout();
    if (res && res.EC === 0) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };
  const viewOrder = () => {
    navigate("/order");
  };
  const backToHome = () => {
    navigate("/");
  };

  let items = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: <Link to={"/history"}>Xem đơn hàng</Link>,
      key: "history",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (+account?.groupWithRoles?.id === 3) {
    items.unshift({
      label: <Link to="admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  const contentPopover = () => {
    return (
      <div className="pop-cart-body">
        <div
          className="pop-cart-content"
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {carts?.map((food, index) => {
            return (
              <div
                className="food"
                style={{ display: "flex", gap: "5px" }}
                key={`food-${index}`}
              >
                <img
                  style={{ width: "90px", height: "90px" }}
                  src={food?.detail?.image}
                  alt=""
                />
                <div style={{ marginLeft: "5px" }}>{food?.detail?.name}</div>
                <div className="price" style={{ textAlign: "right" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(food?.detail?.price)}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="pop-cart-footer"
          style={{ textAlign: "right", marginTop: "10px" }}
        >
          <button
            onClick={viewOrder}
            style={{
              padding: "8px 20px",
              color: "white",
              backgroundColor: "red",
              textAlign: "right",
              marginTop: "10px",
            }}
          >
            Xem giỏ hàng
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo" onClick={() => backToHome()}>
                <FaReact className="rotate icon-react" /> Văn Hữu
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  className="popover-carts"
                  placement="topRight"
                  rootClassName="popover-carts"
                  title={"Sản phẩm mới thêm"}
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge count={carts?.length ?? 0} size={"small"} showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}> Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar src={urlAvatar} />
                        Welcome {user?.name}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p onClick={handleLogout}>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;
