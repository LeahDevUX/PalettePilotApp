export function getLuminance(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  if (c.length !== 6) return 0.5;
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1) + 0.05;
  const l2 = getLuminance(hex2) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
}

export function getAccessibilityGrade(hex) {
  const contrastWithWhite = getContrast(hex, '#FFFFFF');
  const contrastWithBlack = getContrast(hex, '#0F172A');
  const bestContrast = Math.max(contrastWithWhite, contrastWithBlack);

  if (bestContrast >= 7.0) {
    return { score: 'AAA Pass', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
  } else if (bestContrast >= 4.5) {
    return { score: 'AA Pass', bg: 'bg-teal-500/20 text-teal-300 border-teal-500/30' };
  } else if (bestContrast >= 3.0) {
    return { score: 'AA Large', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
  } else {
    return { score: 'Fail Low', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
  }
}

export function generateRandomHex() {
  const chars = '0123456789ABCDEF';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
}

export function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}
