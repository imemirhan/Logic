import React, { useState, useRef, useEffect } from "react";
import { Layout, Button, Dropdown, Avatar, Drawer, List, Divider } from "antd";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from "./styles/Navbar.module.css";
import Swal from "sweetalert2";
import { getNotOpenedNotificationsByJobSeekerId } from "../store/slices/notificationSlice"; // adjust path as needed

const { Header } = Layout;

function Navbar() {
  const { user } = useSelector((state) => state.userSlice);
  const notifications = useSelector((state) => state.jobSeekerNotifications.notifications || []);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = user !== null;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // New state to toggle notifications dropdown visibility
  const [notifVisible, setNotifVisible] = useState(false);
  const notifRef = useRef(null);

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
  useEffect(() => {
    if (user?.id) {
      dispatch(getNotOpenedNotificationsByJobSeekerId(user.id));
    }
  }, [user, dispatch]);
  // Close notifications dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifVisible(false);
      }
    }
    if (notifVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifVisible]);

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
        <div className={styles.buttons} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {!isLoggedIn ? (
            <Button type="primary" className={styles.navButton}>
              <Link to="/login" className={styles.buttonLink}>
                Sign In
              </Link>
            </Button>
          ) : (
            <>
              {/* Notification bell icon */}
              <div
                ref={notifRef}
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => setNotifVisible((v) => !v)}
                aria-label="Toggle notifications dropdown"
              >
                <FontAwesomeIcon style={{color: "white"}} icon={faBell} size="lg" />
                {/* Red badge circle */}
                {notifications?.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 10,
                      height: 10,
                      backgroundColor: "red",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                )}
                {/* You can add a badge here if you want */}
                {notifVisible && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      marginTop: 8,
                      width: 280,
                      maxHeight: 320,
                      overflowY: "auto",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      borderRadius: 4,
                      zIndex: 1000,
                      padding: 8,
                    }}
                  >
                    <List
                      size="small"
                      dataSource={notifications}
                      locale={{ emptyText: "No notifications" }}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.message}
                            description={new Date(item.createdAt).toLocaleString()}
                          />
                        </List.Item>
                      )}
                    />
                    <Divider style={{ margin: "8px 0" }} />
                    <Button
                      type="link"
                      style={{ width: "100%", textAlign: "center" }}
                      onClick={() => {
                        // Will implement in next prompt
                        setNotifVisible(false);
                      }}
                    >
                      See All
                    </Button>
                  </div>
                )}
              </div>

              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <span className={styles.userDropdown} style={{ marginLeft: 16 }}>
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
            </>
          )}
        </div>
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
                <>
                  <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
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
                </>
              )}
            </div>
          </div>
        </Drawer>
      </Header>
    </Layout>
  );
}

export default Navbar;