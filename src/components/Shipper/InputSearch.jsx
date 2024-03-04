import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";

const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    let query = "";
    // build query
    if (values.fullname) {
      query += `&fullname=/${values.fullname}/i`;
    }
    if (values.studentcode) {
      query += `&studentcode=/${values.studentcode}/i`;
    }
    if (values.address) {
      query += `&address=/${values.address}/i`;
    }
    if (query) {
      props.handleSearch(query);
    }

    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`fullname`}
            label={`Name`}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`studentcode`}
            label={`Mã số sinh viên`}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`address`}
            label={`Địa chỉ`}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
              props.setFilter("");
            }}
          >
            Clear
          </Button>
          {/* <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                    </a> */}
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
