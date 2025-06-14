import React from "react";
import { Card, Button, Avatar, Tooltip } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles/BrowseJobItem.module.css";

function BrowseJobItem({ job }) {
  return (
    <Link to={`/browse/${job.id}`} className={styles.link}>
      <Card className={styles.jobCard} hoverable>
        <div className={styles.headerRow}>
          <div className={styles.logoAndTitle}>
            <Avatar
              src={job.employerLogoUrl || "https://ui-avatars.com/api/?name=E"}
              size={48}
              className={styles.employerLogo}
              alt={job.employerName || "Employer"}
            />
            <div>
              <Tooltip title={job.title}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
              </Tooltip>
              <div className={styles.employerName}>
                {job.employerName || "Unknown Employer"}
              </div>
            </div>
          </div>
          <Button type="primary" className={styles.applyButton}>
            See Details
          </Button>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.jobLocation}>{job.location}</span>
        </div>
        <p className={styles.jobDescription}>
          {job.description?.length > 120
            ? job.description.slice(0, 120) + "..."
            : job.description}
        </p>
      </Card>
    </Link>
  );
}

export default BrowseJobItem;