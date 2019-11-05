import React from 'react';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';


class NavBar extends React.Component{




    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>IceBox</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className = "ml-auto">
                        {!this.props.isAuthenticated && 
                        <NavItem>
                            <Button onClick = {this.props.onClickSignInButton}>Sign In</Button>
                        </NavItem>}
                        {this.props.isAuthenticated && 
                        <NavItem>
                            <Button onClick = {this.props.onClickSignOutButton}>Sign Out</Button>
                        </NavItem>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default NavBar