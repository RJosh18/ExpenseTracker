const RATES = { AUD: 1, USD: 0.66, EUR: 0.61, GBP: 0.52 };
const DELAYS = { AUD: 50, USD: 2000, EUR: 300, GBP: 600 };

export function fetchRate(currency) {
  console.log(`[${performance.now().toFixed(2)} ms] fetchRate started`, {
    currency,
  });

  return new Promise((resolve) => {
    const delay = DELAYS[currency];
    setTimeout(() => {
      const rate = RATES[currency];
      console.log(`[${performance.now().toFixed(2)} ms] fetchRate finished`, {
        currency,
        rate,
      });
      resolve(rate);
    }, delay);
  });
}
