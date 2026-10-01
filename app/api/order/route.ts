import { NextResponse } from "next/server";
import { pushRecord } from "@/lib/storage";
import { formatKES, WHATSAPP_NUMBER } from "@/lib/products";

export const dynamic = "force-dynamic";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

interface OrderPayload {
  customer: { name: string; phone: string; address: string; notes?: string };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

function buildWhatsAppMessage(orderId: string, order: OrderPayload): string {
  const lines = [
    `🧵 *NEW ORDER — Threads by Zuri*`,
    `Order: *${orderId}*`,
    ``,
    `👤 ${order.customer.name}`,
    `📱 ${order.customer.phone} (M-Pesa)`,
    `📍 ${order.customer.address}`,
    order.customer.notes?.trim() ? `📝 ${order.customer.notes}` : null,
    ``,
    `🛍 *Items*`,
    ...order.items.map(
      (i) => `• ${i.name} (${i.size} / ${i.color}) ×${i.quantity} — ${formatKES(i.price * i.quantity)}`
    ),
    ``,
    `Subtotal: ${formatKES(order.subtotal)}`,
    `Delivery: ${order.deliveryFee === 0 ? "FREE" : formatKES(order.deliveryFee)}`,
    `*Total: ${formatKES(order.total)}*`,
  ].filter((l) => l !== null) as string[];
  return lines.join("\n");
}

/**
 * POST /api/order
 * Saves the order (Vercel KV when configured, in-memory locally) and returns
 * a WhatsApp click-to-chat URL that delivers the order summary to the store
 * line (+254112272061). Note: WhatsApp cannot be messaged server-side without
 * the paid WhatsApp Business API, so the notification is sent via the
 * customer's one-tap click-to-chat link — the standard approach for
 * M-Pesa/WhatsApp commerce in Kenya.
 */
export async function POST(request: Request) {
  try {
    const order = (await request.json()) as OrderPayload;

    // Validation
    if (!order?.customer?.name?.trim() || !order?.customer?.phone?.trim() || !order?.customer?.address?.trim()) {
      return NextResponse.json({ error: "Name, phone and delivery address are required." }, { status: 400 });
    }
    if (!Array.isArray(order.items) || order.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }
    if (!/^(\+?254|0)?(7|1)\d{8}$/.test(order.customer.phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Please enter a valid Kenyan (M-Pesa) phone number." }, { status: 400 });
    }

    const orderId = `ZURI-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
    const record = {
      orderId,
      ...order,
      status: "pending-confirmation",
      createdAt: new Date().toISOString(),
    };

    await pushRecord("zuri:orders", record);

    const message = buildWhatsAppMessage(orderId, order);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ ok: true, orderId, whatsappUrl });
  } catch {
    return NextResponse.json({ error: "Could not place the order. Please try again." }, { status: 500 });
  }
}
