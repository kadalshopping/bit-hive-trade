-- Create settings table for platform configuration
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text NOT NULL,
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage settings
CREATE POLICY "Admins can manage settings"
ON public.platform_settings
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default BTC deposit address
INSERT INTO public.platform_settings (setting_key, setting_value)
VALUES ('btc_deposit_address', 'bc1qgdlskr39px7gxha9lg5jr7tgzmkhetl9cyc28m')
ON CONFLICT (setting_key) DO NOTHING;

-- Update investments table to use 31 days for next return calculation
-- No schema change needed, just documentation that calculations should use 31 days