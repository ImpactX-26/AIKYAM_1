const fs = require('fs');
const path = require('path');

const pages = ['Dashboard', 'Login', 'Register', 'Profile', 'AiGuide'];

pages.forEach(page => {
  const dir = path.join(__dirname, 'frontend/src/pages');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const file = path.join(dir, `${page}.tsx`);
  fs.writeFileSync(file, `import React from 'react';

const ${page} = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">${page}</h1>
    </div>
  );
};

export default ${page};
`);
});
console.log('Pages created.');
