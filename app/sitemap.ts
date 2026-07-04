import { MetadataRoute } from "next"

// 실제 서비스 도메인은 www 로 리디렉트되므로 canonical/sitemap 모두 www 로 통일한다.
// (non-www 로 두면 Search Console 이 모든 URL 을 "리디렉션이 포함된 페이지"로 처리해 색인이 밀린다)
const baseUrl = "https://www.solhun.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // 실제 200 을 반환하는 공개 페이지만 등록한다.
  // (/products, /compare 는 page.tsx 가 없어 404 → 제외, /admin 은 robots 에서 차단)
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/compare/cli-agents`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/compare/antigravity-cursor`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}
