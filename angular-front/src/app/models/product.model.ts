// Interface for Offer data
interface Offer {
    id: number;
    discount: number;
    start_date: string;
    end_date: string;
  }
  
  // Interface for each item in addedOffers
  interface OfferItem {
    id: number;
    offer_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    offer: Offer;
  }
  
  // Interface for the Product User
  interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    role: string;
  }
  
  // Interface for the Product
  interface Product {
    id: number;
    product_name: string;
    description: string;
    price: number;
    stock: number;
    material: string;
    size: string;
    image: string;
    video: string;
    category_name: string;
    cover_image: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    images: Array<{ id: number; url: string }>;
    addedOffers: OfferItem[];
    user: User;
  }
  