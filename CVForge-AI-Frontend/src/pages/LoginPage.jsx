import { useNavigate } from "react-router-dom";
import API from "../services/api";
import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  ChevronLeft,
  Zap,
  Target,
  BarChart2,
  Shield
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

  .lp-root {
    min-height: 100vh;
    background: var(--ink);
    font-family: var(--font-body);
    color: #e2e8f0;
    overflow-x: hidden;
    position: relative;
  }

  /* ── background ── */
  .lp-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .lp-grid {
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
    width: 600px; height: 600px;
    background: radial-gradient(circle, #6366f1 0%, transparent 70%);
    top: -15%; left: -10%;
    animation: drift1 18s ease-in-out infinite alternate;
  }
  .blob-blue {
    width: 560px; height: 560px;
    background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
    bottom: -15%; right: -10%;
    animation: drift2 22s ease-in-out infinite alternate;
  }
  .blob-mid {
    width: 320px; height: 320px;
    background: radial-gradient(circle, #818cf8 0%, transparent 70%);
    top: 45%; left: 40%;
    opacity: 0.12;
    animation: drift1 28s ease-in-out infinite alternate-reverse;
  }
  @keyframes drift1 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.08); }
  }
  @keyframes drift2 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(-40px, -25px) scale(1.06); }
  }

  /* ── navbar ── */
  .lp-nav {
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
  .lp-logo {
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
  .lp-back {
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
  .lp-back:hover { color: var(--indigo-light); }

  /* ── main layout ── */
  .lp-main {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    padding-top: 68px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1024px) {
    .lp-main { grid-template-columns: 1fr; }
    .lp-nav { padding: 0 20px; }
  }

  /* ── left panel ── */
  .lp-left {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 56px;
  }
  @media (max-width: 1024px) {
    .lp-left {
      order: 2;
      padding: 40px 24px 60px;
    }
  }
  .lp-left-inner {
    max-width: 480px;
    width: 100%;
  }
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
  @keyframes pulse-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.5; transform: scale(1.4); }
  }
  .lp-headline {
    font-family: var(--font-head);
    font-size: clamp(36px, 4vw, 52px);
    font-weight: 800;
    line-height: 1.08;
    color: #f1f5f9;
    margin-bottom: 20px;
    letter-spacing: -1px;
  }
  .lp-headline .grad {
    background: linear-gradient(90deg, var(--indigo-light) 0%, var(--blue-mid) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-sub {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.65;
    margin-bottom: 44px;
    max-width: 400px;
  }

  /* feature cards */
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
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
  .fi-indigo { background: rgba(99,102,241,0.15);  color: var(--indigo-light); }
  .fi-blue   { background: rgba(59,130,246,0.15);  color: var(--blue-mid); }
  .feat-title {
    font-size: 13px;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 3px;
    font-family: var(--font-head);
  }
  .feat-desc {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.45;
  }

  /* ── right panel ── */
  .lp-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
  }
  @media (max-width: 1024px) {
    .lp-right { order: 1; padding: 48px 20px 16px; }
  }

  /* login card */
  .login-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border-radius: 28px;
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow:
      0 0 0 1px rgba(99,102,241,0.07),
      0 32px 64px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.06);
    transition: box-shadow 0.35s;
  }
  .login-card:hover {
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
    border-radius: 0 0 4px 4px;
  }

  /* card header */
  .card-header { text-align: center; margin-bottom: 32px; }
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
    margin-bottom: 16px;
  }
  .card-title {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .card-sub {
    font-size: 14px;
    color: var(--muted);
  }

  /* form */
  .form-group { margin-bottom: 18px; }

  label.fl {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .input-wrap { position: relative; }
  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
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
    border-radius: 12px;
    padding: 13px 44px 13px 42px;
    font-size: 14px;
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
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #475569;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    padding: 2px;
  }
  .pw-toggle:hover { color: var(--indigo-light); }

  .form-footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    margin-top: -2px;
  }
  .remember-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .remember-wrap input[type="checkbox"] {
    width: 15px;
    height: 15px;
    accent-color: var(--indigo);
    cursor: pointer;
    border-radius: 4px;
  }
  .remember-label {
    font-size: 13px;
    color: #64748b;
    cursor: pointer;
    user-select: none;
  }
  .forgot-link {
    font-size: 13px;
    font-weight: 600;
    color: var(--indigo-light);
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .forgot-link:hover { opacity: 0.75; }

  /* submit button */
  .btn-submit {
    width: 100%;
    background: linear-gradient(90deg, #4338ca 0%, #6366f1 40%, #3b82f6 100%);
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    color: #fff;
    font-family: var(--font-head);
    font-size: 15px;
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
    margin: 24px 0;
    color: #334155;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  /* social buttons */
  .social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .btn-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
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
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,255,255,0.9);
    color: #0f172a;
  }
  .btn-github:hover {
    background: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  }

  /* card footer */
  .card-foot {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: var(--muted);
  }
  .sign-up-link {
    font-weight: 700;
    background: linear-gradient(90deg, var(--indigo-light), var(--blue-mid));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .sign-up-link:hover { opacity: 0.8; }

  /* ── entrance animations ── */
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
  .d2 { transition-delay: 0.15s; }
  .d3 { transition-delay: 0.25s; }
  .d4 { transition-delay: 0.35s; }
  .d5 { transition-delay: 0.45s; }
  .d6 { transition-delay: 0.55s; }
  .d7 { transition-delay: 0.65s; }

  @media (max-width: 1024px) {
    .lp-left { display: none; }
    .lp-right { padding-top: 32px; }
    .login-card { padding: 32px 24px; }
  }
  @media (max-width: 480px) {
    .lp-headline { font-size: 32px; }
  }
`;

const features = [
  { icon: <Target size={16} />,   cls: 'fi-indigo', title: 'AI-Powered ATS',  desc: 'Simulation & scoring' },
  { icon: <Zap size={16} />,      cls: 'fi-blue',   title: 'Keyword Gaps',    desc: 'Instant detection' },
  { icon: <Shield size={16} />,   cls: 'fi-indigo', title: 'Bullet Impact',   desc: 'Quantifiable analysis' },
  { icon: <BarChart2 size={16} />,cls: 'fi-blue',   title: 'Career Score',    desc: 'Readiness insights' },
];

const LoginPage = () => {
  const [isVisible, setIsVisible]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      // Store user info for dashboard profile display
      // Handles multiple backend response shapes
      const user = res.data.user || res.data.data?.user || {};
      const name = user.name || res.data.name || email.split("@")[0];
      localStorage.setItem("user", JSON.stringify({ name, email: user.email || email }));
      navigate("/loading");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const vis = isVisible ? 'visible' : '';


  const handleGoogleLogin = () => {
  window.location.href = "https://cvforge-backend-h3k7.onrender.com/api/auth/google";
};

const handleGithubLogin = () => {
  window.location.href = "https://cvforge-backend-h3k7.onrender.com/api/auth/github";
};

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">

        {/* ── background ── */}
        <div className="lp-bg">
          <div className="lp-grid" />
          <div className="blob blob-indigo" />
          <div className="blob blob-blue" />
          <div className="blob blob-mid" />
        </div>

        {/* ── navbar ── */}
        <nav className="lp-nav">
          <a href="/" className="lp-logo" style={{ textDecoration: 'none' }}>
            <div className="logo-icon">CV</div>
            <span className="logo-text">CVForge <span>AI</span></span>
          </a>
          <button className="lp-back" onClick={() => navigate('/')}>
            <ChevronLeft size={16} />
            Back to Home
          </button>
        </nav>

        {/* ── main grid ── */}
        <main className="lp-main">

          {/* ── left: branding ── */}
          <div className="lp-left">
            <div className="lp-left-inner">

              <div className={`badge fade-left d1 ${vis}`}>
                <span className="badge-dot" />
                AI-Powered Resume Intelligence
              </div>

              <h1 className={`lp-headline fade-left d2 ${vis}`}>
                Welcome Back to<br />
                <span className="grad">CVForge AI</span>
              </h1>

              <p className={`lp-sub fade-left d3 ${vis}`}>
                Continue optimizing your resume with AI-powered ATS intelligence.
                Land your dream role faster with data-driven career insights.
              </p>

              <div className={`feature-grid fade-left d4 ${vis}`}>
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

            </div>
          </div>

          {/* ── right: login card ── */}
          <div className="lp-right">
            <div className={`login-card fade-right d2 ${vis}`}>
              <div className="card-glow-bar" />

              {/* header */}
              <div className="card-header">
                <div className="card-badge">
                  <Shield size={10} />
                  Secure Login
                </div>
                <h2 className="card-title">Sign in to account</h2>
                <p className="card-sub">Enter your credentials to access CVForge</p>
              </div>

              {/* form */}
              <form onSubmit={handleLogin}>

                {/* email */}
                <div className={`form-group fade-up d3 ${vis}`}>
                  <label className="fl">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon"><Mail size={16} /></span>
                    <input
                      type="email"
                      className="fi-input"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* password */}
                <div className={`form-group fade-up d4 ${vis}`}>
                  <label className="fl">Password</label>
                  <div className="input-wrap">
                    <span className="input-icon"><Lock size={16} /></span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="fi-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="pw-toggle"
                      onClick={() => setShowPassword(p => !p)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* remember + forgot */}
                <div className={`form-footer-row fade-up d5 ${vis}`}>
                  <label className="remember-wrap">
                    <input type="checkbox" id="remember" />
                    <span className="remember-label">Remember for 30 days</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                {/* submit */}
                <div className={`fade-up d6 ${vis}`}>
                  <button type="submit" className="btn-submit">
                    Login to Dashboard
                    <ArrowRight size={17} />
                  </button>
                </div>

              </form>

              {/* divider */}
              <div className={`divider fade-up d6 ${vis}`}>or continue with</div>

              {/* social */}
              <div className={`social-grid fade-up d7 ${vis}`}>
                <button type="button" className="btn-social btn-google" onClick={handleGoogleLogin}>
                  <Chrome size={16} /> Google
                </button>
                <button type="button" className="btn-social btn-github" onClick={handleGithubLogin}>
                  <Github size={16} /> GitHub
                </button>
              </div>

              {/* footer */}
              <p className={`card-foot fade-up d7 ${vis}`}>
                Don't have an account?{' '}
                <span
                  className="sign-up-link"
                  onClick={() => navigate('/register')}
                >
                  Sign up for free
                </span>
              </p>

            </div>
          </div>

        </main>

        {/* footer */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          color: '#334155',
          fontSize: '12px',
          position: 'relative',
          zIndex: 10,
        }}>
          © 2025 CVForge AI. Secure enterprise encryption.
        </div>

      </div>
    </>
  );
};

export default LoginPage;