import React from "react";
import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function UserProfile() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    bio: "Software engineer with a passion for building scalable web applications and exploring new technologies.",
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card
            style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            cover={
              <div style={{ backgroundColor: "#1890ff", height: "120px", borderRadius: "10px 10px 0 0" }} />
            }
          >
            <div style={{ textAlign: "center", marginTop: "-50px" }}>
              <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: "#87d068" }} />
              <Title level={3} style={{ marginTop: "10px" }}>
                {user.name}
              </Title>
              <Text type="secondary">{user.bio}</Text>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Text strong>
                    <MailOutlined style={{ marginRight: "8px" }} />
                    Email:
                  </Text>
                  <Text style={{ marginLeft: "8px" }}>{user.email}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>
                    <PhoneOutlined style={{ marginRight: "8px" }} />
                    Phone:
                  </Text>
                  <Text style={{ marginLeft: "8px" }}>{user.phone}</Text>
                </Col>
              </Row>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" icon={<EditOutlined />} shape="round">
                Edit Profile
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;