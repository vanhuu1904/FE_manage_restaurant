import { useState } from "react";
import { Modal, Tabs, message, notification } from "antd";
import { Checkbox, Form, Input } from "antd";
import InfoAccount from "./InfoAccount";
import ChangePassword from "./ChangePassword";

const ManageAccount = (props) => {
  const { openModalAccount, setOpenModalAccount, dataUser } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { username, password, fullname, studentcode, address } = values;
    setIsSubmit(true);
    const res = await createUser(
      username,
      password,
      fullname,
      studentcode,
      address
    );
    setIsSubmit(false);
    if (res && res.data) {
      message.success("Tạo mới user thành công");
      form.resetFields();
      setOpenModalAccount(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const items = [
    {
      key: "1",
      label: "Thông tin user",
      children: <InfoAccount dataUser={dataUser} />,
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: <ChangePassword dataUser={dataUser} />,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Modal
      title="Quản lý tài khoản"
      open={openModalAccount}
      onCancel={() => setOpenModalAccount(false)}
      cancelText={"Đóng"}
      onOk={() => setOpenModalAccount(false)}
      confirmLoading={isSubmit}
      width={800}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Modal>
  );
};

export default ManageAccount;
