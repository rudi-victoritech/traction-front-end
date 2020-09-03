import React, { useState } from "react";
import { Container, Row, ListGroup, Badge, Col } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";
import { Circle, CheckCircleFill } from "react-bootstrap-icons";

const yellows = ["#d1ff02", "#ccff00", "#dfff4f", "#abfe01"];

export default function TasksView() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "First Task",
      dueDate: moment().subtract(1, "days").toISOString(),
      completedDate: moment().subtract(2, "days").toISOString(),
      listDate: moment().subtract(3, "days").toISOString(),
      createdDate: moment().subtract(4, "days").toISOString(),
    },
    {
      id: 2,
      title: "Second Task",
      dueDate: moment().toISOString(),
      completedDate: null,
      listDate: moment().subtract(1, "days").toISOString(),
      createdDate: moment().subtract(2, "days").toISOString(),
    },
    {
      id: 3,
      title: "Third Task",
      dueDate: moment().add(1, "days").toISOString(),
      completedDate: null,
      listDate: moment().subtract(1, "days").toISOString(),
      createdDate: moment().subtract(2, "days").toISOString(),
    },
  ]);
  const actionTask = (task, index) => {
    if (task.completedDate) {
      task.completedDate = null;
    } else {
      task.completedDate = moment().toISOString();
    }
    tasks[index] = task;
    setTasks([...tasks]);
  };
  return (
    <Container className="mt-5" fluid>
      <Row>
        <ListGroup variant="flush" style={{ flex: 1 }}>
          {tasks.map((t, i) => (
            <ListGroup.Item key={t.id} onClick={() => actionTask(t, i)}>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Col md="1">
                  {t.completedDate ? (
                    <Circle size={50} color={yellows[3]}></Circle>
                  ) : (
                    <CheckCircleFill
                      size={50}
                      color={yellows[3]}
                    ></CheckCircleFill>
                  )}
                </Col>
                <Col md="11">
                  <Row>
                    <Col>
                      <h4>{t.title}</h4>
                    </Col>
                  </Row>
                  {t.completedDate && (
                    <Row>
                      <Col>
                        <h5>
                          <Badge
                            variant={
                              moment(t.dueDate).isSame(moment(), "day")
                                ? "warning"
                                : "danger"
                            }
                          >
                            Due <Moment fromNow>{t.dueDate}</Moment>
                          </Badge>
                        </h5>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
}
