import { NextRequest, NextResponse } from "next/server"
import { getCheckoutURL } from "@/lib/lemonsqueezy"

/**
 * POST /api/checkout
 *
 * 체크아웃 URL을 생성하는 API 엔드포인트입니다.
 * 프론트엔드에서 "Get Access" 버튼 클릭 시 호출됩니다.
 *
 * 요청 바디:
 * - email (선택): 사용자 이메일 (pre-fill 용도)
 * - name (선택): 사용자 이름 (pre-fill 용도)
 *
 * 응답:
 * - url: Lemon Squeezy 체크아웃 페이지 URL
 */
export async function POST(req: NextRequest) {
  try {
    // 요청 바디 파싱
    const body = await req.json().catch(() => ({}))
    const { email, name } = body as { email?: string; name?: string }

    // 체크아웃 URL 생성
    const checkoutUrl = await getCheckoutURL({ email, name })

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "체크아웃 URL 생성에 실패했습니다." },
        { status: 500 }
      )
    }

    // 성공 응답
    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    console.error("[Checkout API Error]", error)

    // 에러 메시지 추출
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
