import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useReports, BullyingReport } from '../lib/store';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Users,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { reports, isLoading } = useReports();

  if (!user || isLoading) return <div className="flex items-center justify-center p-20">Memuat data...</div>;

  const userReports = user.role === 'siswa' 
    ? reports.filter(r => r.siswa_id === user.id)
    : reports;

  const stats = {
    total: userReports.length,
    pending: userReports.filter(r => r.status === 'diterima').length,
    processing: userReports.filter(r => r.status === 'diproses').length,
    completed: userReports.filter(r => r.status === 'selesai').length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Halo, {user.name}! 👋</h1>
          <p className="text-slate-500 mt-1">
            {user.role === 'siswa' 
              ? 'Pantau status laporanmu atau buat laporan baru.' 
              : 'Pantau dan tindak lanjuti laporan bullying di sekolah.'}
          </p>
        </div>
        {user.role === 'siswa' && (
          <Link to="/app/lapor" className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
            <Plus className="w-5 h-5" />
            Buat Laporan Baru
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Laporan', value: stats.total, icon: ShieldAlert, color: 'bg-brand-50 text-brand-600' },
          { label: 'Laporan Diterima', value: stats.pending, icon: Clock, color: 'bg-amber-50 text-amber-600' },
          { label: 'Sedang Diproses', value: stats.processing, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
          { label: 'Selesai', value: stats.completed, icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-500">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Reports */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Laporan Terbaru</h2>
            <Link to={user.role === 'siswa' ? "/app/riwayat" : "/app/laporan"} className="text-brand-600 font-bold text-sm hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {userReports.length > 0 ? (
              userReports.slice(0, 5).map((report) => (
                <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    report.status === 'diterima' ? 'bg-amber-50 text-amber-600' :
                    report.status === 'diproses' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 truncate">Kasus: {report.victim_name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        report.status === 'diterima' ? 'bg-amber-100 text-amber-700' :
                        report.status === 'diproses' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 truncate mt-0.5">{report.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-slate-400">{new Date(report.created_at).toLocaleDateString('id-ID')}</p>
                    <p className="text-xs text-slate-400 mt-1">{report.id}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-slate-300 w-8 h-8" />
                </div>
                <p className="text-slate-500 font-medium">Belum ada laporan yang dibuat.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-brand-600 rounded-[2rem] p-8 text-white shadow-xl shadow-brand-200">
            <h3 className="text-xl font-bold mb-4">Butuh Bantuan Segera?</h3>
            <p className="text-brand-100 text-sm leading-relaxed mb-6">
              Jika kamu merasa dalam bahaya fisik segera, hubungi petugas keamanan sekolah atau guru terdekat.
            </p>
            <button className="w-full bg-white text-brand-600 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors">
              Hubungi Guru BK
            </button>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tips Keamanan</h3>
            <ul className="space-y-4">
              {[
                'Gunakan fitur anonim jika merasa tidak nyaman.',
                'Sertakan bukti foto atau screenshot jika ada.',
                'Ceritakan kejadian secara detail dan jujur.'
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
