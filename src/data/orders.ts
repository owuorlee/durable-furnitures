// ============================================================================
// ORDER TRACKING DATA
// ============================================================================
// This file holds all customer orders that can be tracked on the Track Order
// page (/track-order). It is deliberately kept as a simple flat file so the
// business owner (or a developer) can update statuses manually as an order
// moves through the pipeline — no database required.
//
// HOW TO UPDATE AN ORDER'S STATUS
// -------------------------------
// 1. Find the order below by its `id` (the same ID the customer received when
//    they placed the order, e.g. "DFH-A9F3K2").
// 2. Change its `status` field to one of the values in ORDER_STAGES below.
//    The Track Order page will automatically:
//       - tick all previous stages as completed
//       - highlight the new status as the active stage
// 3. Optionally update `estimatedDelivery` or `address` as details firm up.
// 4. Save the file. Changes are live on the next page load.
//
// HOW TO ADD A NEW ORDER
// ----------------------
// Push a new entry into the `orders` array. Any order the client creates via
// the site is also auto-saved to the browser's localStorage under the key
// `durable-orders`, and the tracking page checks BOTH sources — so newly
// placed orders are trackable immediately without editing this file.
// ============================================================================

export type OrderStatus =
  | "received"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

export type Order = {
  id: string;
  productName: string;
  address: string;
  estimatedDelivery: string;
  status: OrderStatus;
  createdAt: string;
};

export const ORDER_STAGES: { key: OrderStatus; label: string; description: string }[] = [
  { key: "received", label: "Order Received", description: "We have received your order and are confirming details." },
  { key: "confirmed", label: "Order Confirmed", description: "Your order has been confirmed and is being prepared." },
  { key: "preparing", label: "Being Prepared", description: "Your furniture is being quality checked and packaged." },
  { key: "out_for_delivery", label: "Out for Delivery", description: "Your order is on its way to you." },
  { key: "delivered", label: "Delivered", description: "Your order has been successfully delivered." },
];

// Manually managed sample orders — edit `status` to move them along the pipeline.
export const orders: Order[] = [
  {
    id: "DFH-DEMO01",
    productName: "Tan Velvet L-Shaped Sofa",
    address: "Kilimani, Nairobi",
    estimatedDelivery: "18 July 2026",
    status: "out_for_delivery",
    createdAt: "12 July 2026",
  },
  {
    id: "DFH-DEMO02",
    productName: "Emerald Chester Bed",
    address: "Kiambu Road, Kiambu",
    estimatedDelivery: "20 July 2026",
    status: "preparing",
    createdAt: "13 July 2026",
  },
];

// Random Order ID generator — format: DFH-XXXXXX (uppercase alphanumeric).
export const generateOrderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "DFH-";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};
