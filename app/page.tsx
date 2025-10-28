import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to My First App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A beautiful web app built with Next.js and deployed on Vercel
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/about" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Learn More
            </Link>
            <button 
              onClick={() => alert('Hello from your first app!')}
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Try Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon="🚀"
            title="Fast & Modern"
            description="Built with Next.js 14 for blazing fast performance"
          />
          <FeatureCard 
            icon="🎨"
            title="Beautiful UI"
            description="Clean, modern design with smooth animations"
          />
          <FeatureCard 
            icon="☁️"
            title="Cloud Deployed"
            description="Hosted on Vercel for instant global delivery"
          />
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Your Journey Starts Here
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Beginner Friendly</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5 min</div>
              <div className="text-gray-600">Deploy Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">Free</div>
              <div className="text-gray-600">Hosting on Vercel</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

