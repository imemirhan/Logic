import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles/NotFound.module.css";

const { Title, Paragraph } = Typography;

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <Title className={styles.title}>404</Title>
        <Paragraph className={styles.subtitle}>
          Oops! The page you're looking for doesn't exist.
        </Paragraph>
        <Button type="primary" className={styles.homeButton}>
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;