const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-lg font-semibold tracking-wide">
          Tanmoy
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm text-zinc-300">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/blogs" className="hover:text-white transition-colors">Blogs</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Socials */}
        <div className="flex gap-4 text-sm text-zinc-300">
          <a href="https://github.com/Tanmoy9088" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          <a href="https://linkedin.com/in/tanmoy9088" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 text-center text-xs text-zinc-500 py-4">
        © {year} Tanmoy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;