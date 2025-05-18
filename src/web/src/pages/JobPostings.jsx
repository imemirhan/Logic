import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobsByEmployerId, deleteJob, updateJob } from "../store/slices/jobsSlice";
import { Card, List, Button, Typography, Popconfirm, Spin, Tag, message, Modal, Form, Input, DatePicker, Switch, Select } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import styles from "./styles/JobPostings.module.css";

const { Title, Paragraph, Text } = Typography;
const employmentTypeEnum = {
  "Full-Time": 0,
  "Part-Time": 1,
  "Contract": 2,
  "Internship": 3,
  "Remote": 4,
  "Hybrid": 5,
};
const employmentTypeLabels = {
  0: "Full-Time",
  1: "Part-Time",
  2: "Contract",
  3: "Internship",
  4: "Remote",
  5: "Hybrid",
};
const statusEnum = {
  Open: 0,
  Closed: 1,
  Expired: 2,
};
const statusOptions = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "Expired", label: "Expired" },
];

function JobPostings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const { jobs, status, error } = useSelector((state) => state.jobs);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user?.id) {
      dispatch(getJobsByEmployerId(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = async (jobId) => {
    try {
      await dispatch(deleteJob(jobId)).unwrap();
      message.success("Job deleted successfully.");
    } catch (err) {
      message.error("Failed to delete job.");
    }
  };

  const showEditModal = (job) => {
    setEditingJob(job);
    form.setFieldsValue({
      ...job,
      expirationDate: job.expirationDate ? dayjs(job.expirationDate) : null,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(
      updateJob({
          id: editingJob.id,
          title: values.title,
          description: values.description,
          location: values.location,
          employmentType: employmentTypeEnum[values.employmentType],
          salaryRange: Number(values.salaryRange),
          expirationDate: values.expirationDate ? values.expirationDate.toISOString() : null,
          isRemote: values.isRemote,
          status: statusEnum[values.status],  // convert string to enum number
        })
      ).unwrap();
      message.success("Job updated successfully.");
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (err) {
      console.log("Failed to update job. " + err.message);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>Error: {error}</div>;
  }

  return (
    <div className={styles.jobPostingsWrapper}>
      <Title level={2} className={styles.title}>My Job Postings</Title>
      {(!jobs || jobs.length === 0) ? (
        <Paragraph className={styles.emptyText}>
          You haven't posted any jobs yet.
        </Paragraph>
      ) : (
        <List
          grid={{ gutter: 24, column: 1 }}
          dataSource={jobs}
          renderItem={job => (
            <List.Item>
              <Card
                className={styles.jobCard}
                title={
                  <span>
                    <Text strong className={styles.cardTitle}>{job.title}</Text>
                    {job.isRemote && <Tag className={styles.remoteTag}>Remote</Tag>}
                  </span>
                }
                extra={
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      size="small"
                      type="primary"
                      className={styles.updateButton}
                      onClick={() => showEditModal(job)}
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      className={styles.seeApplicantsButton}
                      onClick={() => navigate(`/mypostings/${job.id}`)}
                    >
                      See Applicants
                    </Button>
                    <Popconfirm
                      title="Are you sure you want to delete this job?"
                      onConfirm={() => handleDelete(job.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger size="small" className={styles.deleteButton}>Delete</Button>
                    </Popconfirm>
                  </div>
                }
              >
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Description:</Text> {job.description}
                </Paragraph>
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Location:</Text> {job.location}
                </Paragraph>
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Employment Type:</Text> {employmentTypeLabels[job.eType] ?? job.eType}
                </Paragraph>
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Salary Range:</Text> {job.salaryRange}
                </Paragraph>
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Posted Date:</Text> {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "-"}
                </Paragraph>
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Expiration Date:</Text> {job.expirationDate ? new Date(job.expirationDate).toLocaleDateString() : "-"}
                </Paragraph>
                <Paragraph className={styles.cardParagraph}>
                  <Text strong>Status:</Text> {Object.keys(statusEnum).find(key => statusEnum[key] === job.status) ?? job.status}
                </Paragraph>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        title="Update Job Posting"
        open={isModalOpen}
        onCancel={() => {
            setIsModalOpen(false);
            form.resetFields(); // ensures form instance stays in sync
         }}
        onOk={handleUpdate}
        okText="Update"
        >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isRemote: false,
            employmentType: 0,
            status: "Active",
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the job title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the job description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the job location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employment Type"
            name="employmentType"
            rules={[{ required: true, message: "Please select employment type" }]}
          >
            <Select options={employmentTypeLabels} />
          </Form.Item>
          <Form.Item
            label="Salary Range"
            name="salaryRange"
            rules={[{ required: true, message: "Please enter the salary range" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Expiration Date"
            name="expirationDate"
            rules={[{ required: true, message: "Please select the expiration date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Remote"
            name="isRemote"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select options={statusOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default JobPostings;