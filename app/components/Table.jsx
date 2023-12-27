// Table.jsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Table = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/airtable');
        setRecords(response.data.records);
      } catch (error) {
        console.error('Error fetching data from Airtable:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Main Agency</th>
            <th>Executing Agency</th>
            <th>Number of Cases</th>
            <th>Execution Type</th>
            <th>Years</th>
            <th>Locations</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>
                <svg width="64" height="67" viewBox="0 0 64 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.261963" y="0.391357" width="62.8132" height="66.007" fill="#D9D9D9" />
                </svg>
              </td>
              <td>
                <a href="/profile/kamal">{record.name}<span>Designer</span></a>
              </td>
              <td>ABC Studio</td>
              <td>RGB 12, RGB 23</td>
              <td>123</td>
              <td>CaRD, WEBSITE</td>
              <td>2020, 2021</td>
              <td>DHAKA, COXS BAZAR, BANDARBAN</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
