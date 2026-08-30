import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  isPositive?: boolean
  description?: string
  icon: LucideIcon
  color?: 'blue' | 'cyan' | 'purple' | 'emerald' | 'amber'
}

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  description,
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all bg-slate-900/60">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold bg-blue-600/20 text-blue-400">
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
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

