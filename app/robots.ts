import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/", "/admin/", "/test/"],
      },
    ],
    sitemap: "https://www.solhun.com/sitemap.xml",
  }
}
