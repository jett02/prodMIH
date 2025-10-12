# Microsoft Email Setup Guide

## Quick Setup for Microsoft/Outlook Emails

Your `.env` file is already configured for Microsoft emails. You just need to add your credentials:

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
EMAIL_USER=your-business-email@outlook.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@wecanmakeithome.com
```

## Step-by-Step Microsoft Email Configuration

### For Microsoft 365 Business Accounts

1. **Enable Multi-Factor Authentication (MFA)**
   - Go to [Microsoft 365 Admin Center](https://admin.microsoft.com)
   - Users → Active users → Select your user
   - Enable Multi-factor authentication

2. **Generate App Password**
   - Go to [Microsoft Account Security](https://account.microsoft.com/security)
   - Sign-in options → App passwords
   - Create new app password for "Mail"
   - Copy the generated password (you won't see it again)

3. **Update .env file**
   ```env
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASS=the-generated-app-password
   ```

### For Personal Outlook/Hotmail Accounts

1. **Enable 2-Step Verification**
   - Go to [Microsoft Account Security](https://account.microsoft.com/security)
   - Advanced security options
   - Turn on 2-step verification

2. **Create App Password**
   - In the same security section
   - App passwords → Create new app password
   - Choose "Mail" as the app type
   - Copy the generated password

3. **Update .env file**
   ```env
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASS=the-generated-app-password
   ```

## Testing Your Configuration

1. **Update your credentials** in `backend/.env`
2. **Run the test script**:
   ```bash
   cd backend
   node test-email.js
   ```
3. **Check for success message** and test email in your inbox

## Common Microsoft Email Issues & Solutions

### Issue: "Authentication Failed"
**Solutions:**
- Ensure MFA/2-Step verification is enabled
- Use App Password, not your regular password
- Try using your full email address as EMAIL_USER
- For business accounts, check with IT that SMTP is enabled

### Issue: "Connection Timeout"
**Solutions:**
- Verify SMTP settings: `smtp-mail.outlook.com` port `587`
- Check firewall settings
- Try port 25 if 587 doesn't work (some networks block 587)

### Issue: "Relay Access Denied"
**Solutions:**
- Ensure you're using authenticated SMTP
- Check that your account has permission to send emails
- For business accounts, verify SMTP relay is enabled

### Issue: "App Password Not Working"
**Solutions:**
- Generate a new app password
- Make sure you copied the entire password (no spaces)
- Try deleting and recreating the app password
- Ensure the app password is for "Mail" applications

## Microsoft-Specific Configuration Options

### Alternative SMTP Settings
If the default settings don't work, try these alternatives:

```env
# Alternative 1: Different port
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=25

# Alternative 2: Office 365 specific
SMTP_HOST=smtp.office365.com
SMTP_PORT=587

# Alternative 3: Legacy Outlook
SMTP_HOST=smtp.live.com
SMTP_PORT=587
```

### Business Account Considerations
- **Exchange Online**: Use `smtp.office365.com`
- **On-Premises Exchange**: Use your organization's SMTP server
- **Hybrid Setup**: Check with your IT administrator for correct settings

## Security Best Practices

1. **Use a dedicated email account** for sending notifications
2. **Don't use your personal email** for automated systems
3. **Regularly rotate app passwords** (every 6-12 months)
4. **Monitor email logs** for suspicious activity
5. **Set up SPF records** for your domain to improve deliverability

## Testing Checklist

- [ ] MFA/2-Step verification enabled
- [ ] App password generated for "Mail"
- [ ] .env file updated with correct credentials
- [ ] Test script runs successfully (`node test-email.js`)
- [ ] Test email received in inbox
- [ ] Contact form test on website
- [ ] Tour request form test on website
- [ ] Agent receives emails properly
- [ ] Company CC emails working

## Need Help?

If you're still having issues:

1. **Check Microsoft's status page** for service outages
2. **Try generating a new app password**
3. **Test with a simple email client** first (like Thunderbird)
4. **Contact Microsoft support** for account-specific issues
5. **Check with your IT department** for business accounts

## Production Tips

- Consider using **Microsoft Graph API** for high-volume email sending
- Set up **SPF, DKIM, and DMARC** records for better deliverability
- Monitor **bounce rates** and **spam complaints**
- Use **dedicated IP addresses** for business-critical emails

Your email notifications are ready to go once you add your Microsoft credentials!
