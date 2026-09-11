// WARNING: this file intentionally contains insecure patterns
// for the purpose of testing whether CI security scanning catches them.
// Do not use any of this in a real project.

const { exec } = require('child_process');

// 1. Hardcoded secret
const API_KEY = 'REPLACE_ME_HARDCODED_SECRET_EXAMPLE_1234567890';

export default function handler(req, res) {
  const { host, userInput, query } = req.query;

  // 2. Command injection: user input passed directly to a shell command
  exec(`ping -c 1 ${host}`, (error, stdout) => {
    if (error) {
      res.status(500).json({ error: 'ping failed' });
      return;
    }

    // 3. Use of eval() on data that can come from the client
    const result = eval(userInput);

    // 4. SQL injection via raw string concatenation (simulated query builder)
    const sqlQuery = "SELECT * FROM users WHERE name = '" + query + "'";

    res.status(200).json({
      stdout,
      result,
      sqlQuery,
      apiKey: API_KEY,
    });
  });
}
