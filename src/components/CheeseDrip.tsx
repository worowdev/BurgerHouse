import React from 'react';

/**
 * Melted-cheese edge that hangs from the bottom of the nav.
 * One hand-traced tile (817 wide) is drawn twice, the second mirrored,
 * so the edges meet seamlessly and the pattern doesn't look stamped.
 */

const TILE = 817;
const H = 190;

// Bottom outline, traced left → right: thick band, rounded arches,
// finger drips, one pinched teardrop and a few small nubs.
const OUTLINE = `
  M -3 -20 L -3 55 L 0 55
  C 12 50 22 44 34 44
  C 48 44 66 52 68 70
  L 68 158
  C 68 172 78 178 93 178
  C 108 178 118 172 118 158
  L 118 68
  C 118 46 132 34 150 34
  C 166 34 174 48 176 60
  C 178 74 184 78 191 78
  C 198 78 204 72 206 60
  C 208 44 220 36 232 40
  C 242 44 246 52 246 62
  C 246 76 238 92 238 108
  C 238 122 246 128 259 128
  C 272 128 280 120 280 106
  C 280 92 271 78 271 62
  C 271 46 282 28 300 27
  C 314 27 318 42 318 58
  L 318 152
  C 318 166 328 174 340 174
  C 352 174 362 166 362 152
  L 362 62
  C 362 46 372 40 386 40
  C 404 40 418 54 434 55
  C 452 56 462 44 478 44
  C 496 44 504 70 528 72
  C 552 74 570 62 588 58
  C 606 54 616 44 630 44
  C 646 44 656 54 657 70
  L 657 128
  C 657 142 664 150 673 150
  C 683 150 690 142 690 128
  L 690 60
  C 690 44 698 36 710 38
  C 720 40 724 50 726 58
  C 728 68 734 72 740 72
  C 747 72 751 66 753 56
  C 756 36 768 21 784 20
  C 798 19 806 34 808 46
  C 810 55 814 58 817 58
  L 820 58 L 820 -20 Z
`;

// Gloss: vertical shine on each drip, short streaks on the arches
const SHINES: [number, number, number, number][] = [
  // cx, cy, rx, ry
  [79, 146, 3.2, 12],
  [248, 108, 2.6, 7],
  [329, 140, 3.2, 12],
  [666, 124, 2.8, 9],
];
const STREAKS = [
  'M 136 41 Q 146 36 158 38',
  'M 288 33 Q 297 29 306 31',
  'M 444 51 Q 454 47 464 48',
  'M 614 50 Q 622 46 632 47',
  'M 770 27 Q 780 22 792 24',
];

function Gloss() {
  return (
    <>
      <g fill="#FFFFFF" opacity="0.8">
        {SHINES.map(([cx, cy, rx, ry]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} />
        ))}
      </g>
      <g fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.65">
        {STREAKS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </>
  );
}

const MIRROR = `translate(${TILE * 2} 0) scale(-1 1)`;

export default function CheeseDrip({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${TILE * 4} ${H}`}
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none block w-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="cheese-fill" x1="0" y1="0" x2="0" y2="178" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F7A528" />
          <stop offset="0.35" stopColor="#FBBF2E" />
          <stop offset="1" stopColor="#FFE24D" />
        </linearGradient>
        <filter id="cheese-rim" x="-5%" y="-10%" width="110%" height="140%">
          <feDropShadow dx="0" dy="2.4" stdDeviation="0.35" floodColor="#DC7F16" floodOpacity="1" />
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g className="cheese-drip">
        {/* Both tiles share one filter so no shadow falls across the join */}
        <g filter="url(#cheese-rim)" fill="url(#cheese-fill)">
          {[0, TILE * 2].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <path d={OUTLINE} />
              <path d={OUTLINE} transform={MIRROR} />
            </g>
          ))}
        </g>
        {[0, TILE * 2].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <Gloss />
            <g transform={MIRROR}>
              <Gloss />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
