/* eslint-disable */
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51HlyQvGkugAs5EX35Teloi36MGc7ematvNyZ4azQ2pz3mNbJbtisFZNUmLF2GcC64xiCvizsVanDzFM2IEeV9PkW00sUhpaDEV'
);

export const payForTour = async (tourId, people) => {
  try {
    const session = await axios({
      method: 'GET',
      url: `/api/orders/checkout-session/${tourId}/${people}`
    });
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
  }
};
