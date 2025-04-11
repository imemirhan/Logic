import React from "react";
import { Layout, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, InfoCircleOutlined, PhoneOutlined, AppstoreOutlined } from "@ant-design/icons";
import styles from "./styles/Navbar.module.css";
import Swal from "sweetalert2";

const { Header } = Layout;

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Successful!",
      text: "You are being redirected to the login page.",
      icon: "info",
      showCancelButton: false,
      confirmButtonText: "Continue",
      timer: 2000,
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

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
            to="/browse"
            className={`${styles.menuItem} ${
              location.pathname === "/browse" ? styles.activeMenuItem : ""
            }`}
          >
            <AppstoreOutlined /> Browse Jobs
          </Link>
          <Link
            to="/about"
            className={`${styles.menuItem} ${
              location.pathname === "/about" ? styles.activeMenuItem : ""
            }`}
          >
            <InfoCircleOutlined /> About Us
          </Link>
          <Link
            to="/contact"
            className={`${styles.menuItem} ${
              location.pathname === "/contact" ? styles.activeMenuItem : ""
            }`}
          >
            <PhoneOutlined /> Contact
          </Link>
        </div>
        <div className={styles.buttons}>
          {!isLoggedIn ? (
            <>
              <Button type="primary" className={styles.navButton}>
                <Link to="/login" className={styles.buttonLink}>
                  Login
                </Link>
              </Button>
              <Button type="default" className={styles.navButton}>
                <Link to="/signup" className={styles.buttonLink}>
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button type="default" className={styles.navButton}>
                <Link to="/profile" className={styles.buttonLink}>
                  My Profile
                </Link>
              </Button>
              <Button danger type="primary" className={styles.navButton} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Header>
    </Layout>
  );
}

export default Navbar;