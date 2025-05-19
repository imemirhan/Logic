import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles/BrowseJobItem.module.css";

function BrowseJobItem({ job }) {
  return (
    <Link to={`/browse/${job.id}`}>
      <Card className={styles.jobCard} hoverable>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.jobLocation}>{job.location}</p>
        <p className={styles.jobDescription}>{job.description}</p>
        <Button type="primary" className={styles.applyButton}>
          See Details
        </Button>
      </Card>
    </Link>
  );
}

export default BrowseJobItem;