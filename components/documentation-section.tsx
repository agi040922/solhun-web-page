"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"

// Badge component for consistency
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

export default function DocumentationSection() {
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const cards = [
    {
      title: "Choose the Right Agent",
      description: "Claude Code for general tasks, Codex CLI for complex logic,\nGemini CLI for design work with Antigravity.",
      image: "/main-gemini.png",
    },
    {
      title: "Name Agents for Parallel Work",
      description: "Rename agents by role: 'Frontend-React', 'Backend-API'.\nTrack multiple workflows at a glance.",
      image: "/cli-rename.png",
    },
    {
      title: "Git Worktree Parallel Workflows",
      description: "Run agents on separate branches simultaneously.\nZero conflicts, pure parallel productivity.",
      image: "/worktree-create.png",
    },
    {
      title: "Easy Merge & Clean",
      description: "Merge branches and clean up worktrees with simple UI.\nNo command-line memorization required.",
      image: "/git-restore.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length)
      setAnimationKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [cards.length])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setAnimationKey((prev) => prev + 1)
  }

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-6 py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4 shadow-none">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M1 7H13" stroke="#37322F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
            text="How to Use"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Master Your AI Agent Workflow
          </div>
          <div className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans">
            Orchestrate Claude Code, Codex CLI, and Gemini CLI together.
            <br />
            Maximize productivity with parallel workflows.
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="self-stretch px-4 md:px-6 overflow-hidden flex justify-start items-center">
        <div className="flex-1 py-8 md:py-11 flex flex-col md:flex-row justify-start items-center gap-4 md:gap-6">
          {/* Left Column - Feature Cards */}
          <div className="w-full md:w-[280px] md:min-w-[280px] flex flex-col justify-center items-center gap-3 order-2 md:order-1">
            {cards.map((card, index) => {
              const isActive = index === activeCard

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-full overflow-hidden flex flex-col justify-start items-start transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB_inset]"
                      : "border border-[rgba(2,6,23,0.08)]"
                  }`}
                >
                  <div
                    className={`w-full h-0.5 bg-[rgba(50,45,43,0.08)] overflow-hidden ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 bg-[#322D2B] animate-[progressBar_5s_linear_forwards] will-change-transform"
                    />
                  </div>
                  <div className="px-4 py-3 w-full flex flex-col gap-1">
                    <div className="self-stretch flex justify-center flex-col text-[#49423D] text-xs font-semibold leading-5 font-sans">
                      {card.title}
                    </div>
                    <div className="self-stretch text-[#605A57] text-[11px] font-normal leading-[18px] font-sans whitespace-pre-line">
                      {card.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Image */}
          <div className="w-full md:flex-1 rounded-lg flex flex-col justify-center items-center gap-2 order-1 md:order-2">
            <div className="w-full h-[250px] md:h-[420px] bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-lg flex flex-col justify-start items-start relative">
              <Image
                src={cards[activeCard].image}
                alt={cards[activeCard].title}
                fill
                className="object-cover transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}
