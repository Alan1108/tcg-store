export type GameSystem = 'pokemon' | 'mtg' | 'yugioh' | 'lorcana' | 'onepiece';

export type CardCondition = 'NM' | 'LP' | 'MP' | 'HP' | 'DMG';

export type CardRarity = 'Common' | 'Uncommon' | 'Rare' | 'Holo' | 'Ultra Rare' | 'Secret';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type InquiryStatus = 'new' | 'contacted' | 'sold' | 'closed' | 'unavailable';

export interface SealedProduct {
  id: string;
  name: string;
  setName: string;
  game: GameSystem;
  price: number;
  imageUrl: string;
  stock: StockStatus;
  description?: string;
  category: 'booster_box' | 'etb' | 'booster_pack' | 'bundle' | 'collection';
}

export interface SingleCard {
  id: string;
  name: string;
  setName: string;
  setNumber: string;
  game: GameSystem;
  rarity: CardRarity;
  condition: CardCondition;
  price: number;
  imageUrl: string;
  isFoil: boolean;
  language: 'ES' | 'EN' | 'JP';
  description?: string;
}

export interface CartItem {
  id: string;
  product: SealedProduct | SingleCard;
  productType: 'sealed' | 'single';
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  whatsapp: string;
  cardsDescription: string;
  message?: string;
  preferWhatsApp: boolean;
  status: InquiryStatus;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orders: Order[];
  inquiries: Inquiry[];
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  newInquiries: number;
  topProducts: { name: string; sales: number }[];
  recentOrders: Order[];
}
