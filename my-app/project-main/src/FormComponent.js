import React from 'react';
import './FormStyle.css';

function FormComponent() {
  return (
    <div className="container my-5 form-container">
      <h2>Fill your details</h2>
      <form>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Name:</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              required 
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">College Name:</label>
            <input 
              type="text" 
              className="form-control" 
              name="collegeName" 
              required 
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Email:</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              required 
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label className="form-label">Roll No:</label>
            <input 
              type="text" 
              className="form-control" 
              name="rollNumber" 
              required 
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Phone No:</label>
            <input 
              type="tel" 
              className="form-control" 
              name="phoneNumber"  
              required 
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default FormComponent;
