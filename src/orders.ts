import { Order, CreateOrderRequest, OrderStatus } from "./types.js";
import { generateOrderId, validatePhone } from "./utils.js";

// In-memory store
const orders: Order[] = [];

const STATUS_FLOW: OrderStatus[] = [
  "received",
  "preparing",
  "in_oven",
  "quality_check",
  "out_for_delivery",
  "delivered",
];

export function getAllOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function createOrder(req: CreateOrderRequest): Order {
  if (!req.customerName || req.customerName.trim().length === 0) {
    throw new Error("Customer name is required");
  }

  if (!validatePhone(req.customerPhone)) {
    throw new Error("Invalid phone number");
  }

  if (!req.items || req.items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  const total = req.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order: Order = {
    id: generateOrderId(),
    customerName: req.customerName.trim(),
    customerPhone: req.customerPhone,
    items: req.items,
    status: "received",
    total,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orders.push(order);
  return order;
}

export function advanceOrderStatus(id: string): Order {
  const order = getOrderById(id);
  if (!order) {
    throw new Error(`Order ${id} not found`);
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status);
  if (currentIndex === STATUS_FLOW.length - 1) {
    throw new Error(`Order ${id} is already delivered`);
  }

  order.status = STATUS_FLOW[currentIndex + 1];
  order.updatedAt = new Date();
  return order;
}
