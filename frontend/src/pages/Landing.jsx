import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Brand from '../components/Brand';
import Footer from '../components/Footer';
import webDevAnimation from '../assets/animated/web-development.json';

export default function Landing() {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0d1526] to-[#1a1033]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-indigo-950/30" />
      
      {/* Radial glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center px-6 lg:px-12 py-6">
        <Brand />
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center px-6 lg:px-12 xl:px-24 py-12 lg:py-20 min-h-[calc(100vh-88px)]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                AI-Powered
              </span>
              <br />
              Career Companion
            </h1>
            
            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Discover your ideal career path with intelligent job matching, skill gap analysis, and personalized learning roadmaps powered by AI.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white
                           bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
                           hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500
                           shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]
                           transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-gray-300
                           bg-white/5 border border-white/20 hover:bg-white/10 hover:text-white
                           transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right: Lottie Animation */}
          <div className="flex justify-center lg:justify-end">
            <Lottie 
              animationData={webDevAnimation} 
              loop 
              className="w-full max-w-[450px]"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
