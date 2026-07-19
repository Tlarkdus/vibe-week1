# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Zero-build static webpage. Plain HTML/CSS/JS loaded directly by the browser — there is no bundler, package manager, transpiler, or test runner. Do not introduce a build step unless explicitly asked.

## Running

- Open `index.html` directly in a browser, or
- Serve locally (avoids file:// path issues): `python -m http.server 8000` then visit http://localhost:8000

There are no build, lint, or test commands — none are configured.

## Architecture

Three files, loaded in this order by `index.html`:

- `index.html` — markup. Interactive elements are wired by `id` (`nameInput`, `greetBtn`, `output`). `script.js` is a plain `<script>` at the end of `<body>` (no `type="module"`), so top-level names are global.
- `styles.css` — theme lives in `:root` CSS custom properties (`--bg`, `--accent`, etc.); reuse these variables rather than hardcoding colors.
- `script.js` — grabs elements by `id` and attaches event listeners. New interactive behavior follows the same pattern: add the element with an `id` in `index.html`, select it in `script.js`, attach a listener.

The DOM element `id` values are the contract between the HTML and JS — renaming one requires updating both files.
