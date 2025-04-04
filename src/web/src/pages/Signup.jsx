import React from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
import styles from "./styles/Signup.module.css";
import signupPhoto from "../assets/signup.jpg"; // Replace with your image path

const { Content } = Layout;
const { Title } = Typography;

function Signup() {
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.container}>
        {/* Left Section for Image */}
        <div className={styles.leftSection}>
          <div className={styles.overlay}></div> {/* Dark overlay */}
          <img
            src={signupPhoto} // Replace with your image URL
            alt="Signup Illustration"
            className={styles.image}
          />
        </div>

        {/* Right Section for Form */}
        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            <Title level={2} className={styles.title}>
              Create an Account
            </Title>
            <Form
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              requiredMark="optional"
              className={styles.form}
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please enter your full name!" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

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
                  className={styles.registerButton}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Signup;