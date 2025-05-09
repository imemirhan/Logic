import React from "react";
import { Card, Typography } from "antd";
import styles from "./styles/ComponentCard.module.css";

const { Title, Paragraph } = Typography;

const ComponentCard = ({ image, title, description, reverse }) => {
  return (
    <Card
      className={`${styles.componentCard} ${reverse ? styles.reverse : ""}`}
      hoverable
    >
      <div className={styles.cardContent}>
        {/* Left: Image */}
        <div className={styles.cardImageWrapper}>
          <img src={image} alt={title} className={styles.cardImage} />
        </div>
        {/* Right: Title and Description */}
        <div className={styles.cardText}>
          <Title level={3} className={styles.cardTitle}>
            {title}
          </Title>
          <Paragraph className={styles.cardDescription}>{description}</Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default ComponentCard;