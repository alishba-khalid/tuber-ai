# Walkthrough — Stripe Payment & Credit Integration

We have successfully integrated Stripe Billing into the TuberAI application, connecting checkout routes with user credits allocation inside Cloud Firestore.

---

## 🛠️ Changes Implemented

### 1. Environment Configurations ([`.env.local`](file:///c:/Users/Alishba/Desktop/tuber/.env.local))
* Configured Stripe environment variables with clear instructions:
  * `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  * `STRIPE_SECRET_KEY`
  * `STRIPE_WEBHOOK_SECRET`

### 2. Stripe API Checkout Route ([`app/api/checkout/route.ts`](file:///c:/Users/Alishba/Desktop/tuber/app/api/checkout/route.ts))
* Handles checkout sessions for credit plans (*Starter, Plus, Creator, Studio, Pro*).
* Attaches the Firebase `userId` to `client_reference_id` so the webhook knows whom to credit.

### 3. Stripe Webhook Listener ([`app/api/webhooks/stripe/route.ts`](file:///c:/Users/Alishba/Desktop/tuber/app/api/webhooks/stripe/route.ts))
* Verifies checkout signatures securely.
* Listens for `checkout.session.completed` events.
* Initiates a Firestore transaction to safely increment the user's `credits` balance.

---

## 🧪 Local Testing Instructions

To test the integration locally, follow this guide:

1. **Stripe Test Keys**:
   * Navigate to the **[Stripe API Keys Dashboard](https://dashboard.stripe.com/test/apikeys)**.
   * Copy your **Publishable Key** and **Secret Key**, and paste them into [`.env.local`](file:///c:/Users/Alishba/Desktop/tuber/.env.local).

2. **Run Stripe CLI Webhook Forwarding**:
   * Open your terminal and start webhook listening to forward events to your local server:
     ```bash
     stripe listen --forward-to localhost:3000/api/webhooks/stripe
     ```
   * Copy the **Webhook Signing Secret** (`whsec_...`) printed in the console and save it as `STRIPE_WEBHOOK_SECRET` in [`.env.local`](file:///c:/Users/Alishba/Desktop/tuber/.env.local).

3. **Trigger Webhook Checkout Event**:
   * While your local Next.js dev server is running, trigger a mock purchase event:
     ```bash
     stripe trigger checkout.session.completed
     ```

4. **Verify Firestore Credits**:
   * Visit your **[Cloud Firestore Console](https://console.firebase.google.com/project/tuber-ai-f12aa/firestore)**.
   * Confirm the matching user document's `credits` field has successfully incremented.
