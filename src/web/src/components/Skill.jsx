import React from "react";
import styles from "./styles/Skill.module.css";

const skillTypeLabels = ["Intermediate", "Average", "Beginner"];

function Skill({ title, description, skillType}) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.skillHeader}>
        <span className={styles.skillTitle}>Skill: {title}</span>
      </div>
      <div className={styles.skillType}>Skill Level: {skillTypeLabels[skillType]}</div>
      {description && <div className={styles.skillDesc}>Description: {description}</div>}
    </div>
  );
}

export default Skill;