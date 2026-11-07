interface QuickInfo {
  duration: string
  bestFor: string
  sessions: string
}

interface TreatmentOverviewProps {
  intro: string
  quickInfo: QuickInfo
  duration: string
  downtime: string
  aftercare: string
}

export function TreatmentOverview({ intro, quickInfo, duration, downtime, aftercare }: TreatmentOverviewProps) {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="section-label mb-4">About This Treatment</p>
            <p className="font-manrope text-sm text-taupe leading-relaxed mb-6">{intro}</p>
            <div className="mt-8">
              <p className="section-label mb-4">Aftercare</p>
              <p className="font-manrope text-sm text-taupe leading-relaxed">{aftercare}</p>
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-6 h-fit">
            <h3 className="font-cormorant text-xl text-espresso mb-4">At a Glance</h3>
            <div className="space-y-4">
              <div className="border-b border-champagne pb-3">
                <p className="font-manrope text-xs text-gold uppercase tracking-wide mb-1">Duration</p>
                <p className="font-manrope text-sm text-espresso">{duration}</p>
              </div>
              <div className="border-b border-champagne pb-3">
                <p className="font-manrope text-xs text-gold uppercase tracking-wide mb-1">Downtime</p>
                <p className="font-manrope text-sm text-espresso">{downtime}</p>
              </div>
              <div className="border-b border-champagne pb-3">
                <p className="font-manrope text-xs text-gold uppercase tracking-wide mb-1">Best For</p>
                <p className="font-manrope text-sm text-espresso">{quickInfo.bestFor}</p>
              </div>
              <div>
                <p className="font-manrope text-xs text-gold uppercase tracking-wide mb-1">Recommended Sessions</p>
                <p className="font-manrope text-sm text-espresso">{quickInfo.sessions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
