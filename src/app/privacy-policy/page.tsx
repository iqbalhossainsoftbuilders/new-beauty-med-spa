import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | New Beauty Med Spa',
}

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-20 bg-ivory">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cormorant text-4xl text-espresso mb-8">Privacy Policy</h1>
        <div className="font-manrope text-sm text-taupe leading-relaxed space-y-6">
          <p>
            New Beauty Med Spa ("we," "our," or "us") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your information when
            you visit our website or use our services.
          </p>
          <h2 className="font-cormorant text-2xl text-espresso">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number,
            and appointment details when you book a consultation or contact us.
          </p>
          <h2 className="font-cormorant text-2xl text-espresso">How We Use Your Information</h2>
          <p>
            We use your information to schedule appointments, communicate about your treatments,
            and improve our services. We do not sell your personal information to third parties.
          </p>
          <h2 className="font-cormorant text-2xl text-espresso">Medical Information</h2>
          <p>
            Any medical or health information you share with us is kept strictly confidential
            and used only to provide appropriate aesthetic treatments.
          </p>
          <h2 className="font-cormorant text-2xl text-espresso">Contact Us</h2>
          <p>
            For privacy-related questions, contact us at:<br />
            New Beauty Med Spa<br />
            15622 Ventura Blvd, Encino, CA 91436<br />
            Email: Newmedspa1@gmail.com<br />
            Phone: (213) 223-7963
          </p>
          <p className="text-xs text-taupe/60">Last updated: November 2026</p>
        </div>
      </div>
    </section>
  )
}
