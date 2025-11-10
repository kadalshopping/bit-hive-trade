import { useEffect, useState } from 'react';

interface BtcPrice {
  usd: number;
  inr: number;
  loading: boolean;
  error: string | null;
}

export const useBtcPrice = () => {
  const [price, setPrice] = useState<BtcPrice>({
    usd: 0,
    inr: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr'
        );
        const data = await response.json();
        
        setPrice({
          usd: data.bitcoin.usd,
          inr: data.bitcoin.inr,
          loading: false,
          error: null,
        });
      } catch (error) {
        setPrice(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch BTC price',
        }));
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return price;
};
