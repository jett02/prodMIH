import express from 'express';
import Contact from '../models/Contact.js';
import emailService from '../services/emailService.js';

const router = express.Router();

// Profanity filter - basic word list (you can expand this)
const profanityWords = [
  'damn', 'hell', 'shit', 'fuck', 'bitch', 'ass', 'bastard', 'crap',
  'piss', 'dick', 'cock', 'pussy', 'whore', 'slut', 'fag', 'nigger',
  // Add more words as needed
];

// Function to check for profanity
const containsProfanity = (text) => {
  const lowerText = text.toLowerCase();
  return profanityWords.some(word => lowerText.includes(word));
};

// Function to clean profanity (replace with asterisks)
const cleanProfanity = (text) => {
  let cleanText = text;
  profanityWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    cleanText = cleanText.replace(regex, '*'.repeat(word.length));
  });
  return cleanText;
};

// Email service is now handled by emailService.js using Microsoft Graph API

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Sell To Us form submission
router.post('/sell-to-us', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      propertyType,
      timeframe,
      message,
      subject
    } = req.body;

    console.log('=== SELL TO US DEBUG: Received form data ===', req.body);

    // Validate required fields
    if (!name || !email || !address) {
      return res.status(400).json({ message: 'Missing required fields: name, email, and address are required' });
    }

    // Clean profanity from text fields
    const cleanName = cleanProfanity(name);
    const cleanMessage = cleanProfanity(message || '');
    const cleanAddress = cleanProfanity(address);

    // Save to database
    const contact = new Contact({
      name: cleanName,
      email,
      phone: phone || '',
      message: `Sell To Us Inquiry

Property Address: ${cleanAddress}
Property Type: ${propertyType || 'Not specified'}
Timeframe: ${timeframe || 'Not specified'}
Phone: ${phone || 'Not provided'}

Additional Details: ${cleanMessage}`,
      type: 'sell-to-us',
      subject: subject || 'Sell To Us Inquiry'
    });

    await contact.save();
    console.log('=== SELL TO US DEBUG: Contact saved to database ===');

    // Get team notification emails from environment variable
    const teamEmails = process.env.TEAM_NOTIFICATION_EMAILS
      ? process.env.TEAM_NOTIFICATION_EMAILS.split(',').map(email => email.trim()).filter(email => email)
      : [];

    console.log('=== SELL TO US DEBUG: Team emails ===', teamEmails);

    // Prepare email content
    const emailSubject = subject || 'New Sell To Us Inquiry';
    const emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">New Sell To Us Inquiry</h1>
  </div>

  <div style="padding: 30px; background: #f8f9fa;">
    <h2 style="color: #1a1a1a; margin-bottom: 20px;">Property Owner Information</h2>

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p><strong>Name:</strong> ${cleanName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    </div>

    <h2 style="color: #1a1a1a; margin-bottom: 20px;">Property Details</h2>

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p><strong>Property Address:</strong> ${cleanAddress}</p>
      <p><strong>Property Type:</strong> ${propertyType || 'Not specified'}</p>
      <p><strong>Timeframe:</strong> ${timeframe || 'Not specified'}</p>
    </div>

    ${cleanMessage ? `
    <h2 style="color: #1a1a1a; margin-bottom: 20px;">Additional Details</h2>
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p style="white-space: pre-wrap;">${cleanMessage}</p>
    </div>
    ` : ''}

    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #6c757d; font-size: 14px;">
        This inquiry was submitted through the Sell To Us form on wecanmakeithome.com
      </p>
    </div>
  </div>
</div>`;

    // Send email notification to team
    if (teamEmails.length > 0) {
      try {
        console.log('=== SELL TO US DEBUG: Attempting to send email ===');

        await emailService.sendEmail({
          to: teamEmails[0], // Primary recipient
          cc: teamEmails.slice(1), // Additional team members as CC
          subject: emailSubject,
          html: emailBody
        });

        console.log('=== SELL TO US DEBUG: Email sent successfully ===');
      } catch (emailError) {
        console.error('=== SELL TO US DEBUG: Email sending failed ===', emailError);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.log('=== SELL TO US DEBUG: No team emails configured ===');
    }

    res.status(201).json({
      message: 'Sell To Us inquiry submitted successfully. We\'ll get back to you within 24 hours with your cash offer.',
      contactId: contact._id
    });

  } catch (error) {
    console.error('=== SELL TO US DEBUG: Error processing inquiry ===', error);
    res.status(500).json({ message: 'Error processing your inquiry. Please try again.' });
  }
});

// Agent contact form (property inquiries)
router.post('/agent', async (req, res) => {
  try {
    const { 
      propertyId, 
      propertyAddress, 
      agentEmail, 
      agentName,
      clientName, 
      clientEmail, 
      clientPhone, 
      message, 
      subject 
    } = req.body;

    // Validate required fields
    if (!clientName || !clientEmail || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Use fallback email if agent email is not provided
    const finalAgentEmail = agentEmail || process.env.BACKUP_AGENT_EMAIL || process.env.COMPANY_EMAIL || 'info@makeithome.com';

    if (!finalAgentEmail) {
      return res.status(400).json({ message: 'No agent email available for this property' });
    }

    // Check for profanity in message and name
    if (containsProfanity(message) || containsProfanity(clientName)) {
      return res.status(400).json({ 
        message: 'Your message contains inappropriate language. Please revise and try again.' 
      });
    }

    // Clean any mild profanity (optional - you can remove this if you want strict blocking)
    const cleanMessage = cleanProfanity(message);
    const cleanName = cleanProfanity(clientName);

    // Save to database
    const contact = new Contact({
      name: cleanName,
      email: clientEmail,
      phone: clientPhone || '',
      message: cleanMessage,
      type: 'property-inquiry',
      propertyId,
      agentEmail: finalAgentEmail,
      subject: subject || `Property Inquiry - ${propertyAddress}`
    });

    await contact.save();

    // Prepare recipient lists
    const primaryRecipient = finalAgentEmail;

    // Get team notification emails from environment variable
    const teamEmails = process.env.TEAM_NOTIFICATION_EMAILS
      ? process.env.TEAM_NOTIFICATION_EMAILS.split(',').map(email => email.trim()).filter(email => email)
      : [];

    // Add company email to team emails if not already included
    const companyEmail = process.env.COMPANY_EMAIL || 'info@makeithome.com';
    if (companyEmail && !teamEmails.includes(companyEmail)) {
      teamEmails.push(companyEmail);
    }

    // Remove duplicates and filter out the primary recipient from CC list
    const ccEmails = [...new Set(teamEmails)].filter(email => email !== primaryRecipient);

    // Debug logging
    console.log('=== EMAIL DEBUG: Contact Agent ===');
    console.log('TEAM_NOTIFICATION_EMAILS env var:', process.env.TEAM_NOTIFICATION_EMAILS);
    console.log('Parsed team emails:', teamEmails);
    console.log('Primary recipient:', primaryRecipient);
    console.log('CC emails after filtering:', ccEmails);
    console.log('Final mail options will have CC:', ccEmails.length > 0 ? ccEmails : 'undefined');

    // Send email to agent with team members in CC
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@makeithome.com',
      to: primaryRecipient,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      subject: subject || `New Property Inquiry - ${propertyAddress}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Property Inquiry</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Property Details</h3>
            <p><strong>Address:</strong> ${propertyAddress}</p>
            <p><strong>Property ID:</strong> ${propertyId}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Client Information</h3>
            <p><strong>Name:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
            ${clientPhone ? `<p><strong>Phone:</strong> <a href="tel:${clientPhone}">${clientPhone}</a></p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Message</h3>
            <p style="white-space: pre-wrap;">${cleanMessage}</p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="mailto:${clientEmail}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reply to Client</a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="color: #1e40af; font-size: 13px; margin: 0; font-weight: 600;">📧 Email Recipients</p>
            <p style="color: #1e40af; font-size: 12px; margin: 5px 0 0 0;">
              Primary: ${primaryRecipient}<br>
              ${ccEmails.length > 0 ? `Team Copy: ${ccEmails.join(', ')}` : 'No additional team members notified'}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This inquiry was submitted through the Make It Home website.<br>
            Please respond to the client within 24 hours for the best customer experience.
          </p>
        </div>
      `
    };

    await emailService.sendEmail(mailOptions);

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending agent contact:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Tour request form
router.post('/tour', async (req, res) => {
  try {
    const { 
      propertyId, 
      propertyAddress, 
      agentEmail, 
      agentName,
      clientName, 
      clientEmail, 
      clientPhone, 
      message,
      selectedDate,
      selectedTime,
      subject 
    } = req.body;

    // Validate required fields
    if (!clientName || !clientEmail || !selectedDate || !selectedTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Use fallback email if agent email is not provided
    const finalAgentEmail = agentEmail || process.env.BACKUP_AGENT_EMAIL || process.env.COMPANY_EMAIL || 'info@makeithome.com';

    if (!finalAgentEmail) {
      return res.status(400).json({ message: 'No agent email available for this property' });
    }

    // Check for profanity in message and name
    if (containsProfanity(message) || containsProfanity(clientName)) {
      return res.status(400).json({ 
        message: 'Your message contains inappropriate language. Please revise and try again.' 
      });
    }

    const cleanMessage = cleanProfanity(message);
    const cleanName = cleanProfanity(clientName);

    // Format date for display
    const tourDate = new Date(selectedDate);
    const formattedDate = tourDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Save to database
    const contact = new Contact({
      name: cleanName,
      email: clientEmail,
      phone: clientPhone || '',
      message: `Tour Request for ${formattedDate} at ${selectedTime}\n\nAdditional Message: ${cleanMessage}`,
      type: 'tour-request',
      propertyId,
      agentEmail: finalAgentEmail,
      subject: subject || `Tour Request - ${propertyAddress}`
    });

    await contact.save();

    // Prepare recipient lists
    const primaryRecipient = finalAgentEmail;

    // Get team notification emails from environment variable
    const teamEmails = process.env.TEAM_NOTIFICATION_EMAILS
      ? process.env.TEAM_NOTIFICATION_EMAILS.split(',').map(email => email.trim()).filter(email => email)
      : [];

    // Add company email to team emails if not already included
    const companyEmail = process.env.COMPANY_EMAIL || 'info@makeithome.com';
    if (companyEmail && !teamEmails.includes(companyEmail)) {
      teamEmails.push(companyEmail);
    }

    // Remove duplicates and filter out the primary recipient from CC list
    const ccEmails = [...new Set(teamEmails)].filter(email => email !== primaryRecipient);

    // Debug logging
    console.log('=== EMAIL DEBUG: Tour Request ===');
    console.log('TEAM_NOTIFICATION_EMAILS env var:', process.env.TEAM_NOTIFICATION_EMAILS);
    console.log('Parsed team emails:', teamEmails);
    console.log('Primary recipient:', primaryRecipient);
    console.log('CC emails after filtering:', ccEmails);
    console.log('Final mail options will have CC:', ccEmails.length > 0 ? ccEmails : 'undefined');

    // Send email to agent with team members in CC
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@makeithome.com',
      to: primaryRecipient,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      subject: subject || `New Tour Request - ${propertyAddress}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">New Tour Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Property Details</h3>
            <p><strong>Address:</strong> ${propertyAddress}</p>
            <p><strong>Property ID:</strong> ${propertyId}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0; color: #1f2937;">Requested Tour Time</h3>
            <p style="font-size: 18px; font-weight: bold; color: #28a745;">${formattedDate}</p>
            <p style="font-size: 16px; font-weight: bold; color: #28a745;">${selectedTime}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Client Information</h3>
            <p><strong>Name:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
            ${clientPhone ? `<p><strong>Phone:</strong> <a href="tel:${clientPhone}">${clientPhone}</a></p>` : ''}
          </div>
          
          ${cleanMessage && cleanMessage !== 'No additional message' ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Additional Message</h3>
            <p style="white-space: pre-wrap;">${cleanMessage}</p>
          </div>
          ` : ''}
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="mailto:${clientEmail}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">Confirm Tour</a>
            <a href="tel:${clientPhone}" style="background-color: #17a2b8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Call Client</a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <p style="color: #166534; font-size: 13px; margin: 0; font-weight: 600;">📧 Email Recipients</p>
            <p style="color: #166534; font-size: 12px; margin: 5px 0 0 0;">
              Primary: ${primaryRecipient}<br>
              ${ccEmails.length > 0 ? `Team Copy: ${ccEmails.join(', ')}` : 'No additional team members notified'}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This tour request was submitted through the Make It Home website.<br>
            Please confirm or reschedule with the client within 24 hours.
          </p>
        </div>
      `
    };

    await emailService.sendEmail(mailOptions);

    res.json({ message: 'Tour request sent successfully' });
  } catch (error) {
    console.error('Error sending tour request:', error);
    res.status(500).json({ message: 'Error sending tour request' });
  }
});

// Send confirmation email for preferred bidders application
router.post('/send-confirmation-email', async (req, res) => {
  try {
    const { to, subject, applicantName, companyName, submissionDate, applicationId } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'PLACEHOLDER_EMAIL@makeithome.com', // Placeholder for Make It Home email
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 28px;">Make It Home</h1>
            <p style="color: #FFFFFF; margin: 10px 0 0 0; font-size: 16px;">Application Confirmation</p>
          </div>

          <div style="background-color: #FFFFFF; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #000000; margin-top: 0;">Thank You for Your Application!</h2>

            <p style="color: #4A4A4A; line-height: 1.6;">Dear ${applicantName},</p>

            <p style="color: #4A4A4A; line-height: 1.6;">
              Thank you for submitting your Preferred Bidders application to Make It Home. We have successfully received your application and wanted to confirm the details:
            </p>

            <div style="background-color: #F5F1EC; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EBA472;">
              <h3 style="margin-top: 0; color: #000000;">Application Details</h3>
              <p style="margin: 5px 0; color: #4A4A4A;"><strong>Company:</strong> ${companyName}</p>
              <p style="margin: 5px 0; color: #4A4A4A;"><strong>Primary Contact:</strong> ${applicantName}</p>
              <p style="margin: 5px 0; color: #4A4A4A;"><strong>Submission Date:</strong> ${submissionDate}</p>
              <p style="margin: 5px 0; color: #4A4A4A;"><strong>Application ID:</strong> ${applicationId}</p>
            </div>

            <h3 style="color: #000000;">What Happens Next?</h3>
            <ul style="color: #4A4A4A; line-height: 1.6;">
              <li>Our team will review your application and supporting documents</li>
              <li>We'll verify your credentials and references</li>
              <li>You'll receive a follow-up within <strong>10 business days</strong></li>
              <li>If selected, we'll discuss next steps and project opportunities</li>
            </ul>

            <div style="background-color: #F5F1EC; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #4A4A4A; font-style: italic;">
                "Let's Make It Home: One Flip, One Crew, One Win at a Time."
              </p>
            </div>

            <p style="color: #4A4A4A; line-height: 1.6;">
              If you have any questions about your application or our process, please don't hesitate to contact us at
              <a href="mailto:PLACEHOLDER_EMAIL@makeithome.com" style="color: #EBA472; text-decoration: none;">PLACEHOLDER_EMAIL@makeithome.com</a>.
            </p>

            <p style="color: #4A4A4A; line-height: 1.6;">
              Thank you for your interest in partnering with Make It Home. We look forward to potentially working together!
            </p>

            <p style="color: #4A4A4A; line-height: 1.6;">
              Best regards,<br>
              <strong>The Make It Home Team</strong>
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #8B8680; font-size: 14px;">
            <p style="margin: 0;">This is an automated confirmation email from Make It Home.</p>
            <p style="margin: 5px 0 0 0;">Please save this email for your records.</p>
          </div>
        </div>
      `
    };

    await emailService.sendEmail(mailOptions);
    res.json({ message: 'Confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ message: 'Error sending confirmation email' });
  }
});

export default router;







