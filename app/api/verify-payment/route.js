import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { reference, customer, cart } = body;

    // 🔹 Step 1: Verify payment with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return Response.json({ status: "failed", message: "Payment not verified" }, { status: 400 });
    }

    // 🔹 Step 2: Save order to MongoDB via Prisma
    const savedOrder = await prisma.order.create({
      data: {
        reference,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        items: cart,
        totalAmount: verifyData.data.amount / 100,
        status: "paid",
      },
    });

    // 🔹 Step 3: Setup company webmail transport
    const transporter = nodemailer.createTransport({
      host: "mail.thedistillery.ng", // your webmail host
      port: 465, // or 587 if TLS
      secure: true, // true for port 465
      auth: {
        user: "sales@thedistillery.ng",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 🔹 Step 4: Format cart items for email
    const itemsList = cart
      .map(
        (item) =>
          `${item.name} (${item.purchaseType}) × ${item.quantity} — ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("<br/>");

    // 🔹 Step 5: Customer Email
    const customerMail = {
      from: "The Distillery <sales@thedistillery.ng>",
      to: customer.email,
      subject: "Order Confirmation - The Distillery",
      html: `
        <h2>Hi ${customer.name},</h2>
        <p>Thank you for your order! Here’s your order summary:</p>
        <hr/>
        <h4>Order Details:</h4>
        <p>${itemsList}</p>
        <p><strong>Total Paid:</strong> ₦${(verifyData.data.amount / 100).toLocaleString()}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <hr/>
        <p>Your order is being processed. We'll contact you shortly for delivery updates.</p>
        <br/>
        <p>Cheers,</p>
        <p><strong>The Distillery Team</strong></p>
      `,
    };

    // 🔹 Step 6: Company Email
    const companyMail = {
      from: "The Distillery Orders <sales@thedistillery.ng>",
      to: "sales@thedistillery.ng",
      subject: `New Order Received - ${customer.name}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <hr/>
        <h4>Items:</h4>
        <p>${itemsList}</p>
        <p><strong>Total Paid:</strong> ₦${(verifyData.data.amount / 100).toLocaleString()}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <hr/>
        <p><strong>Order saved to database:</strong> ${savedOrder.id}</p>
      `,
    };

    // 🔹 Step 7: Send Emails
    await transporter.sendMail(customerMail);
    await transporter.sendMail(companyMail);

    return Response.json({ status: "success", orderId: savedOrder.id });
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return Response.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}