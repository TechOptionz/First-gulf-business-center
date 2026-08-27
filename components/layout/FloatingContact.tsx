"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import {
  MessageCircle,
  Phone,
  Calendar,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { COMPANY_DETAILS, FAQS } from "@/data/content";
import ScrollToTop from "@/components/ui/ScrollToTop";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  suggestions?: string[];
}

const ALL_QUESTIONS = [
  "What is EJARI & Estidama?",
  "What office packages do you offer?",
  "How fast can I move into an office?",
  "Do you assist with UAE visas & bank accounts?",
  "Where is Madina Mall located & is parking free?",
  "How do I book a private tour?",
  "What amenities are included with coworking?",
  "Can I use your address on my DED trade license?",
  "What is the difference between Mainland & Freezone?",
  "Do you have private 4-12 person team suites?",
  "What meeting room & IT facilities do you have?",
  "Tell me about the tenant lounge & pool breakout zone.",
  "What are your center opening hours?",
  "Can you register my trademark in the UAE?",
];

// Gap kept above the pinned question when the thread auto-scrolls.
const PIN_OFFSET = 12;

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const initialMessage: ChatMessage = {
    id: "welcome-1",
    sender: "bot",
    text: "Hello! Welcome to First Gulf Business Center in Dubai. I am your 24/7 AI Concierge. How can I assist you with offices, EJARI, or business setup today?",
    timestamp: "Just now",
    suggestions: [
      "What is EJARI & Estidama?",
      "What office packages do you offer?",
      "How fast can I move into an office?",
      "Do you assist with UAE visas & bank accounts?",
      "Where is Madina Mall located & is parking free?",
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [tailSpacer, setTailSpacer] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  // The question we keep pinned to the top of the thread.
  const lastUserMessageId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].sender === "user") return messages[i].id;
    }
    return null;
  }, [messages]);

  useEffect(() => {
    const checkNavState = () => {
      if (typeof document !== "undefined") {
        setIsMobileNavOpen(document.body.hasAttribute("data-mobile-menu-open"));
      }
    };

    checkNavState();
    const observer = new MutationObserver(checkNavState);
    if (typeof document !== "undefined") {
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-mobile-menu-open"] });
    }

    return () => observer.disconnect();
  }, []);

  // Lock the page behind the chat on mobile only.
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Instead of slamming the scroll to the very bottom (which pushed the user's
  // question and the top of the answer out of view behind the suggestion list),
  // park the newest question just under the top edge and let the answer read
  // downwards from there.
  useLayoutEffect(() => {
    const container = chatContainerRef.current;
    if (!isOpen || !container) return;

    const anchor = anchorRef.current;

    // Nothing asked yet - show the welcome message from its start.
    if (!anchor) {
      if (tailSpacer !== 0) setTailSpacer(0);
      container.scrollTop = 0;
      return;
    }

    const anchorOffset = Math.round(
      container.scrollTop +
        anchor.getBoundingClientRect().top -
        container.getBoundingClientRect().top
    );

    // Everything from the question downwards (answer, suggestions, typing dots).
    const tailHeight = container.scrollHeight - tailSpacer - anchorOffset;
    const neededSpacer = Math.max(0, container.clientHeight - tailHeight - PIN_OFFSET);

    // Short answers need filler below so the question can still reach the top.
    if (neededSpacer !== tailSpacer) {
      setTailSpacer(neededSpacer);
      return; // re-runs once the spacer has been laid out
    }

    const top = Math.max(0, anchorOffset - PIN_OFFSET);
    if (Math.abs(container.scrollTop - top) < 2) return;

    container.scrollTo({ top, behavior: "smooth" });
  }, [messages, isTyping, isOpen, tailSpacer]);

  // Contextually smart follow-up topic branching
  const getFollowUpSuggestions = (asked: string): string[] => {
    const q = asked.toLowerCase();

    if (q.includes("ejari") || q.includes("estidama") || q.includes("ded") || q.includes("license")) {
      return [
        "What office packages do you offer?",
        "What is the difference between Mainland & Freezone?",
        "Do you assist with UAE visas & bank accounts?",
        "How do I book a private tour?",
      ];
    }

    if (q.includes("package") || q.includes("price") || q.includes("cost") || q.includes("office") || q.includes("coworking")) {
      return [
        "What is EJARI & Estidama?",
        "How fast can I move into an office?",
        "Do you have private 4-12 person team suites?",
        "What amenities are included with coworking?",
      ];
    }

    if (q.includes("visa") || q.includes("bank") || q.includes("pro") || q.includes("setup") || q.includes("trademark")) {
      return [
        "What is EJARI & Estidama?",
        "Can you register my trademark in the UAE?",
        "Where is Madina Mall located & is parking free?",
        "How do I book a private tour?",
      ];
    }

    if (q.includes("location") || q.includes("madina") || q.includes("parking") || q.includes("address") || q.includes("hours")) {
      return [
        "How do I book a private tour?",
        "What meeting room & IT facilities do you have?",
        "Tell me about the tenant lounge & pool breakout zone.",
        "What office packages do you offer?",
      ];
    }

    if (q.includes("lounge") || q.includes("pool") || q.includes("meeting") || q.includes("amenities") || q.includes("tour")) {
      return [
        "What office packages do you offer?",
        "Do you assist with UAE visas & bank accounts?",
        "Where is Madina Mall located & is parking free?",
        "How fast can I move into an office?",
      ];
    }

    // Default fallback selections
    return ALL_QUESTIONS.filter((item) => item !== asked).slice(0, 4);
  };

  // Smart Search inside FAQS dataset
  const findAnswer = (query: string): string => {
    const q = query.toLowerCase().trim();

    // 1. Direct search in FAQS
    for (const faq of FAQS) {
      if (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        q.includes(faq.category.toLowerCase())
      ) {
        return faq.answer;
      }
    }

    // 2. Keyword fallback matching
    if (q.includes("ejari") || q.includes("estidama") || q.includes("tenancy") || q.includes("rera")) {
      return FAQS[0].answer;
    }
    if (q.includes("price") || q.includes("cost") || q.includes("package") || q.includes("rent") || q.includes("fee")) {
      return "We offer flexible Coworking Desks (daily/monthly), Virtual Offices with certified EJARI & Estidama, and Move-In-Ready Private Serviced Office Suites at Madina Mall. Contact our concierge at +971 52 790 0335 for current pricing and custom proposals!";
    }
    if (q.includes("location") || q.includes("address") || q.includes("where") || q.includes("map")) {
      return `First Gulf Business Center is located on the 2nd Floor, Madina Mall, Offices 2–20, Al Muhaisnah 4, Dubai, UAE (P.O. Box: ${COMPANY_DETAILS.poBox}). Covered mall parking is direct to elevators!`;
    }
    if (q.includes("visa") || q.includes("bank") || q.includes("pro") || q.includes("setup") || q.includes("license")) {
      return FAQS[5].answer;
    }
    if (q.includes("tour") || q.includes("visit") || q.includes("book") || q.includes("timing")) {
      return FAQS[7].answer;
    }
    if (q.includes("coworking") || q.includes("amenities") || q.includes("wifi") || q.includes("coffee")) {
      return FAQS[3].answer;
    }
    if (q.includes("parking") || q.includes("car") || q.includes("vehicle")) {
      return FAQS[6].answer;
    }
    if (q.includes("lounge") || q.includes("pool") || q.includes("breakout")) {
      return "Our tenants enjoy exclusive access to our luxury breakout lounge and rooftop pool relaxation area, complimentary artisan espresso, and high-speed fiber Wi-Fi throughout the 2nd floor at Madina Mall.";
    }
    if (q.includes("trademark") || q.includes("brand") || q.includes("ip")) {
      return "Our corporate legal team provides complete Ministry of Economy trademark search, filing, publication, and official certificate issuance across the UAE and GCC region.";
    }

    // Default polite response
    return `Thank you for your inquiry! Our senior corporate advisors are available right now to answer your specific question regarding "${query}". Feel free to chat with us directly on WhatsApp or call +971 52 790 0335.`;
  };

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = findAnswer(userText);
      const suggestions = getFollowUpSuggestions(userText);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  if (isMobileNavOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Interactive AI Concierge Chatbot Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[570px] max-h-[85vh] bg-white rounded-sm border-2 border-brass-400/80 shadow-luxury-hover flex flex-col overflow-hidden mb-3 animate-fade-in text-charcoal-900">
          {/* Top Header */}
          <div className="bg-charcoal-950 text-white p-4 border-b border-brass-400/40 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-950 border border-brass-400 flex items-center justify-center text-brass-300">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-charcoal-950" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  FGBC AI Concierge
                  <Sparkles className="w-3.5 h-3.5 text-brass-400" />
                </h3>
                <p className="text-[11px] text-cream-200 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  24/7 Workspace & Setup Advisor
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Concierge Chat"
              className="p-1.5 text-cream-200 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Direct Actions Toolbar (WhatsApp & Call) */}
          <div className="bg-cream-100/90 border-b border-cream-300 px-3 py-2 flex items-center justify-between gap-1.5 text-xs shrink-0">
            <a
              href={COMPANY_DETAILS.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-sm transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 font-bold text-white bg-maroon-900 hover:bg-maroon-950 rounded-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brass-300" />
              <span>Call Us</span>
            </a>

            <a
              href="/book-a-tour"
              className="flex items-center justify-center gap-1 px-2 py-1.5 font-bold text-charcoal-900 bg-white hover:bg-cream-200 border border-brass-300 rounded-sm transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-brass-700" />
              <span>Tour</span>
            </a>
          </div>

          {/* Chat Conversation Scroll Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto overscroll-contain space-y-4 bg-cream-50/50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                ref={msg.id === lastUserMessageId ? anchorRef : undefined}
                className="space-y-2"
              >
                <div
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-maroon-900 text-brass-300 flex items-center justify-center shrink-0 mt-0.5 border border-brass-400/40">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3 text-xs sm:text-sm leading-relaxed rounded-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-maroon-950 text-white font-semibold rounded-br-none border border-brass-400/40"
                        : "bg-white text-charcoal-950 border border-cream-300 font-normal rounded-bl-none"
                    }`}
                  >
                    <p className={`whitespace-pre-line ${msg.sender === "user" ? "text-white text-cream-50" : "text-charcoal-950"}`}>
                      {msg.text}
                    </p>
                    <span
                      className={`block text-[10px] mt-1 text-right font-medium ${
                        msg.sender === "user" ? "text-cream-200" : "text-charcoal-500"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-brass-400 text-charcoal-950 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Inline Suggested Questions below Bot Response */}
                {msg.sender === "bot" && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="pl-9 space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-maroon-900 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <HelpCircle className="w-3.5 h-3.5 text-brass-700" />
                      <span>Explore Related Questions:</span>
                    </div>
                    {msg.suggestions.map((sq) => (
                      <button
                        key={sq}
                        type="button"
                        onClick={() => handleSendMessage(sq)}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-charcoal-950 bg-white hover:bg-maroon-900 hover:text-white border border-cream-300 rounded-sm transition-colors cursor-pointer flex items-center justify-between group shadow-2xs"
                      >
                        <span>{sq}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-brass-600 group-hover:text-brass-300 shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-charcoal-500 italic">
                <div className="w-7 h-7 rounded-full bg-maroon-900 text-brass-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-cream-300 p-2.5 rounded-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-maroon-800 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-maroon-800 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-maroon-800 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] not-italic text-charcoal-600 font-medium ml-1">
                    Searching FAQ database...
                  </span>
                </div>
              </div>
            )}

            {/* Filler so the newest question can always be pinned to the top */}
            <div aria-hidden style={{ height: tailSpacer }} className="shrink-0" />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="p-3 bg-white border-t border-cream-300 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about EJARI, office cost, visas..."
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-cream-50 border border-cream-300 rounded-sm focus:outline-none focus:border-brass-500 focus:bg-white text-charcoal-900 placeholder:text-charcoal-400 font-medium"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              aria-label="Send message to AI Concierge"
              className="p-2 bg-maroon-900 text-brass-300 rounded-sm hover:bg-maroon-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Back-to-top: stacks above the trigger, hidden while the chat is open */}
      {!isOpen && <ScrollToTop />}

      {/* Visible Trigger Button (Lower Right) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Concierge Chat" : "Ask Us Any Question - Open AI Chatbot"}
        className="group flex items-center gap-2.5 px-4 py-3 bg-charcoal-950 text-white rounded-full border-2 border-brass-400 shadow-luxury-hover hover:bg-maroon-950 hover:border-brass-300 transition-all duration-300 cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide">
          <Bot className="w-4 h-4 text-brass-300 group-hover:scale-110 transition-transform" />
          <span className="text-white">Ask Us Any Question</span>
        </div>

        <div className="w-5 h-5 rounded-full bg-maroon-800 flex items-center justify-center text-brass-300 group-hover:bg-brass-400 group-hover:text-charcoal-950 transition-colors ml-0.5">
          {isOpen ? <X className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
      </button>
    </div>
  );
}
