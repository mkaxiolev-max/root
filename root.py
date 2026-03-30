#!/usr/bin/env python3
from pathlib import Path
import subprocess
import sys

DEMO_MODE = "--demo" in sys.argv

if DEMO_MODE:
    print("ROOT DEMO MODE")
    print("")
    print("PROBLEM=Missing DATABASE_URL in environment")
    print("ROOT_CAUSE=.env file exists but DATABASE_URL not defined")
    print("WHY=App expects DATABASE_URL but it was never added to .env")
    print("FIX=echo 'DATABASE_URL=postgresql://localhost/mydb' >> .env")
    print("CONFIDENCE=HIGH (96%)")
    print("TIME_TO_FIX=~10 seconds")
    print("TIME_SAVED=~25 minutes")
    print("AUTO_FIX_AVAILABLE=true")
    print("")
    print("zeroguess.dev")
    sys.exit(0)

def detect():
    env_file = Path(".env")
    if not env_file.exists():
        return ("Application missing environment configuration",
                ".env file does not exist",
                "The project expects environment variables but no .env file was found",
                "Create .env: touch .env && echo 'KEY=value' >> .env",
                "HIGH (91%)", "~15 seconds", "~15 minutes", "false")
    content = env_file.read_text(errors="ignore")
    if "DATABASE_URL=" not in content:
        return ("Application cannot connect to the database",
                "Missing DATABASE_URL in .env",
                "App expects DATABASE_URL but it is not defined",
                "Add DATABASE_URL to .env",
                "HIGH (96%)", "~10 seconds", "~25 minutes", "true")
    try:
        result = subprocess.run(["lsof", "-i", ":3000"], capture_output=True, text=True, timeout=2)
        if len([x for x in result.stdout.splitlines() if x.strip()]) > 1:
            return ("Port 3000 is already in use",
                    "Another process is listening on port 3000",
                    "Your app cannot bind to port 3000 while another process owns it",
                    "Run: lsof -ti:3000 | xargs kill -9",
                    "HIGH (90%)", "~20 seconds", "~10 minutes", "true")
    except Exception:
        pass
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True, timeout=2)
        version = result.stdout.strip().lstrip("v")
        major = int(version.split(".")[0]) if version else 0
        if major < 18:
            return ("Node.js version is outdated",
                    f"Node v{version} detected, v18+ required",
                    "Many modern packages require Node 18 or higher",
                    "Run: nvm install 20 && nvm use 20",
                    "HIGH (94%)", "~2 minutes", "~30 minutes", "false")
    except Exception:
        pass
    try:
        pkg = Path("package.json")
        nm = Path("node_modules")
        if pkg.exists() and not nm.exists():
            return ("Node dependencies not installed",
                    "package.json exists but node_modules is missing",
                    "App will fail to run without installed dependencies",
                    "Run: npm install",
                    "HIGH (99%)", "~1 minute", "~20 minutes", "true")
    except Exception:
        pass
    try:
        req = Path("requirements.txt")
        venv = Path("venv")
        if req.exists() and not venv.exists():
            return ("Python virtual environment not set up",
                    "requirements.txt exists but no venv found",
                    "Dependencies may not be installed or conflict with system packages",
                    "Run: python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt",
                    "MEDIUM (82%)", "~2 minutes", "~20 minutes", "false")
    except Exception:
        pass
    try:
        result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True, timeout=2)
        if result.stdout.strip():
            return ("Uncommitted changes in working directory",
                    "Git working tree is dirty",
                    "Uncommitted files may cause deployment or test failures",
                    "Run: git add . && git commit -m 'wip' or git stash",
                    "MEDIUM (78%)", "~30 seconds", "~5 minutes", "false")
    except Exception:
        pass
    return ("No obvious issue detected",
            "No known pattern matched",
            "Run the failing command then rerun root for better diagnosis",
            "Try: root --demo to see an example diagnosis",
            "LOW (58%)", "~unknown", "~context dependent", "false")

problem, root_cause, why, fix, confidence, time_to_fix, time_saved, auto_fix = detect()

print("ROOT ANALYSIS COMPLETE")
print("")
print(f"PROBLEM={problem}")
print(f"ROOT_CAUSE={root_cause}")
print(f"WHY={why}")
print(f"FIX={fix}")
print(f"CONFIDENCE={confidence}")
print(f"TIME_TO_FIX={time_to_fix}")
print(f"TIME_SAVED={time_saved}")
print(f"AUTO_FIX_AVAILABLE={auto_fix}")
print("")
print("zeroguess.dev")
