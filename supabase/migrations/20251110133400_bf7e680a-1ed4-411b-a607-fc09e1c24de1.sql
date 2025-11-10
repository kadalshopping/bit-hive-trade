-- Add bank account details to profiles
ALTER TABLE public.profiles 
ADD COLUMN bank_account_number TEXT,
ADD COLUMN bank_ifsc_code TEXT,
ADD COLUMN bank_account_holder_name TEXT;

-- Add monthly return tracking to investments
ALTER TABLE public.investments
ADD COLUMN monthly_return_percent NUMERIC DEFAULT 3.0,
ADD COLUMN total_fixed_returns_earned NUMERIC DEFAULT 0,
ADD COLUMN last_return_paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN next_return_due_at TIMESTAMP WITH TIME ZONE;

-- Create payouts table for tracking withdrawals
CREATE TABLE public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  investment_id UUID REFERENCES public.investments(id),
  amount_inr NUMERIC NOT NULL,
  payout_type TEXT NOT NULL CHECK (payout_type IN ('monthly_return', 'btc_profit', 'withdrawal')),
  bank_account_number TEXT NOT NULL,
  bank_ifsc_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

-- RLS policies for payouts
CREATE POLICY "Users can view own payouts"
ON public.payouts
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create own payouts"
ON public.payouts
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all payouts"
ON public.payouts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update payouts"
ON public.payouts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to calculate monthly returns
CREATE OR REPLACE FUNCTION public.calculate_monthly_return(investment_id UUID)
RETURNS NUMERIC
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  investment_amount NUMERIC;
  monthly_rate NUMERIC;
  return_amount NUMERIC;
BEGIN
  SELECT amount_usd * (SELECT inr FROM (VALUES (83.0)) AS rates(inr)), monthly_return_percent
  INTO investment_amount, monthly_rate
  FROM public.investments
  WHERE id = investment_id;
  
  return_amount := investment_amount * (monthly_rate / 100);
  RETURN return_amount;
END;
$$;