import Link from "next/link";
import { BrandMark } from "@/components/landing/SiteNavigation";

const journeyLinks = [
  { href: "/today", label: "Today" },
  { href: "/route", label: "The Route" },
  { href: "/steps", label: "The Steps" },
  { href: "/path", label: "Your Path" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-ledger">
          <span>Waymark / a clearer next step</span>
          <span>Independent study-abroad planning</span>
        </div>

        <div className="footer-body">
          <div className="footer-invitation">
            <h2>Where to <em>next?</em></h2>
            <p>Choose a place. See the steps. Make the journey yours.</p>
            <Link className="footer-cta" href="/path">
              Build my route <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <nav className="footer-directory" aria-label="Footer navigation">
            <div className="footer-directory-group">
              <p className="footer-label">Your planning space</p>
              {journeyLinks.map(({ href, label }) => (
                <Link href={href} key={href}>{label}<span aria-hidden="true">↗</span></Link>
              ))}
            </div>
            <div className="footer-directory-group">
              <p className="footer-label">Waymark</p>
              <Link href="/#vision">Back to the idea<span aria-hidden="true">↗</span></Link>
              <Link href="/account">Your account<span aria-hidden="true">↗</span></Link>
            </div>
          </nav>
        </div>

        <div className="footer-top">
          <Link href="/" className="footer-wordmark" aria-label="Waymark home">
            waymark<span>.</span>
          </Link>
          <BrandMark className="footer-mark" />
        </div>
        <div className="footer-bottom">
          <span>© 2026 Waymark.</span>
          <p>Plans inform your next step. They do not submit applications.</p>
          <Link href="#main-content">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
