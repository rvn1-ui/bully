import { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ShieldAlert, 
  Bell,
  ChevronRight,
  PlusCircle,
  History,
  ClipboardList,
  UserCog,
  Tags
} from 'lucide-react';
import { useAuth, UserRole } from '../lib/auth';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItem {
  icon: any;
  label: string;
  path: string;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  // Siswa
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app', roles: ['siswa', 'guru_bk', 'admin'] },
  { icon: PlusCircle, label: 'Buat Laporan', path: '/app/lapor', roles: ['siswa'] },
  { icon: History, label: 'Riwayat Laporan', path: '/app/riwayat', roles: ['siswa'] },
  
  // Guru BK
  { icon: FileText, label: 'Laporan Masuk', path: '/app/laporan', roles: ['guru_bk', 'admin'] },
  { icon: ClipboardList, label: 'Tindak Lanjut', path: '/app/tindak-lanjut', roles: ['guru_bk'] },
  { icon: History, label: 'Rekap Laporan', path: '/app/rekap', roles: ['guru_bk', 'admin'] },
  
  // Admin
  { icon: Users, label: 'Data Siswa', path: '/app/siswa', roles: ['admin'] },
  { icon: UserCog, label: 'User Management', path: '/app/users', roles: ['admin'] },
  { icon: Tags, label: 'Kategori Bullying', path: '/app/kategori', roles: ['admin'] },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) return null;

  const filteredItems = sidebarItems.filter(item => item.roles.includes(user.role));

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-brand-600 p-2 rounded-xl flex-shrink-0">
            <ShieldAlert className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl text-slate-900 tracking-tight">StopBully</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' 
                    : 'text-slate-500 hover:bg-brand-50 hover:text-brand-600'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'group-hover:text-brand-600'}`} />
                {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
                {isSidebarOpen && isActive && <ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className={`bg-slate-50 rounded-2xl p-4 flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold flex-shrink-0">
              {user.name[0].toUpperCase()}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-bottom border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-500"
          >
            <LayoutDashboard className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-brand-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-semibold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
