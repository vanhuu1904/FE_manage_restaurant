import { useEffect, useState } from "react";
import {
  Col,
  Image,
  InputNumber,
  Modal,
  Row,
  message,
  notification,
} from "antd";
import { Form, Input } from "antd";
import { updateFood } from "../../services/foodService";

const FoodModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const onFinish = async (values) => {
    const { id, name, price, status, image } = values;
    setIsSubmit(true);
    const res = await updateFood({ id, name, price, status, image });
    setIsSubmit(false);
    console.log(">>>check res: ", res);
    if (res && res.EC === 0) {
      message.success("Update user thành công");
      setOpenModalUpdate(false);
      await props.fetchUsers();
    } else {
      notification.error(res.EM);
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
              label="Món ăn"
              rules={[
                { required: true, message: "Món ăn không được để trống" },
              ]}
            >
              <Input style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="price"
              label="Giá"
              rules={[{ required: true, message: "Giá không được để trống" }]}
            >
              <Input style={{ width: "90%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20 - 24}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="status"
              label="Trạng thái"
              rules={[
                {
                  required: true,
                  message: "Trạng thái không được để trống",
                  // pattern: new RegExp(/^[0-9]+$/)
                },
              ]}
            >
              <InputNumber style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item labelCol={{ span: 24 }} label="Ảnh món ăn" name="image">
              <Input
                style={{ width: "90%" }}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Item>
            <Image style={{ textAlign: "center" }} width={200} src={imageUrl} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FoodModalUpdate;
