import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Card, Spin, Alert, Badge, Typography } from "antd";
import { getNotificationsByJobSeekerId, selectNotifications, selectNotificationsLoading, selectNotificationsError } from "../store/slices/notificationSlice";
import styles from "./styles/Notifications.module.css";

const { Title, Paragraph, Text } = Typography;

function Notifications() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectNotificationsLoading);
  const error = useSelector(selectNotificationsError);

  useEffect(() => {
    if (user?.id) {
      dispatch(getNotificationsByJobSeekerId(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className={styles.notificationsContainer}>
      <Title level={2} className={styles.title}>Notifications</Title>
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert type="error" message={error} />
      ) : notifications.length === 0 ? (
        <Paragraph className={styles.emptyText}>You have no notifications.</Paragraph>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={notifications}
          renderItem={notif => (
            <List.Item>
              <Card
                className={styles.notificationCard}
                bordered
                style={{
                  background: notif.isOpened ? "#f7fafc" : "#e3f2fd",
                  borderLeft: notif.isOpened ? "4px solid #bdbdbd" : "4px solid #1976d2",
                }}
              >
                <div className={styles.notificationHeader}>
                  <Badge
                    status={notif.isOpened ? "default" : "processing"}
                    text={notif.isOpened ? "Read" : "New"}
                  />
                  <Text type="secondary" className={styles.date}>
                    {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ""}
                  </Text>
                </div>
                <div className={styles.notificationContent}>
                  <Text strong className={styles.notificationTitle}>
                    {notif.title || `Notification #${notif.id}`}
                  </Text>
                  <Paragraph className={styles.notificationMessage}>
                    {notif.message || notif.content || "No message."}
                  </Paragraph>
                  <div className={styles.notificationMeta}>
                    {notif.jobId && (
                      <div>
                        <Text type="secondary">Job ID:</Text> <Text>{notif.jobId}</Text>
                      </div>
                    )}
                    {notif.employerId && (
                      <div>
                        <Text type="secondary">Employer ID:</Text> <Text>{notif.employerId}</Text>
                      </div>
                    )}
                    {notif.jobSeekerId && (
                      <div>
                        <Text type="secondary">Job Seeker ID:</Text> <Text>{notif.jobSeekerId}</Text>
                      </div>
                    )}
                    {notif.status && (
                      <div>
                        <Text type="secondary">Status:</Text> <Text>{notif.status}</Text>
                      </div>
                    )}
                    {notif.forStatus && (
                      <div>
                        <Text type="secondary">For Status:</Text> <Text>{notif.forStatus}</Text>
                      </div>
                    )}
                    {notif.forInterview && (
                      <div>
                        <Text type="secondary">For Interview:</Text> <Text>{notif.forInterview}</Text>
                      </div>
                    )}
                    {notif.interviewId && (
                      <div>
                        <Text type="secondary">Interview ID:</Text> <Text>{notif.interviewId}</Text>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default Notifications;