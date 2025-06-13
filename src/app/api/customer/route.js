// app/api/customers/route.js
import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.customer.findMany({ orderBy: { id: 'asc' } });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  const { nama, nomor, email } = await request.json();

  if (!nama || !nomor || !email) {
    return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), { status: 400 });
  }

  const newCustomer = await prisma.customer.create({ data: { nama, nomor, email } });

  return new Response(JSON.stringify(newCustomer), { status: 201 });
}
