export interface OrderDetails {
  quantity: any;
  id: number;
  created_at: string;
  payment_status: string;
  phone: string;
  address: string;
  order_items: Array<{
    quantity: number;
    product: {
      name: string;
      description: string;
      stock: number;
      price: number;
    };
  }>;
}
