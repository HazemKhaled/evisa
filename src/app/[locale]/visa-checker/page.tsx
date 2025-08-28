import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";

export default function VisaCheckerPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Our Visa Checker Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Countries</h3>
                <p className="text-gray-600">
                  Choose your passport country and destination to get started.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Check Requirements</h3>
                <p className="text-gray-600">
                  Get instant results about visa requirements and eligibility.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Application</h3>
                <p className="text-gray-600">
                  Connect with trusted service providers to process your visa.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
