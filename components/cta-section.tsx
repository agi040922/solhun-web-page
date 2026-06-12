"use client"

import { useState } from "react"

// 다운로드 URL
const DOWNLOAD_URLS = {
  arm64: "https://pub-dc249db286af4c1991fedf690157891d.r2.dev/cli-manager-1.5.1-arm64.dmg",
  x64: "https://pub-dc249db286af4c1991fedf690157891d.r2.dev/cli-manager-1.5.1-x64.dmg",
}

export default function CTASection() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)

  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-center items-center gap-2">
      {/* Content */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-12 border-t border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6 relative z-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-full rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                style={{
                  top: `${i * 16 - 120}px`,
                  left: "-100%",
                  width: "300%",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[586px] px-6 py-5 md:py-8 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-6 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] font-sans tracking-tight">
              Ready to revolutionize with AI Agents?
            </div>
            <div className="self-stretch text-center text-[#605A57] text-base leading-7 font-sans font-medium">
              Manage Git worktrees effortlessly, track ports across projects,
              <br />
              and launch complex workflows with terminal templates.
            </div>
          </div>
          <div className="w-full max-w-[497px] flex flex-col justify-center items-center gap-12">
            <div className="flex justify-start items-center gap-4 relative">
              <button
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                className="h-10 px-12 py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center gap-2 cursor-pointer hover:bg-[#2A2520] transition-colors"
              >
                <div className="w-44 h-[41px] absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <span className="text-white text-[13px] font-medium leading-5 font-sans relative z-10">
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
                  className={`text-white relative z-10 transition-transform duration-200 ${isDownloadOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Download Dropdown Menu - 위쪽으로 열림 */}
              {isDownloadOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDownloadOpen(false)}
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-white rounded-xl shadow-lg border border-[rgba(55,50,47,0.12)] overflow-hidden z-50 py-1">
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

              {/* GitHub Button */}
              <a
                href="https://github.com/woorichicken/CLI_manager"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-1.5 px-4 py-2.5 rounded-full border border-[rgba(255,255,255,0.25)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="text-[13px] font-medium leading-5 font-sans">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
