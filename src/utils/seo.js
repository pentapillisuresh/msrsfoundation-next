export const updateMetaTags = (title, description, keywords) => {
  document.title = title || "MSRS Foundation - Transforming Communities. Empowering Lives.";
  
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description || "MAHA SHREE RUDRA SAMSTHANAM FOUNDATION is a Government-registered, CSR-eligible organization committed to delivering scalable, transparent, and high-impact social development initiatives across India.");
  }
  
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords && keywords) {
    metaKeywords.setAttribute('content', keywords);
  }
};

export const generateSitemap = () => {
  const pages = [
    '/', '/about', '/csr-projects', '/compliance', '/board-management',
    '/get-involved', '/knowledge-hub', '/digital-media', '/certificates',
    '/contact', '/donate', '/schedule-meeting'
  ];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>https://msrsfoundation.org${page}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${page === '/' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>`;
};