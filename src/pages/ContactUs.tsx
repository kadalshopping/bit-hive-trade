import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/micro-bitcoin-coin.jpg";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bitcoin/10 via-transparent to-transparent pointer-events-none" />
      
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Micro Bitcoin" className="h-10 w-10 rounded-full shadow-glow" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Micro Bitcoin
            </span>
          </div>
          <Button onClick={() => navigate("/")} variant="outline" className="shadow-primary">
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Get in touch with our team for any questions or support
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader className="text-center p-4">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-base sm:text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 pt-0">
                <p className="text-sm text-muted-foreground">support@microbitcoin.com</p>
                <p className="text-sm text-muted-foreground mt-2">info@microbitcoin.com</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">+91 1800-123-4567</p>
                <p className="text-xs text-muted-foreground mt-2">Mon-Fri: 9AM-6PM IST</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Micro Bitcoin Pvt Ltd<br />
                  Mumbai, Maharashtra<br />
                  India - 400001
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>We're here to help during these hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
