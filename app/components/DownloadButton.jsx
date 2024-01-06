import React from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const DownloadButton = ({ filterCriteria }) => {
  const handleDownload = async () => {
    try {
      // Set up Airtable API key, base ID, and table name
      const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
      const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
      const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;

      // Construct Airtable API endpoint URL with filterByFormula
      const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterCriteria)}`;

      // Make the API request
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      // Convert data to CSV using Papa Parse
      const csvData = Papa.unparse(response.data.records);

      // Create a Blob and initiate download
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'filtered_data.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading data:', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download CSV</button>
  );
};

export default DownloadButton;
