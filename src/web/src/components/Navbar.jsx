import React, { useState, useRef, useEffect } from "react";
import {
  Badge,
  Layout,
  Button,
  Dropdown,
  Avatar,
  Drawer,
  List,
  Divider,
} from "antd";
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
import logo from "../assets/logo.png";
import {
  selectUnopenedNotifications,
  getNotOpenedNotificationsByJobSeekerId,
} from "../store/slices/notificationSlice";

const { Header } = Layout;

function Navbar() {
  const { user } = useSelector((state) => state.userSlice);
  const notifications = useSelector(selectUnopenedNotifications);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    if (user?.role === 0 && user?.id) {
      dispatch(getNotOpenedNotificationsByJobSeekerId(user.id));
    }
  }, [user?.id, user?.role, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    user?.role === 0 && {
      key: "2",
      label: <Link to="/profile/applications">My Applications</Link>,
    },
    user?.role === 1 && {
      key: "2",
      label: <Link to="/mypostings">My Postings</Link>,
    },
    { key: "3", label: <span onClick={handleLogout}>Logout</span> },
  ].filter(Boolean);

  const navLinks = (
      <>
        {["/", "/browse", "/about", "/contact"].map((path, i) => {
          const names = ["Home", "Browse Jobs", "About Us", "Contact"];
          const icons = [
            <HomeOutlined key="home" />,
            <AppstoreOutlined key="browse" />,
            <InfoCircleOutlined key="about" />,
            <PhoneOutlined key="contact" />,
          ];
          return (
              <Link
                  key={path}
                  to={path}
                  className={`${styles.menuItem} ${
                      location.pathname === path ? styles.activeMenuItem : ""
                  }`}
                  onClick={() => setDrawerOpen(false)}
              >
                {icons[i]} {names[i]}
              </Link>
          );
        })}
      </>
  );

  const renderNotifications = () => (
      <div
          style={{ position: "relative", cursor: "pointer" }}
          ref={notifRef}
          onClick={() => setNotifVisible((v) => !v)}
      >
        <FontAwesomeIcon icon={faBell} size="lg" style={{ color: "white" }} />
        {notifications?.length > 0 && (
            <span
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: -5,
                  width: 10,
                  height: 10,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
            />
        )}
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
                    navigate("/notifications");
                    setNotifVisible(false);
                  }}
              >
                See All
              </Button>
            </div>
        )}
      </div>
  );

  const renderUserDropdown = (
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <span className={styles.userDropdown}>
        <span className={styles.userName}>
          {`${user?.name || ""} ${user?.lastName || user?.surname || ""}`.trim() || "User"}
        </span>
        <Avatar
            src={user?.profileImageUrl || "https://picsum.photos/200/300"}
            alt="User"
            className={styles.avatar}
        />
      </span>
      </Dropdown>
  );

  return (
      <Layout>
        <Header className={styles.header}>
          <div className={styles.logo}>
            <Link to="/" className={styles.buttonLink}>
              <img
                  src={logo}
                  alt="Logo"
                  style={{ top: "20px", height: "3em", width: "3em", objectFit: "contain" }}
              />
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
                  {user?.role === 0 && renderNotifications()}
                  {renderUserDropdown}
                </>
            )}
          </div>
          <Drawer
              title="Menu"
              placement="right"
              onClose={() => setDrawerOpen(false)}
              open={drawerOpen}
              className={styles.mobileDrawer}
              styles={{ body: { padding: 0 } }}
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
                    renderUserDropdown
                )}
              </div>
            </div>
          </Drawer>
        </Header>
      </Layout>
  );
}

export default Navbar;