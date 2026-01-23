<template>
  <div class="home">
    <div>
      <p>Welcome to <code>sharetime.zone</code></p>
      <p>The no-nonsense website to convert time to other timezones.</p>
    </div>
    <div class="mt-5 content">
      <p class="has-text-weight-bold">
        How to use it:
      </p>
      <p>
        Imagine you're in San Francisco and want to set up a meeting with people
        in the London and Singapore. You can send a message like:
      </p>
      <div class="box mt-3">
        <code>"I'm in SF right now, do you want to meet at [4pm my
          time](https://sharetime.zone/PST/4pm)?"</code>
        <p>
          "I'm in SF right now, do you want to meet at
          <a href="/PST/4pm">4pm my time</a>?"
        </p>
      </div>
      <p>
        When your colleagues click the link, they'll see what time 4pm PST is in
        their own timezone. <br> Click and try it out for yourself!
      </p>
    </div>
    <HowToUse />
  </div>
</template>
<script setup lang="ts"></script>
