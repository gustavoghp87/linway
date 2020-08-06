import React, { useState } from 'react';
import {Navbar, Form, FormControl, Nav, Button, NavDropdown} from 'react-bootstrap';
//import RightMenu from './Sections/RightMenu';
//import { useSelector } from "react-redux";


function NavBar(props:any) {

  console.log(props)

  // const [visible, setVisible] = useState(false)

  // const showDrawer = () => {
  //   setVisible(true)
  // };

  // const onClose = () => {
  //   setVisible(false)
  // };

  // const user = useSelector(state => state.user)

  // try {
  //   if (window.screen.width<767) {
  //   }
  // } catch(e) {}


  return (

    <div>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Navbar.Brand href="/">&nbsp; INICIO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/otro">&nbsp; &nbsp;Opción 1&nbsp; &nbsp;</Nav.Link>
            <Nav.Link href="#pricing">&nbsp; &nbsp;Opción 2&nbsp; &nbsp;</Nav.Link>
            <NavDropdown title="&nbsp; &nbsp;Editar&nbsp; &nbsp;" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Productos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Repartos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Form inline>
              <FormControl type="text" placeholder="Buscar..." className="mr-sm-2" />
              <Button variant="outline-info">Buscar</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


export default NavBar
