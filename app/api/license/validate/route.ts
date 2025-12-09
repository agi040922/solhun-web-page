import { NextRequest, NextResponse } from "next/server"
import { validateLicenseKey } from "@/lib/lemonsqueezy"

/**
 * POST /api/license/validate
 *
 * 라이선스 키를 검증하는 API 엔드포인트입니다.
 * CLI 도구나 앱에서 라이선스 키 입력 시 호출됩니다.
 *
 * 요청 바디:
 * - licenseKey (필수): 검증할 라이선스 키
 *
 * 응답:
 * - valid: 라이선스 유효 여부
 * - message: 결과 메시지
 * - license: 라이선스 정보 (유효한 경우)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { licenseKey } = body as { licenseKey?: string }

    // 라이선스 키 필수 체크
    if (!licenseKey) {
      return NextResponse.json(
        { valid: false, message: "라이선스 키를 입력해주세요." },
        { status: 400 }
      )
    }

    // Lemon Squeezy API로 검증
    const result = await validateLicenseKey(licenseKey)

    if (!result.valid) {
      return NextResponse.json({
        valid: false,
        message: result.error || "유효하지 않은 라이선스 키입니다.",
      })
    }

    // 유효한 라이선스
    return NextResponse.json({
      valid: true,
      message: "라이선스가 유효합니다.",
      license: {
        status: result.licenseKey?.status,
        activationLimit: result.licenseKey?.activationLimit,
        activationUsage: result.licenseKey?.activationUsage,
        expiresAt: result.licenseKey?.expiresAt,
      },
      product: {
        name: result.meta?.productName,
        variant: result.meta?.variantName,
      },
      customer: {
        name: result.meta?.customerName,
        email: result.meta?.customerEmail,
      },
    })
  } catch (error) {
    console.error("[License Validate Error]", error)
    return NextResponse.json(
      { valid: false, message: "라이선스 검증 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
