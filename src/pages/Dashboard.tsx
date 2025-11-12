import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth';
import { Bitcoin, TrendingUp, History, LogOut, Wallet } from 'lucide-react';
import { useBtcPrice } from '@/hooks/useBtcPrice';
import { BankAccountForm } from '@/components/BankAccountForm';
import { EarningsCard } from '@/components/EarningsCard';
import { DepositAddress } from '@/components/DepositAddress';
import { WithdrawalRequests } from '@/components/WithdrawalRequests';
import { PayoutRequestForm } from '@/components/PayoutRequestForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import logo from '@/assets/micro-bitcoin-logo.jpg';

// Extend window type for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Investment {
  id: string;
  amount_usd: number;
  btc_amount: number;
  btc_price_at_purchase: number;
  status: string;
  created_at: string;
}

interface Transaction {
  id: string;
  type: string;
  amount_usd: number;
  btc_amount: number;
  btc_price: number;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investAmountInr, setInvestAmountInr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const { usd: currentBtcPrice, inr: btcPriceInr, loading: priceLoading } = useBtcPrice();

  const microBtcPriceInr = btcPriceInr / 1000000; // 1 micro BTC = 1/1,000,000 BTC
  const USD_TO_INR = 83.5; // Exchange rate

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadInvestments();
      loadTransactions();
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('bank_account_number, bank_ifsc_code')
      .eq('id', user?.id)
      .single();
    
    if (data) {
      setProfile(data);
    }
  };

  const loadInvestments = async () => {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load investments');
    } else {
      setInvestments(data || []);
    }
  };

  const loadTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      toast.error('Failed to load transactions');
    } else {
      setTransactions(data || []);
    }
  };

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountInr = parseFloat(investAmountInr);
    if (isNaN(amountInr) || amountInr < 100) {
      toast.error('Minimum investment is ₹100');
      return;
    }

    setSubmitting(true);

    try {
      // Add 5% gas fee to the investment amount
      const gasFee = amountInr * 0.05;
      const totalPayable = amountInr + gasFee;

      // Create Razorpay order with total payable amount
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { amount: totalPayable }
      });

      if (orderError || !orderData) {
        toast.error('Failed to initiate payment');
        setSubmitting(false);
        return;
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Micro Bitcoin',
          description: 'Bitcoin Investment',
          order_id: orderData.orderId,
          handler: async function (response: any) {
            // Payment successful - create investment
            const amountUsd = amountInr / USD_TO_INR;
            const btcAmount = amountUsd / currentBtcPrice;
            const nextReturnDate = new Date();
            nextReturnDate.setDate(nextReturnDate.getDate() + 31);

            const { error: investError } = await supabase
              .from('investments')
              .insert({
                user_id: user?.id,
                amount_usd: amountUsd,
                btc_amount: btcAmount,
                btc_price_at_purchase: currentBtcPrice,
                status: 'active',
                monthly_return_percent: 3.0,
                next_return_due_at: nextReturnDate.toISOString(),
              });

            if (investError) {
              toast.error('Investment created but failed to save');
              setSubmitting(false);
              return;
            }

            const { error: txError } = await supabase
              .from('transactions')
              .insert({
                user_id: user?.id,
                type: 'buy',
                amount_usd: amountUsd,
                btc_amount: btcAmount,
                btc_price: currentBtcPrice,
                status: 'completed',
              });

            if (txError) {
              toast.error('Failed to record transaction');
            } else {
              toast.success('Investment successful!');
              setInvestAmountInr('');
              loadInvestments();
              loadTransactions();
            }

            setSubmitting(false);
          },
          prefill: {
            email: user?.email,
          },
          theme: {
            color: '#F59E0B',
          },
          modal: {
            ondismiss: function() {
              setSubmitting(false);
              toast.error('Payment cancelled');
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway');
        setSubmitting(false);
      };

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed');
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const totalInvestedUsd = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + Number(inv.amount_usd), 0);

  const totalInvestedInr = totalInvestedUsd * USD_TO_INR;

  const totalBtc = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + Number(inv.btc_amount), 0);

  const currentValueUsd = totalBtc * currentBtcPrice;
  const currentValueInr = currentValueUsd * USD_TO_INR;
  
  // Calculate BTC profit (from price appreciation)
  const btcProfitInr = currentValueInr - totalInvestedInr;
  
  // Calculate 3% monthly returns
  const monthlyReturnInr = totalInvestedInr * 0.03;
  
  // Total earnings = Monthly returns + BTC profit
  const totalEarningsInr = monthlyReturnInr + btcProfitInr;

  if (loading || priceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Bitcoin className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (userRole === 'admin') {
    navigate('/admin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Micro Bitcoin" className="h-12 w-12 rounded-full object-cover" />
            <h1 className="text-xl font-bold">Micro Bitcoin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-muted-foreground">Live BTC Price</p>
              <p className="text-sm font-semibold">${currentBtcPrice.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">1 µBTC = ₹{microBtcPriceInr.toFixed(4)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Earn 3% monthly + BTC price profits</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="invest">Invest</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{totalInvestedInr.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">{totalBtc.toFixed(8)} BTC</p>
              </CardContent>
            </Card>

            <EarningsCard 
              totalInvestedInr={totalInvestedInr}
              monthlyReturnInr={monthlyReturnInr}
              btcProfitInr={btcProfitInr}
              totalEarningsInr={totalEarningsInr}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No transactions yet</p>
                  ) : (
                    transactions.map((tx) => (
                      <div key={tx.id} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium capitalize">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(Number(tx.amount_usd) * USD_TO_INR).toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            {Number(tx.btc_amount).toFixed(8)} BTC
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposit">
            <DepositAddress />
          </TabsContent>

          <TabsContent value="invest">
            <Card>
              <CardHeader>
                <CardTitle>Make Investment</CardTitle>
                <CardDescription>Minimum ₹100 • Earn 3% monthly + BTC price profits • 5% gas fee applies</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (INR)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="1"
                      min="100"
                      placeholder="100"
                      value={investAmountInr}
                      onChange={(e) => setInvestAmountInr(e.target.value)}
                      required
                    />
                    {investAmountInr && parseFloat(investAmountInr) >= 100 && (
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          ≈ {(parseFloat(investAmountInr) / btcPriceInr).toFixed(8)} BTC
                        </p>
                        <p className="text-success font-medium">
                          Monthly Return: ₹{(parseFloat(investAmountInr) * 0.03).toFixed(2)}
                        </p>
                        <div className="border-t pt-2 mt-2">
                          <p className="text-muted-foreground">Gas Fee (5%): ₹{(parseFloat(investAmountInr) * 0.05).toFixed(2)}</p>
                          <p className="font-semibold text-foreground">Total Payable: ₹{(parseFloat(investAmountInr) * 1.05).toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Processing...' : 'Invest Now'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <div className="space-y-6">
              <PayoutRequestForm 
                userId={user?.id || ''} 
                maxAmount={totalEarningsInr}
                bankAccount={profile?.bank_account_number}
                bankIfsc={profile?.bank_ifsc_code}
              />
              <WithdrawalRequests userId={user?.id || ''} />
            </div>
          </TabsContent>

          <TabsContent value="bank">
            <BankAccountForm userId={user?.id || ''} />
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
};

export default Dashboard;
