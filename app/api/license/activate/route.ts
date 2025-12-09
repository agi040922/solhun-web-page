import { NextRequest, NextResponse } from "next/server"
import { activateLicenseKey } from "@/lib/lemonsqueezy"

/**
 * POST /api/license/activate
 *
 * 라이선스 키를 특정 인스턴스에 활성화하는 API 엔드포인트입니다.
 * CLI 도구나 앱에서 최초 실행 시 호출됩니다.
 *
 * 요청 바디:
 * - licenseKey (필수): 활성화할 라이선스 키
 * - instanceName (필수): 인스턴스 이름 (예: "user-macbook", "mywebsite.com")
 *
 * 응답:
 * - activated: 활성화 성공 여부
 * - message: 결과 메시지
 * - instance: 활성화된 인스턴스 정보
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { licenseKey, instanceName } = body as {
      licenseKey?: string
      instanceName?: string
    }

    // 필수 파라미터 체크
    if (!licenseKey) {
      return NextResponse.json(
        { activated: false, message: "라이선스 키를 입력해주세요." },
        { status: 400 }
      )
    }

    if (!instanceName) {
      return NextResponse.json(
        { activated: false, message: "인스턴스 이름을 입력해주세요." },
        { status: 400 }
      )
    }

    // Lemon Squeezy API로 활성화
    const result = await activateLicenseKey(licenseKey, instanceName)

    if (!result.activated) {
      return NextResponse.json({
        activated: false,
        message: result.error || "라이선스 활성화에 실패했습니다.",
      })
    }

    // 활성화 성공
    return NextResponse.json({
      activated: true,
      message: "라이선스가 활성화되었습니다.",
      instance: {
        id: result.instance?.id,
        name: result.instance?.name,
        createdAt: result.instance?.createdAt,
      },
    })
  } catch (error) {
    console.error("[License Activate Error]", error)
    return NextResponse.json(
      { activated: false, message: "라이선스 활성화 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
