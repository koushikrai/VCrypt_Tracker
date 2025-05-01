// src/functions/zkHelpers.js

// Schnorr constants (for demonstration, use smaller primes)
export const g = 2;
export const p = 7919; // Small prime
export const q = 7919 - 1; // q = p - 1

// Modulus exponentiation (g^r mod p)
export function modPow(base, exp, mod) {
  base = base % mod;
  let result = 1;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    base = (base * base) % mod;
    exp = Math.floor(exp / 2);
  }
  return result;
}
