import React, { useState } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { logout } from "../../services/authServices";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to={"/admin/user"}>Manage Users</Link>,
    key: "user",
    icon: <UserOutlined />,
    // children: [
    //   {
    //     label: <Link to="/admin/user">CRUD</Link>,
    //     key: "crud",
    //     icon: <TeamOutlined />,
    //   },
    //   {
    //     label: "Files1",
    //     key: "file1",
    //     icon: <TeamOutlined />,
    //   },
    // ],
  },
  {
    label: <Link to="/admin/food">Manage Food</Link>,
    key: "food",
    icon: <ExceptionOutlined />,
  },
  {
    label: <Link to="/admin/order">Manage Orders</Link>,
    key: "order",
    icon: <DollarCircleOutlined />,
  },
  {
    label: <Link to="/admin/shipper">Manage Shipper</Link>,
    key: "shipper",
    icon: <DollarCircleOutlined />,
  },
  {
    label: <Link to="/admin/groupRole">Manage Group</Link>,
    key: "Group Role",
    icon: <DollarCircleOutlined />,
  },
  {
    label: <Link to="/admin/role">Manage Role</Link>,
    key: "role",
    icon: <DollarCircleOutlined />,
  },
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await logout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  let itemsDropdown = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }}>
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </span>
        </label>
      ),
      key: "home",
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

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 32, margin: 16, textAlign: "center" }}>Admin</div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={items}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </span>
          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Welcome {user?.name}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        {/* <Content>
          <Outlet />
        </Content>
        <Footer style={{ padding: 0 }}>
          <div>
            Project database lab &copy; by Văn Hữu <HeartTwoTone />
          </div>
        </Footer> */}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
