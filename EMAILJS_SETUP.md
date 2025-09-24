# EmailJS Setup Guide

## Why Emails Weren't Being Sent

Your contact form was previously set up as a **simulation only** - it wasn't actually sending emails. The JavaScript code was just showing fake loading states and success messages.

## Solution: EmailJS Integration

I've updated your contact form to use **EmailJS**, which allows you to send emails directly from your static HTML website without needing a backend server.

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Company: {{company}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. **Copy the Template ID** (you'll need this)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key**

### Step 5: Update Your Code
Replace the placeholder values in `script.js`:

```javascript
// Line 37: Replace YOUR_PUBLIC_KEY
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");

// Line 86: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', templateParams)
```

### Step 6: Test the Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email for the message

## Alternative Solutions

If you prefer not to use EmailJS, here are other options:

### Option 1: Formspree
- Go to [https://formspree.io/](https://formspree.io/)
- Create an account
- Get your form endpoint
- Update the form action in `contact.html`

### Option 2: Netlify Forms (if hosting on Netlify)
- Add `netlify` attribute to your form
- No additional setup needed

## Troubleshooting

### Common Issues:
1. **"EmailJS is not defined"** - Make sure the EmailJS script is loaded before your script.js
2. **"Invalid service ID"** - Double-check your Service ID in EmailJS dashboard
3. **"Invalid template ID"** - Double-check your Template ID in EmailJS dashboard
4. **Emails going to spam** - Check your spam folder and consider setting up SPF/DKIM records

### Testing:
- Use browser developer tools (F12) to check the console for error messages
- The form will show success/error alerts to help with debugging

## Free Tier Limits
EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates

This should be sufficient for most small business websites.

