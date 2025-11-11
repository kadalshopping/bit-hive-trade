import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const DepositAddress = () => {
  const [btcAddress, setBtcAddress] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    loadDepositAddress();
  }, []);

  const loadDepositAddress = async () => {
    const { data, error } = await supabase
      .from('platform_settings')
      .select('setting_value')
      .eq('setting_key', 'btc_deposit_address')
      .single();

    if (!error && data) {
      setBtcAddress(data.setting_value);
      // Generate QR code URL using QR Server API
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${data.setting_value}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(btcAddress);
    toast.success('Address copied to clipboard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Deposit Bitcoin
        </CardTitle>
        <CardDescription>
          Send BTC to this address to fund your investment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {qrCodeUrl && (
            <img 
              src={qrCodeUrl} 
              alt="Bitcoin deposit QR code" 
              className="border-4 border-primary/20 rounded-lg"
            />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">BTC Deposit Address</p>
          <div className="flex gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded-md text-sm break-all">
              {btcAddress || 'Loading...'}
            </code>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyToClipboard}
              disabled={!btcAddress}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-accent-foreground">Important Notes:</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Only send Bitcoin (BTC) to this address</li>
            <li>Deposits will be credited after 1 confirmation</li>
            <li>Minimum deposit: ₹100 equivalent in BTC</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
