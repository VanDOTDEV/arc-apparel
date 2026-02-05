import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { customer, items, total } = await req.json();

    if (!customer.email) {
      return NextResponse.json({ error: "Recipient email is missing" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create the HTML list for items
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
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 40px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="letter-spacing: 5px; font-weight: 900; margin: 0; font-size: 28px;">ARC APPAREL</h1>
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #888;">Order Confirmation</p>
        </div>

        <p style="font-size: 16px;">Hello ${customer.name || 'valued customer'},</p>
        <p style="font-size: 14px; line-height: 1.6; color: #555;">
          Thank you for your order. We are currently preparing your items for shipment. You will receive another update as soon as your package is on its way.
        </p>

        <div style="margin-top: 30px;">
          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 5px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${itemListHtml}
            <tr>
              <td style="padding: 20px 0; font-weight: bold; font-size: 18px;">TOTAL</td>
              <td style="padding: 20px 0; text-align: right; font-weight: bold; font-size: 18px; color: #000;">₱${total}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <a href="#" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Track My Order</a>
        </div>

        <div style="text-align: center; border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 40px;">
          <p style="font-size: 11px; color: #999;">
            &copy; 2026 ARC APPAREL INC. <br />
            123 Fashion Street, Metro Manila, Philippines <br />
            You are receiving this because you made a purchase on our store.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ARC APPAREL" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: `Order Confirmation #${Math.floor(Math.random() * 100000)}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SMTP ERROR DETAILS:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}