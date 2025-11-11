export interface Stay {
  id: string;
  name: string;
  description: string;
  story: string;
  theme: 'ocean' | 'hanok' | 'modern' | 'forest' | 'healing';
  region: string;
  address: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  amenities: string[];
  host_name: string;
  host_description: string;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface Booking {
  id: string;
  stay_id: string;
  stay?: Stay;
  user_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export interface Review {
  id: string;
  stay_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  content: string;
  images?: string[];
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  stay_id: string;
  stay?: Stay;
  created_at: string;
}
