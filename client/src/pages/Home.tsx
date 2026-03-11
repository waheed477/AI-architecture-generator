import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-900" data-testid="heading-main">
          AI-Powered 3D Architecture Layout Generator
        </h1>
        <p className="text-lg text-gray-600" data-testid="text-subheading">
          Generate your custom building layout based on your preferences.
        </p>
        <div className="pt-4">
          <Link href="/design">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
              data-testid="button-get-started"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
