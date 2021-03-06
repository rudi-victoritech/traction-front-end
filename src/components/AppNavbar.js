import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ color: "#fff" }}>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#abfe01",
          }}
          className="pr-5"
        >
          Traction
        </Navbar.Brand>
        <Navbar.Toggle />
        {
          // <Nav className="mr-auto">
          // <Nav.Link as={Link} to="/">
          //   Tasks
          // </Nav.Link>
          // <Nav.Link as={Link} to="/lists">
          //   Lists
          // </Nav.Link>
          // <Nav.Link as={Link} to="/profile">
          //   Profile
          // </Nav.Link>
          // </Nav>
          // <Navbar.Collapse className="justify-content-end">
          //   <Form inline>
          //     <FormControl
          //       type="text"
          //       placeholder="Add a new task..."
          //       className="mr-sm-2"
          //     ></FormControl>
          //     <Button variant="outline-primary">Add</Button>
          //   </Form>
          // </Navbar.Collapse>
        }
      </Navbar>
    </>
  );
}
