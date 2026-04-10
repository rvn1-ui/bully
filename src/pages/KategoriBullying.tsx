import { useState } from 'react';
import { Tags, Plus, Search, Trash2, Edit2, AlertCircle } from 'lucide-react';

export default function KategoriBullying() {
  const [kategori, setKategori] = useState([
    { id: '1', name: 'Bullying Fisik', desc: 'Tindakan memukul, menendang, atau merusak barang.' },
    { id: '2', name: 'Bullying Verbal', desc: 'Mengejek, menghina, atau mengancam secara lisan.' },
    { id: '3', name: 'Cyber Bullying', desc: 'Bullying melalui media sosial atau platform digital.' },
    { id: '4', name: 'Bullying Relasional', desc: 'Mengucilkan atau menyebarkan rumor negatif.' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Kategori Bullying</h1>
          <p className="text-slate-500 mt-1">Atur kategori tindakan bullying untuk klasifikasi laporan.</p>
        </div>
        <button className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
          <Plus className="w-5 h-5" />
          Tambah Kategori
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {kategori.map((k) => (
          <div key={k.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-brand-50 p-3 rounded-2xl text-brand-600">
                <Tags className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-brand-600 transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-red-600 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{k.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{k.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex gap-4">
        <AlertCircle className="text-amber-600 w-6 h-6 flex-shrink-0" />
        <div>
          <p className="font-bold text-amber-900">Penting</p>
          <p className="text-sm text-amber-700 mt-1">
            Kategori ini akan muncul sebagai pilihan saat siswa membuat laporan. Pastikan deskripsi jelas agar siswa tidak bingung memilih kategori yang sesuai.
          </p>
        </div>
      </div>
    </div>
  );
}
