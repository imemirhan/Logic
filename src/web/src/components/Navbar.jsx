import React from "react";
import { Layout, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles/Navbar.module.css";

const { Header } = Layout;

function Navbar() {
  const location = useLocation(); // Get the current route

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" className={styles.buttonLink}>
            MyApp
          </Link>
        </div>
        <div className={styles.menu}>
          <Link
            to="/"
            className={`${styles.menuItem} ${
              location.pathname === "/" ? styles.activeMenuItem : ""
            }`}
          >
            <HomeOutlined /> Home
          </Link>
          <Link
            to="/profile"
            className={`${styles.menuItem} ${
              location.pathname === "/profile" ? styles.activeMenuItem : ""
            }`}
          >
            <UserOutlined /> Profile
          </Link>
        </div>
        <div className={styles.buttons}>
          <Button type="primary">
            <Link to="/login" className={styles.buttonLink}>
              Login
            </Link>
          </Button>
          <Button type="default">
            <Link to="/signup" className={styles.buttonLink}>
              Register
            </Link>
          </Button>
        </div>
      </Header>
    </Layout>
  );
}

export default Navbar;