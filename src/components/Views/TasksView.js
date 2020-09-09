import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Badge } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import AddTaskModal from "./AddTaskModal";
import ConfirmModal from "../ConfirmModal";
import Axios from "axios";
import { CheckCircleFill, Circle, XCircleFill } from "react-bootstrap-icons";
import Moment from "react-moment";
import moment from "moment";

const yellows = ["#d1ff02", "#ccff00", "#dfff4f", "#abfe01"];

export default function TasksView() {
  const [showAddTaskModal, setShowAddTaskModal] = useState();
  const [tasks, setTasks] = useState([]);
  const [taskToRemoveIndex, setTaskToRemoveIndex] = useState(-1);
  const [taskToUpdateIndex, setTaskToUpdateIndex] = useState(-1);

  const getTasks = async () => {
    try {
      const res = await Axios.get("http://localhost:3030/api/tasks");
      setTasks(res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = () => {
    setShowAddTaskModal(true);
  };

  const updateTask = async () => {
    if (tasks[taskToUpdateIndex].completedDate) {
      tasks[taskToUpdateIndex].completedDate = null;
    } else {
      tasks[taskToUpdateIndex].completedDate = new Date();
    }
    await Axios.put(
      `http://localhost:3030/api/tasks/${tasks[taskToUpdateIndex]._id}`,
      tasks[taskToUpdateIndex]
    );
    setTaskToUpdateIndex(-1);
    await getTasks();
  };

  const removeTask = async () => {
    await Axios.delete(
      `http://localhost:3030/api/tasks/${tasks[taskToRemoveIndex]._id}`
    );
    setTaskToRemoveIndex(-1);
    await getTasks();
  };
  const closeNewTaskModal = async (newTask) => {
    setShowAddTaskModal(false);
    if (newTask) {
      await getTasks();
    }
  };
  return (
    <Container className="my-5" fluid="md">
      <AddTaskModal
        key="showAddTask"
        show={showAddTaskModal}
        handleClose={closeNewTaskModal}
      ></AddTaskModal>
      <ConfirmModal
        key="showRemoveTaskConfirm"
        show={taskToRemoveIndex !== -1}
        title="Confirm task removal"
        message="Please confirm that you'd like to remove the task"
        onCancel={() => {
          setTaskToRemoveIndex(-1);
        }}
        onConfirm={removeTask}
      />
      <ConfirmModal
        key="conformToggleCompletion"
        show={taskToUpdateIndex !== -1}
        title="Confirm update"
        message="Please confirm that you'd like to complete/uncomplete the task"
        onCancel={() => {
          setTaskToUpdateIndex(-1);
        }}
        onConfirm={updateTask}
      />
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="my-2">
            Tasks ({tasks.filter((x) => !x.completedDate).length} of{" "}
            {tasks.length} outstanding)
          </h1>
        </Col>
        <Col md="1" className="flex-grow-0">
          <Button variant="link" onClick={addTask}>
            <PlusCircleFill size={30} className="text-primary"></PlusCircleFill>
          </Button>
        </Col>
      </Row>
      <Row>
        <ListGroup variant="flush" className="flex-fill">
          {tasks.map((t, i) => (
            <ListGroup.Item key={t.id}>
              <Row className="align-items-center">
                <Col
                  md="1"
                  className="d-flex justify-content-center"
                  onClick={() => setTaskToUpdateIndex(i)}
                  role="button"
                >
                  {!t.completedDate ? (
                    <Circle size={30} color={yellows[3]}></Circle>
                  ) : (
                    <CheckCircleFill
                      size={30}
                      color={yellows[3]}
                    ></CheckCircleFill>
                  )}
                </Col>
                <Col md="10">
                  <Row className="align-items-center">
                    <Col md>
                      <h4>{t.title}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {!t.completedDate && t.dueDate ? (
                        <Badge
                          variant={
                            moment(t.dueDate).isSameOrAfter(moment(), "day")
                              ? "warning"
                              : "danger"
                          }
                          className="text-uppercase h6"
                        >
                          Due <Moment fromNow>{t.dueDate}</Moment>
                        </Badge>
                      ) : t.completedDate ? (
                        <Badge variant="success" className="text-uppercase h6">
                          Completed <Moment fromNow>{t.completedDate}</Moment>
                        </Badge>
                      ) : (
                        <></>
                        // <Badge variant="info" className="text-uppercase h6">
                        //   Created <Moment fromNow>{t.createdDate}</Moment>
                        // </Badge>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col
                  md="1"
                  className="d-flex justify-content-center"
                  onClick={() => {
                    setTaskToRemoveIndex(i);
                  }}
                  role="button"
                >
                  <XCircleFill size={30}></XCircleFill>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
}
