import type { CSSProperties } from 'react'
import { BadgeCheck } from 'lucide-react'
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react'
import DemoLink from './DemoLink'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#EFEFEF]">
      {/* Animated shader stack: Swirl and ChromaFlow generate, FlutedGlass and FilmGrain post-process */}
      <Shader className="pointer-events-none absolute inset-0 z-10">
        <FilmGrain strength={0.05}>
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          >
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow
              baseColor="#ffffff"
              downColor="#ff5f03"
              leftColor="#ff5f03"
              rightColor="#ff5f03"
              upColor="#ff5f03"
              momentum={13}
              radius={3.5}
            />
          </FlutedGlass>
        </FilmGrain>
      </Shader>

      {/* Brand mark, sitting in the space the navigation used to occupy */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        <div data-reveal className="flex items-center gap-2.5">
          <img
            src="/qdl-mark.png"
            alt="Quantum Data Leap"
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />
          <span className="wordmark text-[28px] sm:text-[34px]">QDL</span>
        </div>
      </div>

      {/* Spacer pushes hero copy to the bottom of the viewport */}
      <div className="flex-1" />

      {/* Hero content */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="reveal-mask mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
          <span
            data-reveal
            style={{ '--reveal-y': '100%' } as CSSProperties}
            className="block"
          >
            FiSec Global
          </span>
        </p>

        {/* Each line rises from behind its own mask, one after the other */}
        <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
          {['Your platform needs intelligence,', 'powered by Quantum Data Leap.'].map(
            (line, i) => (
              <span key={line} className="reveal-mask block">
                <span
                  data-reveal
                  style={
                    {
                      '--reveal-y': '100%',
                      '--reveal-delay': `${90 + i * 110}ms`,
                    } as CSSProperties
                  }
                  className="block"
                >
                  {line}
                </span>
              </span>
            ),
          )}
        </h1>

        <p
          data-reveal
          style={{ '--reveal-delay': '310ms' } as CSSProperties}
          className="mt-6 max-w-[46rem] text-[15px] leading-[1.6] text-gray-700 sm:mt-7 sm:text-[17px]"
        >
          The industry does not have a payment problem. It has an intelligence
          problem. QDL connects the core systems your institution already
          operates to screen, fund and settle every payment.
        </p>

        <div
          data-reveal
          style={{ '--reveal-delay': '420ms' } as CSSProperties}
          className="mt-8 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5"
        >
          <DemoLink />

          <div className="flex items-center gap-2 rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:gap-2.5 sm:px-4">
            <BadgeCheck
              className="h-5 w-5 shrink-0 text-[#062698] sm:h-6 sm:w-6"
              strokeWidth={1.75}
            />
            <span className="text-[13px] font-medium text-gray-900 sm:text-[14px]">
              ISO 20022 Certified
            </span>
            <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]">
              pacs.008
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
