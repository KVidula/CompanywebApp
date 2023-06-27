import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import './Style.css';

function AddCompany() {
    const [company,setCompany] = useState("");
    const [location,setLocation] = useState("");
    const [loading,setLoading] = useState(false);

    //function for addCompany 
  const addCompany = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = {company,location};
    axios.post(`${API_BASE_URL}/addcompany`, requestData)
    .then((result)=>{
      if(result.status === 201){
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Company Added Successfully!"
        })
      }
      setCompany('');
      setLocation('');
    })
    .catch((error)=>{
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Some error occured please try again later!"
      })
    })
  };

  return (
    <div className='container shadow p-4 formcontainer'>

        {/*spinner is loading if loading is true*/}  
        { loading ? <div className='col-md-12 mt-3 text-center'>
              <div class="spinner-border text-primary" role="status">
                 <span class="visually-hidden">Loading...</span>
              </div>
        </div> : '' } 

        <h2 className='text-center py-2'>ADD COMPANY</h2>
          <form className='mx-2' onSubmit={(e)=>addCompany(e)}>
            <div className="mb-3">
                <label className="form-label text-muted fs-5">Company Name</label>
                <input value={company} onChange={(ev)=>setCompany(ev.target.value)} type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
                <label className="form-label text-muted fs-5">Location</label>
                <input value={location} onChange={(ev)=>setLocation(ev.target.value)} type="text" className="form-control" required/>
            </div>
            <div className="d-grid">
               <button type="submit" className="btn btn-primary fs-5">Submit</button>
            </div>
          </form>

    </div>
  )
}

export default AddCompany;