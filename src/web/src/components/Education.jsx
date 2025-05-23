import React from "react";
import styles from "./styles/Education.module.css";

function Education({ degree, institution, startYear, endYear}) {
  return (
    <div className={styles.educationCard}>
      <div className={styles.eduDegree}>Institution: {institution}</div>
      <div className={styles.eduHeader}>
      </div>
        <span className={styles.eduInstitution}>GANO: {degree}</span>
      <div className={styles.eduYears}>
        Years: {startYear} {endYear && <>- {endYear}</>}
      </div>
    </div>
  );
}

export default Education;