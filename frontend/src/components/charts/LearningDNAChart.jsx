import { useMemo } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function LearningDNAChart({ profile }) {
  const data = useMemo(() => {
    if (Array.isArray(profile) && profile.length) return profile;

    return [
      { subject: 'Problem Solving', score: 86 },
      { subject: 'Creativity', score: 64 },
      { subject: 'Communication', score: 72 },
      { subject: 'Technical', score: 89 },
      { subject: 'Leadership', score: 54 },
      { subject: 'Adaptability', score: 78 },
    ];
  }, [profile]);

  return (
    <section className="h-full bg-gradient-to-br from-white/5 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/25 p-6 shadow-[0_0_30px_rgba(124,58,237,0.18)] hover:shadow-[0_0_45px_rgba(124,58,237,0.24)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Learning DNA</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/25">
          Radar view
        </span>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="#ffffff1a" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
            <Radar
              name="DNA Score"
              dataKey="score"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172acc',
                border: '1px solid #a855f74f',
                borderRadius: '10px',
                color: '#e5e7eb',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
