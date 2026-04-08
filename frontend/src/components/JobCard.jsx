import { Link } from 'react-router-dom';

export default function JobCard({ job, isSelected = false }) {
  const getSkillTagClass = (skill) => {
    const key = String(skill || '').toLowerCase();
    if (key.includes('react')) return 'bg-blue-500/20 text-blue-300 border-blue-500/35';
    if (key.includes('python')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/35';
    if (key.includes('node')) return 'bg-green-500/20 text-green-300 border-green-500/35';
    if (key.includes('mongo')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35';
    if (key.includes('figma')) return 'bg-purple-500/20 text-purple-300 border-purple-500/35';
    if (key.includes('express')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/35';
    if (key.includes('sql')) return 'bg-orange-500/20 text-orange-300 border-orange-500/35';
    return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35';
  };

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
          <span className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 border border-cyan-400/40 rounded-full text-white text-sm font-semibold shadow-lg shadow-cyan-500/25">
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
          <span key={s} className={`text-sm px-3 py-1 rounded-lg font-medium border ${getSkillTagClass(s)}`}>
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