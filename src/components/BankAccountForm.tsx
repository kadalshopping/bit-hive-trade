import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Landmark } from 'lucide-react';

interface BankAccountFormProps {
  userId: string;
}

export const BankAccountForm = ({ userId }: BankAccountFormProps) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadBankDetails();
  }, [userId]);

  const loadBankDetails = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('bank_account_number, bank_ifsc_code, bank_account_holder_name')
      .eq('id', userId)
      .single();

    if (error) {
      toast.error('Failed to load bank details');
    } else if (data) {
      setAccountNumber(data.bank_account_number || '');
      setIfscCode(data.bank_ifsc_code || '');
      setAccountHolderName(data.bank_account_holder_name || '');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        bank_account_number: accountNumber,
        bank_ifsc_code: ifscCode,
        bank_account_holder_name: accountHolderName,
      })
      .eq('id', userId);

    if (error) {
      toast.error('Failed to update bank details');
    } else {
      toast.success('Bank details updated successfully');
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Landmark className="h-5 w-5" />
          Bank Account Details
        </CardTitle>
        <CardDescription>For receiving monthly returns and profits</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input
              id="accountHolderName"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Bank Details'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
