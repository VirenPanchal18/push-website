const fs = require('fs');
const path = require('path');

module.exports = function sitemapLlmsPlugin() {
  return {
    name: 'sitemap-llms-plugin',
    async postBuild({ outDir, siteConfig }) {
      const baseUrl = (siteConfig.url || '').replace(/\/$/, '');
      const sitemapPath = path.join(outDir, 'sitemap.xml');

      if (!fs.existsSync(sitemapPath)) {
        console.warn('[sitemap-llms-plugin] sitemap.xml not found, skipping.');
        return;
      }

      const extraUrls = ['/llms.txt', '/llms-full.txt'];
      const today = new Date().toISOString().split('T')[0];

      const entries = extraUrls
        .map(
          (u) =>
            `  <url>\n    <loc>${baseUrl}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>`
        )
        .join('\n');

      let xml = fs.readFileSync(sitemapPath, 'utf8');

      if (xml.includes(extraUrls[0])) {
        return;
      }

      xml = xml.replace('</urlset>', `${entries}\n</urlset>`);
      fs.writeFileSync(sitemapPath, xml, 'utf8');
      console.log(
        '[sitemap-llms-plugin] Injected llms.txt and llms-full.txt into sitemap.xml'
      );
    },
  };
};
