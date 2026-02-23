import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'カタログ', labelPt: 'Catálogo' },
    { to: '/cart', label: 'カート', labelPt: 'Carrinho' },
    { to: user ? '/profile' : '/auth', label: user ? 'プロフィール' : 'ログイン', labelPt: user ? 'Perfil' : 'Login' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
            <Disc3 className="h-8 w-8 text-primary" />
          </motion.div>
          <span className="font-bold text-xl tracking-wider">
            <span className="text-primary">盤</span> Vinyl Zen
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm transition-colors hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span className="font-semibold">{link.label}</span>
              <span className="ml-1 text-xs text-muted-foreground">/ {link.labelPt}</span>
              {location.pathname === link.to && (
                <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground">
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-card overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm py-2 hover:text-primary transition-colors"
                >
                  {link.label} / {link.labelPt}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
