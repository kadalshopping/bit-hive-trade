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
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Micro Bitcoin" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover shadow-[var(--shadow-glow)] ring-2 ring-primary/20" />
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Micro Bitcoin</h1>
          </div>
          <Button onClick={() => navigate('/auth')} size="sm" className="shadow-[var(--shadow-primary)] sm:h-10">Get Started</Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="relative inline-block mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl animate-pulse" />
              <img 
                src={logo} 
                alt="Micro Bitcoin" 
                className="relative h-20 w-20 sm:h-28 sm:w-28 mx-auto rounded-full object-cover shadow-[var(--shadow-glow)] ring-4 ring-primary/30 transform transition-transform hover:scale-110 duration-500"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Micro Bitcoin Investment
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Dual earnings: <span className="text-primary font-semibold">3% monthly returns</span> + <span className="text-accent font-semibold">BTC price profits</span>. Start with just ₹100.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" onClick={() => navigate('/auth')} className="shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group w-full sm:w-auto">
                <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
                Start Investing
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="border-2 hover:border-primary transition-all duration-300 w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="group text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elegant)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <TrendingUp className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold">Dual Earnings</h3>
              <p className="text-sm text-muted-foreground">
                Earn 3% fixed monthly returns PLUS profit from Bitcoin price appreciation. Double your growth potential.
              </p>
            </div>

            <div className="group text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elegant)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                <Shield className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold">Bank-Grade Security</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-level security with encrypted transactions, secure authentication, and admin-approved withdrawals.
              </p>
            </div>

            <div className="group text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elegant)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-bitcoin/20 to-bronze/10 group-hover:from-bitcoin/30 group-hover:to-bronze/20 transition-all duration-300">
                <Zap className="h-8 w-8 text-bitcoin group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold">Instant Processing</h3>
              <p className="text-sm text-muted-foreground">
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
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate("/contact")} className="hover:text-primary transition-colors">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate("/terms")} className="hover:text-primary transition-colors">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/privacy")} className="hover:text-primary transition-colors">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Policies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate("/shipping-policy")} className="hover:text-primary transition-colors">
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/cancellation-refund")} className="hover:text-primary transition-colors">
                    Cancellation & Refund
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@microbitcoin.com</li>
                <li>Phone: +91 1800-123-4567</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border/40">
            <p>© 2024 Micro Bitcoin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
