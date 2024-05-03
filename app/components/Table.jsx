// Table.jsx
"use client";
import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import SearchForm from "./SearchForm";
import csvDownload from "json-to-csv-export";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";

let isLoaded = false;
const Table = () => {
  const [profiles, setProfiles] = useState([]);
  const [offestList, setOffsetList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("Name");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  const pageSize = 2;
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;

  useEffect(() => {
    if (isLoaded) return;
    isLoaded = true
    fetchData();
  }, [])

  function fetchData(offset, isNext = true, filterByFormula) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const offsetParam = offset ? `&offset=${offset}` : '';
    const formula = filterByFormula ? `&filterByFormula=${filterByFormula}` : '';

    setIsLoading(true);

    axios.get(`${url}?pageSize=${pageSize}&view=Grid+view${offsetParam}${formula}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    }).then(res => {
      if (!res?.data?.records) return;

      const fieldsArray = res?.data?.records.map((record) => ({
        id: record.id,
        fields: record.fields,
      }));

      if (isNext) {
        setOffsetList(prev => ([res?.data?.offset, ...prev]))
      }
      setProfiles(fieldsArray);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const handlePrevPage = (newPage) => {
    setCurrentPage(newPage);
    fetchData(offestList?.[2], false);
    setOffsetList(offestList.slice(1))
  };
  const handleNextPage = (newPage) => {
    setCurrentPage(newPage);
    fetchData(offestList?.[0], true);
  };



  const handleSearchTextChange = (e) => {
    const newText = e.target.value; // Trim whitespace from the input

    setSearchText(newText);

    // // Trigger search if the input is not empty; otherwise, fetch all data
    // if (typeof onSearch === "function" && newText !== "") {
    //   onSearch({ searchText: newText, searchCategory });
    // } else {
    //   // If the input is empty, fetch all data
    //   fetchData(undefined, undefined, debouncedSearch);
    //   return;
    // }
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const debounceSearch = useDebounce(searchText);

  useEffect(() => {
    let formula;

    if (debounceSearch && searchCategory) {
      formula = `SEARCH('${debounceSearch}', {${searchCategory}})`;
    }

    fetchData(undefined, undefined, formula)
  }, [
    debounceSearch, searchCategory
  ])

  const handleSearch = ({ searchText, searchCategory }) => {
    // const filteredProfiles = profiles.filter((profile) => {
    //   const fieldValue = profile.fields[searchCategory]
    //     ?.toString()
    //     .toLowerCase();
    //   const lowercaseSearchText = searchText.toLowerCase();

    //   if (searchCategory === "Any") {
    //     return Object.values(profile.fields).some((field) =>
    //       field?.toString().toLowerCase().includes(lowercaseSearchText)
    //     );
    //   }

    //   return fieldValue && fieldValue.includes(lowercaseSearchText);
    // });

    // setProfiles(filteredProfiles);
  };

  const downloadAsCSV = () => {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    }).then(res => {
      if (!res?.data?.records) return;

      const fieldsArray = res?.data?.records.map((record) => ({
        id: record.id,
        fields: record.fields,
      }));

      const ipAddressesData = fieldsArray?.map((el) => ({
        date: el.fields.date ?? "",
        active_year: el.fields.active_year ?? "",
        cases: el.fields.cases ?? "",
        client: el.fields.client ?? "",
        client_id: el.fields.client_id ?? "",
        executing_agency: el.fields.executing_agency ?? "",
        executing_unit: el.fields.executing_unit ?? "",
        execution_type: el.fields.execution_type ?? "",
        identity: el.fields.identity ?? "",
        location: el.fields.location ?? "",
        main_agency: el.fields.main_agency ?? "",
        name: el.fields.name ?? "",
        official_id: el.fields.official_id ?? "",
        position: el.fields.position ?? "",
        role: el.fields.role ?? "",
        source: el.fields.source ?? "",
        description: el.fields.description ?? "",
      }));
      const dataToConvert = {
        data: ipAddressesData,
        filename: "profiles",
        delimiter: ",",
        headers: [
          "date",
          "active_year",
          "cases",
          "client",
          "client_id",
          "executing_agency",
          "executing_unit",
          "execution_type",
          "identity",
          "location",
          "main_agency",
          "name",
          "official_id",
          "position",
          "role",
          "source",
          "description",
        ],
      };

      csvDownload(dataToConvert);

    })
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
        <div className="table-wrapper">
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
              {!isLoading && profiles?.map((profile, index) => (
                <tr key={index}>
                  <td>
                    <svg
                      width="64"
                      height="67"
                      viewBox="0 0 64 67"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.261963"
                        y="0.391357"
                        width="62.8132"
                        height="66.007"
                        fill="#D9D9D9"
                      />
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

          {isLoading && (
            <div className="table-loader">
              <svg fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex pd-container">
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePrevPage(currentPage - 1)}
            >
              <svg
                width="24"
                height="8"
                viewBox="0 0 24 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.646446 3.64644C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976309 4.7308 0.659727 4.53553 0.464464C4.34027 0.269202 4.02369 0.269202 3.82843 0.464464L0.646446 3.64644ZM24 3.5L1 3.5L1 4.5L24 4.5L24 3.5Z"
                  fill="#F8F0EB"
                />
              </svg>
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={() => handleNextPage(currentPage + 1)}>
              <svg
                width="24"
                height="8"
                viewBox="0 0 24 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3536 4.35355C23.5488 4.15829 23.5488 3.84171 23.3536 3.64645L20.1716 0.464466C19.9763 0.269204 19.6597 0.269204 19.4645 0.464466C19.2692 0.659728 19.2692 0.976311 19.4645 1.17157L22.2929 4L19.4645 6.82843C19.2692 7.02369 19.2692 7.34027 19.4645 7.53553C19.6597 7.7308 19.9763 7.7308 20.1716 7.53553L23.3536 4.35355ZM0 4.5L23 4.5V3.5L0 3.5L0 4.5Z"
                  fill="#DCB322"
                />
              </svg>
            </button>
          </div>
          <div>
            <button onClick={downloadAsCSV} className="btn btn_container">
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
