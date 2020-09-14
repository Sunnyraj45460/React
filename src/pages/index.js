import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      // console.log(paymentMethod);
      const { id } = paymentMethod;

      // try {
      //   const { data } = await axios.post("http://localhost:4000", { id, amount: 1099 });
      //   console.log(data);
      //   success();
      // } catch (error) {
      //   console.log(error);
      // }
      try {
        fetch("http://localhost:4000", 
        {method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({ id, amount: 1099})
        // body:{ id, amount: 1199}
      })
      // .then(res=>res.json())
      .then(res=>res.text())
      .then(res=>console.log(res))
      // const data=await res.json()
      // console.log(data);
      success();
      }
        catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Price: $10.99 USD</h2>
      <img
        src="https://images.ricardocuisine.com/services/recipes/500x675_7700.jpg"
        style={{ maxWidth: "50px" }}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe("pk_test_51HMSXEHwv4Ai7yZxkFLzmHIJVwsFm4twQZSn9q1mkF7q3rD1oK9Pxil55pp4WlqqbJT4gwSJrXSDx9pob1cWnFLa00nBcjgicv");

const Index = () => {
  const [status, setStatus] = React.useState("ready");

  if (status === "success") {
    return <div>Congrats on your empanadas!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus("success");
        }}
      />
    </Elements>
  );
};

export default Index;