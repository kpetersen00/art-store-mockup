const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { urlFor } from '../../lib/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1LygnjDGqqK0OKgHxIEnFD4N' }],
        line_items: req.body.map((item) => {
          const {
            defaultProductVariant: { images, price, title },
          } = item;
          const img = urlFor(images[0]);
          return {
            price_data: {
              currency: 'USD',
              product_data: {
                name: title,
                images: [img],
              },
              unit_amount: price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: 1,
          };
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not Allowed');
  }
}
