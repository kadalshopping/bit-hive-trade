import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bitcoin, TrendingUp, Shield, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">BitInvest</h1>
          </div>
          <Button onClick={() => navigate('/auth')}>Get Started</Button>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
              <Bitcoin className="h-16 w-16 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Micro Bitcoin Investment Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your Bitcoin investment journey with as little as you want. 
              Simple, secure, and transparent micro-investments for everyone.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth')} className="shadow-[var(--shadow-primary)]">
                Start Investing
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-[var(--shadow-card)]">
              <div className="inline-block p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Grow Your Wealth</h3>
              <p className="text-muted-foreground">
                Invest in Bitcoin with flexible amounts and watch your portfolio grow over time.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-[var(--shadow-card)]">
              <div className="inline-block p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Secure Platform</h3>
              <p className="text-muted-foreground">
                Bank-level security with encrypted transactions and secure authentication.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-[var(--shadow-card)]">
              <div className="inline-block p-3 rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Instant Transactions</h3>
              <p className="text-muted-foreground">
                Buy and track your Bitcoin investments instantly with real-time updates.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of investors building their Bitcoin portfolio
            </p>
            <Button size="lg" onClick={() => navigate('/auth')} className="shadow-[var(--shadow-primary)]">
              Create Your Account
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 BitInvest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
