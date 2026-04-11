-- ========================================================
-- InvestPlan — Supabase Database Schema
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ========================================================

-- 1. Tabel Profiles (extend dari auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  virtual_balance NUMERIC NOT NULL DEFAULT 1000000000000,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auto-create profile saat user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, virtual_balance)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NULL,
    1000000000000
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Tabel Portfolio (aset yang dimiliki user)
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  jumlah INTEGER NOT NULL DEFAULT 0,
  harga_beli NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own portfolio"
  ON public.portfolio FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio"
  ON public.portfolio FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON public.portfolio FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio"
  ON public.portfolio FOR DELETE
  USING (auth.uid() = user_id);

-- 3. Tabel Transactions (riwayat beli/jual)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama_aset TEXT NOT NULL,
  jenis TEXT CHECK (jenis IN ('Beli', 'Jual')) NOT NULL,
  harga_per_unit NUMERIC NOT NULL,
  jumlah INTEGER NOT NULL,
  total_nilai NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Tabel modul_progress (progress modul belajar)
CREATE TABLE IF NOT EXISTS public.modul_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  modul_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, modul_id)
);

ALTER TABLE public.modul_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own modul progress"
  ON public.modul_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own modul progress"
  ON public.modul_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
