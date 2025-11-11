import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowDownToLine } from 'lucide-react';

interface Payout {
  id: string;
  amount_inr: number;
  payout_type: string;
  status: string;
  created_at: string;
  bank_account_number: string;
}

interface WithdrawalRequestsProps {
  userId: string;
}

export const WithdrawalRequests = ({ userId }: WithdrawalRequestsProps) => {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayouts();
  }, [userId]);

  const loadPayouts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('payouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load withdrawal requests');
    } else {
      setPayouts(data || []);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDownToLine className="h-5 w-5" />
          Withdrawal History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payouts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No withdrawal requests yet</p>
        ) : (
          <div className="space-y-3">
            {payouts.map((payout) => (
              <div 
                key={payout.id} 
                className="flex justify-between items-center py-3 border-b last:border-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">₹{Number(payout.amount_inr).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(payout.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Type: {payout.payout_type}
                  </p>
                </div>
                <Badge className={getStatusColor(payout.status)}>
                  {payout.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
