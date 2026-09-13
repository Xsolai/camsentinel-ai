import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div><Brand /><p style={{ color: "#9cadbe", maxWidth: 360, lineHeight: 1.65, marginTop: 18 }}>AI CCTV monitoring software that turns existing cameras into safer, more accountable operations.</p></div>
          <div className="footer-col"><h3>Product</h3><Link href="/#platform">Platform</Link><Link href="/pricing">Pricing</Link><Link href="/signup">Start trial</Link></div>
          <div className="footer-col"><h3>Solutions</h3><Link href="/#industries">Warehousing</Link><Link href="/#industries">Retail</Link><Link href="/#industries">Manufacturing</Link></div>
          <div className="footer-col"><h3>Company</h3><a href="https://xsolai.com">XsolAI</a><a href="mailto:we@xsolai.com">Contact</a><Link href="/login">Client login</Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 XsolAI. All rights reserved.</span><span>Created by Ahsan Inam · Operational intelligence for every workflow.</span></div>
      </div>
    </footer>
  );
}
