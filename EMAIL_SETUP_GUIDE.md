# Email Notifications Setup Guide

## Overview
Your real estate website now has email notifications set up for:
- **Contact Agent** forms - Sends emails to the agent assigned to each property
- **Schedule Tour** forms - Sends tour requests to the agent assigned to each property

## What Was Changed

### Frontend Changes
- Updated `PropertyDetail.vue` to use the correct email endpoints:
  - Contact forms now submit to `/api/contact/agent`
  - Tour forms now submit to `/api/contact/tour`
- Added proper error handling and success messages

### Backend Changes
- Added fallback email logic for properties without assigned agents
- Enhanced email templates with professional styling
- Added validation and profanity filtering
- Configured nodemailer for email sending

## Email Configuration Setup

### Step 1: Microsoft/Outlook Email Setup

#### For Microsoft 365/Outlook Business Accounts:
1. Use your business Microsoft/Outlook email account
2. Enable 2-Step Verification (Multi-Factor Authentication)
3. Generate an App Password:
   - Go to Microsoft Account Security settings
   - Advanced security options → App passwords
   - Generate a new app password for "Mail"
   - Use this app password (not your regular password)

#### For Personal Outlook/Hotmail Accounts:
1. Enable 2-Step Verification in Microsoft Account settings
2. Generate an App Password for email applications
3. Use `smtp-mail.outlook.com` with port 587

#### Alternative Providers:
- **Gmail**: Use `smtp.gmail.com` port 587
- **Yahoo**: Use `smtp.mail.yahoo.com` port 587
- **Custom SMTP**: Use your hosting provider's SMTP settings

### Step 2: Update Environment Variables

Edit `backend/.env` file:

```env
# Email Configuration for Microsoft/Outlook
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
EMAIL_USER=your-business-email@outlook.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@wecanmakeithome.com

# Fallback company emails
COMPANY_EMAIL=info@wecanmakeithome.com
BACKUP_AGENT_EMAIL=agents@wecanmakeithome.com
```

### Step 3: Test Email Configuration

Run the test script:
```bash
cd backend
node test-email.js
```

This will:
- Verify SMTP connection
- Send a test email to your configured email
- Show any configuration errors

## How It Works

### Contact Agent Flow
1. User fills out contact form on property page
2. Form submits to `/api/contact/agent`
3. System checks if property has an agent email
4. If no agent email, uses fallback company email
5. Sends formatted email to agent with:
   - Property details
   - Client contact information
   - Message content
   - Reply-to client button

### Schedule Tour Flow
1. User fills out tour request form
2. Form submits to `/api/contact/tour`
3. System formats the requested date/time
4. Sends email to agent with:
   - Property details
   - Requested tour date/time
   - Client contact information
   - Professional formatting

### Email Features
- **Professional HTML templates** with your branding colors
- **Profanity filtering** to maintain professional communication
- **CC to company email** for backup and tracking
- **Mobile-friendly** email design
- **Direct reply buttons** for easy agent response

## Fallback System

If a property doesn't have an agent email assigned:
1. Uses `BACKUP_AGENT_EMAIL` from .env
2. Falls back to `COMPANY_EMAIL` from .env
3. Final fallback to `info@makeithome.com`

This ensures no inquiries are lost!

## Testing Checklist

- [ ] Update .env file with real email credentials
- [ ] Run `node test-email.js` successfully
- [ ] Test contact form on a property page
- [ ] Test tour request form on a property page
- [ ] Verify emails are received by agents
- [ ] Check that CC emails go to company email
- [ ] Test with properties that have no agent assigned

## Troubleshooting

### Authentication Errors (Microsoft/Outlook)
- Verify Multi-Factor Authentication (MFA) is enabled on your Microsoft account
- Use App Password, not your regular Microsoft account password
- Check EMAIL_USER matches the Microsoft account that generated the App Password
- For business accounts, ensure SMTP is enabled by your IT administrator
- Try using your full email address as the username

### Connection Errors
- Check SMTP_HOST and SMTP_PORT settings
- Verify internet connection
- Check firewall settings

### Emails Not Received
- Check spam/junk folders
- Verify agent email addresses in property data
- Check server logs for error messages

## Production Recommendations

1. **Use a dedicated business email** for sending notifications
2. **Set up SPF/DKIM records** for better deliverability
3. **Monitor email logs** for failed deliveries
4. **Consider email service providers** like SendGrid or Mailgun for high volume
5. **Set up email templates** in your admin panel for easy customization

## Support

If you need help with:
- Setting up App Passwords
- Configuring custom SMTP
- Troubleshooting email delivery
- Adding more email templates

Just let me know and I can help you through the process!
