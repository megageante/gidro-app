// netlify/functions/stripe-webhook.js
//
// Receives events from Stripe and updates the matching user's
// is_premium flag in Supabase.
//
// Required environment variables (set these in Netlify:
// Site settings -> Environment variables):
//   STRIPE_SECRET_KEY        - from Stripe Dashboard > Developers > API keys
//   STRIPE_WEBHOOK_SECRET    - from Stripe Dashboard > Developers > Webhooks
//                              (created after you add this endpoint's URL there)
//   SUPABASE_URL             - your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY- Supabase Project Settings > API > service_role key
//                              (NEVER put this in the frontend code)

const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        const userId = session.client_reference_id;
        const customerId = session.customer;

        if (!userId) {
          console.warn('checkout.session.completed with no client_reference_id — cannot match a user');
          break;
        }

        const { error } = await supabase
          .from('profiles')
          .update({
            is_premium: true,
            stripe_customer_id: customerId,
          })
          .eq('id', userId);

        if (error) console.error('Failed to set is_premium true:', error);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;
        const customerId = subscription.customer;

        const { error } = await supabase
          .from('profiles')
          .update({ is_premium: false })
          .eq('stripe_customer_id', customerId);

        if (error) console.error('Failed to set is_premium false:', error);
        break;
      }

      default:
        // Other event types are ignored
        break;
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error('Error handling webhook event:', err);
    return { statusCode: 500, body: 'Internal error' };
  }
};
