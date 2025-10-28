"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BarChart3, Shield, Settings, Database, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { AnimatedSection } from "./animated-section"
import { cn } from "@/lib/utils"

const modules = [
  {
    id: "liquidity",
    label: "Liquidity Dashboard",
    icon: BarChart3,
    description: "Monitor and optimize your cash flow with real-time liquidity insights",
    image: "/images/dashboard-preview.png",
    cta: "Explore Liquidity",
  },
  {
    id: "fraud",
    label: "Fraud Detection",
    icon: Shield,
    description: "Protect your institution with AI-powered fraud detection and monitoring",
    image: "/images/dashboard-preview.png",
    cta: "Explore Fraud Detection",
  },
  {
    id: "rules",
    label: "Rule Management",
    icon: Settings,
    description: "Automate compliance and business rules with our no-code engine",
    image: "/images/dashboard-preview.png",
    cta: "Explore Rules",
  },
  {
    id: "data",
    label: "Data Control Center",
    icon: Database,
    description: "Take complete control of your banking data with intelligent management",
    image: "/images/dashboard-preview.png",
    cta: "Explore Data Control",
  },
]

export function PremiumGettingStartedSection() {
  const [activeTab, setActiveTab] = React.useState("liquidity")
  const [hoveredImage, setHoveredImage] = React.useState(false)

  const activeModule = modules.find((m) => m.id === activeTab) || modules[0]

  return (
    <AnimatedSection id="getting-started-section" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Getting Started
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          Explore QDL modules and transform your banking operations today
        </motion.p>
      </div>

      <div className="mt-16">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          {/* Tab Navigation */}
          <TabsList className="flex flex-wrap justify-center gap-2 border-b border-border bg-transparent h-auto p-0">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <TabsTrigger
                  key={module.id}
                  value={module.id}
                  className={cn(
                    "group relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all",
                    "border-b-2 border-transparent rounded-none",
                    "hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    "data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent",
                    "data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-transparent"
                  )}
                  aria-label={`Explore ${module.label}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{module.label}</span>
                  <span className="sm:hidden">{module.label.split(" ")[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Tab Content */}
          {modules.map((module) => (
            <TabsContent
              key={module.id}
              value={module.id}
              className="focus:outline-none mt-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-12 lg:grid-cols-2 lg:items-center"
              >
                {/* Left: Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-3xl font-semibold">
                      {module.label}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="group inline-flex items-center gap-2"
                    aria-label={module.cta}
                  >
                    {module.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Right: Dashboard Preview with hover zoom */}
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
                  onMouseEnter={() => setHoveredImage(true)}
                  onMouseLeave={() => setHoveredImage(false)}
                >
                  <motion.div
                    animate={{
                      scale: hoveredImage && module.id === activeTab ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative aspect-video"
                  >
                    <Image
                      src={module.image}
                      alt={`${module.label} preview`}
                      fill
                      className="object-cover"
                      priority={module.id === activeTab}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AnimatedSection>
  )
}

