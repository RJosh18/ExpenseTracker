const RATES = { AUD: 1, USD: 0.66, EUR: 0.61, GBP: 0.52 };

export function fetchRate(currency) {
  return new Promise((resolve) => {
    const delay = currency === 'AUD' ? 50 : 300 + Math.random() * 1200;
    setTimeout(() => resolve(RATES[currency]), delay);
  });
}
