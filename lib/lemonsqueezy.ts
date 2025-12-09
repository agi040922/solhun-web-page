import {
  lemonSqueezySetup,
  createCheckout,
  type NewCheckout,
} from "@lemonsqueezy/lemonsqueezy.js"

/**
 * Lemon Squeezy SDK 초기화
 *
 * 이 함수는 API 호출 전에 반드시 실행되어야 합니다.
 * SDK에 API 키를 설정하여 인증된 요청을 할 수 있게 합니다.
 */
export function initLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY

  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY 환경변수가 설정되지 않았습니다.")
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("[Lemon Squeezy Error]", error)
    },
  })
}

/**
 * 체크아웃 URL 생성
 *
 * Lemon Squeezy 결제 페이지로 이동할 수 있는 URL을 생성합니다.
 * 사용자가 "Get Access" 버튼 클릭 시 호출됩니다.
 *
 * @param options - 체크아웃 옵션 (이메일, 이름 등 pre-fill 가능)
 * @returns 체크아웃 URL
 */
export async function getCheckoutURL(options?: {
  email?: string
  name?: string
}) {
  // SDK 초기화
  initLemonSqueezy()

  const storeId = process.env.LEMONSQUEEZY_STORE_ID
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID

  if (!storeId || !variantId) {
    throw new Error("LEMONSQUEEZY_STORE_ID 또는 LEMONSQUEEZY_VARIANT_ID가 설정되지 않았습니다.")
  }

  // 체크아웃 생성 옵션
  const checkoutOptions: NewCheckout = {
    // 체크아웃 옵션 (UI 커스터마이징)
    checkoutOptions: {
      embed: false, // overlay 대신 새 페이지로 이동
      media: true,  // 상품 이미지 표시
      logo: true,   // 스토어 로고 표시
      desc: true,   // 상품 설명 표시
      discount: true, // 할인 코드 필드 표시
    },
    // 상품 옵션 (구매 완료 후 리다이렉트 등)
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you`,
    },
  }

  // 이메일이나 이름이 제공된 경우에만 checkoutData 추가
  // 빈 문자열을 보내면 Lemon Squeezy API에서 422 에러 발생
  if (options?.email || options?.name) {
    checkoutOptions.checkoutData = {
      ...(options.email && { email: options.email }),
      ...(options.name && { name: options.name }),
    }
  }

  // 체크아웃 생성 API 호출
  const { data, error } = await createCheckout(
    storeId,
    variantId,
    checkoutOptions
  )

  if (error) {
    console.error("[Checkout Error]", error)
    throw new Error("체크아웃 생성에 실패했습니다.")
  }

  // 생성된 체크아웃 URL 반환
  return data?.data.attributes.url
}

/**
 * 라이선스 키 검증
 *
 * 고객이 입력한 라이선스 키가 유효한지 확인합니다.
 * Lemon Squeezy License API를 직접 호출합니다.
 *
 * @param licenseKey - 검증할 라이선스 키
 * @param instanceName - 인스턴스 이름 (선택, 활성화 시 사용)
 * @returns 검증 결과
 */
export async function validateLicenseKey(
  licenseKey: string,
  instanceName?: string
) {
  const response = await fetch(
    "https://api.lemonsqueezy.com/v1/licenses/validate",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        license_key: licenseKey,
        ...(instanceName && { instance_name: instanceName }),
      }),
    }
  )

  const data = await response.json()

  return {
    valid: data.valid as boolean,
    error: data.error as string | null,
    licenseKey: data.license_key as {
      id: number
      status: string
      key: string
      activationLimit: number
      activationUsage: number
      createdAt: string
      expiresAt: string | null
    } | null,
    meta: data.meta as {
      storeId: number
      orderId: number
      productId: number
      productName: string
      variantId: number
      variantName: string
      customerId: number
      customerName: string
      customerEmail: string
    } | null,
  }
}

/**
 * 라이선스 키 활성화
 *
 * 라이선스 키를 특정 인스턴스(예: 도메인, 기기)에 활성화합니다.
 *
 * @param licenseKey - 활성화할 라이선스 키
 * @param instanceName - 인스턴스 이름 (예: "user-macbook", "mywebsite.com")
 * @returns 활성화 결과
 */
export async function activateLicenseKey(
  licenseKey: string,
  instanceName: string
) {
  const response = await fetch(
    "https://api.lemonsqueezy.com/v1/licenses/activate",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        license_key: licenseKey,
        instance_name: instanceName,
      }),
    }
  )

  const data = await response.json()

  return {
    activated: data.activated as boolean,
    error: data.error as string | null,
    instance: data.instance as {
      id: string
      name: string
      createdAt: string
    } | null,
  }
}

/**
 * 라이선스 키 비활성화
 *
 * 특정 인스턴스에서 라이선스 키를 비활성화합니다.
 *
 * @param licenseKey - 비활성화할 라이선스 키
 * @param instanceId - 비활성화할 인스턴스 ID
 * @returns 비활성화 결과
 */
export async function deactivateLicenseKey(
  licenseKey: string,
  instanceId: string
) {
  const response = await fetch(
    "https://api.lemonsqueezy.com/v1/licenses/deactivate",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        license_key: licenseKey,
        instance_id: instanceId,
      }),
    }
  )

  const data = await response.json()

  return {
    deactivated: data.deactivated as boolean,
    error: data.error as string | null,
  }
}
