import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="hole-punch" />
          <span className="font-tag text-sm tracking-widest uppercase text-ink/70">
            Tagged
          </span>
        </div>
        <nav className="flex gap-6 font-body text-sm font-medium text-ink/80">
          <Link href="/browse" className="hover:text-teal transition-colors">
            Browse items
          </Link>
          <Link href="/login" className="hover:text-teal transition-colors">
            Log in
          </Link>
        </nav>
      </header>

      {/* Hero: torn ticket */}
      <section className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] rounded-sm overflow-hidden shadow-[0_8px_0_rgba(35,38,32,0.15)]">
            {/* FOUND stub */}
            <Link
              href="/post/found"
              className="group bg-teal text-cream p-10 flex flex-col justify-between min-h-[280px] transition-colors hover:bg-[#285e53]"
            >
              <div>
                <span className="font-tag text-xs tracking-[0.2em] uppercase text-cream/70">
                  Stub A · No. 001
                </span>
                <h1 className="font-display font-bold text-4xl md:text-5xl mt-4 leading-[1.05]">
                  I found
                  <br />
                  something
                </h1>
              </div>
              <p className="font-body text-cream/85 mt-6 max-w-xs">
                Post a photo and where you found it. We'll hold the details back
                until the right owner proves it's theirs.
              </p>
              <span className="mt-6 font-tag text-sm uppercase tracking-wide underline underline-offset-4 group-hover:no-underline">
                Report a find →
              </span>
            </Link>

            {/* Perforated divider */}
            <div className="hidden md:flex flex-col items-center justify-between perforated w-3 py-6">
              <div className="hole-punch" />
              <div className="hole-punch" />
              <div className="hole-punch" />
            </div>
            <div className="md:hidden perforated h-3 w-full" />

            {/* LOST stub */}
            <Link
              href="/post/lost"
              className="group bg-brick text-cream p-10 flex flex-col justify-between min-h-[280px] transition-colors hover:bg-[#a83a33]"
            >
              <div>
                <span className="font-tag text-xs tracking-[0.2em] uppercase text-cream/70">
                  Stub B · No. 002
                </span>
                <h1 className="font-display font-bold text-4xl md:text-5xl mt-4 leading-[1.05]">
                  I lost
                  <br />
                  something
                </h1>
              </div>
              <p className="font-body text-cream/85 mt-6 max-w-xs">
                Describe what's missing and where. We'll watch new finds and
                alert you the moment one matches.
              </p>
              <span className="mt-6 font-tag text-sm uppercase tracking-wide underline underline-offset-4 group-hover:no-underline">
                Report a loss →
              </span>
            </Link>
          </div>

          <p className="text-center font-tag text-xs tracking-widest uppercase text-ink/50 mt-6">
            Tear along the line · both stubs lead back to the same ticket
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              tag: 'No. 01',
              title: 'Post the details',
              body: 'Photos, category, location, and date — whichever side of the ticket applies to you.',
            },
            {
              tag: 'No. 02',
              title: 'We watch for matches',
              body: 'New posts are checked against open ones nearby. A likely match notifies both sides.',
            },
            {
              tag: 'No. 03',
              title: 'Prove it, then meet',
              body: "The claimant answers a question only the true owner would know. No contact info shared until you're both ready.",
            },
          ].map((step) => (
            <div key={step.tag} className="border-t-2 border-ink/15 pt-4">
              <span className="font-tag text-xs tracking-widest text-brass">
                {step.tag}
              </span>
              <h3 className="font-display font-bold text-xl mt-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-ink/70 mt-2 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
