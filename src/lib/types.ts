export interface Product {
  id: string;
  title: string;
  artist: string;
  genre: string;
  price: number;
  description: string | null;
  cover_url: string | null;
  year: number | null;
  condition: string;
  quality_seal: string | null;
  stock: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}
