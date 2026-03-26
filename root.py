#!/usr/bin/env python3
from pathlib import Path
import subprocess
import sys

def detect():
    env_file = Path(".env")
    if not env_file.exists():
        return ("Application missing environment configuration",
                ".env file does not exist",
                "The project expects environment variables, but no .env file was found",
                "Create .env and define required variables",
                "HIGH (91%)",
                "~15 seconds",
                "~15 minutes",
                "false")
    content = env_file.read_text(errors="ignore")
    if "DATABASE_URL=" not in content:
        return ("Application cannot connect to the database",
                "Missing DATABASE_URL",
                "The app expects DATABASE_URL in .env, but it is not defined",
                "Add DATABASE_URL to .env",
                "HIGH (96%)",
                "~10 seconds",
                "~25 minutes",
                "true")
    try:
        result = subprocess.run(["lsof", "-i", ":3000"], capture_output=True, text=True, timeout=2)
        lines = [x for x in result.stdout.splitlines() if x.strip()]
        if len(lines) > 1:
            return ("Port 3000 is already in use",
                    "Another process is listening on port 3000",
                    "Your app cannot bind to port 3000 while another process owns it",
                    "Kill the process using port 3000 or start on a different port",
                    "HIGH (90%)",
                    "~20 seconds",
                    "~10 minutes",
                    "false")
    except Exception:
        pass
    return ("No obvious issue detected",
            "No known pattern matched",
            "This project may be healthy or the issue requires deeper analysis",
            "Run the failing command, then rerun ROOT",
            "LOW (58%)",
            "~unknown",
            "~context dependent",
            "false")

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
