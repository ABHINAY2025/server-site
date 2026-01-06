"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface HeaderProps {
  onDemoClick?: () => void
}

export function Header({ onDemoClick }: HeaderProps) {
  const [isInHero, setIsInHero] = useState(true)
  const pathname = usePathname()
  const isBlogsPage = pathname?.includes('/blogs')

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsInHero(heroBottom > 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features-section" },
    { name: "How It Works", href: "#process-section" },
    { name: "Benefits", href: "#benefits-section" },
    { name: "Testimonials", href: "#testimonials-section" },
    { name: "Blogs", href: "/blogs" },
  ]

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

  const shouldShowBg = isBlogsPage || !isInHero
  const headerBgClass = shouldShowBg 
    ? "bg-transparent" 
    : ""
  const headerBlurClass = "backdrop-blur-sm"
  const headerStyle = shouldShowBg 
    ? { background: "linear-gradient(90deg, #F9687F 0%, #FBA750 100%)" }
    : {}

  return (
    <header style={headerStyle} className={`fixed top-0 left-0 right-0 w-full pb-2 pt-2 px-6 z-50 transition-all duration-300 ${headerBgClass} ${headerBlurClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/logo.png"
              alt="QDL Logo"
              width={40}
              height={40}
              className="hover:opacity-80 transition-opacity"
            />
            <motion.button
              onClick={(e) => handleScrollToSection(e as any, "#hero-section")}
              className="text-white text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              QDL
            </motion.button>
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
                  className="relative text-white hover:text-gray-200 px-4 py-2 rounded-lg font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover underline effect with teal gradient */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
            <Button
                size="lg"
                variant="outline"
                style={{ 
                  backgroundColor: "white",
                  color: "rgb(249, 105, 126)",
                  borderColor: "rgb(249, 105, 126)"
                }}
                className="group relative mx-auto h-9 w-36 rounded-full border-1 px-8 text-base font-semibold transition-all hover:bg-gray-50 sm:mx-0"
                onClick={onDemoClick}
                aria-label="Request demo"
              >
                <span className="relative">Request Demo</span>
            </Button>
        </div>
      </div>
    </header>
  )
}


