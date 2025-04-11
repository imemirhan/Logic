import React from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Make sure your Axios instance is set up properly
import styles from "./styles/Login.module.css";
import loginPhoto from "../assets/signup.jpg";

const { Content } = Layout;
const { Title } = Typography;

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const payload = {
        username: values.email, // Backend expects "username"
        password: values.password,
      };

      const response = await api.post("/authenticate", payload);

      if (response.data.result) {
        localStorage.setItem("token", response.data.token);
      
        Swal.fire({
          title: "Login Successful!",
          text: "You are now logged in.",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(() => {
          navigate("/"); // Navigate to home page or dashboard route
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.isLockedOut
            ? "Your account is locked."
            : "Invalid credentials.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Login Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.overlay}></div>
          <img
            src={loginPhoto}
            alt="Login Illustration"
            className={styles.image}
          />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            <Title level={2} className={styles.title}>
              Welcome Back
            </Title>
            <Form
              name="login"
              layout="vertical"
              onFinish={onFinish}
              requiredMark="optional"
              className={styles.form}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Login;
