# ROOT

Know exactly what's wrong. Instantly.

State → diagnosis → fix. Zero guessing.

## Install
```bash
curl -s https://root-jade-kappa.vercel.app/install.sh | bash
```

## Usage
```bash
root          # diagnose your current directory
root --demo   # see an example diagnosis
```

## Example output
```
PROBLEM=Missing DATABASE_URL
ROOT_CAUSE=.env not loaded
FIX=Add DATABASE_URL to .env
CONFIDENCE=HIGH (96%)
TIME_TO_FIX=~10 seconds
TIME_SAVED=~25 minutes
AUTO_FIX_AVAILABLE=true
```

Free. No account. No password.

→ https://zeroguess.dev
