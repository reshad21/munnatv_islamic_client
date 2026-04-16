const fs = require('fs');
const file = 'src/lib/apiRequest.ts';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(
  'headers.set("Authorization", `Bearer ${token}`);',
  'const cleanToken = token.replace(/^[\\"\\\']|[\\"\\\']$/g, "");\n      headers.set("Authorization", `Bearer ${cleanToken}`);'
);
fs.writeFileSync(file, code);
