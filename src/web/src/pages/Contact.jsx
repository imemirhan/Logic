import React from "react";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import styles from "./styles/Contact.module.css";

const { Title, Paragraph } = Typography;

function Contact() {
  const onFinish = (values) => {
    console.log("Form Submitted:", values);
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
                <Button type="primary" htmlType="submit" className={styles.submitButton}>
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
          width="100%"
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
              <Paragraph className={styles.infoText}>contact@dummy.com</Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className={styles.infoCard}>
              <Title level={4} className={styles.infoTitle}>Phone</Title>
              <Paragraph className={styles.infoText}>+1 234 567 890</Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className={styles.infoCard}>
              <Title level={4} className={styles.infoTitle}>Address</Title>
              <Paragraph className={styles.infoText}>
                123 Dummy Street, City, Country
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Contact;