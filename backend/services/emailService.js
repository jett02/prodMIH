import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Missing required email environment variables. Please check EMAIL_USER and EMAIL_PASS in .env file');
    }

    // Create SMTP transporter for Microsoft/Outlook
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    this.initialized = true;
  }

  async sendEmail(mailOptions) {
    try {
      this.initialize();

      // Send email using nodemailer SMTP
      const info = await this.transporter.sendMail({
        from: mailOptions.from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: mailOptions.to,
        cc: mailOptions.cc,
        subject: mailOptions.subject,
        html: mailOptions.html,
        text: mailOptions.text
      });

      console.log('Email sent successfully via SMTP');
      return {
        messageId: info.messageId,
        response: info.response
      };

    } catch (error) {
      console.error('Error sending email via SMTP:', error.message);
      throw error;
    }
  }

  // Method to verify the service is working
  async verify() {
    try {
      this.initialize();
      await this.transporter.verify();
      console.log('✅ SMTP email service verified successfully');
      return true;
    } catch (error) {
      console.error('❌ SMTP email service verification failed:', error.message);
      throw error;
    }
  }
}

export default new EmailService();
