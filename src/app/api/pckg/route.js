import prisma from "@/lib/prisma";

export async function GET() {
    const data = await prisma.pckg.findMany({
        orderBy: { id: 'asc' },
    });

    const formattedData = data.map((item) => ({
        id: item.id,
        kode: item.kode,
        nama: item.nama,
        deskripsi: item.deskripsi
    }));

    return new Response(JSON.stringify(formattedData), { status: 200 });
}


export async function POST(request) {
    const { kode, nama, deskripsi, } = await request.json();

    if (!kode || !nama || !deskripsi ) {
        return new Response(JSON.stringify ({ error: 'Semua field wajib diisi' }), {
            status: 400,
        });
    }

    const pckg = await prisma.pckg.create({
        data: { kode, nama, deskripsi },
    });

    return new Response(JSON.stringify(pckg), { status: 201 });
}
