import { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc3 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import SearchFilters from '@/components/SearchFilters';
import AiSearchDialog from '@/components/AiSearchDialog';

export default function Index() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [seal, setSeal] = useState('all');
  const [sort, setSort] = useState('newest');
  const [aiOpen, setAiOpen] = useState(false);

  const { data: products, isLoading } = useProducts({ search, genre, seal, sort });

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          <Disc3 className="h-16 w-16 text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-primary">盤</span> Vinyl Zen <span className="text-primary">禅</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          レコードの世界へようこそ<br />
          <span className="text-sm">Bem-vindo ao mundo dos vinis — descubra raridades e clássicos</span>
        </p>
      </motion.section>

      {/* Filters */}
      <SearchFilters
        search={search} setSearch={setSearch}
        genre={genre} setGenre={setGenre}
        seal={seal} setSeal={setSeal}
        sort={sort} setSort={setSort}
        onAiOpen={() => setAiOpen(true)}
      />

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-square bg-card animate-pulse rounded-lg" />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">見つかりませんでした</p>
          <p>Nenhum disco encontrado</p>
        </div>
      )}

      {/* AI Dialog */}
      <AiSearchDialog open={aiOpen} onOpenChange={setAiOpen} />
    </main>
  );
}
