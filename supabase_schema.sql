-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  role text DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  points integer DEFAULT 0,
  tier text DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create Policies for Profiles
CREATE POLICY "Allow read profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

CREATE POLICY "Allow insert profiles" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

CREATE POLICY "Allow update profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create Policies for Products
CREATE POLICY "Allow select products for all" ON public.products
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admin to manage products" ON public.products
  FOR ALL TO authenticated
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  total_original numeric NOT NULL,
  total_discount numeric NOT NULL DEFAULT 0,
  total_final numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create Policies for Orders
CREATE POLICY "Allow select orders" ON public.orders
  FOR SELECT TO authenticated
  USING (customer_id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

CREATE POLICY "Allow insert orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (customer_id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

CREATE POLICY "Allow admin to update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

CREATE POLICY "Allow admin to delete orders" ON public.orders
  FOR DELETE TO authenticated
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Sync profiles trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, points, tier)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New Member'),
    COALESCE(new.raw_user_meta_data->>'role', 'member'),
    0,
    'Bronze'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger check to prevent multiple triggers if already exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
