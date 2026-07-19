"use client";

import { ArrowRight, CheckCircle, Eye, EyeSlash } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brand } from "./brand";
import { isValidEmail } from "@/lib/demo-utils";

export function AuthPanel({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const copy =
    mode === "login"
      ? {
          title: "Welcome back",
          subtitle: "Continue to your facility intelligence workspace.",
          action: "Sign in",
        }
      : mode === "signup"
        ? {
            title: "Start your free trial",
            subtitle: "Create a workspace. No camera or card required.",
            action: "Create account",
          }
        : {
            title: "Reset your password",
            subtitle: "We will send a secure recovery link.",
            action: "Send reset link",
          };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") || "");
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (mode === "forgot") setSent(true);
      else router.push(mode === "signup" ? "/onboarding" : "/app/overview");
    }, 650);
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Brand />
        <div className="auth-quote">
          <span className="eyebrow">AI facility intelligence</span>
          <h2>
            See every site.
            <br />
            Act on every signal.
          </h2>
          <p>
            Turn existing camera feeds into incidents, alerts, and operational
            insight without exposing private systems.
          </p>
          <ul className="check-list">
            <li>
              <CheckCircle size={17} weight="fill" color="var(--emerald)" />
              App and camera health detection
            </li>
            <li>
              <CheckCircle size={17} weight="fill" color="var(--emerald)" />
              Built for safety and operations
            </li>
            <li>
              <CheckCircle size={17} weight="fill" color="var(--emerald)" />
              Unified visibility across every site
            </li>
          </ul>
        </div>
        <Image
          src="/images/facility-intelligence-map.png"
          alt="CamSentinel AI facility intelligence map"
          width={1536}
          height={1024}
          priority
        />
      </section>
      <section className="auth-form-wrap">
        <div className="auth-card">
          <Brand />
          <h1>{copy.title}</h1>
          <p className="muted">{copy.subtitle}</p>
          {sent ? (
            <div className="success-box" style={{ marginTop: 28 }}>
              Recovery link sent. You can safely return to sign in. </div>
          ) : (
            <form className="form-stack" onSubmit={submit}>
              {mode === "signup" && (
                <div className="field-wrap">
                  <label htmlFor="name">Full name</label>
                  <input
                    className="field"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Ahsan Inam"
                  />
                </div>
              )}
              <div className="field-wrap">
                <label htmlFor="email">Work email</label>
                <input
                  className="field"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>
              {mode !== "forgot" && (
                <div className="field-wrap">
                  <label htmlFor="password">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="field"
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      minLength={8}
                      required
                      autoComplete={
                        mode === "signup" ? "new-password" : "current-password"
                      }
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      aria-label={show ? "Hide password" : "Show password"}
                      onClick={() => setShow((value) => !value)}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        border: 0,
                        background: "transparent",
                        color: "var(--ink-soft)",
                      }}
                    >
                      {show ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading ? "Working…" : copy.action}
                <ArrowRight size={17} />
              </button>
            </form>
          )}
          <div style={{ marginTop: 22, fontSize: 14 }} className="muted">
            {mode === "login" ? (
              <>
                <Link href="/forgot-password">Forgot password?</Link>
                <br />
                <br />
                New to CamSentinel?{" "}
                <Link href="/signup">
                  <strong>Create an account</strong>
                </Link>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <Link href="/login">
                  <strong>Sign in</strong>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <strong>Return to sign in</strong>
              </Link>
            )}
          </div>
          <p className="form-note" style={{ marginTop: 28 }}>
            Secure account access with streamlined recovery. </p>
        </div>
      </section>
    </main>
  );
}
