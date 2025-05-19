import React, { useState } from "react";
import { Layout, Button, Dropdown, Avatar, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styles from "./styles/Navbar.module.css";
import Swal from "sweetalert2";

const { Header } = Layout;

function Navbar() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = user !== null;
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    user?.role === 0 && { key: "2", label: <Link to="/profile/applications">My Applications</Link> },
    user?.role === 1 && { key: "2", label: <Link to="/mypostings">My Postings</Link> },
    { key: "3", label: <span onClick={handleLogout}>Logout</span> },
  ].filter(Boolean);

  // Navigation links for both desktop and mobile
  const navLinks = (
    <>
      <Link
        to="/"
        className={`${styles.menuItem} ${location.pathname === "/" ? styles.activeMenuItem : ""}`}
        onClick={() => setDrawerOpen(false)}
      >
        <HomeOutlined /> Home
      </Link>
      <Link
        to="/browse"
        className={`${styles.menuItem} ${location.pathname === "/browse" ? styles.activeMenuItem : ""}`}
        onClick={() => setDrawerOpen(false)}
      >
        <AppstoreOutlined /> Browse Jobs
      </Link>
      <Link
        to="/about"
        className={`${styles.menuItem} ${location.pathname === "/about" ? styles.activeMenuItem : ""}`}
        onClick={() => setDrawerOpen(false)}
      >
        <InfoCircleOutlined /> About Us
      </Link>
      <Link
        to="/contact"
        className={`${styles.menuItem} ${location.pathname === "/contact" ? styles.activeMenuItem : ""}`}
        onClick={() => setDrawerOpen(false)}
      >
        <PhoneOutlined /> Contact
      </Link>
    </>
  );

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" className={styles.buttonLink}>
            Logic
          </Link>
        </div>
        <div className={styles.menu}>{navLinks}</div>
        <div className={styles.mobileMenuButton}>
          <Button
            icon={<MenuOutlined />}
            type="text"
            className={styles.menuIconButton}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          />
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
                <span className={styles.userName}>
                  {`${user.name} ${user.lastName || user.surname || ""}`.trim() || "User"}
                </span>
                <Avatar
                  src={user.profileImageUrl || "https://picsum.photos/200/300"}
                  alt="User"
                  className={styles.avatar}
                />
              </span>
            </Dropdown>
          )}
        </div>
        {/* Drawer for mobile navigation */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          className={styles.mobileDrawer}
          bodyStyle={{ padding: 0 }}
        >
          <div className={styles.drawerMenu}>
            {navLinks}
            <div className={styles.drawerButtons}>
              {!isLoggedIn ? (
                <Button
                  type="primary"
                  className={styles.navButton}
                  block
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/login");
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                  <span className={styles.userDropdown} style={{ marginTop: 16 }}>
                    <span className={styles.userName}>
                      {`${user.name} ${user.lastName || user.surname || ""}`.trim() || "User"}
                    </span>
                    <Avatar
                      src={user.profileImageUrl || "https://picsum.photos/200/300"}
                      alt="User"
                      className={styles.avatar}
                    />
                  </span>
                </Dropdown>
              )}
            </div>
          </div>
        </Drawer>
      </Header>
    </Layout>
  );
}

export default Navbar;