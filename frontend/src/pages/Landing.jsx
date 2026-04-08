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

const steps = [
  {
    title: 'Analyze student behavior',
    text: 'We observe skills, CV signals, interests, and career goals to understand each learner.',
  },
  {
    title: 'Generate Learning DNA',
    text: 'The system converts signals into a personalized learner profile with strengths and weak areas.',
  },
  {
    title: 'Deliver a personalized path',
    text: 'Learners receive jobs, resources, and guidance that match their current growth stage.',
  },
];

const studentStories = [
  {
    title: 'Software Engineering track',
    metric: '85% similar learners became Software Engineers',
    detail: 'Strong problem-solving + project-based learning + weekly job matching.',
  },
  {
    title: 'Data / Analytics track',
    metric: '78% improved their job match score in 30 days',
    detail: 'Focused on SQL, dashboards, and skill-gap closure with guided practice.',
  },
  {
    title: 'Design / Product track',
    metric: 'Students reported higher confidence in portfolio reviews',
    detail: 'Visual learners benefited from structured feedback and resource sequencing.',
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
              AI-Powered Learning DNA Platform
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed max-w-xl">
              Every student learns differently. We personalize education using AI.
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

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-2">How it works</p>
              <h2 className="text-2xl font-semibold text-white">Three steps to a personalized learning journey</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/30 p-5 hover:-translate-y-1 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-200 font-semibold mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-2">Students like you</p>
            <h2 className="text-2xl font-semibold text-white">See how similar learners progressed</h2>
            <div className="mt-6 space-y-4">
              {studentStories.map((story) => (
                <article key={story.title} className="rounded-2xl bg-slate-950/30 border border-white/10 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{story.title}</h3>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{story.detail}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 whitespace-nowrap">
                      {story.metric}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-2">Outcome</p>
              <h2 className="text-2xl font-semibold text-white">Intelligent, personalized, alive</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                NextCareer feels like a real AI startup product because every section responds to the learner: jobs explain themselves, the dashboard adapts, and the assistant gives structured next steps.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { value: 'Learning DNA', label: 'adaptive' },
                { value: 'Jobs', label: 'explained' },
                { value: 'Chat', label: 'guided' },
              ].map((item) => (
                <div key={item.value} className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center">
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                  <p className="text-xs text-slate-300 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
