import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Brand from '../components/Brand';
import Footer from '../components/Footer';
import webDevAnimation from '../assets/animated/web-development.json';

const highlights = [
  {
    title: 'Learning DNA Engine',
    desc: 'Understands how each learner improves fastest and adapts plans weekly.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'AI Job Matching',
    desc: 'Transparent matching with clear reasoning, strengths, and gaps for every role.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    ),
  },
  {
    title: 'Personalized Upskilling',
    desc: 'Roadmaps, resources, and micro-feedback tailored to your target career.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253" />
    ),
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-[#060c18] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(58,190,249,0.20),transparent_40%),radial-gradient(circle_at_80%_65%,rgba(99,102,241,0.14),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />

      <nav className="relative z-20 px-6 lg:px-12 py-6 flex items-center justify-between">
        <Brand />
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link to="/register" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-medium transition-all">
            Create account
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 lg:px-12 xl:px-24 pb-16 pt-8 lg:pt-10">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 mb-5">
              AI Career Intelligence
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Build your career with
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Learning DNA</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed max-w-xl">
              NextCareer combines behavioral learning signals, skill graphs, and market demand to guide what you should learn, where to apply, and how to grow faster.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_20px_60px_rgba(58,190,249,0.35)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Demo
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold bg-white/5 hover:bg-white/10 border border-white/20 text-slate-100 transition-all"
              >
                Open Platform
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-xl">
                <p className="text-2xl font-bold text-cyan-300">92%</p>
                <p className="text-xs text-slate-400">Relevance score</p>
              </div>
              <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-xl">
                <p className="text-2xl font-bold text-cyan-300">7d</p>
                <p className="text-xs text-slate-400">Insight cycle</p>
              </div>
              <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-xl">
                <p className="text-2xl font-bold text-cyan-300">3x</p>
                <p className="text-xs text-slate-400">Faster planning</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 blur-2xl" />
            <div className="relative rounded-3xl border border-white/15 bg-white/[0.05] backdrop-blur-2xl p-6">
              <Lottie animationData={webDevAnimation} loop className="w-full max-w-[460px] mx-auto" />
            </div>
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-xl p-6 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
