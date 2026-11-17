import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Verve Content Studio', robots: { index: false, follow: false } };

export default function RootLayout({ children }) {
  return (
    <html lang="ka">
      <body>
        <header className="top">
          <div className="wrap">
            <Link href="/" aria-label="Verve"><span className="logo" /></Link>
            <nav>
              <Link href="/">მთავარი</Link>
              <Link href="/jobs/beauty-days">პროექტი</Link>
              <Link href="/runs">მოდელების შედარება</Link>
              <Link href="/costs">ხარჯები</Link>
              <Link href="/brand">ბრენდი</Link>
            </nav>
          </div>
        </header>
        <main><div className="wrap">{children}</div></main>
      </body>
    </html>
  );
}
