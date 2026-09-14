// Fixed version: input is validated, no shell injection, no eval, no hardcoded secret

const { execFile } = require('child_process');

// Secret now comes from environment variables, not hardcoded in source
const API_KEY = process.env.STRIPE_API_KEY;

// Only allow safe hostname characters — blocks shell metacharacters entirely
const HOSTNAME_PATTERN = /^[a-zA-Z0-9.-]+$/;

export default function handler(req, res) {
  const { host, query } = req.query;

  if (!host || !HOSTNAME_PATTERN.test(host)) {
    return res.status(400).json({ error: 'Invalid host' });
  }

  // execFile with an argument array — no shell involved, no injection possible
  execFile('ping', ['-c', '1', host], (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: 'ping failed' });
    }

    // Parameterized query instead of string concatenation (example — wire up
    // to your actual DB driver's parameter binding, e.g. mysql2 or pg)
    const sqlQuery = 'SELECT * FROM users WHERE name = ?';
    const sqlParams = [query];

    res.status(200).json({
      stdout,
      sqlQuery,
      sqlParams,
      apiKeyConfigured: Boolean(API_KEY),
    });
  });
}
