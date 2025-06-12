import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    const { id } = params;
    const { nama, nomor, email } = await request.json();

    if (!nama || !nomor || !email) {
        return new Response(JSON.stringify({ error: 'Field kosong' }), { status: 400 });
    }

    const updatedCustomer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { nama, nomor, email },
    });

    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params;

    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });

    await prisma.customer.delete({
        where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: "Berhasil dihapus" }), { status: 200 });
}
