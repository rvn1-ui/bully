import { useState } from 'react';
import { useAuth, UserProfile, UserRole } from '../lib/auth';
import { 
  UserCog, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  ShieldCheck,
  UserPlus
} from 'lucide-react';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock users for demonstration
  const [users, setUsers] = useState<UserProfile[]>([
    { id: '1', email: 'admin@sekolah.sch.id', name: 'Admin Utama', role: 'admin' },
    { id: '2', email: 'guru.bk@sekolah.sch.id', name: 'Budi Santoso', role: 'guru_bk' },
    { id: '3', email: 'siswa1@sekolah.sch.id', name: 'Andi Pratama', role: 'siswa' },
  ]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">Kelola akses dan peran pengguna dalam sistem.</p>
        </div>
        <button className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
          <UserPlus className="w-5 h-5" />
          Tambah User Baru
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Nama</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                        {u.name[0].toUpperCase()}
                      </div>
                      <p className="font-bold text-slate-900">{u.name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-slate-500">{u.email}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      u.role === 'guru_bk' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-brand-600 transition-all border border-transparent hover:border-slate-100">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-600 transition-all border border-transparent hover:border-slate-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
