import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import styles from "./styles/GoBack.module.css";

function GoBack() {
  const navigate = useNavigate();
  return (
    <Button
      type="default"
      onClick={() => navigate(-1)}
      className={styles.goBackButton}
    >
      Go Back
    </Button>
  );
}

export default GoBack;