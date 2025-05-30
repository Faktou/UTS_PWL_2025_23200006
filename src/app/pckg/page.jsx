"use client";
import styles from './PckgPage.module.css';
import { useEffect, useState } from 'react';

export default function PckgPage() {

    const[pckgs,setPckg] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [ kode, setKode ] = useState('');
    const [ nama, setNama ] = useState('');
    const [ deskripsi, setDeskripsi ]= useState('');
    const [ msg, setMsg ] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchPckgs = async () => {
    const res = await fetch('api/pckg');
    const data = await res.json();
    setPckg(data);
  };

  useEffect(() => {
    fetchPckgs();
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/pckg/${editId}` : '/api/pckg';
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kode, nama, deskripsi }),
    });

    if (res.ok) {
        setMsg('Berhasil disimpan!');
        setKode('');
        setNama('');
        setDeskripsi('');
        setEditId(null);
        setFormVisible(false);
        fetchPckgs();
    } else {
        setMsg('Gagal menyimpan data');
    }
};

const handleEdit = (item) => {
    setKode(item.kode);
    setNama(item.nama);
    setDeskripsi(item.deskripsi);
    setEditId(item.id);
    setFormVisible(true);
};



const handleDelete = async (id) => {
    if (!confirm('Yakin hapus data ini?')) return;

    await fetch(`/api/pckg/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });

    fetchPckgs();
};

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ayam Penyet Koh Alex</h1>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Tutup Form' : 'Tambah Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input Data Baru</h3>
                <form onSubmit={handleSubmit}>
            
                <div className={styles.formGroup}>
                    <span>kode</span>
                    <input
                        type="text"
                        value={kode}
                        onChange={(e) => setKode(e.target.value)}
                        placeholder="Masukkan kode"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Nama pesanan</span>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan Nama Pemesan"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>deskripsi</span>
                    <input
                        type="text"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Masukkan deskripsi produk"
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Simpan
                </button>
                <p>{msg}</p>
                </form>
            </div>
        )}

        <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {pckgs.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.deskripsi}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px'}}>Hapus</button>
                            </td>
                            
                        </tr>
                    ))}
                    {pckgs.length === 0 && (
                        <tr>
                            <td colSpan="7">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}