import express from "express";
import { getAllOrders, createOrder, advanceOrderStatus } from "./orders.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3456;

// List all orders
app.get("/orders", (_req, res) => {
  res.json(getAllOrders());
});

// Create a new order
app.post("/orders", (req, res) => {
  try {
    const order = createOrder(req.body);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Advance order status
app.patch("/orders/:id/advance", (req, res) => {
  try {
    const order = advanceOrderStatus(req.params.id);
    res.json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// NOTE: GET /orders/:id is missing — trainees will add this

app.listen(PORT, () => {
  console.log(`Pizza Tracker API running on http://localhost:${PORT}`);
});

export default app;
