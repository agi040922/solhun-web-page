"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

// GA4 측정 ID. 측정 ID는 페이지 소스에 노출되는 공개값이라 코드에 기본값으로 둔다.
// (Vercel 환경변수 NEXT_PUBLIC_GA_ID 로 덮어쓸 수 있음)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-PZQ8TN5S0Y"

// 실제 프로덕션 도메인에서만 추적한다 → localhost/프리뷰(vercel.app) 트래픽이 GA에 섞이지 않는다.
const PROD_HOSTS = ["www.solhun.com", "solhun.com"]

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * App Router 는 client-side soft navigation 을 하므로, 초기 로드 page_view 만으로는
 * 페이지 이동이 집계되지 않는다. pathname/searchParams 변경 시 page_view 를 수동 전송한다.
 * (init 에서 send_page_view:false 로 중복 집계 방지)
 */
function GaRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.gtag !== "function") return
    const query = searchParams?.toString()
    const url = query ? `${pathname}?${query}` : pathname
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  // 클라이언트에서 프로덕션 도메인일 때만 GA 를 로드한다.
  useEffect(() => {
    if (GA_ID && PROD_HOSTS.includes(window.location.hostname)) {
      setEnabled(true)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GaRouteTracker />
      </Suspense>
    </>
  )
}
