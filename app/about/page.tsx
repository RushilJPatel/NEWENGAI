import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link 
          href="/" 
          className="inline-block mb-8 text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About This App
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              This is your first web application! Built with modern technologies and best practices.
            </p>
            
            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Technologies Used</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-2xl mr-3">⚛️</span>
                <div>
                  <strong>React & Next.js 14</strong> - Modern framework for building web apps
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">🎨</span>
                <div>
                  <strong>Tailwind CSS</strong> - Utility-first CSS for beautiful designs
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">📘</span>
                <div>
                  <strong>TypeScript</strong> - Type-safe JavaScript for better code
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">☁️</span>
                <div>
                  <strong>Vercel</strong> - Cloud platform for instant deployment
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">What's Next?</h2>
            <p className="text-gray-700 mb-4">
              Now that you have your first app running, here are some ideas to expand it:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Add more pages and routes</li>
              <li>Integrate a database (like MongoDB or PostgreSQL)</li>
              <li>Add user authentication</li>
              <li>Create a blog or portfolio</li>
              <li>Build a REST API with Next.js API routes</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

