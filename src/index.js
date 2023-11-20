const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const shopifyStore = process.env.SHOPIFY_STORE;

app.get('/test-api', async (req, res) => {
  try {
    const apiEndpoint = '/admin/api/2023-10/products.json';
    const apiUrl = `https://${shopifyStore}.myshopify.com${apiEndpoint}`;

    const response = await axios.get(apiUrl, {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Shopify API Error:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Shopify API');
      res.status(500).json({ error: 'No response received from Shopify API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the Shopify API request:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.post('/webhooks/orders/create', (req, res) => {
  console.log('🎉 We got an order!')
  res.sendStatus(200)
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
