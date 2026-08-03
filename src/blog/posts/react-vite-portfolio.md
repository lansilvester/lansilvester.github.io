---
title: "Building a Fast Portfolio Site with React & Vite"
date: 2026-05-11
excerpt: "A short walkthrough of how this portfolio is built and why Vite + static hosting is a great fit for personal sites."
tags: ["React", "Vite"]
lang: en
featured: false
---

This very site is a great example of how far you can go with **static hosting and modern tooling**.

## Why React + Vite?

Vite gives you instant dev server startup and fast production builds. React makes it easy to organize the UI into reusable components — useful when you want a dashboard to edit content, like this site has.

## Keeping content editable

All text and data live in JSON files, which can be edited through a CMS (Decap CMS here). A GitHub Actions workflow rebuilds and redeploys the site automatically on every change.

## Performance basics

- Lazy-load every section below the fold
- Lazy-load images with explicit dimensions
- Respect `prefers-reduced-motion`
- Keep the home bundle small

## Next steps

Add a blog, a video gallery, and more real projects. The site should grow with you — not the other way around.
