export function WhatIsQDLSection() {
  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-6 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              What is QDL?
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Quantum Data Leap is an intelligent banking platform that combines data governance, liquidity
              optimization, fraud prevention, and rules management into one unified system.
            </p>
          </div>
        </div>

        {/* QDL Core Modules Grid */}
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
          {[
            { title: "Data Control", description: "Secure governance and intelligent data handling" },
            { title: "Liquidity", description: "Optimize cash flow and multi-bank concentration" },
            { title: "Fraud", description: "AI-powered detection and real-time learning" },
            { title: "Rules", description: "No-code builder with AI optimization" },
          ].map((module) => (
            <div
              key={module.title}
              className="overflow-hidden rounded-2xl border-2 border-border bg-card p-6 flex flex-col justify-start items-start relative shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-foreground text-lg font-semibold">{module.title}</h3>
                <p className="text-muted-foreground text-sm">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
