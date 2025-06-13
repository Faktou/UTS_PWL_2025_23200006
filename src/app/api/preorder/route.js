import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.preorder.findMany({
      include: { customer: true },
      orderBy: { id: 'asc' },
    });

    const formattedData = data.map((item) => ({
      id: item.id,
      order_date: item.order_date.toISOString().split('T')[0],
      customer_name: item.customer?.nama || "Tidak diketahui",
      selected_package: item.selected_package,
      qty: item.qty,
      status: item.is_paid ? "Lunas" : "Belum Lunas",
      customerId: item.customerId,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('GET /api/preorder error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

