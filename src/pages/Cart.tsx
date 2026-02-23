import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
        <h2 className="text-2xl font-bold">ログインしてください</h2>
        <p className="text-muted-foreground">Faça login para ver seu carrinho</p>
        <Link to="/auth"><Button>ログイン / Login</Button></Link>
      </main>
    );
  }

  const total = items.reduce((sum, item) => sum + (Number(item.product?.price ?? 0) * item.quantity), 0);

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold"><span className="text-primary">カート</span> / Carrinho</h1>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 bg-card animate-pulse rounded-lg" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">カートは空です / Carrinho vazio</p>
          <Link to="/"><Button variant="outline">カタログを見る / Ver catálogo</Button></Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 bg-card rounded-lg border border-border"
              >
                <div className="h-20 w-20 rounded overflow-hidden bg-secondary shrink-0">
                  {item.product?.cover_url ? (
                    <img src={item.product.cover_url} alt={item.product.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl text-muted-foreground">盤</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{item.product?.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.product?.artist}</p>
                  <p className="text-primary font-bold mt-1">R$ {Number(item.product?.price ?? 0).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>合計 / Total</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearCart} className="flex-1">クリア / Limpar</Button>
              <Button className="flex-1">購入 / Finalizar</Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
