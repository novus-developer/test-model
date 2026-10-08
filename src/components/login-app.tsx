"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";

const DEMO_EMAIL = "demo@nora.app";
const DEMO_PASSWORD = "Nora2026!";

function Icon({ name, className = "" }: { name: "arrow" | "mail" | "lock" | "eye" | "eye-off" | "check" | "spark"; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    "eye-off": <><path d="m3 3 18 18M10.6 5.1 12 5c6.5 0 10 7 10 7a21 21 0 0 1-3 4M6.2 6.2A22 22 0 0 0 2 12s3.5 7 10 7a13 13 0 0 0 5.8-1.5M10 10a3 3 0 0 0 4 4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" />,
  };
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function WorkspaceIllustration() {
  return (
    <div className="workspace-art" aria-hidden="true">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="floating-spark"><Icon name="spark" /></div>
      <div className="workspace-window">
        <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>Hapësira jote</span><span className="tiny-avatar">N</span></div>
        <div className="window-body">
          <div className="mini-sidebar"><div className="mini-logo">n.</div><i className="active" /><i /><i /><i /></div>
          <div className="mini-content">
            <div className="mini-greeting">Mirëmëngjes, Nora <span>✳</span></div>
            <div className="mini-subtitle">Një ditë e re. Ide të reja.</div>
            <div className="mini-stats"><div><span>Projektet</span><strong>12 <small>↗</small></strong></div><div><span>Në progres</span><strong>04 <small>↗</small></strong></div></div>
            <div className="mini-chart"><div className="chart-title">Pak progres, çdo ditë <span>↗</span></div><div className="chart-bars">{[35, 52, 43, 67, 58, 80, 72, 95, 86].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
          </div>
        </div>
      </div>
      <div className="floating-note"><span className="note-check"><Icon name="check" /></span><div><strong>Një hap më pranë.</strong><span>Idesë tënde të radhës.</span></div></div>
      <span className="art-dot dot-one" /><span className="art-dot dot-two" />
    </div>
  );
}

export default function LoginApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; credentials?: string }>({});
  const [loggedIn, setLoggedIn] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) nextErrors.email = "Shkruaj një adresë emaili të vlefshme.";
    if (!password) nextErrors.password = "Shkruaj fjalëkalimin tënd.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      if (nextErrors.email) emailRef.current?.focus();
      else passwordRef.current?.focus();
      return;
    }
    if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setErrors({ credentials: "Emaili ose fjalëkalimi nuk përputhet. Provo llogarinë demo më poshtë." });
      passwordRef.current?.focus();
      return;
    }
    setErrors({});
    setPassword("");
    setShowPassword(false);
    setLoggedIn(true);
  }

  function fillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrors({});
    emailRef.current?.focus();
  }

  function logout() {
    setLoggedIn(false);
    setPassword("");
    setErrors({});
  }

  return (
    <main className="login-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Nora, faqja kryesore"><span className="brand-symbol"><Icon name="spark" /></span>nora<span className="brand-period">.</span></Link>
        <span className="header-caption">Pak më thjesht. Pak më bukur.</span>
        <span className="header-badge"><span />Hapësira jote digjitale</span>
      </header>

      <div className="login-shell">
        <section className="story-panel" aria-labelledby="story-title">
          <div className="story-eyebrow"><span />PËR IDE QË BËHEN REALITET</div>
          <h1 id="story-title">Ide të mëdha.<br />Një <span>fillim i ri.</span></h1>
          <p className="story-description">Një hapësirë për idetë, planet dhe ditën tënde.<br className="desktop-break" /> Hyr dhe vazhdo aty ku e le.</p>
          <WorkspaceIllustration />
          <div className="story-bottom"><span className="small-spark">✳</span><p>Më pak rrëmujë.<br /><strong>Më shumë hapësirë për ty.</strong></p><span className="story-number">ME NORA.</span></div>
        </section>

        <section className="form-panel" aria-labelledby="form-title">
          {loggedIn ? (
            <div className="success-content">
              <div className="success-icon"><Icon name="check" /></div>
              <span className="form-eyebrow">BUKUR QË JE KËTU</span>
              <h2 id="form-title" tabIndex={-1} ref={(element) => { element?.focus(); }}>Mirë se erdhe, Nora!</h2>
              <p className="form-description">Je në hapësirën tënde. Gati për një fillim të ri?</p>
              <div className="account-card"><span className="account-avatar">N</span><div><strong>Nora Demo</strong><span>{DEMO_EMAIL}</span></div><span className="account-status">Demo</span></div>
              <div className="success-notice" role="status"><Icon name="check" /><span>Hyrja demo u krye me sukses.</span></div>
              <button className="primary-button" onClick={logout}>Dil nga llogaria<Icon name="arrow" /></button>
              <p className="demo-disclaimer">Kjo është një llogari demonstrimi. Sesioni mbyllet kur rifreskon faqen.</p>
            </div>
          ) : (
            <div className="form-content">
              <div className="welcome-icon"><Icon name="spark" /></div>
              <span className="form-eyebrow">HAPËSIRA JOTE TË PRET</span>
              <h2 id="form-title">Mirë se u ktheve<span>!</span></h2>
              <p className="form-description">Hyr në llogarinë tënde dhe bëje ditën pak më të lehtë.</p>

              <form noValidate onSubmit={handleLogin} className="login-form">
                <div className="field-group">
                  <label htmlFor="email">Adresa e emailit</label>
                  <div className={`input-wrap ${errors.email ? "input-error" : ""}`}><Icon name="mail" /><input ref={emailRef} id="email" name="email" type="email" autoComplete="username" placeholder="ti@shembull.com" value={email} onChange={(event) => { setEmail(event.target.value); setErrors({}); }} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} required /></div>
                  {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
                </div>
                <div className="field-group">
                  <label htmlFor="password">Fjalëkalimi</label>
                  <div className={`input-wrap ${errors.password ? "input-error" : ""}`}><Icon name="lock" /><input ref={passwordRef} id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Shkruaj fjalëkalimin" value={password} onChange={(event) => { setPassword(event.target.value); setErrors({}); }} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} required /><button type="button" className="password-toggle" aria-label={showPassword ? "Fshih fjalëkalimin" : "Shfaq fjalëkalimin"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}><Icon name={showPassword ? "eye-off" : "eye"} /></button></div>
                  {errors.password && <p className="field-error" id="password-error">{errors.password}</p>}
                </div>
                {errors.credentials && <p className="credentials-error" role="alert">{errors.credentials}</p>}
                {(errors.email || errors.password) && <span className="sr-only" role="alert">Kontrollo fushat e formularit.</span>}
                <button className="primary-button" type="submit">Hyr në llogari<Icon name="arrow" /></button>
              </form>

              <div className="demo-box"><div className="demo-heading"><span className="demo-label">PROVO NJËHERË</span><span className="demo-tag">Demo</span></div><p>Njihu me hapësirën tënde, pa krijuar llogari.</p><button type="button" className="demo-button" onClick={fillDemo}>Përdor llogarinë demo<Icon name="arrow" /></button><span className="demo-credentials">{DEMO_EMAIL}<span>·</span>{DEMO_PASSWORD}</span></div>
              <details className="login-help"><summary>Ke nevojë për ndihmë?</summary><p>Për këtë demonstrim, përdor emailin dhe fjalëkalimin e shfaqur më sipër. Llogaritë personale dhe rikuperimi i fjalëkalimit do të jenë të disponueshme pas lidhjes me shërbimin e autentikimit.</p></details>
              <p className="form-footnote"><Icon name="lock" />Demo lokale · pa ruajtur fjalëkalimin</p>
            </div>
          )}
        </section>
      </div>

      <footer className="site-footer"><span>© Nora. Një fillim i bukur.</span><span>Krijuar me kujdes <span className="footer-flower">✳</span></span></footer>
    </main>
  );
}
