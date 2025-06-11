import React, { useEffect } from "react";
import { Typography, Form, Input, Button, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback, resetFeedbackState } from "../store/slices/feedbackSlice";
import styles from "./styles/Contact.module.css";
import Swal from "sweetalert2"; // Add this import

const { Title, Paragraph } = Typography;

function Contact() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { status, error } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (status === "succeeded") {
      Swal.fire({
        title: "Thank you for your feedback! 😊🎉",
        text: "We appreciate your input and will get back to you if needed.",
        icon: "success",
        confirmButtonText: "You're welcome!",
      });
      form.resetFields();
      dispatch(resetFeedbackState());
    } else if (status === "failed" && error) {
      message.error(error);
      dispatch(resetFeedbackState());
    }
  }, [status, error, dispatch, form]);

  const onFinish = (values) => {
    dispatch(createFeedback(values));
  };

  return (
    <div className={styles.contactContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Title className={styles.headerTitle}>Contact Us</Title>
        <Paragraph className={styles.headerSubtitle}>
          We'd love to hear from you! Reach out to us for any inquiries or support.
        </Paragraph>
      </div>

      {/* Contact Form Section */}
      <div className={styles.formSection}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={12}>
            <Form
              name="contactForm"
              layout="vertical"
              onFinish={onFinish}
              className={styles.contactForm}
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Enter your name" />
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
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter your message!" }]}
              >
                <Input.TextArea rows={4} placeholder="Enter your message" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submitButton}
                  loading={status === "loading"}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Google Maps Section */}
      <div className={styles.mapSection}>
        <Title level={3} className={styles.mapTitle}>Our Location</Title>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58205.225963830606!2d32.75701537261732!3d39.94059857754322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1sen!2str!4v1744364355347!5m2!1sen!2str"
          width="80%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Additional Contact Information */}
      <div className={styles.infoSection}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <div className={styles.infoCard}>
              <Title level={4} className={styles.infoTitle}>Email</Title>
              <Paragraph className={styles.infoText}>emir_han_ataman@hotmail.com</Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className={styles.infoCard}>
              <Title level={4} className={styles.infoTitle}>Phone</Title>
              <Paragraph className={styles.infoText}>+90 535 402 93 89</Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className={styles.infoCard}>
              <Title level={4} className={styles.infoTitle}>Address</Title>
              <Paragraph className={styles.infoText}>
                Ankara, Turkey
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Contact;