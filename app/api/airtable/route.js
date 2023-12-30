// app/api/airtableData.js
import Airtable, { FieldSet, Records } from 'airtable';
import { NextResponse } from "next/server";

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    // const table = 'profiles';

    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: apiKey
  });
    



export async function GET(req) {
  const base = Airtable.base(baseId);
  const table = await base('profiles').select({
    maxRecords: 10,
    view: "Grid view"
  });

  const profiles = [];

  try {
    await table.eachPage((records, processNextPage) => {
      records.forEach(({ fields, id }) => {
        profiles.push({
          id,
         name
        })
      });
      processNextPage();
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 403
    });
  }

  return NextResponse.json(profiles);
}
