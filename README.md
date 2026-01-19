# sharetime.zone 

See time now at different timezones and share time with others easily.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c5cf665-8d8e-4724-b676-c25d7913a5da/deploy-status)](https://app.netlify.com/sites/sharetime-zone/deploys)

## Features 
The purpose of `sharetime.zone` is to make it easy to share time with others in different timezones.

### Website 
There are 2 main use cases:  
1. Check the time right now in a given time zone
    - Visit https://sharetime.zone/IST/now 
    - This shows current time in IST (India Standard Time) translated to your timezone
2. Convert time in a different timezone to your timezone
    - Visit https://sharetime.zone/IST/1200 
    - This shows 12:00 PM in IST (India Standard Time) translated to your timezone 
    - If you live in India, and want to say "Let's meet at 12:00 PM IST", you can share this link with your friend in a different timezone, and they will see the time translated to their timezone

**Flexible Time Formats:** The URL supports multiple time formats for convenience:
- Military time: `/PST/1800`
- 24-hour with colon: `/PST/18:00`
- 12-hour format: `/PST/6pm` or `/PST/6:30pm`
- With leading zeros: `/PST/06:30AM`


### cURL 
Using Netlify's Edge Functions, cURL is supported. cURL requests are responded to extremely fast as it is processed at the edge, and _your timezone_ is automatically detected from your request.

Behaviour is same as above. Time formats are flexible (1800, 18:00, 6pm, 6:30pm, etc.).

```bash
# 1. Get time now 

❯ curl https://sharetime.zone/PST/now
Time right now in (PST) America/Los_Angeles is 04:10 AM

# 2. Get specific time (supports multiple formats)
❯ curl https://sharetime.zone/PST/1200
Your time: 1200 in (PST) America/Los_Angeles will be 12:00 AM

❯ curl https://sharetime.zone/PST/6pm
Your time: 6pm in (PST) America/Los_Angeles will be 06:00 PM

❯ curl https://sharetime.zone/PST/6:30pm
Your time: 6:30pm in (PST) America/Los_Angeles will be 06:30 PM
```

> NOTE: Netlify Edge processing, is obviously susceptible to wrong info if you are on a VPN. The website can correct itself with your local computer time. But cURL requests will be wrong if you are on a VPN. 


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
