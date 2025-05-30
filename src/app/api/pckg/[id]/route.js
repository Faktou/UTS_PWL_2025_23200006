import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    const { id } = params;
    const { kode, nama, deskripsi, status } = await request.json();

    if (!kode || !nama || !deskripsi || !status) {
        return new Response(JSON.stringify({ error: 'Field kosong' }), { status: 400 });
    }

    try {
        const pckg = await prisma.pckg.update({
            where: { id: Number(id) },
            data: { kode, nama, deskripsi, status },
        });

        const formattedPckg = {
            id: pckg.id,
            kode: pckg.kode,
            nama: pckg.nama,
            deskripsi: pckg.deskripsi,
            status: pckg.status
        };

        return new Response(JSON.stringify(formattedPckg), { status: 200 });

    } catch (error) {
        console.error("Update Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    
    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });

    const deletedPckg = await prisma.pckg.delete({
        where: { id: Number(id) },
    });
    
    return new Response(JSON.stringify({ message: "Berhasil dihapus" }), { status: 200 });
}