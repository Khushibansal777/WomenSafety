const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const validateEmails = (emails) => {
  return emails.filter(
    (email) => email && typeof email === "string" && email.includes("@")
  );
};

const sendHelpEmail = async (
  recipients,
  lat,
  long,
  uname,
  pincode,
  address
) => {
  const validRecipients = validateEmails(recipients);
  if (validRecipients.length === 0) {
    console.error("❌ sendHelpEmail: No valid recipients defined.");
    return;
  }

  const mailOptions = {
    from: `"Women Safety Alert 👩‍🦰" <${process.env.EMAIL_USER}>`,
    to: validRecipients.join(","),
    subject: "🚨 SOS Emergency Alert",
    html: `
      <h3>🚨 SOS Alert for ${uname}</h3>
      <p><strong>Location:</strong> ${address}</p>
      <p><strong>Pincode:</strong> ${pincode}</p>
      <p><strong>Map Link:</strong> 
        <a href="https://maps.google.com/maps?q=${lat},${long}" target="_blank">View Location</a>
      </p>
      <p>Please help them immediately or inform the nearest authorities.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendHelpEmailContacts = async (
  recipients,
  lat,
  long,
  uname,
  pincode,
  address
) => {
  const validRecipients = validateEmails(recipients);
  if (validRecipients.length === 0) {
    console.error("❌ sendHelpEmailContacts: No valid recipients defined.");
    return;
  }

  const mailOptions = {
    from: `"Women Safety Community 👥" <${process.env.EMAIL_USER}>`,
    to: validRecipients.join(","),
    subject: "📍 Nearby SOS Alert",
    html: `
      <h3>An SOS alert was triggered near you.</h3>
      <p><strong>User:</strong> ${uname}</p>
      <p><strong>Location:</strong> ${address}</p>
      <p><strong>Pincode:</strong> ${pincode}</p>
      <p><strong>Map:</strong> 
        <a href="https://maps.google.com/maps?q=${lat},${long}" target="_blank">Click to View</a>
      </p>
      <p>If you can assist or alert authorities, please do so urgently.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendHelpEmail,
  sendHelpEmailContacts,
};
