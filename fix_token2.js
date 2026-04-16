const fs = require('fs');
const file = 'src/lib/apiRequest.ts';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(
  /const cleanToken = token\.replace[^\n]+;/g,
  'const cleanToken = token.replace(/^[\\"\\\']|[\\"\\\']$/g, "");\n      if (cleanToken && cleanToken !== "undefined" && cleanToken !== "null") {'
);
code = code.replace(
  'headers.set("Authorization", `Bearer ${cleanToken}`);',
  'headers.set("Authorization", `Bearer ${cleanToken}`);\n      }'
);
fs.writeFileSync(file, code);
