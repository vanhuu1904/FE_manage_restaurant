import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Dropdown,
  Popover,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { getOrderByUserId } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { DownOutlined } from "@ant-design/icons";
import urlAvatar from "../../../public/anh.jpg";
import ReactJson from "react-json-view";
const OrderHistory = () => {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector((state) => state.account.user);
  useEffect(() => {
    console.log(">>>check data source: ", dataSource);
    fetchAllOrderByUser();
  }, []);
  const fetchAllOrderByUser = async () => {
    let data = await getOrderByUserId(user.id);
    console.log(">>>check data: ", data);
    if (data && data.EC === 0) {
      let res = data.DT;
      if (res && res.length > 0) {
        // Tạo một đối tượng để lưu trữ các phần tử gom nhóm theo orderItemId
        let groupedItems = {};

        // Lặp qua từng phần tử trong mảng items và gom nhóm chúng
        res.forEach((item) => {
          // Nếu orderItemId đã tồn tại trong groupedItems, thêm phần tử vào mảng tương ứng
          if (groupedItems[item.orderItemId]) {
            groupedItems[item.orderItemId].push(item);
          } else {
            // Nếu orderItemId chưa tồn tại trong groupedItems, tạo một mảng mới và thêm phần tử vào
            groupedItems[item.orderItemId] = [item];
          }
        });
        console.log(">>>check group item object: ", groupedItems);
        // Chuyển groupedItems từ đối tượng sang mảng
        let groupedItemsArray = Object.values(groupedItems);
        console.log(">>>check group groupedItemsArray: ", groupedItemsArray);

        let dataOrder = [];
        groupedItemsArray.map((item, index) => {
          let order = [];
          item &&
            item.length > 0 &&
            item.map((food, index) => {
              let orderItem = {
                foodId: food.foodId,
                quantity: food.quantity,
                image: food.Food.image,
                name: food.Food.name,
              };
              order.push(orderItem);
            });
          let res = {
            orderItemId: item[0].orderItemId,
            name: item[0].name,
            phone: item[0].phone,
            address: item[0].address,
            totalPrice: item[0].totalPrice,
            status: item[0].status,
            userId: item[0].userId,
            createdAt: moment(item[0].createdAt).format("DD-MM-YYYY HH:mm:ss"),
            food: order,
            id: index,
          };
          dataOrder.push(res);
        });
        setDataSource(dataOrder);
      }
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "address",
    },
    {
      title: "Chi tiết đơn hàng",
      dataIndex: "Food",
      render: (text, record, index) => {
        console.log(">>>check record: ", record);
        return (
          <ReactJson
            src={record.food}
            theme={"monkai"}
            name={"Chi tiết đơn mua"}
            displayDataTypes={false}
            displayArrayKey={false}
            collapsed={true}
          />
        );
      },
    },
  ];

  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
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
      key: "account",
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
      <div style={{ padding: "20px" }}>
        <h3>Lịch sử đặt hàng</h3>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </>
  );
};
export default OrderHistory;
