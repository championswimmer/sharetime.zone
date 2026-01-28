# sideproject diaries: sharetime.zone - A Simple Timezone Sharing Tool

If you have friends or clients scattered across the globe, you know the drill. You agree to meet at "5 PM," but then follows the inevitable dance of clarification: "My 5 PM or your 5 PM?" "Wait, is that daylight savings?" "Let me just send you a calendar invite so we don't mess this up."

I built [sharetime.zone](https://sharetime.zone) because I found myself in this loop way too often. Whether it was catching up with friends or consulting with clients in different locations, I needed a way to just say, "Here is the time," without the mental math.

## The Idea: Simplicity First

The core idea is dead simple. I wanted to be able to share a link that instantly communicates a specific time in a specific timezone, converted to the viewer's local time.

Instead of opening a timezone converter app, selecting cities, and copying a long generated link, I wanted something I could type out manually if I had to.

So, `sharetime.zone` works like this:

**[sharetime.zone/IST/1700](https://sharetime.zone/IST/1700)**

That's it. You click that link, and it tells you exactly what 5:00 PM Indian Standard Time is in *your* local timezone. No friction, no confusion.

## For the Developers: It Works in cURL

Since I spend most of my time in the terminal, I didn't want to leave the command line just to check a time. I figured, why not make it work with `curl`?

I added support for cURL user agents, so you can literally fetch the time from your terminal:

```bash
curl sharetime.zone/IST/1700
```

And it returns a plain text response with the converted time.

### Why Edge Functions?

You might wonder, "Why not just a standard serverless function?" or "Why does this need special handling?"

In a browser-based app (like the Vue frontend of this site), determining your local timezone is trivial. The JavaScript running in your browser can simply ask the browser: "Hey, what timezone are we in?" (usually via `Intl.DateTimeFormat().resolvedOptions().timeZone`).

**But `curl` is different.** When you make a request from your terminal, you aren't sending your timezone information. You're just sending a raw HTTP request. Without that context, the server has no idea if you are in Tokyo or Toronto.

This is where **Netlify Edge Functions** shine. Because they run at the "edge"—on servers distributed globally and closest to the user—they have immediate access to the request context, including the user's IP-based geolocation.

I can access the user's timezone directly from the request context:

```typescript
// netlify/edge-functions/curl-response.ts
export default async (request: Request, context: Context) => {
  const clientTZ = context.geo.timezone;
  // ... logic to convert time to clientTZ
}
```

This allows the tool to provide a personalized answer ("5 PM IST is 7:30 AM in *your* timezone") without you ever having to tell it where you are.

### Deployed on Netlify

Deploying this was surprisingly straightforward. I defined the edge function in my `netlify.toml`:

```toml
[[edge_functions]]
    function = "curl-response"
    path = "/*"
```

This tells Netlify to intercept *every* request to the site with this function. Inside the function, I check if the User-Agent contains `curl`. If it does, I hijack the response and send back the text output. If not, I let the request pass through to the standard Vue app.

### Performance at the Edge

Another huge benefit is speed. "What time is it?" is a query that doesn't need a centralized database or a server sitting in a data center in Virginia. It's a calculation that can happen anywhere.

By using Edge Functions, the logic runs on a server physically close to you.
1.  **Low Latency:** The request travels a shorter distance.
2.  **No Central Bottleneck:** There's no single server coordinating everyone's time queries.
3.  **Deno Runtime:** Netlify Edge Functions use Deno, which starts up incredibly fast compared to cold-booting a Node.js container.

## What I Learnt Building This

While the app looks simple on the surface, timezones are notoriously tricky. Here are a few things I picked up along the way:

### 1. Deno is Different
Since Netlify Edge Functions run on Deno, I couldn't just drop in my usual Node.js code. I had to adapt to the Deno runtime environment, using URL imports for dependencies (like `https://deno.land/x/ptera`) instead of `npm install`. It was a fun challenge to step outside the `node_modules` comfort zone.

### 2. Timezones with Luxon
For the frontend, I leaned heavily on the **Luxon** library. Handling timezones "correctly" is a rabbit hole of edge cases—Daylight Saving Time (DST) shifts, ambiguous abbreviations (is "CST" Central Standard Time or China Standard Time?), and historical changes.

Luxon made this manageable, but it also taught me that you can't just assume a timezone offset is constant. You have to calculate it for the specific instant in time you're talking about.

## Wrapping Up

This was a fun weekend project that solved a real itch for me. It’s open source, so feel free to poke around the code or fork it if you want to add support for your favorite obscure timezone.

Give it a try next time you're setting up a meeting: **sharetime.zone**
