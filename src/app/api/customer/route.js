import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.customer.findMany({
      include: {
        preorders: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { nama, nomor, email } = await request.json();

    if (!nama || !nomor || !email) {
      return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newCustomer = await prisma.customer.create({
      data: { nama, nomor, email },
    });

    return new Response(JSON.stringify(newCustomer), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("POST /api/customer error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
