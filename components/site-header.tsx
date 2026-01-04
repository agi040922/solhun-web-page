"use client"

import { useState } from "react"
import Link from "next/link"

// R2 다운로드 URL
const DOWNLOAD_URLS = {
  arm64: "https://pub-dc249db286af4c1991fedf690157891d.r2.dev/cli-manager-1.2.0-arm64.dmg",
  x64: "https://pub-dc249db286af4c1991fedf690157891d.r2.dev/cli-manager-1.2.0-x64.dmg",
}

// 네비게이션 메뉴 데이터
const NAV_MENUS = {
  resources: {
    label: "Resources",
    items: [
      { href: "/docs", label: "Docs" },
      { href: "/gallery", label: "Gallery" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  community: {
    label: "Community",
    items: [
      { href: "/roadmap", label: "Roadmap" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
  compare: {
    label: "Compare",
    items: [
      { href: "/compare/antigravity-cursor", label: "vs Antigravity, Cursor, etc" },
      { href: "/compare/cli-agents", label: "vs Claude Code, etc" },
    ],
  },
}

type MenuKey = keyof typeof NAV_MENUS

export function SiteHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<MenuKey | null>(null)
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<MenuKey | null>(null)

  // 드롭다운 hover 처리
  const handleMouseEnter = (menu: MenuKey) => setActiveDropdown(menu)
  const handleMouseLeave = () => setActiveDropdown(null)

  return (
    <>
      <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-50 px-6 sm:px-8 md:px-12 lg:px-0">
        <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>

        <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[780px] lg:w-[780px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] rounded-[50px] flex justify-between items-center relative z-30">
          {/* 모바일 햄버거 버튼 - 왼쪽 */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200"
            aria-label="메뉴 열기"
          >
            <span className="block w-4 h-0.5 bg-[#2F3037]"></span>
            <span className="block w-4 h-0.5 bg-[#2F3037] my-1"></span>
            <span className="block w-4 h-0.5 bg-[#2F3037]"></span>
          </button>

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

            {/* 데스크탑 네비게이션 - 드롭다운 메뉴들 */}
            <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 hidden sm:flex flex-row gap-1 md:gap-2">
              {(Object.keys(NAV_MENUS) as MenuKey[]).map((menuKey) => (
                <div
                  key={menuKey}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(menuKey)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200">
                    <span className="text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                      {NAV_MENUS[menuKey].label}
                    </span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-[rgba(49,45,43,0.60)] transition-transform duration-200 ${activeDropdown === menuKey ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {activeDropdown === menuKey && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-44 bg-white rounded-xl shadow-lg border border-[rgba(55,50,47,0.12)] overflow-hidden py-1">
                        {NAV_MENUS[menuKey].items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-[#2F3037] hover:bg-[rgba(55,50,47,0.05)] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Download Dropdown Menu */}
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

          {/* 모바일: 오른쪽 빈 공간 (균형용) */}
          <div className="w-8 sm:hidden"></div>
        </div>
      </div>

      {/* 모바일 사이드바 오버레이 */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* 모바일 사이드바 - 왼쪽에서 슬라이드 */}
      <div
        className={`sm:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-[#F7F5F3] z-[101] shadow-2xl transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(55,50,47,0.12)]">
          <Link href="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-2">
            <div className="w-7 h-7 relative rounded-md overflow-hidden shadow-sm border border-[rgba(55,50,47,0.08)]">
              <img src="/solhun-logo.png" alt="Solhun Logo" className="object-cover w-full h-full" />
            </div>
            <span className="text-[#2F3037] text-lg font-medium font-sans">solhun</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F3037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* 사이드바 메뉴 */}
        <div className="p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100%-140px)]">
          {(Object.keys(NAV_MENUS) as MenuKey[]).map((menuKey) => (
            <div key={menuKey}>
              <button
                onClick={() => setMobileExpandedMenu(mobileExpandedMenu === menuKey ? null : menuKey)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#2F3037] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] transition-all duration-200"
              >
                <span>{NAV_MENUS[menuKey].label}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-[rgba(49,45,43,0.60)] transition-transform duration-200 ${mobileExpandedMenu === menuKey ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* 확장된 하위 메뉴 */}
              <div
                className={`overflow-hidden transition-all duration-200 ${mobileExpandedMenu === menuKey ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="pl-4 py-1 flex flex-col gap-1">
                  {NAV_MENUS[menuKey].items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="px-4 py-2.5 rounded-lg text-[rgba(49,45,43,0.80)] text-sm hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 사이드바 하단 - Download */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(55,50,47,0.12)] bg-[#F7F5F3]">
          <p className="px-4 text-xs font-semibold text-[rgba(49,45,43,0.50)] uppercase tracking-wider mb-2">Download</p>
          <a
            href={DOWNLOAD_URLS.arm64}
            download
            onClick={() => setTimeout(() => setIsSidebarOpen(false), 100)}
            className="block w-full text-left px-4 py-2.5 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span>macOS (Apple Silicon)</span>
              <span className="text-[10px] bg-[rgba(55,50,47,0.08)] px-1.5 py-0.5 rounded text-[rgba(49,45,43,0.60)]">ARM64</span>
            </div>
          </a>
          <a
            href={DOWNLOAD_URLS.x64}
            download
            onClick={() => setTimeout(() => setIsSidebarOpen(false), 100)}
            className="block w-full text-left px-4 py-2.5 rounded-xl text-[rgba(49,45,43,0.80)] text-sm font-medium hover:bg-[rgba(55,50,47,0.05)] hover:text-[#2F3037] transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span>macOS (Intel)</span>
              <span className="text-[10px] bg-[rgba(55,50,47,0.08)] px-1.5 py-0.5 rounded text-[rgba(49,45,43,0.60)]">x64</span>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
