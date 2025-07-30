import React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 50"
      width="210"
      height="40"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="35"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="600"
        fill="url(#logo-gradient)"
      >
        Organização
      </text>
      <text
        x="145"
        y="35"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="400"
        fill="hsl(var(--foreground))"
        opacity="0.8"
      >
        Acadêmica
      </text>
    </svg>
  );
}
