// app/api/airtableData.js
import Airtable from 'airtable';

export default async function handler(req, res) {
    console.log('API route accessed');

  try {
    const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const table = 'profiles';

    Airtable.configure({ apiKey });

    const base = Airtable.base(baseId);
    const records = await base(table).select({}).firstPage();

    res.status(200).json({
      records: records.map((record) => ({
        id: record.id,
        // Add other fields you want to use in the component
      })),
    });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
