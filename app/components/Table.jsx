// Table.jsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Table = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('/api/airtable');

        const response = await fetch('/dummy.csv');
        const text = await response.text();
        const rows = text.split('\n');
        const header = rows[0].split(',');

        const parsedData = rows.slice(1).map(row => {
          const values = row.split(',');
          return header.reduce((acc, header, index) => {
            acc[header] = values[index];
            return acc;
          }, {});
        });

        setRecords(parsedData);
      } catch (error) {
        console.error('Error fetching data from Airtable:', error);
      }
    };

    fetchData();
  }, []);

  console.log(records);
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
                <a href="/profile/kamal">{record.name}<span>{record.position}</span></a>
              </td>
              <td>{record.main_agency}</td>
              <td>{record.executing_unit}</td>
              <td>{record.cases}</td>
              <td>{record.execution_type}</td>
              <td>{record.active_year}</td>
              <td>{record.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
