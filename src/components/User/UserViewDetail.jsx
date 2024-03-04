import { Drawer } from "antd";
import { Descriptions } from "antd";
import moment from "moment";
import { useState } from "react";
const UserViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;
  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };
  return (
    <Drawer
      title="Chức năng xem chi tiết"
      placement="right"
      onClose={onClose}
      open={openViewDetail}
      width={"60vw"}
    >
      <Descriptions title="Thông tin User" bordered column={2}>
        <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
        <Descriptions.Item label="Username">
          {dataViewDetail?.username}
        </Descriptions.Item>
        <Descriptions.Item label="Họ và tên">
          {dataViewDetail?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {dataViewDetail?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={2}>
          {dataViewDetail?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
export default UserViewDetail;
