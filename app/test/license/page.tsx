"use client"

import { useState } from "react"

/**
 * 라이선스 테스트 페이지 (개발용)
 *
 * Store ID: 250565 (solhun)
 * Product ID: 729810 (TEST MODE - CLI_manager(solhun)123)
 */

// CLImanger Pro 가격 플랜 (TEST MODE Variant IDs)
const VARIANTS = [
  {
    id: "1148496",
    name: "Monthly",
    price: "$4.99",
    period: "/월",
    type: "subscription" as const,
    description: "월간 구독 플랜",
  },
  {
    id: "1148497",
    name: "Annual",
    price: "$29",
    period: "/년",
    type: "subscription" as const,
    description: "연간 구독 플랜",
  },
  {
    id: "1148498",
    name: "Lifetime",
    price: "$49",
    period: "",
    type: "one-time" as const,
    description: "평생 라이선스 (일회성)",
    recommended: true,
  },
]

interface ValidateResult {
  valid: boolean
  message: string
  license?: {
    status: string
    activationLimit: number
    activationUsage: number
    expiresAt: string | null
  }
  product?: {
    name: string
    variant: string
  }
  customer?: {
    name: string
    email: string
  }
}

interface ActivateResult {
  activated: boolean
  message: string
  instance?: {
    id: string
    name: string
    createdAt: string
  }
}

interface CheckoutResult {
  variantId: string
  variantName: string
  url: string | null
  error?: string
}

export default function LicenseTestPage() {
  // 상태 관리
  const [licenseKey, setLicenseKey] = useState("")
  const [instanceName, setInstanceName] = useState("test-instance")
  const [validateResult, setValidateResult] = useState<ValidateResult | null>(null)
  const [activateResult, setActivateResult] = useState<ActivateResult | null>(null)
  const [checkoutResults, setCheckoutResults] = useState<CheckoutResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"checkout" | "validate" | "activate">("checkout")

  /**
   * 라이선스 키 검증 테스트
   */
  const handleValidate = async () => {
    if (!licenseKey.trim()) {
      alert("라이선스 키를 입력해주세요.")
      return
    }

    setIsLoading(true)
    setValidateResult(null)

    try {
      const response = await fetch("/api/license/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: licenseKey.trim() }),
      })

      const data = await response.json()
      setValidateResult(data)
    } catch (error) {
      console.error("Validate error:", error)
      setValidateResult({
        valid: false,
        message: "API 호출 중 오류가 발생했습니다.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 라이선스 키 활성화 테스트
   */
  const handleActivate = async () => {
    if (!licenseKey.trim()) {
      alert("라이선스 키를 입력해주세요.")
      return
    }
    if (!instanceName.trim()) {
      alert("인스턴스 이름을 입력해주세요.")
      return
    }

    setIsLoading(true)
    setActivateResult(null)

    try {
      const response = await fetch("/api/license/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: licenseKey.trim(),
          instanceName: instanceName.trim(),
        }),
      })

      const data = await response.json()
      setActivateResult(data)
    } catch (error) {
      console.error("Activate error:", error)
      setActivateResult({
        activated: false,
        message: "API 호출 중 오류가 발생했습니다.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Checkout URL 생성 (특정 Variant)
   */
  const handleCheckout = async (variantId: string, variantName: string) => {
    setLoadingVariant(variantId)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      })

      const data = await response.json()

      const result: CheckoutResult = {
        variantId,
        variantName,
        url: data.url || null,
        error: data.error,
      }

      // 기존 결과에서 같은 variant 제거 후 새 결과 추가
      setCheckoutResults(prev => [
        result,
        ...prev.filter(r => r.variantId !== variantId)
      ])

    } catch (error) {
      console.error("Checkout error:", error)
      setCheckoutResults(prev => [
        {
          variantId,
          variantName,
          url: null,
          error: "API 호출 중 오류가 발생했습니다.",
        },
        ...prev.filter(r => r.variantId !== variantId)
      ])
    } finally {
      setLoadingVariant(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">CLImanger Pro - 라이선스 테스트</h1>
            <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
              TEST MODE
            </span>
          </div>
          <p className="text-orange-100">
            Store ID: <code className="bg-white/20 px-2 py-0.5 rounded">250565</code>
            <span className="mx-2">|</span>
            Product ID: <code className="bg-white/20 px-2 py-0.5 rounded">729810</code>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "checkout", label: "Checkout 테스트" },
            { key: "validate", label: "라이선스 검증" },
            { key: "activate", label: "라이선스 활성화" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Checkout Tab */}
        {activeTab === "checkout" && (
          <div className="space-y-6">
            {/* 플랜별 카드 */}
            <div className="grid md:grid-cols-3 gap-4">
              {VARIANTS.map((variant) => (
                <div
                  key={variant.id}
                  className={`bg-white rounded-lg border-2 p-5 ${
                    variant.recommended
                      ? "border-orange-500 shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  {variant.recommended && (
                    <div className="text-xs font-semibold text-orange-500 mb-2">
                      RECOMMENDED
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">{variant.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">{variant.price}</span>
                    <span className="text-gray-500">{variant.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{variant.description}</p>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-2">
                      Variant ID: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{variant.id}</code>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                      variant.type === "subscription"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {variant.type === "subscription" ? "구독" : "일회성"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCheckout(variant.id, variant.name)}
                    disabled={loadingVariant === variant.id}
                    className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-colors ${
                      variant.recommended
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loadingVariant === variant.id ? "생성 중..." : "Checkout URL 생성"}
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout 결과 */}
            {checkoutResults.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">생성된 Checkout URLs</h3>
                <div className="space-y-3">
                  {checkoutResults.map((result) => (
                    <div
                      key={result.variantId}
                      className={`p-4 rounded-lg ${
                        result.url
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {result.variantName}
                          <span className="text-xs text-gray-500 ml-2">({result.variantId})</span>
                        </span>
                        {result.url ? (
                          <span className="text-xs text-green-600">Success</span>
                        ) : (
                          <span className="text-xs text-red-600">Failed</span>
                        )}
                      </div>

                      {result.url ? (
                        <>
                          <code className="text-xs text-green-800 break-all block bg-green-100 p-2 rounded mb-2">
                            {result.url}
                          </code>
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigator.clipboard.writeText(result.url!)}
                              className="px-3 py-1.5 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                            >
                              복사
                            </button>
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                            >
                              열기
                            </a>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API 사용법 */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-4">Checkout API 사용법</h3>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-auto">
{`// POST /api/checkout
fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variantId: '1148498',  // Monthly: 1148496, Annual: 1148497, Lifetime: 1148498
    email: 'user@example.com',  // 선택
    name: '정경훈',  // 선택
  })
})

// Response (TEST MODE)
{ "url": "https://solhun.lemonsqueezy.com/checkout/..." }`}
              </pre>
            </div>
          </div>
        )}

        {/* Validate Tab */}
        {activeTab === "validate" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">라이선스 키 검증</h2>
            <p className="text-gray-600 mb-4">
              Lemon Squeezy에서 발급된 라이선스 키가 유효한지 확인합니다.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  라이선스 키
                </label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                onClick={handleValidate}
                disabled={isLoading}
                className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "검증 중..." : "라이선스 검증하기"}
              </button>

              {validateResult && (
                <div className={`mt-4 p-4 rounded-lg ${validateResult.valid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                  <h4 className={`font-semibold ${validateResult.valid ? "text-green-800" : "text-red-800"}`}>
                    {validateResult.valid ? "유효한 라이선스" : "유효하지 않음"}
                  </h4>
                  <p className={`text-sm ${validateResult.valid ? "text-green-700" : "text-red-700"}`}>
                    {validateResult.message}
                  </p>

                  {validateResult.valid && validateResult.license && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">라이선스 정보:</h5>
                      <pre className="text-xs bg-green-100 p-2 rounded overflow-auto">
{JSON.stringify({
  license: validateResult.license,
  product: validateResult.product,
  customer: validateResult.customer,
}, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activate Tab */}
        {activeTab === "activate" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">라이선스 키 활성화</h2>
            <p className="text-gray-600 mb-4">
              라이선스 키를 특정 인스턴스(기기/도메인)에 활성화합니다.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  라이선스 키
                </label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  인스턴스 이름
                </label>
                <input
                  type="text"
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                  placeholder="예: my-macbook, mywebsite.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  기기 이름, 도메인 등 고유한 식별자를 입력하세요.
                </p>
              </div>

              <button
                onClick={handleActivate}
                disabled={isLoading}
                className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "활성화 중..." : "라이선스 활성화하기"}
              </button>

              {activateResult && (
                <div className={`mt-4 p-4 rounded-lg ${activateResult.activated ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                  <h4 className={`font-semibold ${activateResult.activated ? "text-green-800" : "text-red-800"}`}>
                    {activateResult.activated ? "활성화 성공" : "활성화 실패"}
                  </h4>
                  <p className={`text-sm ${activateResult.activated ? "text-green-700" : "text-red-700"}`}>
                    {activateResult.message}
                  </p>

                  {activateResult.activated && activateResult.instance && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">인스턴스 정보:</h5>
                      <pre className="text-xs bg-green-100 p-2 rounded overflow-auto">
{JSON.stringify(activateResult.instance, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>이 페이지는 개발자 테스트용입니다.</p>
          <p className="mt-1">
            <a
              href="https://app.lemonsqueezy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Lemon Squeezy Dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
