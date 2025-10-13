import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const __dirname = path.resolve();

const noticePath = path.join(__dirname, 'src/content/notice.md');
const outputDir = path.join(__dirname, 'static/content');
const outputPath = path.join(outputDir, 'notice.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  const fileContent = fs.readFileSync(noticePath, 'utf8');
  const { data } = matter(fileContent);

  const required = ['type', 'apps', 'title'];
  const missing = required.filter((key) => !data[key]);

  if (missing.length > 0) {
    console.warn(`⚠️ Missing fields in notice.md: ${missing.join(', ')}`);
    console.warn('Notice will not be shown because not all fields are set.');

    fs.writeFileSync(outputPath, JSON.stringify({ active: false }, null, 2));
  } else {
    const formatted = {
      ...data,
      apps: data.apps.split(',').map((a) => a.trim()),
      active: true,
    };

    fs.writeFileSync(outputPath, JSON.stringify(formatted, null, 2));
    console.log('✅ Notice JSON generated successfully at:', outputPath);
  }
} catch (err) {
  console.error('❌ Error reading notice.md:', err);
  fs.writeFileSync(outputPath, JSON.stringify({ active: false }, null, 2));
}
