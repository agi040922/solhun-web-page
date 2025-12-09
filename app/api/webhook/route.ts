import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

/**
 * 웹훅 서명 검증
 *
 * Lemon Squeezy에서 보낸 웹훅이 진짜인지 확인합니다.
 * 이 검증을 통해 악의적인 요청을 차단할 수 있습니다.
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret)
  const digest = hmac.update(payload).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

/**
 * 웹훅 이벤트 타입
 *
 * Lemon Squeezy에서 발생하는 주요 이벤트들입니다.
 * 필요한 이벤트만 처리하면 됩니다.
 */
type WebhookEvent =
  | "order_created"           // 주문 생성됨
  | "order_refunded"          // 환불됨
  | "subscription_created"    // 구독 생성됨
  | "subscription_updated"    // 구독 업데이트됨
  | "subscription_cancelled"  // 구독 취소됨
  | "license_key_created"     // 라이선스 키 생성됨
  | "license_key_updated"     // 라이선스 키 업데이트됨

/**
 * POST /api/webhook
 *
 * Lemon Squeezy 웹훅을 수신하는 엔드포인트입니다.
 * 결제 완료, 라이선스 키 생성 등의 이벤트를 처리합니다.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Raw body 가져오기 (서명 검증용)
    const rawBody = await req.text()

    // 2. 서명 검증
    const signature = req.headers.get("x-signature")
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

    if (!signature || !webhookSecret) {
      console.error("[Webhook] 서명 또는 시크릿이 없습니다.")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret)

    if (!isValid) {
      console.error("[Webhook] 서명 검증 실패")
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      )
    }

    // 3. 웹훅 데이터 파싱
    const webhookData = JSON.parse(rawBody)
    const eventName = webhookData.meta.event_name as WebhookEvent

    console.log(`[Webhook] 이벤트 수신: ${eventName}`)

    // 4. 이벤트별 처리
    switch (eventName) {
      case "order_created":
        // 주문 생성됨 - 라이선스 키 발급 처리
        await handleOrderCreated(webhookData)
        break

      case "license_key_created":
        // 라이선스 키 생성됨
        await handleLicenseKeyCreated(webhookData)
        break

      case "order_refunded":
        // 환불됨 - 라이선스 키 비활성화 처리
        await handleOrderRefunded(webhookData)
        break

      default:
        console.log(`[Webhook] 처리하지 않는 이벤트: ${eventName}`)
    }

    // 5. 성공 응답 (Lemon Squeezy에게 수신 확인)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Webhook Error]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * 주문 생성 이벤트 처리
 *
 * 고객이 결제를 완료하면 호출됩니다.
 * 여기서 라이선스 키를 이메일로 보내거나 DB에 저장할 수 있습니다.
 */
async function handleOrderCreated(webhookData: any) {
  const order = webhookData.data.attributes
  const meta = webhookData.meta

  console.log("[Order Created]", {
    orderId: webhookData.data.id,
    customerEmail: meta.custom_data?.email || order.user_email,
    customerName: meta.custom_data?.name || order.user_name,
    total: order.total_formatted,
    status: order.status,
  })

  // TODO: 여기에 실제 비즈니스 로직 추가
  // 예:
  // - 데이터베이스에 주문 정보 저장
  // - 환영 이메일 발송
  // - 라이선스 키 이메일 발송
}

/**
 * 라이선스 키 생성 이벤트 처리
 *
 * 라이선스 키가 생성되면 호출됩니다.
 * 생성된 키를 고객에게 전달하는 로직을 구현합니다.
 */
async function handleLicenseKeyCreated(webhookData: any) {
  const licenseKey = webhookData.data.attributes

  console.log("[License Key Created]", {
    id: webhookData.data.id,
    key: licenseKey.key,
    status: licenseKey.status,
    activationLimit: licenseKey.activation_limit,
  })

  // TODO: 여기에 실제 비즈니스 로직 추가
  // 예:
  // - 데이터베이스에 라이선스 키 저장
  // - 고객에게 라이선스 키 이메일 발송
}

/**
 * 환불 이벤트 처리
 *
 * 환불이 발생하면 호출됩니다.
 * 라이선스 키를 비활성화하는 로직을 구현합니다.
 */
async function handleOrderRefunded(webhookData: any) {
  const order = webhookData.data.attributes

  console.log("[Order Refunded]", {
    orderId: webhookData.data.id,
    refundedAt: order.refunded_at,
  })

  // TODO: 여기에 실제 비즈니스 로직 추가
  // 예:
  // - 라이선스 키 비활성화
  // - 데이터베이스에서 사용자 상태 업데이트
}
