
CREATE TABLE public.research_publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  publisher text NOT NULL,
  url text NOT NULL,
  description text,
  cover_image_url text,
  display_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.research_publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published publications"
  ON public.research_publications FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage publications"
  ON public.research_publications FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'))
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Seed the initial 3 journals
INSERT INTO public.research_publications (title, publisher, url, display_order) VALUES
('Predictors of late diagnosis of prostate cancer in sub-Saharan Africa: Opportunities to improve outcomes', 'Cancer Epidemiology, Biomarkers & Prevention', 'https://doi.org/10.1158/1538-7755.DISP25-C130', 1),
('Prostate cancer screening uptake and predictors of elevated prostate-specific antigen levels in Southwestern Nigeria.', 'Journal of Clinical Oncology', 'https://doi.org/10.1200/JCO.2026.44.7_suppl.403', 2),
('Community-Based Assessment of Lower Urinary Tract Symptoms and Risk Factors in a Nigerian Cohort', 'Science World Journal', 'https://scienceworldjournal.org/article/view/24502', 3);
