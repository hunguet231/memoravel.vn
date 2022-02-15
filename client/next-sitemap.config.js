const siteUrl = "https://memoravel.vn";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    "/manage/*",
    "/checkout",
    "/cart",
    "/order/*",
    "/order",
    "/server-sitemap.xml",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/manage/*", "/checkout", "/cart", "/order/*", "/order"],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/sitemap.xml`,
    ],
  },
};
