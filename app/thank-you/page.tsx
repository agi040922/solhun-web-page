"use client"

import Link from "next/link"
import { PageWrapper } from "../../components/page-wrapper"

/**
 * Thank You 페이지
 *
 * Lemon Squeezy 결제 완료 후 리다이렉트되는 페이지입니다.
 * 라이선스 키는 이메일로 발송되며, 이 페이지에서 안내합니다.
 */
export default function ThankYouPage() {
  return (
    <PageWrapper>
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center gap-8 px-6 py-16">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#49423D] mb-4">
            Thank you for your purchase!
          </h1>
          <p className="text-[#605A57] text-lg max-w-md">
            Your license key has been sent to your email address.
          </p>
        </div>

        {/* Instructions */}
        <div className="max-w-lg w-full bg-[#F5F4F3] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[#37322F] mb-4">
            What&apos;s next?
          </h2>
          <ol className="space-y-3 text-[#605A57]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#37322F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                1
              </span>
              <span>Check your email for the license key</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#37322F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                2
              </span>
              <span>Install CLImanager from the documentation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#37322F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                3
              </span>
              <span>Activate your license using the CLI</span>
            </li>
          </ol>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/docs"
            className="px-6 py-3 bg-[#37322F] text-white rounded-full font-medium hover:opacity-90 transition-opacity text-center"
          >
            View Documentation
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white border border-[#E0DEDB] text-[#37322F] rounded-full font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Support Note */}
        <p className="text-sm text-[#847971]">
          Need help?{" "}
          <a
            href="mailto:solhun.jeong@gmail.com"
            className="underline hover:text-[#37322F]"
          >
            Contact support
          </a>
        </p>
      </div>
    </PageWrapper>
  )
}
