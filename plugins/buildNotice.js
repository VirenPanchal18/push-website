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

  const required = ['id', 'type', 'apps', 'env', 'title', 'bodytext'];
  const missing = required.filter((key) => !data[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required fields in notice.md: ${missing.join(', ')}`
    );
  }

  const formatted = {
    ...data,
    apps: data.apps.split(',').map((a) => a.trim()),
  };

  fs.writeFileSync(outputPath, JSON.stringify(formatted, null, 2));

  console.log('✅ Notice JSON generated successfully at:', outputPath);
} catch (err) {
  console.error('❌ Error generating notice.json:', err);
  process.exit(1);
}
