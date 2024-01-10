 

import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/DoctorListStyles.css'; // Import the DoctorListStyles.css file for styling
import { faUserMd, faUserCircle, faClock, faDollarSign, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import doc from "../assets/doc1.jpg"

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="doctor-card" onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
      <div className="doctor-header">
        <FontAwesomeIcon icon={faUserMd} className="icon" />
        <span className="doctor-name">Dr. {doctor.firstName} {doctor.lastName}</span>
      </div>
      <div className="container">
      <div className="doctor-details">
        <div className="detail-item">
          <FontAwesomeIcon icon={faStethoscope} className="detail-icon" />
          <span className="detail-label">{doctor.specialization} </span> 
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faClock} className="detail-icon" />
          <span className="detail-label">{doctor.experience} years of Experience</span> 
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faDollarSign} className="detail-icon" />
          <span className="detail-label">Rs.{doctor.feesPerConsultation} per Consultation</span> 
        </div>
      </div>
      <div className="profile-image">
        {/* <FontAwesomeIcon icon={faUserCircle} className="profile-icon" /> */}
        <img src={doc} alt={`Dr. ${doctor.firstName} ${doctor.lastName}`} className="profile-image" />
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
