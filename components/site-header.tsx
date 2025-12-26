"use client"

import { useState } from "react"
import Link from "next/link"

// R2 다운로드 URL
const DOWNLOAD_URLS = {
  arm64: "https://pub-dc249db286af4c1991fedf690157891d.r2.dev/cli-manager-1.1.0-arm64.dmg",
  x64: "https://pub-dc249db286af4c1991fedf690157891d.r2.dev/cli-manager-1.1.0-x64.dmg",
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)

  return (
    <>
      <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-50 px-6 sm:px-8 md:px-12 lg:px-0">
        <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>

        <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] rounded-[50px] flex justify-between items-center relative z-30">
          {/* 모바일: 왼쪽 빈 공간 (균형용) */}
          <div className="w-8 sm:hidden"></div>

          {/* 로고 - 모바일에서 가운데, 데스크탑에서 왼쪽 */}
          <div className="flex justify-center items-center sm:flex-1 sm:justify-start">
            <Link href="/" className="flex justify-start items-center gap-2 cursor-pointer">
              <div className="w-6 h-6 sm:w-7 sm:h-7 relative rounded-md overflow-hidden shadow-sm border border-[rgba(55,50,47,0.08)]">
                <img src="/solhun-logo.png" alt="Solhun Logo" className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
                solhun
              </div>
            </Link>
            {/* 데스크탑 네비게이션 - sm 이상에서만 표시 */}
            <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 hidden sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
              <Link href="/gallery" className="flex justify-start items-center cursor-pointer px-3 py-2 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200">
                <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#2F3037] transition-colors">
                  Gallery
                </div>
              </Link>
              <Link href="/pricing" className="flex justify-start items-center cursor-pointer px-3 py-2 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200">
                <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#2F3037] transition-colors">
                  Pricing
                </div>
              </Link>
              <Link href="/docs" className="flex justify-start items-center cursor-pointer px-3 py-2 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200">
                <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#2F3037] transition-colors">
                  Docs
                </div>
              </Link>
              <Link href="/changelog" className="flex justify-start items-center cursor-pointer px-3 py-2 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200">
                <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#2F3037] transition-colors">
                  Changelog
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Download Button with Dropdown */}
          <div className="hidden sm:block relative">
            <button
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              className="flex justify-center items-center gap-1.5 cursor-pointer px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 text-white hover:opacity-90 transition-all duration-200 shadow-md"
            >
              <span className="text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                Download
              </span>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${isDownloadOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDownloadOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDownloadOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[rgba(55,50,47,0.12)] overflow-hidden z-50 py-1">
                  <a
                    href={DOWNLOAD_URLS.arm64}
                    download
                    onClick={(e) => {
                      e.stopPropagation()
                      setTimeout(() => setIsDownloadOpen(false), 100)
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-[#2F3037] hover:bg-[rgba(55,50,47,0.05)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>macOS (Apple Silicon)</span>
                      <span className="text-[10px] text-gray-400">ARM64</span>
                    </div>
                  </a>
                  <div className="h-[1px] bg-[rgba(55,50,47,0.08)] mx-2"></div>
                  <a
                    href={DOWNLOAD_URLS.x64}
                    download
                    onClick={(e) => {
                      e.stopPropagation()
                      setTimeout(() => setIsDownloadOpen(false), 100)
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-[#2F3037] hover:bg-[rgba(55,50,47,0.05)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>macOS (Intel)</span>
                      <span className="text-[10px] text-gray-400">x64</span>
                    </div>
                  </a>
                </div>
              </>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 버튼 - sm 미만에서만 표시 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200"
            aria-label="메뉴 열기"
          >
            <span className={`block w-4 h-0.5 bg-[#2F3037] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-4 h-0.5 bg-[#2F3037] my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-4 h-0.5 bg-[#2F3037] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      <div className={`sm:hidden fixed left-0 right-0 top-14 z-10 px-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="bg-[#F7F5F3] rounded-2xl shadow-lg border border-[rgba(55,50,47,0.12)] p-4 flex flex-col gap-2">
          <Link
            href="/gallery"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/pricing"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            Docs
          </Link>
          <Link
            href="/changelog"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            Changelog
          </Link>
          <div className="h-[1px] bg-[rgba(55,50,47,0.12)] my-1"></div>
          <p className="px-4 text-xs font-semibold text-[rgba(49,45,43,0.50)] uppercase tracking-wider mb-1">Download</p>
          <a
            href={DOWNLOAD_URLS.arm64}
            download
            onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
            className="block w-full text-left px-4 py-3 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span>macOS (Apple Silicon)</span>
              <span className="text-[10px] bg-[rgba(55,50,47,0.08)] px-1.5 py-0.5 rounded text-[rgba(49,45,43,0.60)]">ARM64</span>
            </div>
          </a>
          <a
            href={DOWNLOAD_URLS.x64}
            download
            onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
            className="block w-full text-left px-4 py-3 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span>macOS (Intel)</span>
              <span className="text-[10px] bg-[rgba(55,50,47,0.08)] px-1.5 py-0.5 rounded text-[rgba(49,45,43,0.60)]">x64</span>
            </div>
          </a>
        </div>
      </div>

      {/* 모바일 메뉴 열렸을 때 배경 오버레이 */}
      {isMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 z-[5]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
