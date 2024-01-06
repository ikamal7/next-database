// Table.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import SearchForm from './SearchForm';


const Table = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('Any');


  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  const pageSize = 50;
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;

  Airtable.configure({
    apiKey: apiKey
  });

  const base = Airtable.base(baseId);

  const fetchData = async () => {
    try {

      // Fetch the first page of records
      // const records = await base(tableName)
      //   .select({
      //     pageSize: pageSize,
      //     view: 'Grid view'
      //   })
      //   .all();

      // const fieldsArray = records.map(record => ({
      //   id: record.id,
      //   fields: record.fields
      // }));

      // setProfiles(fieldsArray);
      // setTotalPages(Math.ceil(records / pageSize) + 1);


      base(tableName)
        .select({
          pageSize: pageSize,
          view: "Grid view"
        })
        .eachPage(
          (records, fetchNextPage) => {
            const fieldsArray = records.map(record => ({
              id: record.id,
              fields: record.fields
            }));
            setProfiles(fieldsArray);
            // Use the offset from the last page to calculate total pages
            // setTotalPages(Math.ceil(records.length / pageSize) + 1);

            fetchNextPage();
          },
          (error) => {
            if (error) {
              console.error('Error fetching data from Airtable:', error);
            }
          }
        );

    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
    }
  };

  useEffect(() => {
    

    fetchData();
  }, []);

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);

    try {
      // const offset = (newPage - 1) * pageSize;

      const { records, offset: newOffset } = await base(tableName)
        .select({

          view: 'Grid view',
          // offset
        })
        .all();

      const fieldsArray = records.map(record => ({
        id: record.id,
        fields: record.fields
      }));

      setProfiles(fieldsArray);
      setTotalPages(Math.ceil(newOffset / pageSize) + 1);
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
    }
  };

  const handleSearchTextChange = (e) => {
    const newText = e.target.value.trim();  // Trim whitespace from the input

    setSearchText(newText);

    // Trigger search if the input is not empty; otherwise, fetch all data
    if (typeof onSearch === 'function' && newText !== '') {
      onSearch({ searchText: newText, searchCategory });
    } else {
      // If the input is empty, fetch all data
      fetchData();
      return;
    }
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleSearch = ({ searchText, searchCategory }) => {

    const filteredProfiles = profiles.filter((profile) => {

      const fieldValue = profile.fields[searchCategory]?.toString().toLowerCase();
      const lowercaseSearchText = searchText.toLowerCase();
  

      if (searchCategory === 'Any') {
        return Object.values(profile.fields).some((field) =>
          field?.toString().toLowerCase().includes(lowercaseSearchText)
        );
      }
  

      return fieldValue && fieldValue.includes(lowercaseSearchText);
    });
  
    setProfiles(filteredProfiles);
  };
    
  
  


  return (
    <>
      <SearchForm
        onSearch={handleSearch}
        searchText={searchText}
        searchCategory={searchCategory}
        onSearchTextChange={handleSearchTextChange}
        onSearchCategoryChange={handleSearchCategoryChange}
      />

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
            {profiles?.map((profile, index) => (
              <tr key={index}>
                <td>
                  <svg width="64" height="67" viewBox="0 0 64 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.261963" y="0.391357" width="62.8132" height="66.007" fill="#D9D9D9" />
                  </svg>
                </td>
                <td>
                  <a href={`/profile/${profile.id}`}>
                    {profile.fields.name}
                    <span>{profile.fields.position}</span>
                  </a>
                </td>
                <td>{profile.fields.main_agency}</td>
                <td>{profile.fields.executing_unit}</td>
                <td>{profile.fields.cases}</td>
                <td>{profile.fields.execution_type}</td>
                <td>{profile.fields.active_year}</td>
                <td>{profile.fields.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex pd-container">


          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.646446 3.64644C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976309 4.7308 0.659727 4.53553 0.464464C4.34027 0.269202 4.02369 0.269202 3.82843 0.464464L0.646446 3.64644ZM24 3.5L1 3.5L1 4.5L24 4.5L24 3.5Z" fill="#F8F0EB" />
              </svg>

            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handlePageChange}
            >
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3536 4.35355C23.5488 4.15829 23.5488 3.84171 23.3536 3.64645L20.1716 0.464466C19.9763 0.269204 19.6597 0.269204 19.4645 0.464466C19.2692 0.659728 19.2692 0.976311 19.4645 1.17157L22.2929 4L19.4645 6.82843C19.2692 7.02369 19.2692 7.34027 19.4645 7.53553C19.6597 7.7308 19.9763 7.7308 20.1716 7.53553L23.3536 4.35355ZM0 4.5L23 4.5V3.5L0 3.5L0 4.5Z" fill="#DCB322" />
              </svg>

            </button>
          </div>
          <div>
            {/* <a href="#">Download</a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
