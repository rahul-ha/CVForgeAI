import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Github,
  Chrome,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  User,
  Mail,
  Lock,
  ChevronLeft
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --indigo:        #6366f1;
    --indigo-light:  #818cf8;
    --indigo-dim:    #4338ca;
    --blue:          #3b82f6;
    --blue-mid:      #60a5fa;
    --blue-light:    #93c5fd;
    --ink:           #020817;
    --ink-mid:       #0f172a;
    --ink-soft:      #1e293b;
    --muted:         #64748b;
    --border:        rgba(255,255,255,0.07);
    --glass:         rgba(255,255,255,0.03);
    --glass-card:    rgba(255,255,255,0.04);
    --font-head:     'Sora', sans-serif;
    --font-body:     'DM Sans', sans-serif;
  }

  body { background: var(--ink); }

  .rp-root {
    min-height: 100vh;
    background: var(--ink);
    font-family: var(--font-body);
    color: #e2e8f0;
    overflow-x: hidden;
    position: relative;
  }

  /* ── background ── */
  .rp-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .rp-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.25;
  }
  .blob-indigo {
    width: 620px; height: 620px;
    background: radial-gradient(circle, #6366f1 0%, transparent 70%);
    top: -18%; left: -12%;
    animation: drift1 20s ease-in-out infinite alternate;
  }
  .blob-blue {
    width: 580px; height: 580px;
    background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
    bottom: -18%; right: -12%;
    animation: drift2 24s ease-in-out infinite alternate;
  }
  .blob-mid {
    width: 340px; height: 340px;
    background: radial-gradient(circle, #818cf8 0%, transparent 70%);
    top: 42%; left: 38%;
    opacity: 0.12;
    animation: drift1 30s ease-in-out infinite alternate-reverse;
  }
  @keyframes drift1 {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(40px,30px) scale(1.08); }
  }
  @keyframes drift2 {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(-40px,-25px) scale(1.06); }
  }

  /* ── navbar ── */
  .rp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 68px;
    background: rgba(2,8,23,0.72);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99,102,241,0.12);
  }
  .rp-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    user-select: none;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-head);
    font-weight: 800;
    font-size: 13px;
    color: #fff;
    letter-spacing: -0.5px;
    box-shadow: 0 4px 20px rgba(99,102,241,0.35);
    flex-shrink: 0;
  }
  .logo-text {
    font-family: var(--font-head);
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.3px;
    color: #f1f5f9;
  }
  .logo-text span {
    background: linear-gradient(90deg, #818cf8, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .rp-back {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--muted);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
    background: none;
    border: none;
    font-family: var(--font-body);
  }
  .rp-back:hover { color: var(--indigo-light); }

  /* ── main grid ── */
  .rp-main {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    padding-top: 68px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1024px) {
    .rp-main { grid-template-columns: 1fr; }
    .rp-nav  { padding: 0 20px; }
  }

  /* ── left panel ── */
  .rp-left {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 56px;
  }
  @media (max-width: 1024px) {
    .rp-left { order: 2; padding: 40px 24px 64px; }
  }
  .rp-left-inner { max-width: 480px; width: 100%; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--indigo-light);
    margin-bottom: 28px;
  }
  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--indigo);
    box-shadow: 0 0 6px var(--indigo);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  .badge-ping {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--indigo);
    position: relative;
  }
  .badge-ping::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: var(--indigo);
    opacity: 0.4;
    animation: ping 1.4s ease-in-out infinite;
  }
  @keyframes ping {
    0%   { transform: scale(1); opacity: 0.4; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:0.5; transform:scale(1.4); }
  }

  .rp-headline {
    font-family: var(--font-head);
    font-size: clamp(34px, 3.8vw, 50px);
    font-weight: 800;
    line-height: 1.08;
    color: #f1f5f9;
    margin-bottom: 20px;
    letter-spacing: -1px;
  }
  .rp-headline .grad {
    background: linear-gradient(90deg, var(--indigo-light) 0%, var(--blue-mid) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .rp-sub {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.65;
    margin-bottom: 40px;
    max-width: 400px;
  }

  /* feature grid */
  .feat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .feat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 18px 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: all 0.25s;
    cursor: default;
  }
  .feat-card:hover {
    background: rgba(99,102,241,0.07);
    border-color: rgba(99,102,241,0.2);
    transform: translateY(-2px);
  }
  .feat-icon {
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .fi-indigo  { background: rgba(99,102,241,0.15);  color: var(--indigo-light); }
  .fi-blue    { background: rgba(59,130,246,0.15);  color: var(--blue-mid); }
  .feat-title {
    font-size: 13px;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 3px;
    font-family: var(--font-head);
  }
  .feat-desc { font-size: 12px; color: var(--muted); line-height: 1.45; }

  /* social proof strip */
  .social-proof {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
  }
  .avatars { display: flex; }
  .av {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 2px solid var(--ink);
    margin-left: -8px;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .av:first-child { margin-left: 0; }
  .av-1 { background: linear-gradient(135deg,#6366f1,#4338ca); }
  .av-2 { background: linear-gradient(135deg,#3b82f6,#818cf8); }
  .av-3 { background: linear-gradient(135deg,#60a5fa,#6366f1); }
  .av-4 { background: linear-gradient(135deg,#818cf8,#3b82f6); }
  .proof-text { font-size: 12px; color: var(--muted); line-height: 1.4; }
  .proof-text strong { color: #e2e8f0; font-weight: 700; }

  /* ── right panel ── */
  .rp-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 40px;
  }
  @media (max-width: 1024px) {
    .rp-right { order: 1; padding: 40px 20px 16px; }
  }

  /* register card */
  .reg-card {
    width: 100%;
    max-width: 460px;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border-radius: 28px;
    padding: 36px 36px 32px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow:
      0 0 0 1px rgba(99,102,241,0.07),
      0 32px 64px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.06);
    transition: box-shadow 0.35s;
  }
  .reg-card:hover {
    box-shadow:
      0 0 0 1px rgba(99,102,241,0.15),
      0 40px 80px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .card-glow-bar {
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent, #6366f1, #3b82f6, transparent);
  }

  /* card header */
  .card-header { text-align: center; margin-bottom: 28px; }
  .card-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 100px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--indigo-light);
    margin-bottom: 14px;
  }
  .card-title {
    font-family: var(--font-head);
    font-size: 24px;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .card-sub { font-size: 13px; color: var(--muted); }

  /* form inputs */
  .form-group { margin-bottom: 14px; }
  .form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  @media (max-width: 540px) { .form-2col { grid-template-columns: 1fr; } }

  label.fl {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
  .input-wrap { position: relative; }
  .input-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    color: #475569;
    transition: color 0.2s;
    pointer-events: none;
    display: flex;
    align-items: center;
  }
  .input-wrap:focus-within .input-icon { color: var(--indigo-light); }
  .fi-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 11px;
    padding: 12px 42px 12px 40px;
    font-size: 13px;
    font-family: var(--font-body);
    color: #e2e8f0;
    outline: none;
    transition: all 0.2s;
  }
  .fi-input::placeholder { color: #334155; }
  .fi-input:focus {
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.05);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }
  .pw-toggle {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer;
    color: #475569;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    padding: 2px;
  }
  .pw-toggle:hover { color: var(--indigo-light); }

  /* strength bar */
  .strength-wrap { padding: 2px 0 10px; }
  .strength-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .strength-label-left {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #475569;
  }
  .strength-label-right {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .str-empty   { color: #475569; }
  .str-weak    { color: #f87171; }
  .str-fair    { color: #fb923c; }
  .str-good    { color: var(--indigo-light); }
  .str-secure  { color: var(--blue-mid); }

  .strength-track {
    height: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 100px;
    overflow: hidden;
  }
  .strength-fill {
    height: 100%;
    border-radius: 100px;
    transition: width 0.4s ease, background 0.4s ease;
  }

  /* terms */
  .terms-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 18px;
    margin-top: 4px;
  }
  .terms-row input[type="checkbox"] {
    width: 15px; height: 15px;
    accent-color: var(--indigo);
    cursor: pointer;
    margin-top: 1px;
    flex-shrink: 0;
  }
  .terms-text {
    font-size: 12px;
    color: #64748b;
    line-height: 1.5;
    cursor: pointer;
    user-select: none;
  }
  .terms-link {
    color: var(--indigo-light);
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .terms-link:hover { opacity: 0.75; }

  /* submit btn — matches landing page indigo→blue gradient */
  .btn-submit {
    width: 100%;
    background: linear-gradient(90deg, #4338ca 0%, #6366f1 40%, #3b82f6 100%);
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    color: #fff;
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s;
    box-shadow: 0 6px 24px rgba(99,102,241,0.30);
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .btn-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .btn-submit:hover::before { transform: translateX(100%); }
  .btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99,102,241,0.42);
  }
  .btn-submit:active { transform: translateY(0) scale(0.98); }
  .btn-submit svg { transition: transform 0.2s; }
  .btn-submit:hover svg { transform: translateX(3px); }

  /* divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    color: #334155;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  /* social */
  .social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .btn-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px;
    border-radius: 11px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-body);
  }
  .btn-google {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    color: #cbd5e1;
  }
  .btn-google:hover {
    background: rgba(99,102,241,0.08);
    border-color: rgba(99,102,241,0.25);
    transform: translateY(-1px);
  }
  .btn-github {
    background: rgba(255,255,255,0.88);
    border: 1px solid rgba(255,255,255,0.88);
    color: #0f172a;
  }
  .btn-github:hover {
    background: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  }

  .card-foot {
    text-align: center;
    margin-top: 18px;
    font-size: 13px;
    color: var(--muted);
  }
  .login-link {
    font-weight: 700;
    background: linear-gradient(90deg, var(--indigo-light), var(--blue-mid));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .login-link:hover { opacity: 0.8; }

  /* entrance animations */
  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-left {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-right {
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .visible { opacity: 1 !important; transform: none !important; }

  .d1 { transition-delay: 0.05s; }
  .d2 { transition-delay: 0.12s; }
  .d3 { transition-delay: 0.20s; }
  .d4 { transition-delay: 0.28s; }
  .d5 { transition-delay: 0.36s; }
  .d6 { transition-delay: 0.44s; }
  .d7 { transition-delay: 0.52s; }
  .d8 { transition-delay: 0.60s; }

  @media (max-width: 1024px) {
    .rp-left { display: none; }
    .rp-right { padding-top: 28px; }
    .reg-card { padding: 28px 20px; }
  }
`;

const features = [
  { icon: <ShieldCheck size={16} />, cls: 'fi-indigo', title: 'AI-Powered ATS',  desc: 'Simulation & scoring' },
  { icon: <Zap size={16} />,         cls: 'fi-blue',   title: 'Keyword Gaps',    desc: 'Instant detection' },
  { icon: <Target size={16} />,      cls: 'fi-indigo', title: 'Bullet Impact',   desc: 'Quantifiable analysis' },
  { icon: <BarChart3 size={16} />,   cls: 'fi-blue',   title: 'Career Score',    desc: 'Readiness insights' },
];

const getStrengthMeta = (s) => {
  if (s === 0)  return { label: 'Empty',  cls: 'str-empty',  color: 'transparent',        pct: '0%' };
  if (s <= 25)  return { label: 'Weak',   cls: 'str-weak',   color: '#f87171',            pct: '25%' };
  if (s <= 50)  return { label: 'Fair',   cls: 'str-fair',   color: '#fb923c',            pct: '50%' };
  if (s <= 75)  return { label: 'Good',   cls: 'str-good',   color: '#818cf8',            pct: '75%' };
  return              { label: 'Secure', cls: 'str-secure', color: '#60a5fa',            pct: '100%' };
};

const RegisterPage = () => {
  const [isVisible, setIsVisible]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword]         = useState('');
  const [strength, setStrength]         = useState(0);
  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    let s = 0;
    if (val.length > 5)  s += 25;
    if (val.length > 8)  s += 25;
    if (/[A-Z]/.test(val)) s += 25;
    if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) s += 25;
    setStrength(s);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const vis = isVisible ? 'visible' : '';
  const sm  = getStrengthMeta(strength);

  const handleGoogleSignup = () => {
  window.location.href = "https://cvforge-backend-h3k7.onrender.com/api/auth/google";
};

 const handleGithubSignup = () => {
  window.location.href = "https://cvforge-backend-h3k7.onrender.com/api/auth/github";
};

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">

        {/* bg */}
        <div className="rp-bg">
          <div className="rp-grid" />
          <div className="blob blob-indigo" />
          <div className="blob blob-blue" />
          <div className="blob blob-mid" />
        </div>

        {/* navbar */}
        <nav className="rp-nav">
          <a href="/" className="rp-logo" style={{ textDecoration: 'none' }}>
            <div className="logo-icon">CV</div>
            <span className="logo-text">CVForge <span>AI</span></span>
          </a>
          <button className="rp-back" onClick={() => navigate('/')}>
            <ChevronLeft size={16} />
            Back to Home
          </button>
        </nav>

        <main className="rp-main">

          {/* ── left ── */}
          <div className="rp-left">
            <div className="rp-left-inner">

              <div className={`badge fade-left d1 ${vis}`}>
                <span className="badge-ping" />
                10,000+ resumes optimized
              </div>

              <h1 className={`rp-headline fade-left d2 ${vis}`}>
                Land Your Next Role<br />
                <span className="grad">Faster Than Ever</span>
              </h1>

              <p className={`rp-sub fade-left d3 ${vis}`}>
                Create your free CVForge AI account and unlock powerful ATS insights.
                Join thousands of professionals who've accelerated their careers.
              </p>

              <div className={`feat-grid fade-left d4 ${vis}`}>
                {features.map((f, i) => (
                  <div className="feat-card" key={i}>
                    <div className={`feat-icon ${f.cls}`}>{f.icon}</div>
                    <div>
                      <div className="feat-title">{f.title}</div>
                      <div className="feat-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`social-proof fade-left d5 ${vis}`}>
                <div className="avatars">
                  <div className="av av-1">J</div>
                  <div className="av av-2">S</div>
                  <div className="av av-3">A</div>
                  <div className="av av-4">M</div>
                </div>
                <div className="proof-text">
                  <strong>2,400+</strong> signups this month — join them today
                </div>
              </div>

            </div>
          </div>

          {/* ── right ── */}
          <div className="rp-right">
            <div className={`reg-card fade-right d2 ${vis}`}>
              <div className="card-glow-bar" />

              <div className="card-header">
                <div className="card-badge">
                  <CheckCircle2 size={10} />
                  Create Account
                </div>
                <h2 className="card-title">Sign up for CVForge AI</h2>
                <p className="card-sub">Join the future of AI-powered career growth</p>
              </div>

              <form onSubmit={handleRegister}>

                {/* name */}
                <div className={`form-group fade-up d3 ${vis}`}>
                  <label className="fl">Full Name</label>
                  <div className="input-wrap">
                    <span className="input-icon"><User size={15} /></span>
                    <input
                      type="text"
                      className="fi-input"
                      placeholder="John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* email */}
                <div className={`form-group fade-up d4 ${vis}`}>
                  <label className="fl">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon"><Mail size={15} /></span>
                    <input
                      type="email"
                      className="fi-input"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* password row */}
                <div className={`form-2col fade-up d5 ${vis}`}>
                  <div>
                    <label className="fl">Password</label>
                    <div className="input-wrap">
                      <span className="input-icon"><Lock size={15} /></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="fi-input"
                        placeholder="••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <button
                        type="button"
                        className="pw-toggle"
                        onClick={() => setShowPassword(p => !p)}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="fl">Confirm</label>
                    <div className="input-wrap">
                      <span className="input-icon"><Lock size={15} /></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="fi-input"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* strength */}
                <div className={`strength-wrap fade-up d5 ${vis}`}>
                  <div className="strength-labels">
                    <span className="strength-label-left">Password Strength</span>
                    <span className={`strength-label-right ${sm.cls}`}>{sm.label}</span>
                  </div>
                  <div className="strength-track">
                    <div
                      className="strength-fill"
                      style={{ width: sm.pct, background: sm.color }}
                    />
                  </div>
                </div>

                {/* terms */}
                <div className={`terms-row fade-up d6 ${vis}`}>
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms" className="terms-text">
                    I agree to the{' '}
                    <a href="#" className="terms-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="terms-link">Privacy Policy</a>.
                  </label>
                </div>

                {/* submit */}
                <div className={`fade-up d7 ${vis}`}>
                  <button type="submit" className="btn-submit">
                    Create Free Account
                    <ArrowRight size={16} />
                  </button>
                </div>

              </form>

              {/* divider */}
              <div className={`divider fade-up d7 ${vis}`}>or sign up with</div>

              {/* social */}
              <div className={`social-grid fade-up d8 ${vis}`}>
                <button type="button" className="btn-social btn-google" onClick={handleGoogleSignup}>
                  <Chrome size={15} /> Google
                </button>
                <button type="button" className="btn-social btn-github" onClick={handleGithubSignup}>
                  <Github size={15} /> GitHub
                </button>
              </div>

              <p className={`card-foot fade-up d8 ${vis}`}>
                Already have an account?{' '}
                <a href="/login" className="login-link">Log in here</a>
              </p>

            </div>
          </div>

        </main>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: '#334155',
          fontSize: '12px',
          position: 'relative',
          zIndex: 10,
        }}>
          © 2025 CVForge AI. All rights reserved.
        </div>

      </div>
    </>
  );
};

export default RegisterPage;