import React from "react";
import { Layout, Button, Dropdown, Avatar, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, InfoCircleOutlined, PhoneOutlined, AppstoreOutlined } from "@ant-design/icons";
import styles from "./styles/Navbar.module.css";
import Swal from "sweetalert2";

const { Header } = Layout;

function Navbar() {
  const { user } = useSelector((state) => state.userSlice);
  console.log("User:", user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = user !== null;

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
      dispatch(clearUser());
      navigate("/login");
    });
  };

  const menuItems = [
  { key: "1", label: <Link to="/profile">My Profile</Link> },
  { key: "2", label: <Link to="/settings">Settings</Link> },
  { key: "3", label: <span onClick={handleLogout}>Logout</span> },
];

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" className={styles.buttonLink}>
            Logic
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
            <Button type="primary" className={styles.navButton}>
              <Link to="/login" className={styles.buttonLink}>
                Sign In
              </Link>
            </Button>
          ) : (
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <span className={styles.userDropdown}>
                <span className={styles.userName}>{`${user.name} ${user.lastName}` || "User"}</span>
                <Avatar
                  src={user.profileImageUrl || "https://picsum.photos/200/300"}
                  alt="User"
                  className={styles.avatar}
                />
              </span>
            </Dropdown>
          )}
        </div>
      </Header>
    </Layout>
  );
}

export default Navbar;