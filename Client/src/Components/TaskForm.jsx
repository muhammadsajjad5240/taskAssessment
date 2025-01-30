import { useState } from "react";
import api from "../utils/axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskPage = ({ fetchTasks, selectedTask, onHide }) => {
  const initialValues = {
    taskName: selectedTask?.taskName ?? "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    taskName: Yup.string()
      .required("Task Name is required")
      .min(3, "Task Name must be at least 3 characters")
      .max(50, "Task Name must not exceed 50 characters"),
  });

  const [error, setError] = useState("");

  const onSubmit = (values, { resetForm }) => {
    if (selectedTask?.id) {
      handleUpdateTask(values, resetForm);
    } else {
      handleCreateTask(values,resetForm);
    }
  };

  const handleCreateTask = async (payload, resetForm) => {
    const response = await api.post("tasks/add", payload);
    if (response?.status == 201) {
      setError("");
      alert("Task created successfully");
      fetchTasks();
      onHide(false);
      resetForm();
    } else {
      setError(response?.data?.message ?? "Something went wrong");
      onHide(false);
    }
  };

  const handleUpdateTask = async (payload, resetForm) => {
    const response = await api.patch(`tasks/${selectedTask?.id}`, payload);
    if (response?.status == 200) {
      setError("");
      alert("Task updated successfully");
      fetchTasks();
      onHide(false);
      resetForm();
    } else {
      setError(response?.data?.message ?? "Something went wrong");
      onHide(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <Field
              type="text"
              name="taskName"
              placeholder="Task Name"
              style={styles.input}
            />
            <ErrorMessage
              name="taskName"
              component="div"
              style={{ color: "red", marginTop: "5px" }}
            />
            <button type="submit" disabled={isSubmitting} style={styles.button}>
              {selectedTask?.id ? "Update" : "Create"} Task
            </button>
            {error && <p style={styles.error}>{error}</p>}

          </Form>
        )}
      </Formik>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  input: {
    margin: "5px",
    padding: "8px",
  },
  form: {
    marginTop: "20px",
  },
  error: {
    color: "red",
  },
};

export default TaskPage;
