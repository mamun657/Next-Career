import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const fallbackData = [
  { week: 'Week 1', score: 24 },
  { week: 'Week 2', score: 36 },
  { week: 'Week 3', score: 48 },
  { week: 'Week 4', score: 62 },
  { week: 'Week 5', score: 74 },
  { week: 'Week 6', score: 86 },
];

export default function ProgressChart({ data = fallbackData }) {
  return (
    <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_0_35px_rgba(14,116,144,0.12)] hover:shadow-[0_0_45px_rgba(34,211,238,0.14)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Skill Growth Journey</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-400/25">
          Week 1 - Week 6
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 10, left: -14, bottom: 0 }}>
            <defs>
              <linearGradient id="skillGrowthArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff14" />
            <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172acc',
                border: '1px solid #ffffff1f',
                borderRadius: '10px',
                color: '#e5e7eb',
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#skillGrowthArea)"
              dot={{ r: 3, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#22d3ee' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
