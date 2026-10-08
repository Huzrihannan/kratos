-- Supabase Migration: Create leads table for Krat.OS Software Solutions
-- Generated for Prompt 5 Project Estimator & Contact Forms

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    source TEXT NOT NULL DEFAULT 'estimator', -- 'estimator' | 'contact'
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT,
    needs TEXT[] DEFAULT '{}',
    timeline TEXT,
    budget TEXT,
    message TEXT,
    link TEXT,
    estimate_min NUMERIC,
    estimate_max NUMERIC,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    page_url TEXT,
    referrer TEXT,
    ip_address TEXT,
    user_agent TEXT,
    status TEXT DEFAULT 'new' -- 'new' | 'contacted' | 'converted' | 'archived'
);

-- Indexes for querying by date, email, and source
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads (source);

-- Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow insert via service role key or anon submissions
CREATE POLICY "Allow public insert to leads table"
ON public.leads
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- Only service role can read lead submissions
CREATE POLICY "Allow service role read access"
ON public.leads
FOR SELECT
TO service_role
USING (true);
