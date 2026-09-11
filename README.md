# sast-dast-test

A minimal Next.js app used to test whether a CI pipeline's security scanning
actually catches vulnerable code before it ships.

## ⚠️ Warning

**This repository intentionally contains insecure code.** It is a sandbox for
testing SAST (static) and DAST (dynamic) security scanning in a CI/CD
pipeline — it is **not** a real application and must **never** be deployed
or reused in a production project.

Included on purpose, in `pages/api/lookup.js` and `pages/comment.js`:

- A hardcoded API key
- Command injection (`child_process.exec` with unsanitized input)
- Unsafe use of `eval()` on user-controlled input
- SQL injection via string concatenation
- Cross-site scripting (XSS) via unsanitized `dangerouslySetInnerHTML`

If a scanner (ESLint security rules, SonarQube, Semgrep, etc.) is working
correctly, it should flag every one of these.

## What's here

- `pages/index.js` — a clean "Hello, DevSecOps!" page (this is the only part
  that's actually meant to pass)
- `pages/api/lookup.js`, `pages/comment.js` — the intentionally vulnerable code
- `__tests__/index.test.js` — a unit test for the clean page
- `.eslintrc.json` — ESLint config with `eslint-plugin-security` enabled,
  acting as a lightweight SAST scanner
- `.github/workflows/ci.yml` — GitHub Actions workflow with two jobs:
  - **`sast`**: build → unit test → security lint (`eslint-plugin-security`).
    Expected to fail here, on purpose.
  - **`dast`**: builds the app, starts it locally inside the runner
    (`localhost:3000`), then runs an OWASP ZAP baseline scan against it.
    No external staging environment or account needed — it's fully
    self-contained. Expected to flag issues too.

## Running it locally

```bash
npm install
npm run build      # passes
npm test           # passes
npx eslint . --ext .js   # fails — flags the 5 issues above

# to try the DAST scan locally (requires Docker):
npm start &
docker run -t owasp/zap2docker-stable zap-baseline.py -t http://localhost:3000
```

## Roadmap

Not wired up yet, since it needs an external account/secret:

- SonarQube/SonarCloud scan — a fuller SAST option than ESLint
  (needs `SONAR_TOKEN` + `SONAR_HOST_URL` as GitHub secrets)

Still missing (deliberately, since this repo is never meant to actually
ship anywhere):

- A real staging/production environment
- A manual-approval gate before any real production deploy
