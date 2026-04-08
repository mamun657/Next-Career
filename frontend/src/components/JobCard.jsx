import { Link } from 'react-router-dom';

export default function JobCard({ job, isSelected = false }) {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className={`group block bg-white/[0.04] backdrop-blur-xl rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
        isSelected
          ? 'border-cyan-500/60 shadow-xl shadow-cyan-500/15 bg-gradient-to-r from-cyan-500/[0.08] to-blue-500/[0.08] ring-1 ring-cyan-500/30'
          : 'border-white/[0.08] hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-white text-lg group-hover:text-cyan-300 transition-colors">{job.title}</h4>
          <p className="text-gray-400 mt-1">{job.company}</p>
        </div>
        {job.matchScore && (
          <span className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-semibold">
            {job.matchScore}%
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
        <span>{job.location}</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full" />
        <span>{job.jobType}</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full" />
        <span>{job.experienceLevel}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(job.requiredSkills || []).slice(0, 4).map((s) => (
          <span key={s} className="text-sm bg-slate-800/60 text-gray-300 px-3 py-1 rounded-lg font-medium border border-white/5">
            {s}
          </span>
        ))}
        {(job.requiredSkills || []).length > 4 && (
          <span className="text-sm text-gray-500 px-2 py-1">+{job.requiredSkills.length - 4} more</span>
        )}
      </div>
    </Link>
  );
}