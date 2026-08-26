export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} ЭТАЛОН, строительство домов</span>
        <a href="tel:88003020103" className="mono">
          8 800 302-01-03
        </a>
      </div>
    </footer>
  )
}
