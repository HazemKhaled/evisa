export default function Home() {
  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Travel with <span className="text-primary-600">Minimal Visa</span>{" "}
            Requirements
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Simplify your travel with our comprehensive visa processing
            platform. Get destination-based visa information, eligibility
            checking, and seamless application services.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-3 font-medium text-white transition-colors">
              Start Your Application
            </button>
            <button className="border-border text-foreground hover:bg-accent rounded-lg border px-6 py-3 font-medium transition-colors">
              Check Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Get your visa in three simple steps with our streamlined process
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="bg-card rounded-lg border p-6 text-center shadow-sm">
              <div className="bg-primary-100 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <span className="text-primary-600 text-xl font-bold">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Check Eligibility</h3>
              <p className="text-muted-foreground">
                Enter your passport country and destination to see visa
                requirements
              </p>
            </div>

            <div className="bg-card rounded-lg border p-6 text-center shadow-sm">
              <div className="bg-secondary-100 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <span className="text-secondary-600 text-xl font-bold">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Submit Documents</h3>
              <p className="text-muted-foreground">
                Upload required documents through our secure platform
              </p>
            </div>

            <div className="bg-card rounded-lg border p-6 text-center shadow-sm">
              <div className="bg-primary-100 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <span className="text-primary-600 text-xl font-bold">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get Your Visa</h3>
              <p className="text-muted-foreground">
                Receive your processed visa and travel with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Why Choose Our Platform
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Trusted by thousands of travelers worldwide for reliable visa
              processing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Processing</h3>
              <p className="text-muted-foreground">
                Get your visa processed quickly with our efficient system
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-500 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-white">🛡️</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Trusted</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-white">🌍</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Global Coverage</h3>
              <p className="text-muted-foreground">
                Supporting visa applications for destinations worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
