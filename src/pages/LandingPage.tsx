import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 p-2 rounded-lg">
            <ShieldAlert className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">StopBully</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
            Masuk
          </Link>
          <Link to="/login" className="bg-brand-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
            Mulai Lapor
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Ciptakan Sekolah <span className="text-brand-600">Aman</span> Tanpa Bullying.
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
            Platform pelaporan tindakan bullying yang aman, rahasia, dan cepat. Suaramu adalah langkah awal untuk perubahan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login" className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 flex items-center gap-2 group">
              Buat Laporan Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 px-6 py-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/student${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white" alt="Student" referrerPolicy="no-referrer" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">Dipercaya oleh 500+ Siswa</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-brand-100 rounded-[3rem] blur-2xl opacity-50 -z-10 animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/school-safety/800/600" 
            alt="School Safety" 
            className="rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Laporan Terenkripsi</p>
              <p className="text-xs text-slate-500">Privasimu adalah prioritas kami</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Menggunakan StopBully?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Kami menyediakan sistem yang dirancang khusus untuk menangani kasus bullying dengan integritas tinggi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "100% Rahasia", desc: "Identitas pelapor dilindungi sepenuhnya. Kamu bisa memilih untuk tetap anonim." },
              { icon: Users, title: "Penanganan Profesional", desc: "Laporan langsung ditangani oleh Guru BK dan Admin sekolah yang berpengalaman." },
              { icon: ShieldAlert, title: "Respon Cepat", desc: "Sistem notifikasi real-time memastikan setiap laporan segera ditindaklanjuti." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="bg-brand-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <f.icon className="text-brand-600 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
