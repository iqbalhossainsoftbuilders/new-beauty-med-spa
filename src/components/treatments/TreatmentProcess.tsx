interface ProcessStep {
  stepNumber: number
  title: string
  description: string
}

export function TreatmentProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="py-20 bg-espresso">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label text-gold mb-4">The Process</p>
          <h2 className="font-cormorant text-editorial text-ivory">How It Works</h2>
          <span className="gold-line" />
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step) => (
            <div key={step.stepNumber} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <span className="font-cormorant text-gold text-lg">{step.stepNumber}</span>
              </div>
              <div className="flex-1 pb-6 border-b border-ivory/10 last:border-0">
                <h3 className="font-playfair text-lg text-ivory mb-2">{step.title}</h3>
                <p className="font-manrope text-sm text-ivory/60 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
