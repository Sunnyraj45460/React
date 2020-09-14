import Stripe from "stripe";
// don't commit your real stripe secret key... use env variables!!
// https://www.leighhalliday.com/secrets-env-vars-nextjs-now
const stripe = new Stripe("sk_test_....");

export default async (req, res) => {
  const { id, amount } = req.body;
  // res.send(JSON.stringify(id))
  // res.writeHead(200,{'Content-Type': 'applicadtion/json'}).send(id)
  // res.setHeader(200,{'Content-Type': 'applicadtion/json'}).send(id)

  // res.send(JSON.stringify("HOLA !!!"))

  // console.log(req.body);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      description: "Delicious empanadas",
      payment_method: id,
      confirm: true
    });
    res.send(payment)
    // console.log('payment');

    return res.status(200).json({
      confirm: "abc123"
    });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
};