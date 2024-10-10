import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendFeedbackEmail = async (feedback, user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'ben@popvia.com',
    subject: `New Feedback: ${feedback.subject}`,
    html: `
      <h1>New Feedback Received</h1>
      <p><strong>User:</strong> ${user.username}</p>
      <p><strong>Subject:</strong> ${feedback.subject}</p>
      <p><strong>Emotion:</strong> ${feedback.emotion}</p>
      <p><strong>Feedback:</strong></p>
      <p>${feedback.body}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendConfirmationEmail = async (userEmail, feedback) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Feedback Received - Thank You!',
    html: `
      <h1>Thank You for Your Feedback</h1>
      <p>We have received your feedback and appreciate your input.</p>
      <p><strong>Subject:</strong> ${feedback.subject}</p>
      <p><strong>Your message:</strong></p>
      <p>${feedback.body}</p>
      <p>We will review your feedback and respond within 48 hours if necessary.</p>
      <p>Thank you for helping us improve our service!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};