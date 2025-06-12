export async function PUT(request, { params }) {
    const { id } = params;
    const { order_date, customerId, selected_package, qty, status } = await request.json();

    if (!order_date || !customerId || !selected_package || !qty || !status) {
        return new Response(JSON.stringify({ error: 'Field kosong' }), { status: 400 });
    }

    const is_paid = status === "Lunas";

    const preorder = await prisma.preorder.update({
        where: { id: Number(id) },
        data: {
            order_date: new Date(order_date).toISOString(),
            selected_package: Number(selected_package),
            qty: Number(qty),
            is_paid,
            customerId: Number(customerId),
        },
        include: { customer: true }
    });

    return new Response(JSON.stringify({
        id: preorder.id,
        order_date: preorder.order_date.toISOString().split('T')[0],
        customer_name: preorder.customer.nama,
        selected_package: preorder.selected_package,
        qty: preorder.qty,
        status: preorder.is_paid ? "Lunas" : "Belum Lunas",
        customerId: preorder.customerId
    }), { status: 200 });
}
