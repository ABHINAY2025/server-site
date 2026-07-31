"use client"

import type React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

interface HeaderProps {
  onDemoClick?: () => void
}

const navItems = [
  { name: "Features", href: "#features-section" },
  { name: "How It Works", href: "#process-section" },
  { name: "Benefits", href: "#benefits-section" },
  { name: "Testimonials", href: "#testimonials-section" },
  { name: "Blogs", href: "/blogs" },
]

export function Header({ onDemoClick }: HeaderProps) {
  const pathname = usePathname()

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    } else {
      // If section doesn't exist on current page, navigate to home first
      window.location.href = "/#" + targetId
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/logo.png"
              alt="QDL Logo"
              width={36}
              height={36}
              className="transition-opacity hover:opacity-80"
            />
            <motion.button
              onClick={(e) => handleScrollToSection(e as any, "#hero-section")}
              className="text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              QDL
            </motion.button>
            <span className="hidden items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300 sm:inline-flex">
              AI-Powered Banking
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={item.href}
                  onClick={
                    item.href.startsWith("#")
                      ? (e) => handleScrollToSection(e, item.href)
                      : undefined
                  }
                  className="group relative rounded-lg px-4 py-2 font-medium text-white/80 transition-all duration-300 hover:text-white"
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute bottom-1 left-4 right-4 h-0.5 origin-left bg-gradient-to-r from-violet-400 to-teal-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onDemoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glow-border hidden rounded-full bg-gradient-to-r from-violet-500 to-teal-400 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-shadow duration-300 hover:shadow-violet-500/40 sm:inline-flex"
          >
            Request Demo
          </motion.button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="border-white/10 bg-[#050914]/95 text-white backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle className="text-left text-white">QDL</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={
                      item.href.startsWith("#")
                        ? (e) => handleScrollToSection(e, item.href)
                        : undefined
                    }
                    className="rounded-lg px-4 py-3 font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={onDemoClick}
                  className="mt-4 rounded-full bg-gradient-to-r from-violet-500 to-teal-400 px-5 py-3 text-center font-semibold text-white"
                >
                  Request Demo
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}


