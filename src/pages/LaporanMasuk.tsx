import { useReports, ReportStatus } from '../lib/store';
import { useAuth } from '../lib/auth';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react';
import { useState } from 'react';

export default function LaporanMasuk() {
  const { reports, updateReportStatus } = useReports();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.victim_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: ReportStatus) => {
    try {
      await updateReportStatus(id, status);
    } catch (err) {
      alert('Gagal memperbarui status.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Laporan Bullying</h1>
        <p className="text-slate-500 mt-1">Kelola dan tindak lanjuti laporan yang masuk dari siswa.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama korban atau ID laporan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-white p-1 border border-slate-200 rounded-2xl">
          {(['all', 'diterima', 'diproses', 'selesai'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === s 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">ID Laporan</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Korban</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Pelapor</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="font-mono font-bold text-slate-400 text-sm">{report.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900">{report.victim_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{report.location}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-medium text-slate-700">
                      {report.is_anonymous ? 'Anonim' : report.reporter_name}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-slate-500">{new Date(report.created_at).toLocaleDateString('id-ID')}</p>
                  </td>
                  <td className="px-8 py-6">
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value as ReportStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer ${
                        report.status === 'diterima' ? 'bg-amber-100 text-amber-700' :
                        report.status === 'diproses' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}
                    >
                      <option value="diterima">DITERIMA</option>
                      <option value="diproses">DIPROSES</option>
                      <option value="selesai">SELESAI</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-brand-600 transition-all border border-transparent hover:border-slate-100 hover:shadow-sm">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldAlert className="text-slate-300 w-8 h-8" />
                    </div>
                    <p className="text-slate-500 font-medium">Tidak ada laporan yang ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
