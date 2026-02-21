const fs = require('fs');
const path = require('path');

const ecosystemAppsListFile = path.join(
  __dirname,
  '../src/config/EcosystemAppsList.ts'
);
const appOfTheWeekFile = path.join(
  __dirname,
  '../static/content/appoftheweek.json'
);
const mainTranslationFile = path.join(
  __dirname,
  '../static/locales/en/translation.json'
);

// Ensure static/content directory exists
const contentDir = path.join(__dirname, '../static/content');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

console.log(
  'ℹ️  EcosystemAppsList.ts is manually maintained with translation keys'
);

// Read translation files
let mainTranslations = {};

try {
  const mainContent = fs.readFileSync(mainTranslationFile, 'utf-8');
  mainTranslations = JSON.parse(mainContent);
} catch (error) {
  console.warn('⚠️  Could not read main translation file:', error.message);
}

// Helper function to get translation value from key with fallback
const getTranslation = (key) => {
  if (!key) return null;

  const parts = key.split('.');

  // Fallback to main translation file
  let value = mainTranslations;
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return null;
    }
  }

  return typeof value === 'string' ? value : null;
};

// Read and parse EcosystemAppsList.ts to find app with appoftheweek: true
let appOfTheWeek = null;

try {
  const fileContent = fs.readFileSync(ecosystemAppsListFile, 'utf-8');

  // Check if appoftheweek field exists
  if (/appoftheweek:\s*true/i.test(fileContent)) {
    const lines = fileContent.split('\n');
    let inAppObject = false;
    let braceCount = 0;
    let currentApp = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('{') && !inAppObject) {
        inAppObject = true;
        braceCount = 1;
        currentApp = [line];
        continue;
      }

      if (inAppObject) {
        currentApp.push(line);

        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        braceCount += openBraces - closeBraces;

        if (braceCount === 0) {
          const appText = currentApp.join('\n');

          if (/appoftheweek:\s*true/i.test(appText)) {
            const getValue = (key) => {
              const regex = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`, 'i');
              const match = appText.match(regex);
              return match ? match[1] : null;
            };

            const getBoolean = (key) => {
              const regex = new RegExp(`${key}:\\s*(true|false)`, 'i');
              const match = appText.match(regex);
              return match ? match[1] === 'true' : false;
            };

            const getArray = (key) => {
              const regex = new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`, 'i');
              const match = appText.match(regex);
              if (match) {
                return match[1]
                  .split(',')
                  .map((item) => item.trim().replace(/['"]/g, ''));
              }
              return [];
            };

            const nameKey = getValue('nameKey');
            const descriptionKey = getValue('descriptionKey');
            const spotlighttextKey = getValue('spotlighttextKey');

            const name = getTranslation(nameKey) || getValue('name');
            const description =
              getTranslation(descriptionKey) || getValue('description');
            const spotlighttext =
              getTranslation(spotlighttextKey) || getValue('spotlighttext');

            appOfTheWeek = {
              name: name,
              description: description,
              icon: getValue('icon'),
              bgImage: getValue('bgImage'),
              bgGradientColor: getValue('bgGradientColor'),
              tags: getArray('tags'),
              twitterId: getValue('twitterId'),
              href: getValue('href'),
              titleColor: getValue('titleColor'),
              descriptionColor: getValue('descriptionColor'),
              tagsColor: getValue('tagsColor'),
              appoftheweek: true,
              spotlighttext: spotlighttext,
              featured: getBoolean('featured'),
            };

            Object.keys(appOfTheWeek).forEach((key) => {
              if (
                appOfTheWeek[key] === null ||
                appOfTheWeek[key] === undefined
              ) {
                delete appOfTheWeek[key];
              }
            });

            break;
          }

          inAppObject = false;
          currentApp = [];
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Error reading EcosystemAppsList.ts:', error.message);
  process.exit(1);
}

if (appOfTheWeek) {
  fs.writeFileSync(appOfTheWeekFile, JSON.stringify(appOfTheWeek, null, 2));
  console.log('✅ Generated appoftheweek.json with app:', appOfTheWeek.name);
} else {
  fs.writeFileSync(appOfTheWeekFile, JSON.stringify({}, null, 2));
  console.log(
    '⚠️  No app marked as appoftheweek - created empty appoftheweek.json'
  );
}
