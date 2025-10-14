import emailService from './services/emailService.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test email function using OAuth2
async function testEmail() {
  try {
    console.log('Testing Microsoft Graph API email configuration...');
    console.log('Azure Client ID:', process.env.AZURE_CLIENT_ID);
    console.log('Azure Tenant ID:', process.env.AZURE_TENANT_ID);
    console.log('Email From:', process.env.EMAIL_FROM);

    // Verify OAuth2 connection
    await emailService.verify();
    console.log('✅ Microsoft Graph API authentication verified successfully!');

    // Send test email
    const testMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // Send to yourself for testing
      subject: 'Test Email - Make It Home OAuth2 Notifications',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EBA472;">OAuth2 Email Configuration Test</h2>
          <p>This is a test email to verify that your Make It Home email notifications are working correctly with Microsoft Graph API and OAuth2.</p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Configuration Details</h3>
            <p><strong>Authentication:</strong> Microsoft Graph API with OAuth2</p>
            <p><strong>Client ID:</strong> ${process.env.AZURE_CLIENT_ID}</p>
            <p><strong>Tenant ID:</strong> ${process.env.AZURE_TENANT_ID}</p>
            <p><strong>From Email:</strong> ${process.env.EMAIL_FROM}</p>
          </div>

          <p style="color: #28a745; font-weight: bold;">✅ If you received this email, your OAuth2 configuration is working!</p>

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1f2937;">Security Benefits</h4>
            <ul style="color: #4a5568;">
              <li>No passwords stored in configuration</li>
              <li>Modern OAuth2 authentication</li>
              <li>Secure token-based access</li>
              <li>Compliant with Microsoft security standards</li>
            </ul>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This is a test email from Make It Home using Microsoft Graph API.<br>
            Your property inquiry and tour request notifications are now secure and ready!
          </p>
        </div>
      `
    };

    const info = await emailService.sendEmail(testMailOptions);
    console.log('✅ Test email sent successfully via Microsoft Graph API!');
    console.log('Message ID:', info.messageId);
    console.log('Check your inbox for the test email.');

  } catch (error) {
    console.error('❌ OAuth2 email test failed:', error.message);

    if (error.message.includes('AADSTS')) {
      console.log('\n🔧 Azure AD authentication failed. Please check:');
      console.log('1. AZURE_CLIENT_ID is correct');
      console.log('2. AZURE_CLIENT_SECRET is correct and not expired');
      console.log('3. AZURE_TENANT_ID is correct');
      console.log('4. App registration has Mail.Send permissions');
      console.log('5. Admin consent has been granted for the permissions');
    } else if (error.message.includes('Forbidden') || error.message.includes('403')) {
      console.log('\n🔧 Permission denied. Please check:');
      console.log('1. App registration has Mail.Send permissions');
      console.log('2. Admin consent has been granted');
      console.log('3. The email account exists and is licensed');
    } else {
      console.log('\n🔧 General error. Please check:');
      console.log('1. Internet connection');
      console.log('2. Azure app registration configuration');
      console.log('3. Microsoft Graph API service status');
    }
  }
}

// Run the test
testEmail();
