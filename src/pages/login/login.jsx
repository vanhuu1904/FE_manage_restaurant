import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { loginUser } from "../../services/authServices";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    const data = {
      username,
      password,
    };
    setIsSubmit(true);
    const res = await loginUser(data);
    console.log("check res: ", res);
    setIsSubmit(false);
    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.DT.access_token);
      dispatch(doLoginAction(res.DT));
      message.success("Đăng nhập tài khoản thành công!");
      navigate("/");
    } else {
      message.error(res.EM);
    }
  };

  return (
    <div className="login-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Ký </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
