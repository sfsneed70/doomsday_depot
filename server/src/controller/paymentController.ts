import { Request, Response } from "express";
import Stripe from "stripe";

export const getConfig = (stripe: Stripe) => async (_req: Request, res: Response) => {
  try {
    const price = await stripe.prices.retrieve(process.env.PRICE || "");
    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      unitAmount: price.unit_amount,
      currency: price.currency,
    });
  } catch (error) {
    console.error("Error fetching config:", error);
    res.status(500).send("Error fetching config");
  }
};

export const getCheckoutSession = (stripe: Stripe) => async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId as string);
    res.send(session);
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    res.status(500).send("Error fetching checkout session");
  }
};

export const createCheckoutSession = (stripe: Stripe) => async (req: Request, res: Response) => {
  try {
    const domainURL = process.env.DOMAIN || "http://localhost:3001";
    const { quantity } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.PRICE || "",
          quantity,
        },
      ],
      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session URL");
    }

    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Error creating checkout session");
  }
};

// export const handleWebhook = (stripe: Stripe) => async (req: Request, res: Response) => {
//   try {
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
//     let event;

//     if (webhookSecret) {
//       const signature = req.headers["stripe-signature"] as string;

//       try {
//         event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
//       } catch (err) {
//         console.error("Webhook signature verification failed:", err);
//         return res.sendStatus(400);
//       }
//     } else {
//       event = req.body;
//     }

//     if (event.type === "checkout.session.completed") {
//       console.log("🔔 Payment received!");
//     }

//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error handling webhook:", error);
//     res.status(500).send("Error handling webhook");
//   }
// };