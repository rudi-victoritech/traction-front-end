import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import Axios from "axios";

export default function AddTaskModal({ show, handleClose }) {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState();

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity()) {
      const res = await Axios.post(`http://localhost:3030/api/tasks`, {
        title,
        dueDate,
      });
      setTitle();
      setDueDate();
      handleClose(res.data);
    }
  };
  const onHandleDueDateChanged = (dueDate) => {
    const dt = new Date(dueDate);
    setDueDate(dt);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add a task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title*</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Due date</Form.Label>
            <Form.Group>
              <DateTimePicker
                format="dd-MM-y HH:mm:ss"
                onChange={onHandleDueDateChanged}
                value={dueDate}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted">* Required</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
