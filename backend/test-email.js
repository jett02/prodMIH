import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email function
async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email From:', process.env.EMAIL_FROM);
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    const testMailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@makeithome.com',
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test Email - Make It Home Notifications',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EBA472;">Email Configuration Test</h2>
          <p>This is a test email to verify that your Make It Home email notifications are working correctly.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Configuration Details</h3>
            <p><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
            <p><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</p>
            <p><strong>From Email:</strong> ${process.env.EMAIL_FROM}</p>
          </div>
          
          <p style="color: #28a745; font-weight: bold;">✅ If you received this email, your configuration is working!</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This is a test email from Make It Home.<br>
            You can now receive property inquiry and tour request notifications.
          </p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Check your inbox for the test email.');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication failed. Please check:');
      console.log('1. EMAIL_USER is set to your Gmail address');
      console.log('2. EMAIL_PASS is set to your App Password (not regular password)');
      console.log('3. 2-Step Verification is enabled on your Google account');
      console.log('4. App Password is generated from Google Account settings');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🔧 Connection failed. Please check:');
      console.log('1. Your internet connection');
      console.log('2. SMTP_HOST and SMTP_PORT settings');
      console.log('3. Firewall settings');
    }
  }
}

// Run the test
testEmail();
