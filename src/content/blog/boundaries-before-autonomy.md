---
title: "Boundaries Before Autonomy: A Practical Rule for Agentic AI"
author: Vanielle Lee
pubDatetime: 2026-08-29T03:10:30Z
featured: true
draft: false
tags:
  - agentic AI
  - engineering
  - leadership
description: The safest way to give an AI agent more freedom is to make its boundaries, evidence, and escalation paths explicit first.
---

The fastest way to make an AI agent dangerous is to confuse freedom with intelligence.

An agent that can call more tools, touch more data, and take more actions may look impressive in a demo. That does not mean it is ready to operate inside a real company. In production, the important question is not, “How autonomous is it?” The important question is, “What happens when it is wrong?”

My rule is simple: **boundaries before autonomy**.

Before an agent earns more freedom, we should be able to describe where it may act, what evidence it must leave behind, and when it must stop and ask a human.

## Autonomy is not the product

Most teams do not need an agent with unlimited initiative. They need a reliable outcome.

A customer-support team wants a correct resolution. A finance team wants a reconciled record. An engineering team wants a safe deployment. Autonomy is only useful when it helps produce that result without creating a larger verification problem for everyone else.

This changes how I think about agent design. Instead of beginning with, “What can the model do?” I begin with four less glamorous questions:

1. What decision is the agent allowed to make?
2. Which tools and data may it use?
3. What evidence must it produce?
4. Which conditions require human judgment?

If those answers are vague, adding autonomy is usually adding uncertainty.

## Start with the failure surface

Every agent has a failure surface: the set of things that can go wrong and the damage each mistake can cause.

Sending a draft to a private review queue has a small failure surface. Sending an email to every customer has a large one. Suggesting a database query is different from running it. Preparing a refund is different from issuing it.

The model may perform the same reasoning in each case, but the surrounding system should not grant the same authority.

I separate an agent’s boundaries into four categories:

### Scope

What kind of task belongs to this agent? “Help with customer support” is not a boundary. “Classify inbound requests and draft a response using the approved knowledge base” is closer.

### Tools

Which actions can it take, and with what permissions? Read access and write access should be treated differently. So should reversible and irreversible actions.

### Resources

How much time, money, data, or compute may it consume? An agent without a budget is not autonomous. It is unmetered.

### Escalation

When should it stop? Low confidence is one reason. Conflicting evidence, sensitive data, unusual customer impact, or an action outside the normal pattern are others.

Boundaries do not make an agent less capable. They make its capability usable.

## Evidence before trust

The old software contract was input, code, output. Agentic systems add a less predictable layer of judgment in the middle. That means the surrounding system must make the judgment inspectable.

For any meaningful action, I want to know:

- What did the agent believe the user wanted?
- Which sources did it use?
- Which tool calls did it make?
- What changed as a result?
- What uncertainty remained?

This is not logging for the sake of logging. It is how a person reconstructs the decision without having to guess what happened inside the model.

An agent should leave a trail of evidence proportional to the consequence of its action. A low-risk classification may need a label and confidence score. A high-risk operational change may need cited inputs, a proposed diff, a reversible execution plan, and explicit approval.

Trust should grow from that evidence. It should not be declared in a prompt.

## “Human in the loop” is not a button

Teams often add an approval step and call the system safe. But a human cannot meaningfully review an action if the interface hides the relevant context or presents a hundred approvals that all look the same.

Good human review is designed around judgment. The reviewer needs to see what is unusual, what changed, what evidence supports the decision, and what happens next.

The system should also learn where human attention is valuable. If reviewers approve the same low-risk action for months, that may be a candidate for greater autonomy. If they repeatedly correct a certain class of decision, that boundary should stay tight—or become tighter.

This creates a more useful progression:

1. The agent observes.
2. The agent recommends.
3. The agent acts with approval.
4. The agent acts within explicit limits.
5. The agent earns wider limits through evidence.

Autonomy becomes a result of operational confidence, not a feature flag.

## The practical test

Before I let an agent take an action, I ask one question:

> If this goes wrong at 2 a.m., will the next person know what happened, contain the damage, and recover without reading the model’s mind?

If the answer is no, the system needs better boundaries.

The most impressive agent is not the one that acts without people. It is the one that helps people delegate judgment without losing control of the outcome.
