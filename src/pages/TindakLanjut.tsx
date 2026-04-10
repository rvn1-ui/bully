import { useReports, ReportStatus } from '../lib/store';
import { 
  ClipboardList, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

export default function TindakLanjut() {
  const { reports, updateReportStatus } = useReports();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [followUpText, setFollowUpText] = useState('');

  const reportsToProcess = reports.filter(r => r.status === 'diterima' || r.status === 'diproses');
  const selectedReport = reports.find(r => r.id === selectedReportId);

  const handleUpdate = async () => {
    if (!selectedReportId || !followUpText) return;
    try {
      await updateReportStatus(selectedReportId, 'diproses', followUpText);
      setFollowUpText('');
      alert('Tindak lanjut berhasil disimpan!');
    } catch (err) {
      alert('Gagal menyimpan tindak lanjut.');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await updateReportStatus(id, 'selesai');
      alert('Laporan ditandai sebagai selesai.');
    } catch (err) {
      alert('Gagal memperbarui status.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Tindak Lanjut Laporan</h1>
        <p className="text-slate-500 mt-1">Berikan respon dan tindak lanjut untuk setiap laporan yang masuk.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* List Laporan */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Laporan Menunggu Respon</h2>
          {reportsToProcess.length > 0 ? (
            reportsToProcess.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedReportId(r.id)}
                className={`w-full text-left p-6 rounded-[2rem] border transition-all ${
                  selectedReportId === r.id 
                    ? 'bg-white border-brand-600 shadow-xl shadow-brand-100 ring-2 ring-brand-600/10' 
                    : 'bg-white border-slate-100 shadow-sm hover:border-brand-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-slate-400 text-xs">{r.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    r.status === 'diterima' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Korban: {r.victim_name}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{r.description}</p>
              </button>
            ))
          ) : (
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center">
              <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Semua laporan telah ditindaklanjuti!</p>
            </div>
          )}
        </div>

        {/* Form Respon */}
        <div className="space-y-6">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Detail & Respon</h2>
          {selectedReport ? (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Kronologi Kejadian</p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedReport.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Tulis Tindak Lanjut *</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                  <textarea
                    rows={6}
                    value={followUpText}
                    onChange={(e) => setFollowUpText(e.target.value)}
                    placeholder="Tuliskan langkah-langkah penanganan yang akan atau telah dilakukan..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-brand-600 text-white py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 flex items-center justify-center gap-2"
                >
                  Simpan Respon
                  <Send className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleComplete(selectedReport.id)}
                  className="px-6 bg-green-50 text-green-600 rounded-2xl font-bold hover:bg-green-100 transition-all border border-green-100"
                >
                  Selesaikan
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 p-20 text-center">
              <ClipboardList className="text-slate-300 w-12 h-12 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">Pilih laporan di sebelah kiri untuk memberikan tindak lanjut.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
