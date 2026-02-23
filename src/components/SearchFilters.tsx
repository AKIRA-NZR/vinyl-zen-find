import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useGenres } from '@/hooks/useProducts';

interface Props {
  search: string;
  setSearch: (v: string) => void;
  genre: string;
  setGenre: (v: string) => void;
  seal: string;
  setSeal: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  onAiOpen: () => void;
}

export default function SearchFilters({ search, setSearch, genre, setGenre, seal, setSeal, sort, setSort, onAiOpen }: Props) {
  const { data: genres } = useGenres();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="検索 / Buscar disco, artista..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10" onClick={onAiOpen}>
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">AI アシスタント</span>
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-[150px] bg-card">
            <SelectValue placeholder="ジャンル / Gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全て / Todos</SelectItem>
            {genres?.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={seal} onValueChange={setSeal}>
          <SelectTrigger className="w-[150px] bg-card">
            <SelectValue placeholder="品質 / Selo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全て / Todos</SelectItem>
            <SelectItem value="premium">プレミアム / Premium</SelectItem>
            <SelectItem value="rare">レア / Raro</SelectItem>
            <SelectItem value="classic">クラシック / Clássico</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[160px] bg-card">
            <SelectValue placeholder="並び替え / Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">新着 / Recentes</SelectItem>
            <SelectItem value="price_asc">安い順 / Menor preço</SelectItem>
            <SelectItem value="price_desc">高い順 / Maior preço</SelectItem>
            <SelectItem value="year">年代順 / Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
