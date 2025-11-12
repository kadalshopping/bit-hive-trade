import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowDownToLine } from 'lucide-react';

interface PayoutRequestFormProps {
  userId: string;
  maxAmount: number;
  bankAccount?: string;
  bankIfsc?: string;
}

export const PayoutRequestForm = ({ 
  userId, 
  maxAmount,
  bankAccount,
  bankIfsc
}: PayoutRequestFormProps) => {
  const [amount, setAmount] = useState('');
  const [payoutType, setPayoutType] = useState<string>('monthly_return');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bankAccount || !bankIfsc) {
      toast.error('Please add your bank details first');
      return;
    }

    const requestedAmount = parseFloat(amount);
    if (isNaN(requestedAmount) || requestedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (requestedAmount > maxAmount) {
      toast.error(`Maximum available: ₹${maxAmount.toFixed(2)}`);
      return;
    }

    // Deduct 5% gas fee from the requested amount
    const gasFee = requestedAmount * 0.05;
    const netAmount = requestedAmount - gasFee;

    setSubmitting(true);

    const { error } = await supabase
      .from('payouts')
      .insert({
        user_id: userId,
        amount_inr: netAmount, // Store net amount after gas fee
        payout_type: payoutType,
        bank_account_number: bankAccount,
        bank_ifsc_code: bankIfsc,
        status: 'pending',
      });

    if (error) {
      toast.error('Failed to submit withdrawal request');
    } else {
      toast.success(`Withdrawal request submitted! You will receive ₹${netAmount.toFixed(2)} after 5% gas fee.`);
      setAmount('');
    }

    setSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDownToLine className="h-5 w-5" />
          Request Withdrawal
        </CardTitle>
        <CardDescription>
          Withdraw your earnings to your bank account • 5% gas fee applies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payout-type">Withdrawal Type</Label>
            <Select value={payoutType} onValueChange={setPayoutType}>
              <SelectTrigger id="payout-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly_return">Monthly Returns</SelectItem>
                <SelectItem value="btc_profit">BTC Profit</SelectItem>
                <SelectItem value="principal">Principal Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (INR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="1"
              max={maxAmount}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Available: ₹{maxAmount.toFixed(2)}
            </p>
            {amount && parseFloat(amount) > 0 && (
              <div className="text-sm space-y-1 border-t pt-2 mt-2">
                <p className="text-muted-foreground">Gas Fee (5%): ₹{(parseFloat(amount) * 0.05).toFixed(2)}</p>
                <p className="font-semibold text-foreground">You will receive: ₹{(parseFloat(amount) * 0.95).toFixed(2)}</p>
              </div>
            )}
          </div>

          {(!bankAccount || !bankIfsc) && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <p className="text-xs text-warning-foreground">
                ⚠️ Please add your bank details in the Bank tab before requesting withdrawal
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={submitting || !bankAccount || !bankIfsc}
          >
            {submitting ? 'Submitting...' : 'Request Withdrawal'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Withdrawal requests require admin approval
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
