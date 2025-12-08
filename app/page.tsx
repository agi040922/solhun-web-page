"use client"

import { ContainerScroll } from "../components/ui/container-scroll-animation"
import CTASection from "../components/cta-section"
import { PageWrapper } from "../components/page-wrapper"
import Link from "next/link"
import Script from "next/script"

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CLI Manager",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Windows, Linux",
  description: "The ultimate CLI agent management tool. Organize Claude Code, Codex CLI, and Gemini CLI from a single dashboard.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Manage Claude Code, Codex CLI, Gemini CLI in one dashboard",
    "Rename CLI agents to define their roles",
    "Switch between VS Code, Cursor, and other editors instantly",
    "Organize all projects in one workspace",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "150",
  },
}

// Reusable Badge Component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="pt-0 sm:pt-0 md:pt-0 lg:pt-[96px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
        <div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <div className="w-full max-w-[748.71px] lg:w-[748.71px] text-center flex justify-center flex-col text-[#37322F] text-[24px] xs:text-[28px] sm:text-[36px] md:text-[52px] lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-24 font-serif px-2 sm:px-4 md:px-0">
              Your CLI Agents,
              <br />
              All in One Place
            </div>
            <div className="w-full max-w-[506.08px] lg:w-[506.08px] text-center flex justify-center flex-col text-[rgba(55,50,47,0.80)] sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-[1.5] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
              Claude Code, Codex CLI, Gemini CLI — manage them all.
              <br className="hidden sm:block" />
              Organize projects, switch editors, and stay in control.
            </div>
          </div>
        </div>



        <div className="w-full max-w-[497px] lg:w-[497px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="backdrop-blur-[8.25px] flex justify-start items-center gap-4">
            <Link href="/pricing">
              <div className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:bg-[#4a4440] transition-colors">
                <div className="w-20 sm:w-24 md:w-28 lg:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                  Let's Start!
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="absolute top-[232px] sm:top-[248px] md:top-[264px] lg:top-[320px] left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
          <img
            src="/mask-group-pattern.svg"
            alt=""
            className="w-[936px] sm:w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-30 sm:opacity-40 md:opacity-50 mix-blend-multiply"
            style={{
              filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)",
            }}
          />
        </div>

        {/* Container Scroll Section */}
        <div className="flex flex-col">
          <ContainerScroll
            titleComponent={
              <>
              </>
            }
          >
            <img
              src="/cli-main.png"
              alt="CLI Manager - Manage all your CLI agents in one place"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>

        {/* Social Proof Section */}
        <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
          <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
            <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
              <Badge
                icon={
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="3" width="4" height="6" stroke="#37322F" strokeWidth="1" fill="none" />
                    <rect x="7" y="1" width="4" height="8" stroke="#37322F" strokeWidth="1" fill="none" />
                    <rect x="2" y="4" width="1" height="1" fill="#37322F" />
                    <rect x="3.5" y="4" width="1" height="1" fill="#37322F" />
                    <rect x="2" y="5.5" width="1" height="1" fill="#37322F" />
                    <rect x="3.5" y="5.5" width="1" height="1" fill="#37322F" />
                    <rect x="8" y="2" width="1" height="1" fill="#37322F" />
                    <rect x="9.5" y="2" width="1" height="1" fill="#37322F" />
                    <rect x="8" y="3.5" width="1" height="1" fill="#37322F" />
                    <rect x="9.5" y="3.5" width="1" height="1" fill="#37322F" />
                    <rect x="8" y="5" width="1" height="1" fill="#37322F" />
                    <rect x="9.5" y="5" width="1" height="1" fill="#37322F" />
                  </svg>
                }
                text="Key Features"
              />
              <div className="w-full max-w-[472.55px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
                Built for developers who juggle multiple AI agents
              </div>
              <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
                Stop switching between terminals and losing context.
                <br className="hidden sm:block" />
                CLI Manager keeps everything organized in one powerful workspace.
              </div>
            </div>
          </div>

          {/* Logo Grid */}
          {/* Feature Section - Dynamic Asymmetric Layout */}
          <div className="self-stretch flex flex-col justify-start items-center overflow-hidden">
            
            {/* Feature 1 - Multi CLI Agent Management */}
            <div className="w-full px-4 sm:px-6 md:px-12 py-2 sm:py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
              <div className="w-full md:w-[40%] flex flex-col justify-center items-start gap-2 md:gap-3 z-10">
                <div className="text-[#37322F] text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] font-serif tracking-tight">
                  All CLI Agents, One Dashboard
                </div>
                <div className="text-[#605A57] text-lg sm:text-xl font-normal leading-8 font-sans">
                  Claude Code, Codex CLI, Gemini CLI — view and manage them all from a single interface.
                  <br className="hidden md:block" />
                  Activate agents, categorize with nicknames, and organize all your projects effortlessly.
                </div>
              </div>
              <div className="w-full md:w-[60%] relative">
                <div className="w-full aspect-[16/10] md:aspect-[16/9] bg-[#F5F5F4] rounded-2xl overflow-hidden shadow-2xl border border-[rgba(55,50,47,0.08)] flex items-center justify-center relative group transform md:translate-x-12 transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src="/cli-main-gemini.png"
                    alt="CLI Manager Dashboard - Manage Claude Code, Codex CLI, Gemini CLI"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 - Agent Naming for Easy Management */}
            <div className="w-full px-4 sm:px-6 md:px-12 py-2 sm:py-4 md:py-6 flex flex-col md:flex-row-reverse justify-between items-start gap-2 md:gap-4">
              <div className="w-full md:w-[40%] flex flex-col justify-center items-start gap-2 md:mt-12">
                 <div className="text-[#37322F] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight font-serif">
                  Name Your Agents, Define Their Roles
                </div>
                <div className="text-[#605A57] text-base sm:text-lg font-normal leading-7 font-sans">
                  Rename each CLI agent to reflect its purpose. Assign roles like &quot;Frontend Dev&quot;, &quot;Backend API&quot;, or &quot;Design Review&quot; — making multi-agent workflows intuitive and organized.
                </div>
              </div>
              <div className="w-full md:w-[60%] relative">
                <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#F5F5F4] rounded-2xl overflow-hidden shadow-xl border border-[rgba(55,50,47,0.08)] flex items-center justify-center relative group transform md:-translate-x-8 transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src="/cli-rename.png"
                    alt="CLI Agent Renaming - Define roles for each agent"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Feature 3 - Easy Editor Switching */}
            <div className="w-full px-4 sm:px-6 md:px-12 py-2 sm:py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
              <div className="w-full md:w-[40%] flex flex-col justify-center items-start gap-2 md:-mt-8">
                 <div className="text-[#37322F] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight font-serif">
                  Switch Editors Instantly
                </div>
                <div className="text-[#605A57] text-base sm:text-lg font-normal leading-7 font-sans">
                  Jump between Cursor, VS Code, or any editor with a single click. Configure your preferred editor and switch projects seamlessly — no more context switching friction.
                </div>
              </div>
              <div className="w-full md:w-[60%] relative">
                <div className="w-full aspect-[4/3] md:aspect-[5/4] bg-[#F5F5F4] rounded-2xl overflow-hidden shadow-xl border border-[rgba(55,50,47,0.08)] flex items-center justify-center relative group transform md:translate-y-4 transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src="/cli-editor-setting.png"
                    alt="Editor Settings - Switch between Cursor, VS Code, and more"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA Section */}
        <CTASection />
      </div>
    </PageWrapper>
  )
}
