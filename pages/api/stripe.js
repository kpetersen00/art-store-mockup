const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
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
          const img = images[0].asset._ref;
          const newImg = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/c2ld0k9u/production/'
            )
            .replace('-jpg', '.jpg');
          return {
            price_data: {
              currency: 'USD',
              product_data: {
                name: title,
                images: [newImg],
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
