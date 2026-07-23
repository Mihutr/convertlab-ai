"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_REPORT } from "@/lib/mock-data";
import {
  CheckCircle, AlertCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown,
  FileText, Target, BookOpen, Lightbulb, ClipboardCheck, AlertTriangle,
  Copy, Check, Star, Clock, ArrowLeft, Send, X,
} from "lucide-react";
import type { ActionTask, UserFeedback } from "@/types/diagnosis";

function EvidenceCard({ evidence }: { evidence: typeof MOCK_REPORT.evidence[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start justify-between gap-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-brand" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-[#1F2430]">{evidence.title}</h4>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                evidence.evidenceLevel === "A" ? "bg-green-50 text-success" :
                evidence.evidenceLevel === "B" ? "bg-blue-50 text-brand" :
                "bg-gray-100 text-text-secondary"
              }`}>
                {evidence.evidenceLevel}级证据
              </span>
            </div>
            <p className="text-xs text-text-secondary">来源：{evidence.source}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-text-secondary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0" />}
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-[#E5E8EF] pt-4 space-y-3">
          <div>
            <h5 className="text-xs font-medium text-text-secondary mb-1">证据详情</h5>
            <p className="text-sm text-[#1F2430] leading-relaxed">{evidence.content}</p>
          </div>
          <div>
            <h5 className="text-xs font-medium text-text-secondary mb-1">支持结论</h5>
            <p className="text-sm text-brand font-medium">{evidence.supportConclusion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskDetailDrawer({ task, onClose }: { task: ActionTask; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (task.sampleCopy) {
      navigator.clipboard.writeText(task.sampleCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }, [task.sampleCopy]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-[#E5E8EF] p-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#1F2430]">行动任务详情</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <div className="p-5 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-[#1F2430] mb-2">{task.title}</h4>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 优先级 {task.priority}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 观察周期 {task.observationPeriod}</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-medium text-text-secondary mb-2">为什么优先</h5>
            <p className="text-sm text-[#1F2430] leading-relaxed">
              该项任务的成本低、见效快，直接针对诊断中发现的核心问题，建议优先执行。
            </p>
          </div>

          <div>
            <h5 className="text-xs font-medium text-text-secondary mb-2">具体执行步骤</h5>
            <ol className="space-y-2">
              {task.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#1F2430]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-light text-brand flex items-center justify-center text-xs mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {task.sampleCopy && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-medium text-text-secondary">文案模板</h5>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-brand hover:text-brand-hover"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "已复制" : "复制"}
                </button>
              </div>
              <div className="p-4 bg-brand-light rounded-[10px] text-sm text-[#1F2430] leading-relaxed">
                {task.sampleCopy}
              </div>
            </div>
          )}

          <div>
            <h5 className="text-xs font-medium text-text-secondary mb-2">验证方法</h5>
            <p className="text-sm text-[#1F2430]">{task.verificationMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionTaskCard({
  task,
  onViewDetail,
  adopted,
  notApplicable,
  onAdopt,
  onNotApplicable,
}: {
  task: ActionTask;
  onViewDetail: () => void;
  adopted: boolean;
  notApplicable: boolean;
  onAdopt: () => void;
  onNotApplicable: () => void;
}) {
  const costLabel = { low: "低", medium: "中", high: "高" };

  return (
    <div className={`bg-white rounded-[14px] border shadow-sm p-5 transition-all ${
      adopted ? "border-success/50 bg-green-50/30" :
      notApplicable ? "border-error/30 bg-red-50/20 opacity-70" :
      "border-[#E5E8EF]"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-brand" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-medium text-brand bg-brand-light px-2 py-0.5 rounded">
                优先级 {task.priority}
              </span>
              <span className="text-xs text-text-secondary">成本 {costLabel[task.cost]}</span>
              <span className="text-xs text-text-secondary">观察 {task.observationPeriod}</span>
            </div>
            <h4 className="text-sm font-semibold text-[#1F2430]">{task.title}</h4>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={onViewDetail}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] border border-[#E5E8EF] text-xs text-text-secondary hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          查看执行步骤
        </button>
        {task.sampleCopy && (
          <button
            onClick={onViewDetail}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] border border-[#E5E8EF] text-xs text-text-secondary hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            生成文案
          </button>
        )}
        <button
          onClick={onAdopt}
          className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] text-xs font-medium transition-colors ${
            adopted
              ? "bg-success text-white"
              : "border border-success text-success hover:bg-green-50"
          }`}
        >
          {adopted ? <><Check className="w-3.5 h-3.5" /> 已采纳</> : <>标记采纳</>}
        </button>
        <button
          onClick={onNotApplicable}
          className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] text-xs font-medium transition-colors ${
            notApplicable
              ? "bg-error text-white"
              : "border border-error text-error hover:bg-red-50"
          }`}
        >
          标记不适用
        </button>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const report = MOCK_REPORT;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    facts: true,
    causes: true,
    evidence: true,
    tasks: true,
    verification: true,
    risk: true,
  });
  const [activeTaskDetail, setActiveTaskDetail] = useState<ActionTask | null>(null);
  const [adoptedTasks, setAdoptedTasks] = useState<Set<string>>(new Set());
  const [notApplicableTasks, setNotApplicableTasks] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<UserFeedback>({
    accuracy: null,
    usefulness: null,
    adopted: null,
    notApplicableReason: "",
    openFeedback: "",
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAdopt = (taskId: string) => {
    setAdoptedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
    setNotApplicableTasks((prev) => {
      const next = new Set(prev);
      next.delete(taskId);
      return next;
    });
  };

  const handleNotApplicable = (taskId: string) => {
    setNotApplicableTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
    setAdoptedTasks((prev) => {
      const next = new Set(prev);
      next.delete(taskId);
      return next;
    });
  };

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Back link */}
        <Link href="/diagnosis/scenario" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand mb-6 no-underline">
          <ArrowLeft className="w-4 h-4" />
          开始新的诊断
        </Link>

        {/* Header */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              report.completenessLevel === "sufficient" ? "bg-green-50 text-success" :
              report.completenessLevel === "insufficient" ? "bg-orange-50 text-warning" :
              "bg-red-50 text-error"
            }`}>
              信息完整度：{report.completenessLevel === "sufficient" ? "基本充分" : report.completenessLevel === "insufficient" ? "信息不足" : "严重不足"}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              report.confidenceLevel === "high" ? "bg-green-50 text-success" :
              report.confidenceLevel === "medium" ? "bg-blue-50 text-brand" :
              "bg-gray-100 text-text-secondary"
            }`}>
              诊断可信度：{report.confidenceLevel === "high" ? "高" : report.confidenceLevel === "medium" ? "中等" : "低"}
            </span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <Target className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-[#1F2430] mb-1">主要问题</h2>
              <p className="text-base text-[#1F2430]">{report.primaryIssue}</p>
            </div>
          </div>

          <div className="p-4 bg-brand-light rounded-[10px]">
            <p className="text-sm text-brand font-medium">{report.summary}</p>
          </div>
        </div>

        {/* Known Facts */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm mb-4 overflow-hidden">
          <button onClick={() => toggleSection("facts")} className="w-full text-left p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold text-[#1F2430]">已知事实</h3>
            </div>
            {expandedSections.facts ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
          </button>
          {expandedSections.facts && (
            <div className="px-5 sm:px-6 pb-5">
              <ul className="space-y-2">
                {report.knownFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#1F2430]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Possible Causes */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm mb-4 overflow-hidden">
          <button onClick={() => toggleSection("causes")} className="w-full text-left p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h3 className="text-base font-semibold text-[#1F2430]">可能原因</h3>
            </div>
            {expandedSections.causes ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
          </button>
          {expandedSections.causes && (
            <div className="px-5 sm:px-6 pb-5 space-y-3">
              {report.possibleCauses.map((cause) => (
                <div key={cause.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-[10px]">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    cause.evidenceStrength === "strong" ? "bg-error" :
                    cause.evidenceStrength === "moderate" ? "bg-warning" :
                    "bg-text-secondary"
                  }`} />
                  <div>
                    <p className="text-sm text-[#1F2430]">{cause.description}</p>
                    <span className={`text-xs ${
                      cause.evidenceStrength === "strong" ? "text-error" :
                      cause.evidenceStrength === "moderate" ? "text-warning" :
                      "text-text-secondary"
                    }`}>
                      证据{
                      cause.evidenceStrength === "strong" ? "较强" :
                      cause.evidenceStrength === "moderate" ? "有一定可能" :
                      "需要验证"
                    }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Evidence */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm mb-4 overflow-hidden">
          <button onClick={() => toggleSection("evidence")} className="w-full text-left p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold text-[#1F2430]">判断依据</h3>
            </div>
            {expandedSections.evidence ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
          </button>
          {expandedSections.evidence && (
            <div className="px-5 sm:px-6 pb-5 space-y-3">
              {report.evidence.map((ev) => (
                <EvidenceCard key={ev.id} evidence={ev} />
              ))}
            </div>
          )}
        </div>

        {/* Action Tasks */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm mb-4 overflow-hidden">
          <button onClick={() => toggleSection("tasks")} className="w-full text-left p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold text-[#1F2430]">优先行动任务</h3>
            </div>
            {expandedSections.tasks ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
          </button>
          {expandedSections.tasks && (
            <div className="px-5 sm:px-6 pb-5 space-y-3">
              {report.actionTasks.map((task) => (
                <ActionTaskCard
                  key={task.id}
                  task={task}
                  onViewDetail={() => setActiveTaskDetail(task)}
                  adopted={adoptedTasks.has(task.id)}
                  notApplicable={notApplicableTasks.has(task.id)}
                  onAdopt={() => handleAdopt(task.id)}
                  onNotApplicable={() => handleNotApplicable(task.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Verification */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm mb-4 overflow-hidden">
          <button onClick={() => toggleSection("verification")} className="w-full text-left p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="text-base font-semibold text-[#1F2430]">如何验证</h3>
            </div>
            {expandedSections.verification ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
          </button>
          {expandedSections.verification && (
            <div className="px-5 sm:px-6 pb-5">
              <p className="text-sm text-[#1F2430] leading-relaxed">{report.verification}</p>
            </div>
          )}
        </div>

        {/* Risk Note */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm mb-6 overflow-hidden">
          <button onClick={() => toggleSection("risk")} className="w-full text-left p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <h3 className="text-base font-semibold text-[#1F2430]">风险提示</h3>
            </div>
            {expandedSections.risk ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
          </button>
          {expandedSections.risk && (
            <div className="px-5 sm:px-6 pb-5">
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-[10px]">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#1F2430] leading-relaxed">{report.riskNote}</p>
              </div>
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6 mb-6">
          <h3 className="text-base font-semibold text-[#1F2430] mb-4">反馈</h3>

          {feedbackSubmitted ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h4 className="text-base font-semibold text-[#1F2430] mb-1">反馈已提交</h4>
              <p className="text-sm text-text-secondary">感谢你的反馈，这将帮助我们改进诊断质量</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Accuracy */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-2">诊断准确度</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setFeedback((prev) => ({ ...prev, accuracy: n }))}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                        feedback.accuracy === n
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Usefulness */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-2">报告有用度</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setFeedback((prev) => ({ ...prev, usefulness: n }))}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                        feedback.usefulness === n
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adoption */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-2">是否采纳建议</label>
                <div className="flex gap-3">
                  {([true, false] as const).map((val) => (
                    <button
                      key={String(val)}
                      onClick={() => setFeedback((prev) => ({ ...prev, adopted: val }))}
                      className={`inline-flex items-center gap-1.5 h-10 px-5 rounded-[10px] text-sm font-medium transition-colors ${
                        feedback.adopted === val
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                    >
                      {val ? <ThumbsUp className="w-4 h-4" /> : <ThumbsDown className="w-4 h-4" />}
                      {val ? "已采纳" : "未采纳"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Not applicable reason */}
              {feedback.adopted === false && (
                <div>
                  <label className="block text-sm font-medium text-[#1F2430] mb-1.5">不适用原因</label>
                  <input
                    value={feedback.notApplicableReason}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, notApplicableReason: e.target.value }))}
                    className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand"
                    placeholder="请说明为什么不适用"
                  />
                </div>
              )}

              {/* Open feedback */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">其他反馈</label>
                <textarea
                  value={feedback.openFeedback}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, openFeedback: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand resize-none"
                  placeholder="有什么想告诉我们的？"
                />
              </div>

              <button
                onClick={handleSubmitFeedback}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[10px] bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
              >
                <Send className="w-4 h-4" />
                提交反馈
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Task Detail Drawer */}
      {activeTaskDetail && (
        <TaskDetailDrawer task={activeTaskDetail} onClose={() => setActiveTaskDetail(null)} />
      )}
    </div>
  );
}
