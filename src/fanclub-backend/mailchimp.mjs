// mailchimp.mjs
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

app.post('/subscribe', async (req, res) => {
  const { firstName, lastName, email, street, city, state, zip, country, dob, gender } = req.body;



  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
      ADDRESS: {
        addr1: street,
        city: city,
        state: state,
        zip: zip,
        country: country
      },      
      BIRTHYEAR: dob,
      GENDER: gender
    }
  };

  try {
    const response = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    const json = await response.json();
    if (response.status >= 400) {
      console.error('Mailchimp error:', json);
      return res.status(400).json({ error: json.detail || 'Error subscribing' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mailchimp server running on port ${PORT}`));
