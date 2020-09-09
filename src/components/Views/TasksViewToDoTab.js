import React from "react";
import { Row, ListGroup, Col, Badge } from "react-bootstrap";
import { CheckCircleFill, Circle, XCircleFill } from "react-bootstrap-icons";
import Moment from "react-moment";
import moment from "moment";
import Axios from "axios";

const yellows = ["#d1ff02", "#ccff00", "#dfff4f", "#abfe01"];
export default function TasksViewToDoTab({ tasks, setTasks }) {
  const actionTask = async (task, index) => {
    if (task.completedDate) {
      task.completedDate = null;
    } else {
      task.completedDate = new Date();
    }

    await Axios.put(`http://localhost:3030/api/tasks/${task._id}`, task);
    tasks[index] = task;
    setTasks([...tasks]);
  };
  const removeTask = async (index) => {
    // alert are you sure?
    await Axios.delete(`http://localhost:3030/api/tasks/${tasks[index]._id}`);
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };
  return (
    <>
      <Row>
        <ListGroup variant="flush" className="flex-fill">
          {tasks.map((t, i) => (
            <ListGroup.Item key={t.id}>
              <Row className="align-items-center">
                <Col
                  md="1"
                  className="d-flex justify-content-center"
                  onClick={() => actionTask(t, i)}
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
                      {!t.completedDate ? (
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
                      ) : (
                        <Badge
                          variant="outline-success"
                          className="text-uppercase h6"
                        >
                          Completed <Moment fromNow>{t.completedDate}</Moment>
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col
                  md="1"
                  className="d-flex justify-content-center"
                  onClick={() => {
                    removeTask(i);
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
    </>
  );
}
