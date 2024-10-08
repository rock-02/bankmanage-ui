import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://bankbackend-2.onrender.com/branches/3")
      .then((response) => {
        setBranches(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Static bank details object
  const bank = {
    name: "Nationalized Canara Bank",
    address: "Banglore",
    city: "Bangalore",
    state: "Karnataka",
    phoneNumber: "+91-80-1234-5678",
  };

  return (
    <div className="table-container">
      <div className="bank-details">
        <h1>{bank.name}</h1>
        <p>
          <strong>Address:</strong> {bank.address}
        </p>
        <p>
          <strong>City:</strong> {bank.city}
        </p>
        <p>
          <strong>State:</strong> {bank.state}
        </p>
        <p>
          <strong>Phone Number:</strong> {bank.phoneNumber}
        </p>
      </div>
      <h2>Branch List</h2>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">
            This is a free instance deployed on Render, so it may spin down with
            inactivity, which can delay requests by 50 seconds or more. Please
            wait for a while...
          </p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Phone Number</th>
              <th>Bank Name</th>
              <th>Bank Address</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr
                key={branch.id}
                onClick={() => {
                  navigate(`/branches/${branch.id}`);
                }}
              >
                <td data-label="ID">{branch.id}</td>
                <td data-label="Name">{branch.name}</td>
                <td data-label="Address">{branch.address}</td>
                <td data-label="City">{branch.city}</td>
                <td data-label="State">{branch.state}</td>
                <td data-label="Phone Number">{branch.phoneNumber}</td>
                <td data-label="Bank Name">{branch.bank.name}</td>
                <td data-label="Bank Address">{branch.bank.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePage;
