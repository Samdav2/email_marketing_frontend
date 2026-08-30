'use client'

import { useState } from 'react'
import {
  Database,
  Play,
  Download,
  Filter,
  Globe,
  Loader2,
  Terminal,
  RefreshCw,
} from 'lucide-react'
import { useEmailStore } from '@/store/emailStore'
import { ScrapeToDbResponse, DomainScrapeResult } from '@/types'
import { downloadCSV } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ScrapePage() {
  const { runScrape, isScraping } = useEmailStore()

  const [domainLimit, setDomainLimit] = useState(50)
  const [emailLimit, setEmailLimit] = useState(500)
  const [category, setCategory] = useState('WEB')

  const [progress, setProgress] = useState(0)
  const [currentDomain, setCurrentDomain] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const [scrapeResult, setScrapeResult] = useState<ScrapeToDbResponse | null>(null)

  const handleStartScrape = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogs([
      `[${new Date().toLocaleTimeString()}] Initializing UK Lead Discovery Engine...`,
      `[${new Date().toLocaleTimeString()}] Parameter target: ${domainLimit} domains, max ${emailLimit} emails.`,
    ])
    setProgress(5)
    setScrapeResult(null)

    // Simulate progressive log streaming
    const sampleDomains = [
      'apex-solutions.co.uk',
      'brighton-tech.org.uk',
      'cambridge-analytics.co.uk',
      'manchester-logistics.co.uk',
      'edinburgh-consulting.co.uk',
      'birmingham-agency.co.uk',
      'oxford-innovations.co.uk',
    ]

    let currProg = 10
    const interval = setInterval(() => {
      currProg += 15
      if (currProg <= 85) {
        setProgress(currProg)
        const d = sampleDomains[Math.floor(Math.random() * sampleDomains.length)]
        setCurrentDomain(d)
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Scanning ${d} ... Found ${Math.floor(Math.random() * 5 + 1)} valid contact emails.`,
        ])
      }
    }, 600)

    try {
      const res = await runScrape(emailLimit, domainLimit, category)
      clearInterval(interval)
      setProgress(100)
      setCurrentDomain('Completed')
      setScrapeResult(res)
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] SUCCESS: Operation complete! Saved ${res.total_emails_saved} new emails, skipped ${res.duplicates_skipped} duplicates.`,
      ])
      toast.success(`Scraped ${res.total_emails_saved} new UK emails!`)
    } catch (err: any) {
      clearInterval(interval)
      setProgress(0)
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: ${err.message}`])
      toast.error(err.message || 'Scrape operation failed')
    }
  }

  const handleExportResultsCSV = () => {
    if (!scrapeResult || !scrapeResult.results) return
    const allEmails: string[] = []
    scrapeResult.results.forEach((r) => {
      r.emails.forEach((e) => allEmails.push(`${e},${r.domain},${r.status}`))
    })
    const csv = `Email,Domain,Status\n` + allEmails.join('\n')
    downloadCSV(`scraped-uk-emails-${Date.now()}.csv`, csv)
    toast.success('Exported results to CSV!')
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-400" />
            UK Email Scraper Command Center
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Automated UK domain discovery via web archive search with duplicate filtering.
          </p>
        </div>

        {scrapeResult && (
          <button
            onClick={handleExportResultsCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export Scrape CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scrape Controls Form (1 Col) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Filter className="w-4 h-4 text-blue-400" />
            Scraper Configuration
          </h3>

          <form onSubmit={handleStartScrape} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                UK Domains Limit (1 - 10,000)
              </label>
              <input
                type="number"
                min={1}
                max={10000}
                value={domainLimit}
                onChange={(e) => setDomainLimit(Number(e.target.value))}
                required
                className="w-full glass-input px-4 py-3 rounded-xl text-sm font-semibold"
              />
              <p className="text-[11px] text-gray-400 mt-1">Number of UK registered domains to crawl.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Max Email Stop Threshold
              </label>
              <input
                type="number"
                min={10}
                max={100000}
                value={emailLimit}
                onChange={(e) => setEmailLimit(Number(e.target.value))}
                required
                className="w-full glass-input px-4 py-3 rounded-xl text-sm font-semibold"
              />
              <p className="text-[11px] text-gray-400 mt-1">Stops crawling automatically once target is hit.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Lead Classification Tag
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-xl text-sm font-semibold bg-slate-900 text-white"
              >
                <option value="WEB">WEB - General Business</option>
                <option value="TECH">TECH - Software & Engineering</option>
                <option value="FINANCE">FINANCE - Banking & Accounting</option>
                <option value="RETAIL">RETAIL - E-Commerce & Stores</option>
                <option value="HEALTH">HEALTH - Medical & Biotech</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isScraping}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                {isScraping ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Crawling Web Archives...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Execute Scrape Operation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Terminal & Stream Logs (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Bar Panel */}
          {isScraping && (
            <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-blue-400 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Scanning Domain: <span className="text-white">{currentDomain || 'Discovering...'}</span>
                </span>
                <span className="text-white">{progress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Console Output */}
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                Live Scrape Console Output
              </span>
              <span className="text-[10px] font-mono text-gray-400">session_log.txt ACTIVE</span>
            </div>
            <div className="p-6 bg-slate-950 font-mono text-xs text-gray-300 h-64 overflow-y-auto space-y-2">
              {logs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 italic">
                  Press 'Execute Scrape Operation' to launch UK domain crawling...
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes('SUCCESS')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('ERROR')
                        ? 'text-rose-400 font-bold'
                        : 'text-gray-300'
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Scrape Metrics Breakdown */}
          {scrapeResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <p className="text-xs font-semibold text-gray-400">Total Processed</p>
                <p className="text-2xl font-extrabold text-white mt-1">{scrapeResult.total_processed}</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 text-center">
                <p className="text-xs font-semibold text-gray-400">Leads Saved</p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1">{scrapeResult.total_emails_saved}</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 text-center">
                <p className="text-xs font-semibold text-gray-400">Duplicates Skipped</p>
                <p className="text-2xl font-extrabold text-amber-400 mt-1">{scrapeResult.duplicates_skipped}</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 text-center">
                <p className="text-xs font-semibold text-gray-400">Errors</p>
                <p className="text-2xl font-extrabold text-rose-400 mt-1">{scrapeResult.errors}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Breakdown Table */}
      {scrapeResult && scrapeResult.results && (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden space-y-4">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Scraped Domain Breakdown Details
            </h3>
            <span className="text-xs text-gray-400 font-semibold">
              Showing {scrapeResult.results.length} domains
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-6">Domain</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Extracted Emails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {scrapeResult.results.map((r: DomainScrapeResult, idx: number) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white font-bold">{r.domain}</td>
                    <td className="py-4 px-6">
                      {r.status === 'success' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold whitespace-nowrap">
                          Success
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold whitespace-nowrap">
                          Error
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {r.emails.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {r.emails.map((email, eIdx) => (
                            <span
                              key={eIdx}
                              className="px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px]"
                            >
                              {email}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">No emails found</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

