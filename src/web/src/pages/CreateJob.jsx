import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../store/slices/jobsSlice";
import { Form, Input, Button, Select, DatePicker, Switch, Card, message } from "antd";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import styles from "./styles/CreateJob.module.css";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const employmentTypes = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
];

function CreateJob() {
    const employmentTypeEnum = {
    "Full-Time": 0,
    "Part-Time": 1,
    "Contract": 2,
    "Internship": 3,
    "Remote": 4,
    "Hybrid": 5,
    };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await dispatch(
    createJob({
        employerId: user?.id,
        title: values.title,
        description: values.description,
        location: values.location,
        eType: employmentTypeEnum[values.employmentType],
        salaryRange: parseFloat(values.salaryRange),
        postedDate: values.postedDate.toISOString(),
        expirationDate: values.expirationDate.toISOString(),
        isRemote: values.isRemote,
    })
    ).unwrap();
      form.resetFields();
      Swal.fire({
        icon: "success",
        title: "Job Posted!",
        text: "Your job has been posted successfully.",
        confirmButtonText: "Go to Browse Jobs",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/browse");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Post Job",
        text: err?.message || "An error occurred while posting the job.",
        confirmButtonText: "OK",
      });
    }
    setLoading(false);
  };

  return (
    <div className={styles.createJobWrapper}>
      <Card title="Create a Job Posting" bordered className={styles.createJobCard}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            employmentType: "Full-Time",
            isRemote: false,
            postedDate: dayjs(),
            expirationDate: dayjs().add(30, "day"),
          }}
          className={styles.createJobForm}
        >
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: "Please enter the job title" }]}
            className={styles.formItem}
          >
            <Input placeholder="e.g. Senior Software Engineer" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the job description" }]}
            className={styles.formItem}
          >
            <TextArea rows={4} placeholder="Describe the job responsibilities, requirements, etc." />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the job location" }]}
            className={styles.formItem}
          >
            <Input placeholder="e.g. Istanbul, Remote, etc." />
          </Form.Item>

          <Form.Item
            label="Employment Type"
            name="employmentType"
            rules={[{ required: true, message: "Please select employment type" }]}
            className={styles.formItem}
          >
            <Select options={employmentTypes} />
          </Form.Item>

          <Form.Item
            label="Salary Range"
            name="salaryRange"
            rules={[{ required: true, message: "Please enter the salary range" }]}
            className={styles.formItem}
          >
            <Input placeholder="e.g. 40,000 - 60,000 USD/year" />
          </Form.Item>

          <Form.Item
            label="Posted Date"
            name="postedDate"
            rules={[{ required: true, message: "Please select the posted date" }]}
            className={styles.formItem}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expirationDate"
            rules={[{ required: true, message: "Please select the expiration date" }]}
            className={styles.formItem}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Remote"
            name="isRemote"
            valuePropName="checked"
            className={styles.formItem}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item className={styles.formItem}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create Job
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default CreateJob;