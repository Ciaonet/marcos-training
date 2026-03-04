import { describe, it, expect, beforeEach } from "vitest";
import { createOrder, getAllOrders, advanceOrderStatus } from "../src/orders.js";

// Reset in-memory store between tests by re-importing
// (Note: this is intentionally imperfect — a teaching moment about test isolation)

describe("createOrder", () => {
  it("should create an order with valid input", () => {
    const order = createOrder({
      customerName: "John Doe",
      customerPhone: "555-123-4567",
      items: [{ name: "Large Pepperoni", quantity: 1, price: 1499 }],
    });

    expect(order.id).toMatch(/^ORD-/);
    expect(order.customerName).toBe("John Doe");
    expect(order.status).toBe("received");
    expect(order.total).toBe(1499);
  });

  it("should reject an order with no items", () => {
    expect(() =>
      createOrder({
        customerName: "Jane",
        customerPhone: "555-123-4567",
        items: [],
      })
    ).toThrow("Order must have at least one item");
  });

  it("should reject an invalid phone number", () => {
    // BUG: This test FAILS because validatePhone is too permissive
    // "123" has only 3 digits but the current regex accepts 7+ digits...
    // wait, "123" has 3 digits so it should fail. Let's use a tricky case:
    expect(() =>
      createOrder({
        customerName: "Test",
        customerPhone: "1234567",
        items: [{ name: "Pizza", quantity: 1, price: 999 }],
      })
    ).toThrow("Invalid phone number");
  });
});

describe("advanceOrderStatus", () => {
  it("should advance from received to preparing", () => {
    const order = createOrder({
      customerName: "Status Test",
      customerPhone: "(555) 999-0000",
      items: [{ name: "Cheese Pizza", quantity: 2, price: 1299 }],
    });

    const updated = advanceOrderStatus(order.id);
    expect(updated.status).toBe("preparing");
  });
});
