// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OVLc2HjxnpOvxRWloVMVMl51YhvSNRZjsXiTjNcWd7MHqSCh3asFefSuSQF4p5xELK40SqfAzDgG0diyzq9cZZ200idfwEFl0');

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Routes
app.post('/payments/create', async (req, res) => {
  try {
    const { total } = req.query;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
