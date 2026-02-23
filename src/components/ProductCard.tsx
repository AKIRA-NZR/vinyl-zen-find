import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QualitySeal from './QualitySeal';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <Card className="group overflow-hidden bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-secondary">
            {product.cover_url ? (
              <img
                src={product.cover_url}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-4xl">盤</div>
            )}
            {product.quality_seal && (
              <div className="absolute top-2 right-2">
                <QualitySeal seal={product.quality_seal} size="sm" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
        <CardContent className="p-4 space-y-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm leading-tight truncate hover:text-primary transition-colors">{product.title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground truncate">{product.artist} · {product.year}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-primary font-bold">R$ {Number(product.price).toFixed(2)}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">{product.condition} · 在庫: {product.stock}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
