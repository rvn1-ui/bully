-- 1. Create Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'guru_bk', 'siswa')) DEFAULT 'siswa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create Reports Table
CREATE TABLE reports (
  id TEXT PRIMARY KEY DEFAULT 'REP-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 6)),
  reporter_name TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE NOT NULL,
  victim_name TEXT NOT NULL,
  perpetrator_name TEXT,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  evidence_url TEXT,
  status TEXT CHECK (status IN ('diterima', 'diproses', 'selesai')) DEFAULT 'diterima' NOT NULL,
  follow_up TEXT,
  siswa_id UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- 4. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5. Reports Policies
CREATE POLICY "Siswa can view own reports." ON reports
  FOR SELECT USING (auth.uid() = siswa_id OR (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'guru_bk'));

CREATE POLICY "Siswa can create reports." ON reports
  FOR INSERT WITH CHECK (auth.uid() = siswa_id);

CREATE POLICY "Guru BK and Admin can update reports." ON reports
  FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'guru_bk'));

-- 6. Trigger for New User Profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, split_part(new.email, '@', 1), 'siswa');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
