import { useEffect, useState } from "react";
import {
  Button,
  Col,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
  notification,
} from "antd";
import { Checkbox, Form, Input } from "antd";
import { createANewUser, updateAUser } from "../../services/api";

const ShipperModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const onFinish = async (values) => {
    const { _id, fullname, studentcode, address } = values;
    setIsSubmit(true);
    const res = await updateAUser(_id, fullname, studentcode, address);
    console.log(">>>check res: ", res);
    setIsSubmit(false);
    if (res && +res.statusCode === 200) {
      message.success("Update user thành công");
      setOpenModalUpdate(false);
      await props.fetchUsers();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <Modal
      title="Thêm mới người dùng"
      open={openModalUpdate}
      onCancel={() => setOpenModalUpdate(false)}
      onOk={() => {
        form.submit();
      }}
      okText={"Cập nhật"}
      cancelText={"Hủy"}
      confirmLoading={isSubmit}
    >
      <Form
        form={form}
        name="basic"
        style={{ maxWidth: 900 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item label="Id" labelCol={{ span: 24 }} name="_id" hidden>
          <Input />
        </Form.Item>
        <Row gutter={20 - 24}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Username không được để trống" },
              ]}
            >
              <Input disabled style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="fullname"
              label="Họ và tên"
              rules={[
                { required: true, message: "Họ và tên không được để trống" },
              ]}
            >
              <Input style={{ width: "90%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20 - 24}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="studentcode"
              label="Mã số sinh viên"
              rules={[
                {
                  required: true,
                  message: "Mã số sinh viên không được để trống",
                  // pattern: new RegExp(/^[0-9]+$/)
                },
              ]}
            >
              <InputNumber style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              name="address"
              rules={[
                { required: true, message: "Địa chỉ không được để trống" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ShipperModalUpdate;
