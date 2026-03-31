# ROOT — Reddit Launch Distribution Plan

## r/Python

**Title:** I built a Python CLI that tells you exactly what's wrong with your dev env (with confidence %)

**Body:**
```
Tired of blind debugging? ROOT does state-first diagnosis:

$ root
PROBLEM: Missing DATABASE_URL
ROOT_CAUSE: .env not loaded
FIX: Add DATABASE_URL to .env
CONFIDENCE: 97%
TIME_TO_FIX: 2m
AUTO_FIX: available

It reads your actual system state — processes, env vars, ports, files — and gives you the root cause + confidence score instead of making you grep through logs.

Free tier available. Pro adds auto-fix execution.

Site: https://zeroguess.dev
Install: curl -s https://root.axiolev.com/install.sh | bash

Built with Python, runs locally, no data leaves your machine on free tier.
```

---

## r/devops

**Title:** Root cause analysis CLI for broken dev environments — reads state, not logs

**Body:**
```
Most debugging tools ask you to read logs. ROOT reads your system state directly.

It checks: env vars, running processes, open ports, file presence, config validity — then gives you a structured diagnosis:

PROBLEM: Service not starting
ROOT_CAUSE: Port 5432 not bound (postgres not running)
FIX: docker-compose up postgres
CONFIDENCE: 94%

3 detection patterns in free tier. Pro adds higher confidence scoring and deeper diagnosis. Auto tier adds safe automatic fixes with Merkle-verified execution.

https://zeroguess.dev
```

---

## r/SideProject

**Title:** AXIOLEV ROOT — I quit my job to build a state-first dev diagnosis CLI

**Body:**
```
Six months of nights and weekends. ROOT is finally live.

The idea: stop making developers read logs. Read state instead.

Every "why is this broken" question is really a state question:
- Is the service running?
- Is the port bound?
- Is the env var set?
- Is the file present?

ROOT asks those questions programmatically and gives you an answer with a confidence score.

Free: 3 pattern types, local only
Pro ($49/mo): deeper diagnosis, priority patterns, higher confidence
Auto ($99/mo): safe auto-fix execution

I'd love brutal feedback. What would make you actually use this daily?

https://zeroguess.dev
Install: curl -s https://root.axiolev.com/install.sh | bash
```

---

## r/commandline

**Title:** ROOT — CLI that diagnoses broken dev envs in under 3 seconds

**Body:**
```
Show HN style demo:

$ root
⠋ Reading system state...
✓ Scanned: 847 env vars, 23 ports, 156 processes

PROBLEM: Missing DATABASE_URL
ROOT_CAUSE: .env not loaded in current shell
FIX: source .env || export DATABASE_URL=postgres://...
CONFIDENCE: 97%
TIME_TO_FIX: 2m
AUTO_FIX: available (Pro)

Single binary, curl install, zero config, no logs required.

https://zeroguess.dev
```

---

## Posting Schedule

| Platform | Day | Time (EST) |
|----------|-----|-----------|
| r/Python | Day 1 | 9am |
| r/SideProject | Day 1 | 12pm |
| r/devops | Day 2 | 9am |
| r/commandline | Day 2 | 2pm |
| Hacker News | Day 3 | 9am (weekday) |

## HN Submission

**Title:** ROOT – CLI that reads system state to diagnose broken dev environments

**URL:** https://zeroguess.dev

**Comment (for Show HN):**
ROOT diagnoses broken dev environments by reading system state instead of logs. It checks env vars, processes, ports, and files — then outputs a structured root cause with a confidence score. Free tier, curl install. Built this after spending too many hours debugging "why doesn't this work on my machine."
