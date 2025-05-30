-- CreateTable
SELECT preorder.*, pckg.nama as package_name 
FROM preorder 
JOIN pckg ON preorder.selected_package = pckg.id;

CREATE TABLE "preorder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_date" DATETIME NOT NULL,
    "order_by" TEXT NOT NULL,
    "selected_package" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "is_paid" BOOLEAN NOT NULL
);

CREATE TABLE "pckg" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL
);

CREATE TABLE "customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
