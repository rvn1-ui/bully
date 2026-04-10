import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { useReports } from '../lib/store';
import { 
  ShieldAlert, 
  User, 
  MapPin, 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LaporPage() {
  const { user } = useAuth();
  const { addReport } = useReports();
  const navigate = useNavigate();
  
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    victim_name: '',
    perpetrator_name: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    evidence_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.victim_name || !formData.location || !formData.description) {
      alert('Mohon isi field yang wajib (Nama Korban, Lokasi, Deskripsi)');
      return;
    }

    setIsSubmitting(true);
    try {
      await addReport({
        ...formData,
        is_anonymous: isAnonymous,
        reporter_name: isAnonymous ? undefined : user?.name,
        siswa_id: user?.id || '',
      });

      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/app/riwayat');
      }, 2000);
    } catch (err) {
      alert('Gagal mengirim laporan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-100 p-6 rounded-full mb-6"
        >
          <CheckCircle2 className="text-green-600 w-16 h-16" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Laporan Berhasil Terkirim!</h2>
        <p className="text-slate-500">Terima kasih telah melapor. Guru BK akan segera meninjau laporanmu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl text-slate-500 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Buat Laporan Bullying</h1>
          <p className="text-slate-500">Berikan informasi sedetail mungkin untuk membantu kami menindaklanjuti.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anonymous Toggle */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${isAnonymous ? 'bg-slate-900 text-white' : 'bg-brand-50 text-brand-600'}`}>
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Lapor Secara Anonim</p>
              <p className="text-xs text-slate-500">Identitasmu tidak akan terlihat oleh siapapun.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`w-14 h-8 rounded-full transition-all relative ${isAnonymous ? 'bg-brand-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isAnonymous ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Nama Korban *</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                <input
                  required
                  type="text"
                  value={formData.victim_name}
                  onChange={(e) => setFormData({...formData, victim_name: e.target.value})}
                  placeholder="Nama lengkap korban"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Nama Pelaku (Jika diketahui)</label>
              <div className="relative group">
                <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                <input
                  type="text"
                  value={formData.perpetrator_name}
                  onChange={(e) => setFormData({...formData, perpetrator_name: e.target.value})}
                  placeholder="Nama lengkap pelaku"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Lokasi Kejadian *</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                <input
                  required
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Contoh: Kantin, Kelas 10B"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Tanggal Kejadian *</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Deskripsi Kejadian *</label>
            <div className="relative group">
              <FileText className="absolute left-4 top-4 text-slate-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ceritakan kronologi kejadian secara detail..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Unggah Bukti (Opsional)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-brand-400 transition-colors cursor-pointer group">
              <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-50 transition-colors">
                <ImageIcon className="text-slate-400 w-6 h-6 group-hover:text-brand-600 transition-colors" />
              </div>
              <p className="text-sm font-bold text-slate-900">Klik untuk unggah foto atau screenshot</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl border border-amber-100">
          <AlertCircle className="text-amber-600 w-5 h-5 flex-shrink-0" />
          <p className="text-xs text-amber-700 font-medium">
            Pastikan data yang kamu masukkan benar. Laporan palsu dapat dikenakan sanksi disiplin sekolah.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
