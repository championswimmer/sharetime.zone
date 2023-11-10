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


### cURL 


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
