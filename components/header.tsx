"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Header() {
  const navItems = [
    { name: "Features", href: "#features-section" },
    { name: "How It Works", href: "#how-it-works-section" },
    { name: "Benefits", href: "#benefits-section" },
    { name: "Testimonials", href: "#testimonials-section" },
    { name: "Getting Started", href: "#getting-started-section" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <motion.span 
              className="text-white text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              QDL
            </motion.span>
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
                  onClick={(e) => handleScroll(e, item.href)}
                  className="relative text-white/80 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 group"
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
          <Link href="#" className="hidden md:block">
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                className="bg-white text-teal-600 hover:bg-white/95 hover:shadow-xl hover:shadow-teal-500/30 px-6 py-2 rounded-full font-semibold shadow-lg shadow-teal-500/20 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </motion.div>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </motion.button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-muted-foreground hover:text-primary justify-start text-lg py-2 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="#" className="w-full mt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-2 rounded-full font-medium shadow-sm w-full">
                    Get Started Free
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
