---
description: Contributor guidance for Metaflow GSoC 2026 applicants
---

# GSoC Contributor Guidance

## Am I ready to apply?

If you have solid programming skills, can point to things you've built or
contributed to, and are genuinely interested in one of our
[project ideas](/internals/gsoc-2026) — yes, you're ready.

There is no "perfect" candidate. We're looking for people who can demonstrate
capability through their existing work, communicate clearly, and follow through
on commitments. You don't need to be an expert in every technology listed for a
project — but you do need to show that you can learn quickly and work
independently.

GSoC at Metaflow is competitive. Being honest about that upfront helps
everyone: it means we respect your time enough not to let you invest weeks in
an application without understanding what we're actually looking for.

## Before you reach out

Before posting in #gsoc or contacting mentors, take these steps first:

1. **Install Metaflow and run some flows.** Follow the
   [Getting Started](https://docs.metaflow.org/getting-started/install) guide.
   Run the [tutorials](https://docs.metaflow.org/getting-started/tutorials).
   Get a feel for how it works as a user.

2. **Read the [project ideas page](/internals/gsoc-2026).** Pick one or two
   projects that match your skills. Read the full description, follow the
   linked resources, look at the relevant code.

3. **Explore the codebase.** Clone the
   [Metaflow repo](https://github.com/Netflix/metaflow) and browse the areas
   relevant to the project you're interested in. Try to understand how the
   pieces fit together.

4. **Read the [Metaflow Contributing Guide](https://github.com/Netflix/metaflow/blob/master/CONTRIBUTING.md).**
   This covers how we work, our code review process, and our AI tool policy.

Doing this work upfront is not optional — it's what separates applicants who
are ready to contribute from those who are still browsing.

## Joining #gsoc

Join the [Metaflow community Slack](http://slack.outerbounds.co/) and post in
the **#gsoc** channel for all GSoC-related questions and discussions. Please do
not post GSoC questions in other channels.

### How to introduce yourself

When you first post, include the following. A few sentences per point is fine —
we value substance over length.

1. **Background** — What you study, your level (undergrad, masters, etc.),
   and relevant coursework or research.

2. **Evidence of relevant skills** — Link to things you've built or
   contributed to that relate to the project you're interested in: GitHub
   repos, merged PRs, deployed projects, published work. If you say you know
   TypeScript and VS Code extensions, show us an extension you've built. If
   you say you know Python and Docker, show us a project where you used them
   together. The more concrete, the better.

3. **Which project you're targeting and why you can execute it** — Name the
   specific [project idea](/internals/gsoc-2026). Tell us what you've already
   explored — which parts of the codebase you've read, what technical
   challenges you see, what your initial approach would be.

4. **What you've already done** — Have you set up Metaflow locally? Run
   flows? Looked at starter issues? Started a PR? We want to see that
   you've already invested effort, not that you're planning to.

### Top reasons applications are rejected

Being transparent about this helps you focus your effort:

1. **No prior contact with mentors before applying.** If we haven't
   interacted with you in #gsoc before your proposal arrives, we have no
   signal to evaluate you beyond the written proposal — and that's usually
   not enough.

2. **No code contributions.** Applicants who have opened a PR — even an
   unmerged one — are far stronger than those who haven't touched the
   codebase.

3. **Proposal doesn't demonstrate understanding of the project.** Restating
   the project description back to us is not the same as showing you've
   thought through the technical challenges.

4. **Skills don't match the project.** Expressing interest in a project
   without demonstrating relevant capability doesn't give us what we need
   to evaluate your application.

5. **Large PRs with no prior discussion.** Submitting a 500+ line feature
   PR that was never discussed with maintainers is not a positive signal —
   it shows you can write code, but not that you can collaborate. A
   well-scoped fix on a real issue, with good communication throughout,
   tells us much more.

### Communication norms

- **Be patient.** Mentors are volunteers with day jobs. Allow a couple of
  business days for responses. If you haven't heard back after that, a polite
  follow-up is fine.

- **Ask in public.** Use the #gsoc channel, not DMs, so that other
  applicants (and other mentors) can benefit from the answers. The exception
  is proposal drafts — share those via email, not in the channel.

- **Ask specific questions.** "How do I get started?" after reading none of
  the docs is not a good question. "I've been reading through the
  `ServiceMetadataProvider` and I'm not sure how `_get_object_internal`
  handles pagination — does it?" is a great one.

- **Skip gendered titles.** Please don't use "Sir" or "Ma'am" when
  addressing mentors or other contributors. First names are fine.

## Your proposal

Submit your application to `help@metaflow.org` with the subject
**\[GSOC 2026 Proposal\]: Your Name**.

If you're applying to one of our listed project ideas, structure your proposal
with the sections below. If you're proposing your own idea, talk to mentors
first to make sure it's a good fit, then use the same structure.

### Proposal template

**1. About you**

- Name, university, program, year
- Relevant technical background (with links to projects, PRs, profiles)
- Open-source contribution history (if any)
- Why this project interests you specifically

**2. Project description**

- Which project idea you're applying to (or your own idea)
- Your understanding of the problem and why it matters
- High-level system design and key modules

**3. Technical approach**

- How you plan to implement the project, broken down by component
- Key technical decisions you'll need to make and your current thinking on them
- What you've already explored in the codebase or prototype work you've done

**4. Potential challenges and mitigation**

- What are the hardest parts of this project?
- What could go wrong, and how would you handle it?
- If you fall behind schedule, what would you cut and what would you keep?

**5. Weekly timeline**

A week-by-week schedule covering the full GSoC period, with:
- Clear deliverables for each week
- A midterm milestone that represents a meaningful, testable checkpoint
- A code-freeze point at least one week before the final deadline, leaving
  time for documentation, testing, and cleanup

**6. Other commitments**

- Exams, part-time jobs, vacations, or anything else that overlaps with the
  GSoC period
- Expected hours per week you can dedicate to the project

Being upfront about commitments is a positive signal — it shows maturity and
helps us plan together. Hiding conflicts and missing deadlines later is not.

### Scope guidance

A common mistake is proposing too much. A well-scoped proposal that you can
actually complete is far stronger than an ambitious one that falls apart
halfway through. As Google's GSoC guide puts it: "Under-scoping is an
annoyance. Incomplete is a disaster."

If your timeline feels tight, it probably is. Build in buffer.

## Pre-application contribution

Open a pull request on a starter issue on the
[Metaflow GitHub repo](https://github.com/Netflix/metaflow). This is one of
the strongest signals in your application.

Your PR does not have to be merged — what matters is that it demonstrates you
can read the codebase, write reasonable code, and engage with code review
feedback.

### What makes a good starter PR

Start with an existing issue — look through the
[open issues](https://github.com/Netflix/metaflow/issues) for ones tagged
`good first issue`, or ask in #gsoc if you're having trouble finding one that
fits. A well-scoped bug fix or small improvement tied to a real issue tells us
far more than a large, unsolicited feature.

**Before you start coding**, check whether someone else is already working on
the issue (look for linked PRs or comments claiming it). If there's no
activity, leave a comment saying you plan to work on it.

### What to avoid

- **Trivial PRs.** Fixing a typo or rewording a comment is not a meaningful
  contribution. We want to see that you can navigate the codebase and solve a
  real problem, even a small one.

- **Massive unsolicited features.** Do not show up with a 500+ line PR
  implementing a new feature that was never discussed with maintainers. Large
  features require design discussion *before* code is written — they affect
  architecture, maintenance burden, and project direction. A surprise feature
  PR, no matter how well-written, creates review burden without alignment.

- **Duplicate work.** Before starting on an issue, check if someone already
  has an open PR for it. Multiple people independently building the same
  feature wastes everyone's time.

- **Docs PRs to the wrong repo.** Documentation lives in
  [metaflow-docs](https://github.com/Netflix/metaflow-docs), not the main
  Metaflow repo.

If you want to tackle something larger than a starter issue, **talk to a
mentor in #gsoc first.** A quick conversation about scope and approach before
you write code will save you days of wasted effort and give us confidence
that you can collaborate effectively — which is itself a strong signal.

## AI tool policy

If you use AI tools (LLMs, code generators, copilots, etc.) for any part of
your contribution or proposal, you must disclose it and be able to explain
every line you submit. This applies to both code and written proposals.

Proposals or PRs that appear to be unreviewed AI output will be rejected.
Using AI to assist your work is fine; using it to replace your understanding
is not.

## If you're selected: what to expect

These expectations apply during the GSoC coding period.

- **Weekly updates.** Post a short summary in #gsoc each week covering what
  you accomplished, what you're working on next, and anything blocking you.
  A few sentences is enough.

- **Say something when you're stuck.** Getting stuck is normal and expected.
  Debugging a problem silently for a week when your mentor could unblock you
  in five minutes is not a good use of anyone's time. Ask early.

- **Communicate proactively.** If something comes up — an exam, an illness,
  a vacation — let your mentor know in advance. Surprises are far worse than
  schedule adjustments.

- **Treat mentors as collaborators, not managers.** Your mentor is your
  advocate — they want you to succeed. But they can only help if you
  communicate openly and do the work. GSoC is self-directed; your mentor
  provides guidance, not a task list.

## Dev environment setup

Show us that your environment is working. A screenshot of a successful run in
the [Metaflow UI](/getting-started/devstack) is a good way to do this. Include
it in your #gsoc introduction or your proposal.
