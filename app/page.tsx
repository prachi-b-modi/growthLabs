"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Phone,
  CheckCircle,
  XCircle,
  Edit3,
  TrendingUp,
  TrendingDown,
  Zap,
  Inbox,
  Mic,
  X,
  Mail,
  Clock,
  User,
  Brain,
  FlaskConical,
  BarChart3,
  Users,
  CloudLightningIcon as Lightning,
  Shield,
  DollarSign,
} from "lucide-react"

// Avatar component using Lucide icons as fallback
const AgentAvatar = ({ agent }: { agent: any }) => {
  const getAvatarIcon = (name: string) => {
    switch (name) {
      case "Bright Data MCP":
        return <User className="w-12 h-12 text-white" />
      case "Senso.ai":
        return <Brain className="w-12 h-12 text-white" />
      case "Experiment Designer":
        return <FlaskConical className="w-12 h-12 text-white" />
      case "Growth Optimizer":
        return <BarChart3 className="w-12 h-12 text-white" />
      case "User Insights":
        return <Users className="w-12 h-12 text-white" />
      case "A/B Controller":
        return <Lightning className="w-12 h-12 text-white" />
      case "Retention Guard":
        return <Shield className="w-12 h-12 text-white" />
      case "Revenue Tracker":
        return <DollarSign className="w-12 h-12 text-white" />
      default:
        return <User className="w-12 h-12 text-white" />
    }
  }

  const getAvatarBackground = (name: string) => {
    switch (name) {
      case "Bright Data MCP":
        return "bg-gradient-to-br from-blue-500 to-blue-700"
      case "Senso.ai":
        return "bg-gradient-to-br from-purple-500 to-purple-700"
      case "Experiment Designer":
        return "bg-gradient-to-br from-green-500 to-green-700"
      case "Growth Optimizer":
        return "bg-gradient-to-br from-orange-500 to-orange-700"
      case "User Insights":
        return "bg-gradient-to-br from-pink-500 to-pink-700"
      case "A/B Controller":
        return "bg-gradient-to-br from-yellow-500 to-yellow-700"
      case "Retention Guard":
        return "bg-gradient-to-br from-red-500 to-red-700"
      case "Revenue Tracker":
        return "bg-gradient-to-br from-emerald-500 to-emerald-700"
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-700"
    }
  }

  return (
    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${getAvatarBackground(agent.name)}`}>
      {getAvatarIcon(agent.name)}
    </div>
  )
}

// Mock data
const agents = [
  {
    id: 1,
    name: "Bright Data MCP",
    status: "active",
    description: "Web scraping & data collection",
  },
  {
    id: 2,
    name: "Senso.ai",
    status: "processing",
    description: "AI sentiment analysis",
  },
  {
    id: 3,
    name: "Experiment Designer",
    status: "idle",
    description: "A/B test orchestration",
  },
  {
    id: 4,
    name: "Growth Optimizer",
    status: "active",
    description: "Conversion optimization",
  },
  {
    id: 5,
    name: "User Insights",
    status: "analyzing",
    description: "Behavioral analytics",
  },
  {
    id: 6,
    name: "A/B Controller",
    status: "running",
    description: "Test execution engine",
  },
  {
    id: 7,
    name: "Retention Guard",
    status: "monitoring",
    description: "Churn prevention",
  },
  {
    id: 8,
    name: "Revenue Tracker",
    status: "active",
    description: "Revenue optimization",
  },
]

const events = [
  {
    id: 1,
    type: "RETENTION_DROP_DETECTED",
    timestamp: "2024-01-26T12:25:00Z",
    agent: "Retention Guard",
    status: "DECISION_READY",
    subject: "7-day retention below threshold",
    preview: "Cohort 2024-01-19 showing 68% retention vs 75% target",
    payload: {
      metric: "7_day_retention",
      current_value: 0.68,
      threshold: 0.75,
      affected_cohort: "2024-01-19",
      confidence: 0.94,
    },
  },
  {
    id: 2,
    type: "EXPERIMENT_COMPLETED",
    timestamp: "2024-01-26T12:20:00Z",
    agent: "A/B Controller",
    status: "ACTION_REQUIRED",
    subject: "Homepage CTA experiment results ready",
    preview: "Variant B shows 25.8% improvement in conversion rate",
    payload: {
      experiment_id: "homepage_cta_v2",
      variant_a_conversion: 0.124,
      variant_b_conversion: 0.156,
      statistical_significance: 0.98,
      sample_size: 12450,
    },
  },
  {
    id: 3,
    type: "REVENUE_ANOMALY",
    timestamp: "2024-01-26T12:15:00Z",
    agent: "Revenue Tracker",
    status: "INVESTIGATING",
    subject: "Sudden revenue spike detected",
    preview: "23% increase in last 2 hours, potentially viral content",
    payload: {
      anomaly_type: "sudden_spike",
      revenue_increase: 0.23,
      time_window: "last_2_hours",
      potential_cause: "viral_content",
    },
  },
]

const actionRequired = {
  id: "exp_001",
  title: "Homepage CTA Experiment Results",
  description: "Variant B shows 25.8% improvement in conversion rate",
  confidence: 98,
  impact: "High",
  recommendation: "Deploy variant B to 100% of users",
}

const metrics = {
  variantA: {
    name: "Control (Current)",
    conversion: 12.4,
    users: 6225,
    revenue: 45200,
  },
  variantB: {
    name: "New CTA Design",
    conversion: 15.6,
    users: 6225,
    revenue: 56800,
  },
}

export default function GrowthLabsApp() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [actionStatus, setActionStatus] = useState<string>("pending")
  const [showInbox, setShowInbox] = useState(false)
  const [showVoiceOps, setShowVoiceOps] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)

  const handleAction = (action: string) => {
    setActionStatus(action)
    setTimeout(() => {
      if (action === "approve") {
        setActionStatus("DECISION_READY")
      }
    }, 1000)
  }

  const getAgentColor = (status: string) => {
    switch (status) {
      case "active":
        return "#00ff88"
      case "processing":
        return "#ff6b35"
      case "analyzing":
        return "#00d4ff"
      case "running":
        return "#b347d9"
      case "monitoring":
        return "#00ffff"
      case "idle":
        return "#6b7280"
      default:
        return "#6b7280"
    }
  }

  const getStatusGlow = (status: string) => {
    switch (status) {
      case "active":
        return "shadow-[0_0_30px_rgba(0,255,136,0.6)]"
      case "processing":
        return "shadow-[0_0_30px_rgba(255,107,53,0.6)]"
      case "analyzing":
        return "shadow-[0_0_30px_rgba(0,212,255,0.6)]"
      case "running":
        return "shadow-[0_0_30px_rgba(179,71,217,0.6)]"
      case "monitoring":
        return "shadow-[0_0_30px_rgba(0,255,255,0.6)]"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0b2e] to-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-[#00ff88]/20 backdrop-blur-xl bg-black/40 relative z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent">
                growthLabs
              </h1>
            </div>

            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => setShowInbox(true)}
                className="text-white hover:text-[#00ff88] transition-colors border border-[#00ff88]/30 hover:border-[#00ff88]/60"
              >
                <Inbox className="w-5 h-5 mr-2" />
                Agent Inbox
                <Badge variant="outline" className="ml-2 border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10">
                  3
                </Badge>
              </Button>

              <Button
                variant="ghost"
                onClick={() => setShowVoiceOps(true)}
                className="text-white hover:text-[#b347d9] transition-colors border border-[#b347d9]/30 hover:border-[#b347d9]/60"
              >
                <Mic className="w-5 h-5 mr-2" />
                VoiceOps
              </Button>

              <Badge variant="outline" className="border-[#00d4ff]/50 text-[#00d4ff] bg-[#00d4ff]/10">
                Ambient Agent Control Room
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered Layout */}
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-8">
        {/* Agent Orbit - Perfectly Centered */}
        <div className="flex items-center justify-center w-full mb-16">
          <div className="relative w-[800px] h-[800px]">
            {agents.map((agent, index) => {
              const angle = (index * 360) / agents.length
              const radius = 300
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={agent.id}
                  className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center backdrop-blur-xl border-3 transition-all duration-500 p-1 ${getStatusGlow(
                      agent.status,
                    )}`}
                    style={{
                      backgroundColor: `${getAgentColor(agent.status)}15`,
                      borderColor: getAgentColor(agent.status),
                      borderWidth: "3px",
                    }}
                  >
                    <AgentAvatar agent={agent} />
                  </div>

                  {/* Agent Info */}
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-black/90 backdrop-blur-xl border border-[#00ff88]/30 rounded-lg p-4 min-w-56">
                      <div className="font-semibold text-white text-sm">{agent.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{agent.description}</div>
                      <div
                        className="text-xs mt-2 font-medium px-2 py-1 rounded"
                        style={{
                          color: getAgentColor(agent.status),
                          backgroundColor: `${getAgentColor(agent.status)}20`,
                        }}
                      >
                        {agent.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom Section - Action Required & Metrics */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Action Required */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#ff6b35] mb-6">Action Required</h2>

            <div className="bg-black/40 backdrop-blur-xl border border-[#ff6b35]/30 rounded-2xl p-6 hover:border-[#ff6b35]/60 transition-all duration-300">
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">{actionRequired.title}</h3>
                <p className="text-gray-300">{actionRequired.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Confidence:</span>
                  <Badge variant="outline" className="border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10">
                    {actionRequired.confidence}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Impact:</span>
                  <Badge variant="outline" className="border-[#ff6b35] text-[#ff6b35] bg-[#ff6b35]/10">
                    {actionRequired.impact}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => handleAction("approve")}
                  className="flex-1 bg-[#00ff88] hover:bg-[#00ff88]/80 text-black font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(0,255,136,0.4)]"
                  disabled={actionStatus !== "pending"}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleAction("edit")}
                  variant="outline"
                  className="flex-1 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
                  disabled={actionStatus !== "pending"}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleAction("reject")}
                  variant="outline"
                  className="flex-1 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35]/10"
                  disabled={actionStatus !== "pending"}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>

              {actionStatus !== "pending" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-3 bg-[#00ff88]/20 border border-[#00ff88]/50 rounded-lg mt-4"
                >
                  <span className="text-[#00ff88] font-semibold">Status: {actionStatus.toUpperCase()}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* A/B Test Metrics */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#00d4ff] mb-6">A/B Test Metrics</h2>

            <div className="space-y-4">
              {/* Variant A */}
              <div className="bg-black/40 backdrop-blur-xl border border-[#ff6b35]/30 rounded-2xl p-6 hover:border-[#ff6b35]/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#ff6b35] text-lg">{metrics.variantA.name}</h4>
                  <TrendingDown className="w-6 h-6 text-[#ff6b35]" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Conversion</div>
                    <div className="font-bold text-white text-xl">{metrics.variantA.conversion}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Users</div>
                    <div className="font-bold text-white text-xl">{metrics.variantA.users.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Revenue</div>
                    <div className="font-bold text-white text-xl">${metrics.variantA.revenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Variant B */}
              <div className="bg-black/40 backdrop-blur-xl border border-[#00ff88]/30 rounded-2xl p-6 hover:border-[#00ff88]/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#00ff88] text-lg">{metrics.variantB.name}</h4>
                  <TrendingUp className="w-6 h-6 text-[#00ff88]" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Conversion</div>
                    <div className="font-bold text-white text-xl">{metrics.variantB.conversion}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Users</div>
                    <div className="font-bold text-white text-xl">{metrics.variantB.users.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Revenue</div>
                    <div className="font-bold text-white text-xl">${metrics.variantB.revenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Improvement */}
              <div className="text-center p-6 bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 border border-[#00ff88]/50 rounded-2xl">
                <div className="text-4xl font-bold text-[#00ff88] mb-2">+25.8%</div>
                <div className="text-gray-300">Conversion Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inbox Modal */}
      <AnimatePresence>
        {showInbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 backdrop-blur-xl border border-[#00ff88]/30 rounded-2xl w-full max-w-5xl h-[80vh] flex"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Email List */}
              <div className="w-1/2 border-r border-[#00ff88]/20">
                <div className="p-6 border-b border-[#00ff88]/20 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#00ff88]">Agent Inbox</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInbox(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <ScrollArea className="h-[calc(80vh-100px)]">
                  <div className="p-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 mb-3 ${
                          selectedEmail === event.id
                            ? "bg-[#00ff88]/20 border border-[#00ff88]/50"
                            : "hover:bg-white/5 border border-transparent"
                        }`}
                        onClick={() => setSelectedEmail(event.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-[#00d4ff]" />
                            <span className="font-semibold text-white">{event.agent}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                event.status === "DECISION_READY"
                                  ? "border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10"
                                  : event.status === "ACTION_REQUIRED"
                                    ? "border-[#ff6b35] text-[#ff6b35] bg-[#ff6b35]/10"
                                    : "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/10"
                              }`}
                            >
                              {event.status}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-medium text-white mb-2">{event.subject}</h4>
                        <p className="text-sm text-gray-300 line-clamp-2">{event.preview}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Email Content */}
              <div className="w-1/2 p-6">
                {selectedEmail ? (
                  <div>
                    {(() => {
                      const event = events.find((e) => e.id === selectedEmail)
                      if (!event) return null

                      return (
                        <div className="space-y-6">
                          <div className="border-b border-[#00ff88]/20 pb-4">
                            <h3 className="text-xl font-bold text-white mb-3">{event.subject}</h3>
                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                              <span>From: {event.agent}</span>
                              <span>Type: {event.type}</span>
                              <span>{new Date(event.timestamp).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-gray-300 text-lg">{event.preview}</p>

                            <div className="bg-black/60 border border-[#00d4ff]/30 rounded-xl p-4">
                              <h4 className="font-semibold text-[#00d4ff] mb-3">Event Payload</h4>
                              <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-auto">
                                {JSON.stringify(event.payload, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Select an email to view its contents</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VoiceOps Modal */}
      <AnimatePresence>
        {showVoiceOps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVoiceOps(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 backdrop-blur-xl border border-[#b347d9]/30 rounded-2xl w-full max-w-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#b347d9]">VoiceOps Control</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVoiceOps(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-8">
                <Button className="w-full bg-gradient-to-r from-[#b347d9] to-[#ff6b35] hover:from-[#b347d9]/80 hover:to-[#ff6b35]/80 text-white font-semibold py-4 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(179,71,217,0.4)]">
                  <Phone className="w-6 h-6 mr-3" />
                  Call Daily Brief
                </Button>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Recent Voice Briefs</h3>
                  <div className="space-y-3">
                    {[
                      { time: "09:00 AM", title: "Morning Brief", duration: "3:24", status: "completed" },
                      { time: "11:30 AM", title: "Retention Alert", duration: "1:45", status: "completed" },
                      { time: "12:15 PM", title: "Revenue Update", duration: "2:18", status: "completed" },
                    ].map((brief, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-[#b347d9]/20 hover:border-[#b347d9]/40 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Clock className="w-5 h-5 text-[#b347d9]" />
                          <div>
                            <div className="font-medium text-white">{brief.title}</div>
                            <div className="text-sm text-gray-400">
                              {brief.time} • {brief.duration}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10">
                          {brief.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
