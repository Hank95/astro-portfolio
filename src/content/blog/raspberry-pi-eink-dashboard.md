---
title: "From Dusty Raspberry Pi to Full-Stack Enlightenment"
description: "How a simple e-ink calendar project turned into my own mini data center. Building an ESP32 weather station, FastAPI backend, and always-on e-ink display."
publishedAt: "2026-01-25"
author: "Henry Pendleton"
tags: ["raspberry-pi", "esp32", "python", "fastapi", "hardware"]
featured: true
---

*How a simple e-ink calendar project turned into my own mini data center*

## The Dream That Died (And Why I Came Back To It)

When I first got into web development, I had this romantic idea: host my own website on a Raspberry Pi.

My code. My hardware. My tiny, humming box in the corner serving pages to the world.

Then I discovered the rest of the sentence: SSL certs, port forwarding, DNS, security, DDoS, patching... and the not-so-small risk of turning my home network into target practice. I shelved the Pi and did what everyone does: deployed to The Cloud and moved on.

Fast forward a few years. I'm working as a full-stack developer, shipping production code in React, Node, APIs, databases — real stuff used by real people. But there's a funny thing about professional development: you usually own a slice of the stack, not the whole thing. Code goes in, magic happens, users get a response.

Then one cold, rainy day I found that same Raspberry Pi in a box in my closet.

And this time, instead of hosting a public website, I decided to build something just for me.

## What I Actually Built

This started as "just an e-ink calendar." It turned into a full little ecosystem running in my living room.

Here's the current setup:

```
┌───────────────┐   WiFi   ┌───────────────┐   SPI   ┌────────────────┐
│    ESP32      │  ─────►  │ Raspberry Pi  │  ───►  │  E-Ink Display │
│  + temp/humid │          │ + FastAPI     │        │  (7.5")        │
└───────────────┘          │ + SQLite      │        └────────────────┘
                           │ + Web UI      │
                           └───────────────┘
                                  │
                                  ▼
                           Any device on my
                              home Wi-Fi
```

What it does right now:

- Reads temperature and humidity from an ESP32 sensor node
- Streams that data over Wi-Fi to the Raspberry Pi
- Stores everything in a local SQLite database
- Serves a web dashboard I can open from my laptop or phone
- Renders a clean, always-on layout to a 7.5" e-ink display on my desk

Total cost: under $100. Total control: every. single. layer.

## The ESP32: My Tiny Weather Station

On the hardware side, I built a small indoor "weather station":

- ESP32 dev board
- DHT11 temperature/humidity sensor
- Tiny OLED screen for local readouts

Every minute, the ESP32:

1. Reads the sensor
2. Shows the reading on the OLED
3. Sends a JSON payload to the Pi over Wi-Fi

Watching that POST request land in my own logs on my own hardware is surprisingly satisfying.

## The Raspberry Pi: My Personal Server Rack

The Raspberry Pi is the "data center":

- A FastAPI server to accept sensor data
- A SQLite file acting as the database
- A web dashboard accessible from any device on my network
- A driver system that renders layouts onto the e-ink display

No Docker swarm, no load balancers, no managed anything. Just a $50 single-board computer quietly running a full stack.

## The Dashboard: A Window Into My Living Room Climate

The dashboard is intentionally simple:

- Plain HTML + CSS + vanilla JS
- Live-updating temperature/humidity cards
- A 24-hour temperature graph powered by a lightweight chart library
- Auto-refresh every 30 seconds

It's something I actually use every day.

## The E-Ink Display: Always-On, Zero-Noise

The Waveshare 7.5" e-ink panel gives the whole project a polished, always-on look.

I built a small widget/layout system so I can define sections like:

- Indoor climate
- Weather
- Clock
- Stats / history sparkline

The Pi renders the whole layout to an image using Pillow and refreshes the display every few minutes.

The effect is a clean, quiet "status board" that just exists on my desk.

## The Moment Everything Clicked

One evening I glanced at the dashboard on my phone and saw a sharp spike in humidity.

I had just stepped out of the shower.

And for the first time, I could trace that spike across the entire stack:

- The DHT11 read a higher humidity value
- The ESP32 turned it into JSON
- An HTTP POST hit my FastAPI endpoint
- SQLite wrote a new row
- My dashboard fetched updated data
- JavaScript re-rendered the chart

It connected the physical world, the software world, and the display world — end-to-end — on a system I actually built.

## The Education I Didn't Know I Needed

Three years of professional development taught me how to ship software. This project reminded me what's happening underneath all the abstractions we use every day.

**HTTP isn't magic.** It's plain text over a socket. Watching raw requests arrive in my logs demystifies the whole thing.

**A database can be one file.** SQLite is a single `.db` file that I can copy, inspect, email, or query.

**Frontend and backend share the same DNA.** They're just runtimes exchanging text.

**The full stack goes deeper and higher than diagrams.** Down to GPIO pins, up to UI polish.

Owning the whole pipeline — even in a small project — makes you a better developer anywhere in it.

## What's Next

- More ESP32 sensor nodes in other rooms
- Push alerts when temperature/humidity leaves a safe range
- Long-term trend analysis
- Additional e-ink displays around the house

But honestly, the biggest win is the clarity this project gave me. The cloud is abstract; this setup is tangible.

## If You've Got a Dusty Pi Lying Around...

Here's my pitch:

**Don't expose it to the internet. Start by exposing it to yourself.**

Your home network is a perfect sandbox. Build something useful, something visual, something you can touch.

The dusty Pi in your closet is more than a toy — it's a zero-cost, zero-risk lab for leveling up as a developer.

Go blow the dust off. See what happens.

*The total cost of this project was under $100. The education was priceless.*

## TL;DR: How to Build This Yourself

A high-level summary of the build:

### Hardware

- Raspberry Pi
- ESP32
- DHT11 or DHT22 sensor
- Optional OLED
- Waveshare 7.5" e-ink display

### Software (Pi)

- FastAPI server
- SQLite
- Vanilla JS dashboard
- E-ink layout renderer
- systemd auto-start

### Software (ESP32)

- Read sensor
- Show locally
- Send JSON to Pi every 60s

### What You Get

- Local-only server
- Live dashboard
- Always-on e-ink display
- A visceral understanding of how the web actually works

## Tech Notes & Source Code

Full repository with setup instructions, wiring diagrams, and code:

[GitHub: eink-hub](https://github.com/Hank95/eink-hub)
