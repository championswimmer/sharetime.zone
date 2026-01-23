<template>
  <main>
    <!-- Main how question -->
    <section>
      <h1 class="title is-size-4 p-3 mt-4">
        How does <code>sharetime.zone</code> work?
      </h1>
      <div class="container is-fluid">
        <p>
          There are 2 things you can do with <code>sharetime.zone</code>:
        </p>
        <ol>
          <li>
            <em>Share time in particular timezone</em>
          </li>
          <li>
            <em>See current time in a particular timezone</em>
          </li>
        </ol>
      </div>
    </section>
    <!-- Sharing time in particular timezone -->
    <section class="p-2 mt-2">
      <h2 class="title is-4">
        Sharing time in particular timezone
      </h2>
      <h6 class="subtitle is-6">
        When opened by anyone they will see the time translated to their local timezone
      </h6>
      <div>
        <p class="has-text-weight-bold">
          Examples
        </p>
        <p>
          Supported formats: 24-hour (e.g. <code>/PST/1500</code>) or 12-hour with <code>am</code>/<code>pm</code> (e.g. <code>/PST/3pm</code>, <code>/Europe/Berlin/4:45pm</code>).
        </p>
        <ul>
          <li class="my-2">
            Share the time <code>3:00PM</code> of <code>PST (Pacific Standard Time)</code>
            <br>
            <a href="/PST/1500">sharetime.zone/PST/1500</a>
          </li>

          <li class="my-2">
            Share the time <code>11:00AM</code> of <code>Europe/Berlin</code>
            <br>
            <a href="/Europe/Berlin/1100">sharetime.zone/Europe/Berlin/1100</a>
          </li>

          <li class="my-2">
            Share the time <code>3:00PM</code> of <code>PST</code> (12-hour)
            <br>
            <a href="/PST/3pm">sharetime.zone/PST/3pm</a>
          </li>

          <li class="my-2">
            Share the time <code>4:45PM</code> of <code>Europe/Berlin</code> (12-hour)
            <br>
            <a href="/Europe/Berlin/4:45pm">sharetime.zone/Europe/Berlin/4:45pm</a>
          </li>
        </ul>
      </div>
    </section>
    <!-- Show current time in particular timezone -->
    <section class="p-2 mt-2">
      <h2 class="title is-4">
        Show current time in particular timezone
      </h2>
      <div>
        <p class="has-text-weight-bold">
          Examples
        </p>
        <ul>
          <li class="my-2">
            See the time <b><i>right now</i></b> in <code>PST (Pacific Standard Time)</code>
            <br>
            <a href="/PST/now">sharetime.zone/PST/now</a>
          </li>

          <li class="my-2">
            See the time <b><i>right now</i></b> in <code>Europe/Berlin</code> timezone
            <br>
            <a href="/Europe/Berlin/now">sharetime.zone/Europe/Berlin/now</a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
</script>
