'use client'

import { useState, useRef, useEffect } from 'react'

// ── Icons (inline SVGs to avoid extra deps) ──────────────────

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function BotAvatar() {
  return (
    <div className="chat-avatar-bot">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    </div>
  )
}

// ── Markdown-lite renderer ───────────────────────────────────

function renderMarkdown(text) {
  if (!text) return ''
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>')
  html = html.replace(/\n/g, '<br/>')
  return html
}

// ── Typing indicator ─────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="chat-msg-row chat-msg-bot">
      <BotAvatar />
      <div className="chat-bubble chat-bubble-bot">
        <div className="chat-typing-dots">
          <span className="chat-dot dot-1" />
          <span className="chat-dot dot-2" />
          <span className="chat-dot dot-3" />
        </div>
      </div>
    </div>
  )
}

// ── Main Widget ──────────────────────────────────────────────

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://127.0.0.1:8000'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  function handleOpen() {
    setIsOpen(true)
    setHasNewMessage(false)
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m the **CrackMonitor Engineering Assistant. Ask me anything about structural health, crack analysis, or civil engineering topics. 🏗️'
      }])
    }
  }

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // Send entire conversation (skip the initial welcome message)
      const historyToSend = newMessages.filter((_, i) => !(i === 0 && newMessages[0].role === 'assistant'))

      const res = await fetch(`${FASTAPI_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend }),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()
      const aiMsg = { role: 'assistant', content: data.response }
      setMessages(prev => [...prev, aiMsg])

      if (!isOpen) setHasNewMessage(true)
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Unable to reach the server. Please ensure the FastAPI backend is running.'
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleClearChat() {
    setMessages([{
      role: 'assistant',
      content: 'Chat cleared! How can I help you? 🏗️'
    }])
  }

  return (
    <>
      {/* ── Chat Window ─────────────────────────── */}
      <div className={`chat-widget-container ${isOpen ? 'chat-widget-open' : 'chat-widget-closed'}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-header-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="chat-header-title">Engineering Assistant</div>
              <div className="chat-header-status">
                <span className="chat-status-dot" />
                Online
              </div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button onClick={handleClearChat} className="chat-header-btn" title="Clear chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
            <button onClick={() => setIsOpen(false)} className="chat-header-btn" title="Minimize">
              <MinimizeIcon />
            </button>
            <button onClick={() => setIsOpen(false)} className="chat-header-btn" title="Close">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg-row ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`}>
              {msg.role === 'assistant' && <BotAvatar />}
              <div
                className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
              />
            </div>
          ))}
          {loading && <TypingIndicator />}
        </div>

        {/* Input area */}
        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask about cracks, structures..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={`chat-send-btn ${input.trim() && !loading ? 'chat-send-active' : ''}`}
              disabled={!input.trim() || loading}
            >
              <SendIcon />
            </button>
          </div>
          <div className="chat-footer-text">
            Powered by <span className="chat-footer-accent">CrackMonitor AI</span>
          </div>
        </div>
      </div>

      {/* ── Floating Action Button ──────────────── */}
      {!isOpen && (
        <button onClick={handleOpen} className="chat-fab" id="chatbot-fab">
          <div className="chat-fab-glow" />
          <ChatIcon />
          {hasNewMessage && <span className="chat-fab-badge" />}
        </button>
      )}
    </>
  )
}
