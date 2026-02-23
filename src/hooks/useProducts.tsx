import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';

export function useProducts(filters?: { genre?: string; search?: string; seal?: string; sort?: string }) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase.from('products').select('*');

      if (filters?.genre && filters.genre !== 'all') {
        query = query.eq('genre', filters.genre);
      }
      if (filters?.seal && filters.seal !== 'all') {
        query = query.eq('quality_seal', filters.seal);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,artist.ilike.%${filters.search}%`);
      }

      if (filters?.sort === 'price_asc') query = query.order('price', { ascending: true });
      else if (filters?.sort === 'price_desc') query = query.order('price', { ascending: false });
      else if (filters?.sort === 'year') query = query.order('year', { ascending: false });
      else query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return (data as any[]) ?? [];
    },
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data } = await supabase.from('products').select('genre');
      const genres = [...new Set((data as any[])?.map((p) => p.genre) ?? [])];
      return genres.sort();
    },
  });
}
