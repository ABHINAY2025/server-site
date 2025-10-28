import { Database, Cpu, Zap, BarChart3 } from "lucide-react"

export function SystemFlowSection() {
  const steps = [
    { label: "Data Sources", icon: Database },
    { label: "QGPT Engine", icon: Cpu },
    { label: "AI Modules", icon: Zap },
    { label: "Reports & Dashboard", icon: BarChart3 },
  ]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-6 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              How It All Works
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Data flows through our intelligent system for processing, analysis, and actionable insights.
            </p>
          </div>
        </div>

        {/* System Flow Diagram */}
        <div className="self-stretch flex flex-col md:flex-row justify-center items-center gap-4 z-10">
          {steps.map(({ label, icon: Icon }, index) => (
            <div key={label} className="flex items-center gap-4">
              <div className="overflow-hidden rounded-xl border-2 border-border bg-card px-6 py-4 flex flex-col justify-center items-center gap-2 relative min-w-[140px] group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 shadow-sm">
                <Icon className="relative z-10 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <p className="relative z-10 text-foreground text-sm md:text-base font-semibold text-center group-hover:text-primary transition-colors duration-300">
                  {label}
                </p>
              </div>
              {index < 3 && <div className="hidden md:block text-primary text-2xl">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
