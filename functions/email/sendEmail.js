import emailjs from '@emailjs/nodejs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { parent_name, email, contact_number, child_name, child_age, service, message } = data;

    // Use environment variables
    const SERVICE_ID = "service_frprxs9";
    const TEMPLATE_ADMIN = "template_kdphy56";
    const TEMPLATE_CUSTOMER = process.env.EMAILJS_TEMPLATE_CUSTOMER;
    const PUBLIC_KEY = "T6peZlWLR42qvmoNk";

    // 1️⃣ Send email to admin
    await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, {
      parent_name,
      email,
      contact_number,
      child_name,
      child_age,
      service,
      message
    }, { publicKey: PUBLIC_KEY });

    // 2️⃣ Send auto-reply to customer
    // await emailjs.send(SERVICE_ID, TEMPLATE_CUSTOMER, {
    //   parent_name,
    //   email,
    //   service
    // }, { publicKey: PUBLIC_KEY });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Inquiry sent successfully!' })
    };

  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
}