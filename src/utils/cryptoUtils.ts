/**
 * Simple obfuscation utility to prevent static analysis of sensitive data.
 * Following Layer 1 & 2 of the Advanced Anti-Scraping Framework.
 */

// Key fragments spread across the file
const PART_A = 'gr4d';
const PART_B = 'i3nt';
const PART_C = '_s3cr3t';

export const decryptData = (obfuscated: string): any => {
  const key = PART_A + PART_B + PART_C;
  const decoded = atob(obfuscated);
  let result = '';
  
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  
  try {
    return JSON.parse(result);
  } catch (e) {
    console.error('Failed to decrypt data');
    return null;
  }
};

/**
 * Utility for build-time obfuscation (can be used in scripts).
 */
export const obfuscateData = (data: any): string => {
  const key = PART_A + PART_B + PART_C;
  const str = JSON.stringify(data);
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  
  return btoa(result);
};
