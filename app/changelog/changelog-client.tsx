"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Changelog, ChangelogItem } from "@/lib/db";

// --- Components ---

function ChangelogSection({
  title,
  items,
  defaultOpen = false,
}: {
  title: string;
  items: ChangelogItem[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isEmpty = items.length === 0;

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.08)] last:border-0">
      <button
        onClick={() => !isEmpty && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-2 text-left group ${isEmpty ? "cursor-default opacity-60" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`p-1 rounded-md ${
              title.startsWith("Improvements")
                ? "bg-blue-50 text-blue-600"
                : title.startsWith("Fixes")
                  ? "bg-orange-50 text-orange-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          ></div>
          <span className="text-sm font-medium text-[#37322F] font-sans">
            {title} ({items.length})
          </span>
        </div>
        {!isEmpty && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              size={14}
              className="text-gray-400 group-hover:text-gray-600"
            />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !isEmpty && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-4 pr-4">
              <ul className="list-disc space-y-1 marker:text-gray-300 ml-4">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-[#605A57] leading-relaxed font-sans pl-1"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChangelogRow({ entry }: { entry: Changelog }) {
  // null 체크 (DB에서 null이 올 수 있음)
  const improvements = entry.improvements || [];
  const fixes = entry.fixes || [];
  const patches = entry.patches || [];

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8 md:py-10 border-b border-[rgba(55,50,47,0.08)] last:border-0">
      {/* Left Column: Version & Date */}
      <div className="md:w-1/4 flex flex-col gap-1">
        <div className="text-sm font-medium text-[#37322F] font-sans">
          {entry.version}
        </div>
        <div className="text-sm text-gray-500 font-sans">{entry.date}</div>
      </div>

      {/* Right Column: Content */}
      <div className="md:w-3/4 flex flex-col gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#37322F] font-serif mb-2">
            {entry.title}
          </h2>
          <p className="text-[#605A57] leading-relaxed font-sans text-sm">
            {entry.description}
          </p>
        </div>

        {/* Toggles */}
        <div className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] px-4 shadow-sm mt-2">
          <ChangelogSection
            title="Improvements"
            items={improvements}
            defaultOpen={improvements.length > 0}
          />
          <ChangelogSection title="Fixes" items={fixes} />
          <ChangelogSection title="Patches" items={patches} />
        </div>
      </div>
    </div>
  );
}

// --- Exported Client Component ---
export function ChangelogClient({ changelogs }: { changelogs: Changelog[] }) {
  return (
    <>
      {changelogs.map((entry) => (
        <ChangelogRow key={entry.id} entry={entry} />
      ))}
    </>
  );
}
