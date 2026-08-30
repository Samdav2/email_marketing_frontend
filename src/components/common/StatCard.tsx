import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  isPositive?: boolean
  description?: string
  icon: LucideIcon
  color: 'blue' | 'cyan' | 'purple' | 'emerald' | 'amber'
}

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  description,
  icon: Icon,
  color,
}: StatCardProps) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      iconBg: 'bg-blue-500/20 text-blue-400',
      glow: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      glow: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/20 text-purple-400',
      glow: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      glow: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/20 text-amber-400',
      glow: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    },
  }[color]

  return (
    <div className={`glass-card p-6 rounded-2xl border transition-all ${colorStyles.border} ${colorStyles.glow}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${colorStyles.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {change}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
        {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
      </div>
    </div>
  )
}
