import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRinging, Buildings, CheckCircle, Factory, Lightning, MagnifyingGlass, ShoppingBagOpen, Warehouse } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, softwareJsonLd } from "@/lib/seo";

const faqs = [
  ["What is AI CCTV monitoring software?", "AI CCTV monitoring software analyzes existing camera feeds to identify configured events, organize incidents, and help teams respond faster without watching every feed continuously."],
  ["Does CamSentinel require new cameras?", "CamSentinel is designed to work with common IP camera and NVR environments, subject to stream access and network compatibility."],
  ["Can this platform connect to a live camera?", "CamSentinel connects camera imagery with operational insights across every site."],
  ["Which teams benefit most?", "Security, safety, facilities, warehouse operations, retail loss prevention, and multi-site management teams benefit from a shared incident workflow."],
];

export default function Home() {
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <>
      <JsonLd data={[organizationJsonLd, softwareJsonLd, faqJsonLd]} />
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">AI video intelligence for real operations</span>
              <h1 className="display">Your cameras already see it. Now your team can act on it.</h1>
              <p className="lede">CamSentinel AI turns existing CCTV feeds into a searchable facility intelligence layer—surfacing safety risks, restricted access, operational delays, and critical events in real time.</p>
              <div className="hero-actions"><Link className="btn btn-primary" href="/signup">Start free trial <ArrowRight size={17} /></Link><Link className="btn btn-secondary" href="/app/overview">Explore live operations</Link></div>
              <div className="trust-row"><span className="trust-item"><CheckCircle size={16} weight="fill" color="var(--emerald)" /> Works with existing IP cameras</span><span className="trust-item"><CheckCircle size={16} weight="fill" color="var(--emerald)" /> Secure architecture</span><span className="trust-item"><CheckCircle size={16} weight="fill" color="var(--emerald)" /> Setup in minutes</span></div>
            </div>
            <div className="hero-visual">
              <Image src="/images/facility-intelligence-map.png" alt="AI CCTV monitoring map showing security camera coverage across a logistics facility" width={1536} height={1024} priority />
              <span className="live-pill"><span className="signal" /> 42 cameras online · Live</span>
            </div>
          </div>
        </section>

        <div className="logo-strip"><div className="container logo-row"><span>LOGISTICS</span><span>MANUFACTURING</span><span>RETAIL</span><span>HEALTHCARE</span><span>FACILITIES</span></div></div>

        <section className="section" id="platform">
          <div className="container"><span className="eyebrow">One operational picture</span><h2 className="section-title">Move from passive recording to active awareness.</h2><p className="lede">CamSentinel helps teams understand what is happening, where it is happening, and what needs attention—without adding another wall of screens.</p>
            <div className="feature-grid">
              <article className="feature"><span className="feature-icon"><Lightning size={21} /></span><h3>Real-time event detection</h3><p>Surface configured safety, access, congestion, and operational events as they happen.</p></article>
              <article className="feature"><span className="feature-icon"><MagnifyingGlass size={21} /></span><h3>Searchable incident history</h3><p>Find events by site, camera, zone, severity, and status instead of scrubbing through hours of footage.</p></article>
              <article className="feature"><span className="feature-icon"><BellRinging size={21} /></span><h3>Accountable response</h3><p>Give operators one place to review, resolve, and measure incident response across every site.</p></article>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "var(--paper)", borderBlock: "1px solid var(--line)" }}>
          <div className="container split">
            <div className="media-frame"><Image src="/images/receiving-dock-camera.png" alt="live CCTV view of a warehouse receiving dock" width={1536} height={1024} /></div>
            <div><span className="eyebrow">Built for action</span><h2 className="section-title">See patterns your recordings cannot explain.</h2><p className="lede">Unify site health, incident queues, camera status, and response performance. Every signal stays connected to the place and camera that produced it.</p>
              <div className="metric-list"><div className="metric-row"><span>Average response time</span><strong>5m 42s</strong></div><div className="metric-row"><span>Cameras currently healthy</span><strong>98.4%</strong></div><div className="metric-row"><span>Noise reduced by review rules</span><strong>71%</strong></div></div>
            </div>
          </div>
        </section>

        <section className="section" id="industries"><div className="container"><span className="eyebrow">Designed for physical operations</span><h2 className="section-title">One platform. Different operational risks.</h2>
          <div className="industry-grid">
            <article className="industry"><Warehouse size={24} /><h3>Warehousing</h3><p>Monitor loading zones, dwell time, blocked paths, PPE, and perimeter access.</p></article>
            <article className="industry"><Factory size={24} /><h3>Manufacturing</h3><p>Detect unsafe zones, workflow disruption, and equipment-area activity.</p></article>
            <article className="industry"><ShoppingBagOpen size={24} /><h3>Retail</h3><p>Improve loss prevention, queue awareness, and after-hours monitoring.</p></article>
            <article className="industry"><Buildings size={24} /><h3>Facilities</h3><p>Coordinate access, safety, and camera health across distributed properties.</p></article>
          </div>
        </div></section>

        <section className="section" id="faq"><div className="container split" style={{ alignItems: "start" }}><div><span className="eyebrow">Common questions</span><h2 className="section-title">Clear answers before you connect a camera.</h2><p className="lede">See the complete customer journey from onboarding to incident response.</p></div><div className="metric-list">{faqs.map(([q,a]) => <details key={q} className="metric-row" style={{ display: "block" }}><summary style={{ fontWeight: 650, cursor: "pointer" }}>{q}</summary><p className="muted" style={{ lineHeight: 1.6 }}>{a}</p></details>)}</div></div></section>

        <section className="section-tight"><div className="container"><div className="cta-panel"><div><span className="eyebrow" style={{ color: "#7fd6b8" }}>Start with the cameras you already own</span><h2 className="section-title" style={{ marginBottom: 12 }}>Build a clearer picture of every site.</h2><p className="muted">Explore the complete SaaS experience or start the onboarding flow.</p></div><Link className="btn btn-emerald" href="/signup">Start free trial <ArrowRight size={17} /></Link></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
