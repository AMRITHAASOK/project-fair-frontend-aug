import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from '../assets/WWW-Website-PNG-Photos (1).png'
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../services/baseUrl';

function ProjectCard({project}) {
  console.log(project);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div> 
    <Card onClick={handleShow} style={{ width: '18rem' }} className='mb-5'>
    <Card.Img variant="top" src={project?`${baseUrl}/uploads/${project.projectImage}`:"empty image"} />
    <Card.Body>
      <Card.Title className='text-center'>{project?.title}</Card.Title>
    </Card.Body>
  </Card>
  


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <img src={project?`${baseUrl}/uploads/${project.projectImage}`:"empty image"} width={'100%'} alt="" />
                </Col>
                <Col>
                <h3>{project?.title}</h3>
                <p> <span><b>Project Overview</b></span> {project?.overview}</p>
                <p>Technology Used : <span><b>{project?.language}</b></span></p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly'>
          <a href={project?.github} variant="secondary text-dark" onClick={handleClose}>
          <i class="fa-brands fa-github  text-white fs-2 fa-beat-fade"></i>
          </a>
          <a href={project?.link} variant="primary" onClick={handleClose}>
          <i class="fa-solid fa-link text-white fs-2 fa-fade"></i>
          </a>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default ProjectCard