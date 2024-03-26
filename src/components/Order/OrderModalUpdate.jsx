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
import { updateOrder } from "../../services/orderService";

const OrderModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const onFinish = async (values) => {
    const { id, status } = values;
    setIsSubmit(true);
    const res = await updateOrder({ id, status });
    setIsSubmit(false);
    if (res && +res.EC === 0) {
      message.success("Update order thành công");
      setOpenModalUpdate(false);
      await props.fetchOrder();
    } else {
      message.error(res.EM);
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
        <Form.Item label="Id" labelCol={{ span: 24 }} name="id" hidden>
          <Input />
        </Form.Item>
        <Row gutter={20 - 24}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="name"
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
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                  // pattern: new RegExp(/^[0-9]+$/)
                },
              ]}
            >
              <Input disabled style={{ width: "90%" }} />
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
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Trạng thái"
              labelCol={{ span: 24 }}
              name="status"
              rules={[
                { required: true, message: "Trạng thái không được để trống" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Giá tiền"
              labelCol={{ span: 24 }}
              name="totalPrice"
              rules={[
                { required: true, message: "Trạng thái không được để trống" },
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

export default OrderModalUpdate;
