
DROP POLICY "Admins can manage posts" ON public.blog_posts;

CREATE POLICY "Admins can manage posts" ON public.blog_posts
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR is_superadmin(auth.uid()))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR is_superadmin(auth.uid()));
