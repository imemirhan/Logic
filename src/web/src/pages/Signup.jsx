import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography, Radio, Row, Col } from "antd";
import Swal from "sweetalert2";
import styles from "./styles/Signup.module.css";
import signupPhoto from "../assets/signup.jpg";
import api from "../services/api"; // Import the Axios instance

const { Content } = Layout;
const { Title } = Typography;

function Signup() {
  const [role, setRole] = useState("jobseeker"); // Default role

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onFinish = async (values) => {
    try {
      // Add role to the values object
      const userData = { ...values, role };

      // Determine the endpoint based on the role
      const endpoint = role === "jobseeker" ? "/jobseekers" : "/employers";

      // Send the request with the role-specific endpoint
      const response = await api.post(endpoint, userData);

      // Show success alert
      if (response.status !== 200) {
        throw new Error("Failed to create account");
      }
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created. Please log in to continue.",
        icon: "success",
        confirmButtonText: "Go to Login",
      }).then(() => {
        // Redirect to login page
        window.location.href = "/login";
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);

      // Show error alert
      Swal.fire({
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while creating your account. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
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
              {role === "jobseeker" ? (
                <>
                  <Row gutter={16}>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        label="First Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your first name!" }]}
                      >
                        <Input placeholder="Enter your first name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please enter your last name!" }]}
                      >
                        <Input placeholder="Enter your last name" />
                      </Form.Item>
                    </Col>
                  </Row>

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
                    rules={[
                      { required: true, message: "Please enter your password!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                        message: "Password must have at least 6 characters, 1 uppercase, 1 lowercase, and 1 symbol.",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="First Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your first name!" }]}
                      >
                        <Input placeholder="Enter your first name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please enter your last name!" }]}
                      >
                        <Input placeholder="Enter your last name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Company Name"
                        name="companyName"
                        rules={[{ required: true, message: "Please enter your company name!" }]}
                      >
                        <Input placeholder="Enter your company name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Industry"
                        name="industry"
                        rules={[{ required: true, message: "Please enter your industry!" }]}
                      >
                        <Input placeholder="Enter your industry" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
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
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: "Please enter your phone number!" }]}
                      >
                        <Input placeholder="Enter your phone number" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24}>
                      <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter a description!" }]}
                      >
                        <Input.TextArea rows={3} placeholder="Enter a description of your company" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please enter your password!" },
                          {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                            message: "Password must have at least 6 characters, 1 uppercase, 1 lowercase, and 1 symbol.",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Enter your password" />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {/* Role Selection */}
              <Form.Item label="Select Role" name="role" required>
                <Radio.Group onChange={onRoleChange} value={role}>
                  <Radio value="jobseeker">Job Seeker</Radio>
                  <Radio value="employer">Employer</Radio>
                </Radio.Group>
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