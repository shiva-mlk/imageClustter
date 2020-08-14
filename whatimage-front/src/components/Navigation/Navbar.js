import React from 'react';
import {  Navbar,Nav } from 'react-bootstrap';

const MyNavbar = () => {
    return (  
        
        <Navbar bg="dark" variant="dark" className='mb-3'>
            <Navbar.Brand href="#home">whatImage</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/list">ImageList</Nav.Link>
            
            </Nav>
    </Navbar>
    );
}
 
export default MyNavbar;