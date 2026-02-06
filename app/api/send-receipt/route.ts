import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { customer, items, total } = await req.json();

    if (!customer.email) {
      return NextResponse.json({ error: "Recipient email is missing" }, { status: 400 });
    }

    // VERCEL OPTIMIZED TRANSPORTER
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // false for 587, true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, 
      },
      // Helps prevent connection timeout on Vercel
      connectionTimeout: 10000, 
    });

    // Verify connection before sending
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Transporter Verify Error:", verifyError);
      throw new Error("SMTP Connection failed");
    }

    const itemListHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
          <span style="font-weight: bold; color: #333;">${item.name}</span> <br />
          <span style="font-size: 12px; color: #777;">Qty: ${item.quantity}</span>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; text-align: right; font-weight: bold;">
          ₱${item.price}
        </td>
      </tr>
    `).join("");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 40px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="letter-spacing: 5px; font-weight: 900; margin: 0; font-size: 28px;">ARC APPAREL</h1>
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #888;">Order Confirmation</p>
        </div>
        <p>Hello ${customer.fullName},</p>
        <p>Thank you for your order. We are preparing your items for shipment.</p>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemListHtml}
          <tr>
            <td style="padding: 20px 0; font-weight: bold; font-size: 18px;">TOTAL</td>
            <td style="padding: 20px 0; text-align: right; font-weight: bold; font-size: 18px;">₱${total}</td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 40px; font-size: 11px; color: #999;">
          &copy; 2026 ARC APPAREL INC.
        </div>
      </div>
    `;

    // Await the sendMail specifically for Vercel serverless lifecycle
    const info = await transporter.sendMail({
      from: `"ARC APPAREL" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: `Order Confirmation #${Math.floor(Math.random() * 100000)}`,
      html: emailHtml,
    });

    console.log("Email sent: %s", info.messageId);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("SMTP ERROR:", error.message);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message }, 
      { status: 500 }
    );
  }
}