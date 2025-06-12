"use client";
import styles from './CustomerPage.module.css';
import { useEffect, useState } from 'react';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [nama, setNama] = useState('');
  const [nomor, setNomor] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/customer');
      const text = await res.text();

      if (!res.ok) {
        console.error('Fetch failed:', text);
        return;
      }

      const data = text ? JSON.parse(text) : [];
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        console.error("Response is not an array:", data);
        setCustomers([]);
      }
    } catch (error) {
      console.error('Unexpected fetch error:', error);
      setCustomers([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/customer/${editId}` : '/api/customer';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, nomor, email }),
      });

      if (res.ok) {
        setMsg('Berhasil disimpan!');
        setNama('');
        setNomor('');
        setEmail('');
        setEditId(null);
        setFormVisible(false);
        fetchCustomers();
      } else {
        const errorMsg = await res.text();
        console.error("Save failed:", errorMsg);
        setMsg('Gagal menyimpan data');
      }
    } catch (error) {
      console.error('Unexpected submit error:', error);
      setMsg('Terjadi kesalahan');
    }
  };

  const handleEdit = (item) => {
    setNama(item.nama);
    setNomor(item.nomor);
    setEmail(item.email);
    setEditId(item.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus data ini?')) return;

    try {
      const res = await fetch(`/api/customer/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCustomers();
      } else {
        console.error("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Data Customer</h1>
      <button className={styles.buttonToggle} onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Tutup Form' : 'Tambah Customer'}
      </button>

      {formVisible && (
        <div className={styles.formWrapper}>
          <h3>Input Data Customer</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <span>Nama</span>
              <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <span>Nomor</span>
              <input type="text" value={nomor} onChange={(e) => setNomor(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Simpan</button>
            <p>{msg}</p>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Nomor</th>
              <th>Email</th>
              <th>Tanggal Daftar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.nomor}</td>
                  <td>{item.email}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Belum ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
