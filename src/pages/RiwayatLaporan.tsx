import { useReports } from '../lib/store';
import { useAuth } from '../lib/auth';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RiwayatLaporan() {
  const { reports, isLoading } = useReports();
  const { user } = useAuth();

  const userReports = reports.filter(r => r.siswa_id === user?.id);

  if (isLoading) return <div className="flex items-center justify-center p-20">Memuat data...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Riwayat Laporan</h1>
        <p className="text-slate-500 mt-1">Pantau status dan perkembangan laporan yang telah kamu kirim.</p>
      </div>

      <div className="grid gap-6">
        {userReports.length > 0 ? (
          userReports.map((report) => (
            <div key={report.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 ${
                    report.status === 'diterima' ? 'bg-amber-50 text-amber-600' :
                    report.status === 'diproses' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-slate-400 text-sm">{report.id}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        report.status === 'diterima' ? 'bg-amber-100 text-amber-700' :
                        report.status === 'diproses' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {report.status}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(report.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Kasus: {report.victim_name}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 max-w-2xl">{report.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Lokasi</p>
                    <p className="text-sm font-bold text-slate-700">{report.location}</p>
                  </div>
                  <button className="bg-slate-50 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-600 hover:text-white transition-all flex items-center gap-2 group/btn">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {report.follow_up && (
                <div className="mt-8 p-6 bg-brand-50 rounded-2xl border border-brand-100 flex gap-4">
                  <div className="bg-brand-600 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-600 uppercase tracking-widest mb-1">Tindak Lanjut Guru BK</p>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{report.follow_up}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-20 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="text-slate-200 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Belum Ada Laporan</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Kamu belum pernah mengirimkan laporan bullying. Jika kamu melihat atau mengalami bullying, jangan ragu untuk melapor.</p>
            <Link to="/app/lapor" className="inline-flex bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-200">
              Buat Laporan Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
