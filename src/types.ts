export type OrderStatus =
  | "received"
  | "preparing"
  | "in_oven"
  | "quality_check"
  | "out_for_delivery"
  | "delivered";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
}
