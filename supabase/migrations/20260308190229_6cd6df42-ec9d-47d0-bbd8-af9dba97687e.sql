
-- Events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date text NOT NULL,
  time text,
  location text NOT NULL,
  description text,
  is_upcoming boolean NOT NULL DEFAULT true,
  pre_register_open boolean NOT NULL DEFAULT false,
  stat text,
  cover_image_url text,
  gallery_urls text[] DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" ON public.events
  FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'));

-- Impact stories table
CREATE TABLE public.impact_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'Community Impact',
  image_url text,
  has_video boolean NOT NULL DEFAULT false,
  video_url text,
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.impact_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published stories" ON public.impact_stories
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage stories" ON public.impact_stories
  FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'));

-- Impact stats table
CREATE TABLE public.impact_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  suffix text DEFAULT '',
  icon text DEFAULT 'Users',
  display_order int NOT NULL DEFAULT 0,
  section text NOT NULL DEFAULT 'hero',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stats" ON public.impact_stats
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage stats" ON public.impact_stats
  FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'));

-- Donation records table
CREATE TABLE public.donation_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'NGN',
  donation_type text NOT NULL DEFAULT 'one-time',
  notes text,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.donation_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage donations" ON public.donation_records
  FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'));

-- Storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true);

CREATE POLICY "Anyone can view uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admins can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'admin-uploads' 
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'))
  );

CREATE POLICY "Admins can delete uploads" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'admin-uploads' 
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'superadmin'))
  );

-- Superadmin function
CREATE OR REPLACE FUNCTION public.is_superadmin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'superadmin'
  )
$$;

-- Superadmin can manage user_roles
CREATE POLICY "Superadmin can manage roles" ON public.user_roles
  FOR ALL USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));
