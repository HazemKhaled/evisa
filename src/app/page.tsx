export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Travel with <span className="text-blue-600">Minimal Visa</span>{" "}
            Requirements
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Simplify your travel with our comprehensive visa processing
            platform. Get destination-based visa information, eligibility
            checking, and seamless application services.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
              Start Your Application
            </button>
            <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Check Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Get your visa in three simple steps with our streamlined process
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Check Eligibility</h3>
              <p className="text-gray-600">
                Enter your passport country and destination to see visa
                requirements
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Submit Documents</h3>
              <p className="text-gray-600">
                Upload required documents through our secure platform
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get Your Visa</h3>
              <p className="text-gray-600">
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
            <p className="mx-auto max-w-2xl text-gray-600">
              Trusted by thousands of travelers worldwide for reliable visa
              processing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Processing</h3>
              <p className="text-gray-600">
                Get your visa processed quickly with our efficient system
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                <span className="text-2xl font-bold text-white">🛡️</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Trusted</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-2xl font-bold text-white">🌍</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Global Coverage</h3>
              <p className="text-gray-600">
                Supporting visa applications for destinations worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
