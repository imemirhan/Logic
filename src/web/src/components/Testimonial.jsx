import React from "react";
import { Card, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles/Testimonial.module.css"; // Ensure you use the correct path to the CSS module

const { Paragraph } = Typography;

const Testimonial = ({ testimonial, name, role, avatarIcon }) => {
  return (
    <Card className={styles.testimonialCard}>
      <Paragraph>{testimonial}</Paragraph>
      <div className={styles.testimonialFooter}>
        <Avatar icon={avatarIcon || <UserOutlined />} />
        <div>
          <strong>{name}</strong>
          <br />
          {role}
        </div>
      </div>
    </Card>
  );
};

export default Testimonial;
