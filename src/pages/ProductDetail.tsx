import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import QualitySeal from '@/components/QualitySeal';
import { useCart } from '@/hooks/useCart';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id!).single();
      if (error) throw error;
      return data as any;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="container mx-auto p-8"><div className="h-96 bg-card animate-pulse rounded-lg" /></div>;
  if (!product) return <div className="container mx-auto p-8 text-center text-muted-foreground">Disco não encontrado</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> カタログに戻る / Voltar
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative aspect-square overflow-hidden rounded-lg bg-card">
          {product.cover_url ? (
            <img src={product.cover_url} alt={product.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl text-muted-foreground">盤</div>
          )}
          {product.quality_seal && (
            <div className="absolute top-4 right-4">
              <QualitySeal seal={product.quality_seal} />
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-lg text-muted-foreground mt-1">{product.artist}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{product.genre}</span>
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{product.year}</span>
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{product.condition}</span>
          </div>

          {product.description && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}

          <div className="space-y-2">
            <p className="text-3xl font-bold text-primary">R$ {Number(product.price).toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">在庫: {product.stock} {product.stock > 0 ? '枚' : '— 売り切れ / Esgotado'}</p>
          </div>

          <Button
            size="lg"
            className="w-full gap-2"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="h-5 w-5" />
            カートに追加 / Adicionar ao carrinho
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
