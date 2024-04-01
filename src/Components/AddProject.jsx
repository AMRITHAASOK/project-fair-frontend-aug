import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import img from "../assets/WWW-Website-PNG-Photos (1).png";
import { addProjectAPI } from "../services/allAPIs";
import { addProjectContextResponse } from "../ContextAPI/ContextShare";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProject() {

  const { addProjectRes, setAddProjectRes } = useContext(addProjectContextResponse);

  //to hold token from sessionStorage
  const [token, setToken] = useState("");
  //to get token from sessionStorage
  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //to hold project details from the form
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    link: "",
    overview: "",
    projectImage: "",
  });
  //to hold image file data converted into url
  const [preview, setPreview] = useState("");
  console.log(preview);

  //img file url converted
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  console.log(projectDetails);

  const projectAdd = async () => {
    
    const { title, language, github, link, overview, projectImage } =
      projectDetails;
    if (!title || !language || !github || !link || !overview || !projectImage) {
      alert("Please fill the form");
    } else {
      //api call
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("link", link);
      reqBody.append("overview", overview);
      reqBody.append("projectImage", projectImage);

      // let reqHeader
      
      const  reqHeader = {
          "Content-Type": "multipart/form-data",//It indicates the req containes a image file
          "Authorization": `Bearer ${token}`//To send token from client side to server side
        };
      

      //api call
      const result = await addProjectAPI(reqBody,reqHeader);
      console.log(result);
      if (result.status === 200) {
        toast.success("Project added successfully...");
        // alert("Project added successfully...")
        setAddProjectRes(result.data)//contextAPI state value assigned 
       console.log(result.data); 
        handleClose()//to close the modal window 

        setProjectDetails({ //after adding project details, we need to set empty object to the state
          title:"",language:"",github:"",link:"",overview:"",projectImage:""
        })

        setPreview("")//img empty

      } else {
        console.log(result.response.data);
      }
    }
  };

  return (
    <div>
      <button onClick={handleShow} className="btn btn-success">
        Add project
      </button>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-evenly">
            <label>
              <input
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    projectImage: e.target.files[0],
                  })
                }
                type="file"
                style={{ display: "none" }}
              />
              <img
                width={"350px"}
                height={"300px"}
                src={preview ? preview : img}
              />
            </label>
            <div>
              <input
                value={projectDetails.title}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    title: e.target.value,
                  })
                }
                type="text"
                placeholder="Project Title"
                className="form-control mb-3"
              />
              <input
                value={projectDetails.language}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    language: e.target.value,
                  })
                }
                type="text"
                placeholder="Language Used"
                className="form-control mb-3"
              />
              <input
                value={projectDetails.github}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    github: e.target.value,
                  })
                }
                type="text"
                placeholder="Github Link"
                className="form-control mb-3"
              />
              <input
                value={projectDetails.link}
                onChange={(e) =>
                  setProjectDetails({ ...projectDetails, link: e.target.value })
                }
                type="text"
                placeholder="Website Link"
                className="form-control mb-3"
              />
              <input
                value={projectDetails.overview}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    overview: e.target.value,
                  })
                }
                type="text"
                placeholder="Project Overview"
                className="form-control mb-3"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={projectAdd} variant="secondary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default AddProject;
