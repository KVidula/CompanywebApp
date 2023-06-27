import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AllCompanies() {
   const [allcompanies,setAllcompanies] = useState([]);
   const [cid,setCid] = useState("");
   const [companyName,setCompanyName] = useState("");
   const [location,setLocation] = useState("");

   const [showmodal, setShowmodal] = useState(false);
   const handleClosemodal = () => setShowmodal(false);
   const handleShowmodal = (id,compName,location) => {
     setCid(id);
     setCompanyName(compName);
     setLocation(location);
     setShowmodal(true);
  }

   //get all Companies
  const getAllCompanies = async() => {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    if (response.status === 200){
      setAllcompanies(response.data.Companies);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'some error occured while getting records!'
      })
    }
  } 

  useEffect(()=>{
    getAllCompanies();
  }, []);

   //delete company
   const deleteCompany = async (companyId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletecompany/${companyId}`);
    if(response.status === 200){
       getAllCompanies();
    }
   }

 
   //edit company
   const editCompany = async(id) => {
    const request = { companyName, location };
    if( !companyName || !location ){
      Swal.fire({
        icon: 'error',
        title: 'one or more mandatory fields are empty!'
      })
    }else{
    const response = await axios.put(`${API_BASE_URL}/editcompany/${id}`, request);
    if(response.status === 200){
      setShowmodal(false);
      getAllCompanies();
      Swal.fire({
        icon: 'success',
        title: 'Company updated successfully!'
      })
    }
    }
 }



  return (
    <div className='container p-4 listcontainer'>
        <h2 className="text-center py-2">List of Companies</h2>
      <table className="table">
        <thead>
          <tr className="fs-5">
            <th scope="col">#</th>
            <th scope="col">Company Id:</th>
            <th scope="col">Company Name</th>
            <th scope="col">Location</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {allcompanies.map((currElem,index)=>{
          return(
            <tr>
                <td>{index + 1}</td>
                <td>{currElem._id}</td>
                <td>{currElem.companyName}</td>
                <td>{currElem.location}</td>
                <td><button onClick={()=>handleShowmodal(currElem._id,currElem.companyName,currElem.location)} className='btn btn-primary'>Update</button></td>
                <td><button onClick={()=>deleteCompany(currElem._id)} className='btn btn-primary'>Delete</button></td>
            </tr>
          )
          })
          }
        </tbody>

      </table>


      {/* modal for edit profile */}
      <Modal show={showmodal} onHide={handleClosemodal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label>Company Name</label>  
              <input className='form-control mb-2' type="text" value={companyName} onChange={(ev)=>setCompanyName(ev.target.value)}/>
              <label>Location</label> 
              <input className='form-control mb-2' type="text" value={location} onChange={(ev)=>setLocation(ev.target.value)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosemodal}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>editCompany(cid)}>
              Edit
            </Button>
          </Modal.Footer>
      </Modal>

    </div>
  )
}

export default AllCompanies;