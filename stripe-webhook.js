// netlify/functions/stripe-webhook.js
//
// Receives events from Stripe and updates the matching user's membership in Supabase.
// Memberships are stored as tags in profiles.completed: "plan:school" or "plan:everyday".
// is_premium stays true while the user has at least one membership.
//
// Environment variables (Netlify: Site configuration -> Environment variables):
//   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Stripe payment links -> membership
const LINK_PLAN = {
  plink_1UZc75It7XY0JbumqUSmp3kN: 'school',   // Gidro School $7.99 / month
  plink_1UZc77It7XY0JbumuGIQPAhB: 'school',   // Gidro School $59.99 / year
  plink_1UZc79It7XY0JbumAbDOQfuF: 'everyday', // Gidro Everyday $4.99 / month
  plink_1UZc7BIt7XY0Jbumaqucj4j6: 'everyday', // Gidro Everyday $39.99 / year
};

async function getProfile(match) {
  const q = supabase.from('profiles').select('id, completed, is_premium');
  const { data, error } = match.id ? await q.eq('id', match.id).maybeSingle() : await q.eq('stripe_customer_id', match.customer).maybeSingle();
  if (error) console.error('profile lookup failed', error);
  return data;
}

async function setPlans(profile, tags, extra) {
  const hasPlan = tags.some(t => typeof t === 'string' && t.startsWith('plan:'));
  const { error } = await supabase.from('profiles')
    .update(Object.assign({ completed: tags, is_premium: hasPlan }, extra || {}))
    .eq('id', profile.id);
  if (error) console.error('profile update failed', error);
}

exports.handler = async (event) => {
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, event.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      const userId = session.client_reference_id;
      if (!userId) { console.warn('No client_reference_id, cannot match a user'); return ok(); }
      let plan = LINK_PLAN[session.payment_link] || (session.metadata && session.metadata.plan);
      if (!plan && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription);
        plan = sub.metadata && sub.metadata.plan;
      }
      plan = plan || 'school';
      const profile = await getProfile({ id: userId });
      if (!profile) { console.warn('No profile for', userId); return ok(); }
      const tags = Array.isArray(profile.completed) ? profile.completed.slice() : [];
      if (!tags.includes('plan:' + plan)) tags.push('plan:' + plan);
      await setPlans(profile, tags, { stripe_customer_id: session.customer });
    }

    if (stripeEvent.type === 'customer.subscription.deleted') {
      const sub = stripeEvent.data.object;
      const profile = await getProfile({ customer: sub.customer });
      if (!profile) return ok();
      const plan = sub.metadata && sub.metadata.plan;
      let tags = Array.isArray(profile.completed) ? profile.completed.slice() : [];
      tags = plan ? tags.filter(t => t !== 'plan:' + plan) : tags.filter(t => !String(t).startsWith('plan:'));
      await setPlans(profile, tags);
    }
    return ok();
  } catch (err) {
    console.error('Error handling webhook event:', err);
    return { statusCode: 500, body: 'Internal error' };
  }
};

function ok() { return { statusCode: 200, body: JSON.stringify({ received: true }) }; }
