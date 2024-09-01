import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BranchPage.css";

const BranchPage = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`https://bankbackend-2.onrender.com/services/${id}`)
      .then((response) => {
        const servicesData = response.data;
        setServices(servicesData);
        if (servicesData.length > 0) {
          // Set branch details from the first service
          setBranch(servicesData[0].branch);
        }
      })
      .catch((error) => {
        console.error("Error fetching services data:", error);
      });
  }, [id]);

  return (
    <div className="branch-page">
      {branch && (
        <div className="branch-details">
          <h1>{branch.name}</h1>
          <p>
            <strong>Address:</strong> {branch.address}
          </p>
          <p>
            <strong>City:</strong> {branch.city}
          </p>
          <p>
            <strong>State:</strong> {branch.state}
          </p>
          <p>
            <strong>Phone Number:</strong> {branch.phoneNumber}
          </p>
        </div>
      )}
      <div className="services-table-container">
        <h2>Services Offered</h2>
        <table>
          <thead>
            <tr>
              <th>Service No.</th> {/* New column for Serial Number */}
              <th>Service ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id}>
                <td>{index + 1}</td> {/* Serial Number */}
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.availability ? "Available" : "Not Available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchPage;
