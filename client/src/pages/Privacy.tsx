import { Link } from "wouter";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/state/store";

export default function PrivacyPolicy() {
  const isDark = useStore((state) => state.isDark);

  return (
    <div className={`min-h-screen ${isDark ? "dark bg-gray-950" : "bg-gray-50"} transition-colors duration-300 flex flex-col`}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/">
            <button className={`flex items-center gap-2 transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</div>
            
            <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                At ArchStudio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered architecture design services.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the site.</li>
                <li><strong>Design Data:</strong> Floor plans, 3D models, room dimensions, and specific architectural preferences you input into our application.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your account.</li>
                <li>Generate tailored AI architecture designs and floor plans based on your inputs.</li>
                <li>Process your transactions and deliver related information.</li>
                <li>Improve our AI models and the overall quality of our design suggestions.</li>
                <li>Respond to customer service requests and provide support.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. AI Processing and Design Data</h2>
              <p>
                The core functionality of ArchStudio involves processing your specific room requirements and preferences through our AI models. While your design data is used to generate your final layouts and 3D models, we do not claim ownership over the specific floor plans you generate. We may use anonymized, aggregated design patterns to improve our AI algorithms.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at: privacy@archstudio.example.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
