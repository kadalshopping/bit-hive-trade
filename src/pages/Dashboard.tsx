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
import { Bitcoin, TrendingUp, History, LogOut } from 'lucide-react';
import { useBtcPrice } from '@/hooks/useBtcPrice';

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
  const [investAmount, setInvestAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { usd: currentBtcPrice, inr: btcPriceInr, loading: priceLoading } = useBtcPrice();

  const microBtcPriceInr = btcPriceInr / 1000000; // 1 micro BTC = 1/1,000,000 BTC

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadInvestments();
      loadTransactions();
    }
  }, [user]);

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
    
    const amount = parseFloat(investAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setSubmitting(true);

    const btcAmount = amount / currentBtcPrice;

    // Create investment
    const { error: investError } = await supabase
      .from('investments')
      .insert({
        user_id: user?.id,
        amount_usd: amount,
        btc_amount: btcAmount,
        btc_price_at_purchase: currentBtcPrice,
        status: 'active',
      });

    if (investError) {
      toast.error('Failed to create investment');
      setSubmitting(false);
      return;
    }

    // Create transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: user?.id,
        type: 'buy',
        amount_usd: amount,
        btc_amount: btcAmount,
        btc_price: currentBtcPrice,
        status: 'completed',
      });

    if (txError) {
      toast.error('Failed to record transaction');
    } else {
      toast.success('Investment successful!');
      setInvestAmount('');
      loadInvestments();
      loadTransactions();
    }

    setSubmitting(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const totalInvested = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + Number(inv.amount_usd), 0);

  const totalBtc = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + Number(inv.btc_amount), 0);

  const currentValue = totalBtc * currentBtcPrice;
  const profitLoss = currentValue - totalInvested;
  const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

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
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">BitInvest</h1>
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
          <p className="text-muted-foreground">Manage your Bitcoin investments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvested.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{totalBtc.toFixed(8)} BTC</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <Bitcoin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">BTC: ${currentBtcPrice.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">µBTC: ₹{microBtcPriceInr.toFixed(4)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
              <TrendingUp className={`h-4 w-4 ${profitLoss >= 0 ? 'text-success' : 'text-destructive'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)}
              </div>
              <p className={`text-xs ${profitLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                {profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Make Investment</CardTitle>
              <CardDescription>Buy Bitcoin with USD</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="100.00"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    required
                  />
                  {investAmount && (
                    <p className="text-sm text-muted-foreground">
                      ≈ {(parseFloat(investAmount) / currentBtcPrice).toFixed(8)} BTC
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Processing...' : 'Invest Now'}
                </Button>
              </form>
            </CardContent>
          </Card>

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
                        <p className="font-medium">${Number(tx.amount_usd).toFixed(2)}</p>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
