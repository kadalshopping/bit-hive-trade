import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Zap, Sparkles } from 'lucide-react';
import logo from '@/assets/micro-bitcoin-coin.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-[var(--shadow-elegant)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Micro Bitcoin" className="h-12 w-12 rounded-full object-cover shadow-[var(--shadow-glow)] ring-2 ring-primary/20" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Micro Bitcoin</h1>
          </div>
          <Button onClick={() => navigate('/auth')} className="shadow-[var(--shadow-primary)]">Get Started</Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl animate-pulse" />
              <img 
                src={logo} 
                alt="Micro Bitcoin" 
                className="relative h-32 w-32 mx-auto rounded-full object-cover shadow-[var(--shadow-glow)] ring-4 ring-primary/30 transform transition-transform hover:scale-110 duration-500"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Micro Bitcoin Investment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Dual earnings: <span className="text-primary font-semibold">3% monthly returns</span> + <span className="text-accent font-semibold">BTC price profits</span>. Start with just ₹100.
            </p>
            <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" onClick={() => navigate('/auth')} className="shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
                <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
                Start Investing
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="border-2 hover:border-primary transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elegant)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <TrendingUp className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold">Dual Earnings</h3>
              <p className="text-muted-foreground">
                Earn 3% fixed monthly returns PLUS profit from Bitcoin price appreciation. Double your growth potential.
              </p>
            </div>

            <div className="group text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elegant)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <Shield className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold">Bank-Grade Security</h3>
              <p className="text-muted-foreground">
                Enterprise-level security with encrypted transactions, secure authentication, and admin-approved withdrawals.
              </p>
            </div>

            <div className="group text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elegant)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <Zap className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold">Instant Processing</h3>
              <p className="text-muted-foreground">
                Seamless payment gateway integration with real-time Bitcoin tracking and instant investment confirmations.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 shadow-[var(--shadow-elegant)] border border-primary/20">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ready to Start Earning?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join Micro Bitcoin today and start building wealth with dual earnings: guaranteed monthly returns plus Bitcoin growth potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card/50 border border-primary/20">
                  <span className="text-3xl font-bold text-primary">3%</span>
                  <span className="text-sm text-muted-foreground">Monthly<br/>Returns</span>
                </div>
                <div className="text-2xl font-bold text-muted-foreground">+</div>
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card/50 border border-accent/20">
                  <span className="text-3xl font-bold text-accent">BTC</span>
                  <span className="text-sm text-muted-foreground">Price<br/>Profits</span>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate('/auth')} className="shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 mt-6">
                Create Your Account
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-20 bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Micro Bitcoin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
