import { ConfidentialClientApplication } from '@azure/msal-node';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class EmailService {
  constructor() {
    this.clientApp = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET || !process.env.AZURE_TENANT_ID) {
      throw new Error('Missing required Azure environment variables. Please check AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and AZURE_TENANT_ID in .env file');
    }

    this.clientApp = new ConfidentialClientApplication({
      auth: {
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`
      }
    });

    this.initialized = true;
  }

  async getAccessToken() {
    try {
      this.initialize();

      const clientCredentialRequest = {
        scopes: ['https://graph.microsoft.com/.default'],
      };

      const response = await this.clientApp.acquireTokenByClientCredential(clientCredentialRequest);
      return response.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async sendEmail(mailOptions) {
    try {
      const accessToken = await this.getAccessToken();
      
      // Convert recipients to Microsoft Graph format
      const toRecipients = Array.isArray(mailOptions.to) 
        ? mailOptions.to.map(email => ({ emailAddress: { address: email } }))
        : [{ emailAddress: { address: mailOptions.to } }];

      const ccRecipients = mailOptions.cc 
        ? (Array.isArray(mailOptions.cc) 
          ? mailOptions.cc.map(email => ({ emailAddress: { address: email } }))
          : [{ emailAddress: { address: mailOptions.cc } }])
        : [];

      // Create the email message in Microsoft Graph format
      const message = {
        subject: mailOptions.subject,
        body: {
          contentType: 'HTML',
          content: mailOptions.html || mailOptions.text || ''
        },
        toRecipients: toRecipients,
        ccRecipients: ccRecipients,
        from: {
          emailAddress: {
            address: mailOptions.from || process.env.EMAIL_FROM
          }
        }
      };

      // Send email using Microsoft Graph API
      const response = await axios.post(
        `https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_FROM}/sendMail`,
        {
          message: message,
          saveToSentItems: true
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Email sent successfully via Microsoft Graph API');
      return {
        messageId: response.headers['request-id'] || 'graph-api-sent',
        response: 'Email sent successfully'
      };

    } catch (error) {
      console.error('Error sending email via Microsoft Graph:', error.response?.data || error.message);
      throw error;
    }
  }

  // Method to verify the service is working
  async verify() {
    try {
      this.initialize();
      const accessToken = await this.getAccessToken();
      console.log('✅ Microsoft Graph API authentication successful');
      return true;
    } catch (error) {
      console.error('❌ Microsoft Graph API authentication failed:', error.message);
      throw error;
    }
  }
}

export default new EmailService();
