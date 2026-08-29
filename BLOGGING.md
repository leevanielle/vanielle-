# Vanielle.io journal playbook

The journal is the proof layer of the site: show how Vanielle thinks before asking a reader to buy the book, join the field notes, or start a conversation.

## The four editorial rooms

1. **Agentic AI in real systems** — what works in production, where agents fail, evaluation, boundaries, and human review.
2. **The CTO operating system** — engineering leadership, decisions, team design, technical debt, and the ideas behind the book.
3. **Careers behind the curtain** — hiring signals, interviews, seniority, influence, and practical advice people can use immediately.
4. **Building across cultures** — founder life, language, identity, travel, and the translation work inside global teams.

These are deliberately broad enough to sustain years of writing but specific enough that readers understand the promise.

## A sustainable cadence

- Publish one substantial note every two weeks.
- Send the note to the newsletter on publication day.
- Pull one diagram, sharp paragraph, or counterintuitive claim from it for X and Threads.
- End social posts with the insight, then link to the complete note. Avoid generic “new post” announcements.

## Strong first articles

- Where agentic systems actually break
- The CTO as a single point of failure
- What hiring panels discuss after you leave
- The translation tax inside cross-cultural teams
- From frontend to agents: what changes and what does not
- How to tell whether an AI prototype belongs in production

The first four create a clean bridge between Vanielle’s technical authority, the book, and the human perspective that makes the work distinctive.

## Publish a note

Create a Markdown file in `src/content/blog/`:

```md
---
title: Your clear, specific title
author: Vanielle Lee
pubDatetime: 2026-08-29T09:00:00Z
draft: false
featured: true
tags:
  - agentic-ai
  - engineering
description: One sentence that tells the reader exactly what they will learn.
---

Write the note here.
```

The homepage and `/blog/` update automatically from published files. Set `draft: true` while working privately. Use one primary tag from the four editorial rooms and, when useful, one narrower secondary tag.

## Writing rule

Lead with an observed scene, system, failure, decision, or artifact. Explain what it reveals. Give the reader a model they can reuse. The site should demonstrate the claim before it asks the reader to trust it.
