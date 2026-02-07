import React from 'react';
import { Platform, View } from 'react-native';

const BOARD_HTML = `
<style>
  .carrom-hero-wrap {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto 8px auto;
    cursor: pointer;
    perspective: 800px;
  }

  .carrom-glow {
    position: absolute;
    inset: -30px;
    background: radial-gradient(circle, rgba(27,94,32,0.2) 0%, rgba(255,143,0,0.08) 40%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transition: opacity 0.6s ease, transform 0.6s ease;
    opacity: 0.6;
    animation: glowPulse 4s ease-in-out infinite;
  }

  .carrom-hero-wrap:hover .carrom-glow {
    opacity: 1;
    transform: scale(1.15);
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.05); }
  }

  .carrom-board-svg {
    width: 100%;
    height: 100%;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), filter 0.5s ease;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.35));
    transform-style: preserve-3d;
    animation: boardBreathe 5s ease-in-out infinite;
  }

  @keyframes boardBreathe {
    0%, 100% { transform: scale(1) rotateX(0deg) rotateY(0deg); }
    50% { transform: scale(1.008) rotateX(0.5deg) rotateY(-0.3deg); }
  }

  .carrom-hero-wrap:hover .carrom-board-svg {
    filter: drop-shadow(0 16px 40px rgba(27,94,32,0.35)) url(#liquidFilter);
    animation: none;
  }

  /* Shine sweep across surface */
  .shine-sweep {
    animation: shineSweep 6s ease-in-out infinite;
    opacity: 0;
  }

  @keyframes shineSweep {
    0% { opacity: 0; transform: translateX(-200px) translateY(-200px); }
    40% { opacity: 0; }
    50% { opacity: 0.6; }
    60% { opacity: 0; }
    100% { opacity: 0; transform: translateX(200px) translateY(200px); }
  }

  /* Coin floating animations */
  .coin-group { transition: transform 0.3s ease; }
  .coin-r1-0 { animation: coinFloat 3.2s ease-in-out 0s infinite; }
  .coin-r1-1 { animation: coinFloat 3.2s ease-in-out 0.25s infinite; }
  .coin-r1-2 { animation: coinFloat 3.2s ease-in-out 0.5s infinite; }
  .coin-r1-3 { animation: coinFloat 3.2s ease-in-out 0.75s infinite; }
  .coin-r1-4 { animation: coinFloat 3.2s ease-in-out 1.0s infinite; }
  .coin-r1-5 { animation: coinFloat 3.2s ease-in-out 1.25s infinite; }
  .coin-r2-0 { animation: coinFloat 3.8s ease-in-out 0s infinite; }
  .coin-r2-1 { animation: coinFloat 3.8s ease-in-out 0.2s infinite; }
  .coin-r2-2 { animation: coinFloat 3.8s ease-in-out 0.4s infinite; }
  .coin-r2-3 { animation: coinFloat 3.8s ease-in-out 0.6s infinite; }
  .coin-r2-4 { animation: coinFloat 3.8s ease-in-out 0.8s infinite; }
  .coin-r2-5 { animation: coinFloat 3.8s ease-in-out 1.0s infinite; }
  .coin-r2-6 { animation: coinFloat 3.8s ease-in-out 1.2s infinite; }
  .coin-r2-7 { animation: coinFloat 3.8s ease-in-out 1.4s infinite; }
  .coin-r2-8 { animation: coinFloat 3.8s ease-in-out 1.6s infinite; }
  .coin-r2-9 { animation: coinFloat 3.8s ease-in-out 1.8s infinite; }
  .coin-r2-10 { animation: coinFloat 3.8s ease-in-out 2.0s infinite; }
  .coin-r2-11 { animation: coinFloat 3.8s ease-in-out 2.2s infinite; }
  .queen-coin { animation: queenGlow 3s ease-in-out infinite; }

  @keyframes coinFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  @keyframes queenGlow {
    0%, 100% { filter: drop-shadow(0 0 2px rgba(220,20,60,0.3)); }
    50% { filter: drop-shadow(0 0 8px rgba(220,20,60,0.7)); }
  }

  /* Hover: coins ripple outward */
  .carrom-hero-wrap:hover .coin-group {
    animation-duration: 1.5s;
  }

  .carrom-hero-wrap:hover .queen-coin {
    animation-duration: 1.5s;
  }

  /* Striker subtle slide */
  .striker-coin {
    animation: strikerSlide 4s ease-in-out infinite;
  }

  @keyframes strikerSlide {
    0%, 100% { transform: translateX(0); }
    30% { transform: translateX(8px); }
    70% { transform: translateX(-8px); }
  }
</style>

<div class="carrom-hero-wrap" id="carromHeroWrap">
  <div class="carrom-glow"></div>
  <svg class="carrom-board-svg" id="carromBoardSvg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Wood grain pattern -->
      <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="200" height="200">
        <rect width="200" height="200" fill="#F5DEB3"/>
        <line x1="0" y1="8" x2="200" y2="10" stroke="#EDDCAB" stroke-width="1" opacity="0.6"/>
        <line x1="0" y1="24" x2="200" y2="23" stroke="#E8D5A3" stroke-width="0.7" opacity="0.4"/>
        <line x1="0" y1="42" x2="200" y2="44" stroke="#EDDCAB" stroke-width="0.8" opacity="0.5"/>
        <line x1="0" y1="55" x2="200" y2="54" stroke="#E0CFA0" stroke-width="0.5" opacity="0.3"/>
        <line x1="0" y1="73" x2="200" y2="75" stroke="#EDDCAB" stroke-width="1" opacity="0.5"/>
        <line x1="0" y1="91" x2="200" y2="90" stroke="#E8D5A3" stroke-width="0.6" opacity="0.4"/>
        <line x1="0" y1="110" x2="200" y2="112" stroke="#EDDCAB" stroke-width="0.9" opacity="0.5"/>
        <line x1="0" y1="128" x2="200" y2="127" stroke="#E0CFA0" stroke-width="0.5" opacity="0.3"/>
        <line x1="0" y1="148" x2="200" y2="150" stroke="#EDDCAB" stroke-width="0.7" opacity="0.5"/>
        <line x1="0" y1="165" x2="200" y2="164" stroke="#E8D5A3" stroke-width="0.8" opacity="0.4"/>
        <line x1="0" y1="185" x2="200" y2="187" stroke="#EDDCAB" stroke-width="0.6" opacity="0.5"/>
      </pattern>

      <!-- Dark wood frame pattern -->
      <pattern id="darkWood" patternUnits="userSpaceOnUse" width="100" height="100">
        <rect width="100" height="100" fill="#3D2415"/>
        <line x1="0" y1="12" x2="100" y2="13" stroke="#4A2D1A" stroke-width="1" opacity="0.4"/>
        <line x1="0" y1="35" x2="100" y2="34" stroke="#35200F" stroke-width="0.8" opacity="0.3"/>
        <line x1="0" y1="58" x2="100" y2="60" stroke="#4A2D1A" stroke-width="0.6" opacity="0.4"/>
        <line x1="0" y1="82" x2="100" y2="81" stroke="#35200F" stroke-width="1" opacity="0.3"/>
      </pattern>

      <!-- Coin gradients -->
      <radialGradient id="whiteG" cx="38%" cy="32%">
        <stop offset="0%" stop-color="#FFFFF8"/>
        <stop offset="50%" stop-color="#F5F0E0"/>
        <stop offset="100%" stop-color="#D4C9A8"/>
      </radialGradient>
      <radialGradient id="blackG" cx="38%" cy="32%">
        <stop offset="0%" stop-color="#555"/>
        <stop offset="50%" stop-color="#2A2A2A"/>
        <stop offset="100%" stop-color="#0A0A0A"/>
      </radialGradient>
      <radialGradient id="queenG" cx="38%" cy="32%">
        <stop offset="0%" stop-color="#FF5555"/>
        <stop offset="40%" stop-color="#DC143C"/>
        <stop offset="100%" stop-color="#8B0000"/>
      </radialGradient>
      <radialGradient id="strikerG" cx="38%" cy="32%">
        <stop offset="0%" stop-color="#FFFFF0"/>
        <stop offset="50%" stop-color="#F0EDE0"/>
        <stop offset="100%" stop-color="#C8C0A8"/>
      </radialGradient>

      <!-- Surface gloss -->
      <linearGradient id="surfaceGloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="white" stop-opacity="0.12"/>
        <stop offset="45%" stop-color="white" stop-opacity="0"/>
        <stop offset="55%" stop-color="white" stop-opacity="0"/>
        <stop offset="100%" stop-color="white" stop-opacity="0.06"/>
      </linearGradient>

      <!-- Pocket depth gradient -->
      <radialGradient id="pocketG" cx="50%" cy="50%">
        <stop offset="0%" stop-color="#000"/>
        <stop offset="60%" stop-color="#0a0604"/>
        <stop offset="100%" stop-color="#1a0f08"/>
      </radialGradient>

      <!-- Liquid distortion filter -->
      <filter id="liquidFilter" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence id="liqTurb" type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="3" result="noise" seed="2"/>
        <feDisplacementMap id="liqDisp" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/>
      </filter>

      <!-- Coin shadow filter -->
      <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#00000044"/>
      </filter>
    </defs>

    <!-- === BOARD FRAME === -->
    <!-- Outer edge -->
    <rect x="0" y="0" width="500" height="500" rx="14" fill="#1a0e08"/>
    <!-- Frame body -->
    <rect x="3" y="3" width="494" height="494" rx="12" fill="url(#darkWood)"/>
    <!-- Frame highlight -->
    <rect x="3" y="3" width="494" height="494" rx="12" fill="none" stroke="#5D3A1A" stroke-width="2"/>
    <!-- Inner frame edge -->
    <rect x="25" y="25" width="450" height="450" rx="3" fill="none" stroke="#1a0e08" stroke-width="2"/>

    <!-- === PLAYING SURFACE === -->
    <rect x="28" y="28" width="444" height="444" rx="2" fill="url(#woodGrain)"/>
    <!-- Gloss overlay -->
    <rect x="28" y="28" width="444" height="444" rx="2" fill="url(#surfaceGloss)"/>

    <!-- === CORNER POCKETS === -->
    <circle cx="48" cy="48" r="22" fill="url(#pocketG)"/>
    <circle cx="48" cy="48" r="22" fill="none" stroke="#2C1810" stroke-width="2.5"/>
    <circle cx="452" cy="48" r="22" fill="url(#pocketG)"/>
    <circle cx="452" cy="48" r="22" fill="none" stroke="#2C1810" stroke-width="2.5"/>
    <circle cx="48" cy="452" r="22" fill="url(#pocketG)"/>
    <circle cx="48" cy="452" r="22" fill="none" stroke="#2C1810" stroke-width="2.5"/>
    <circle cx="452" cy="452" r="22" fill="url(#pocketG)"/>
    <circle cx="452" cy="452" r="22" fill="none" stroke="#2C1810" stroke-width="2.5"/>

    <!-- === PLAYING LINES === -->
    <g stroke="#8B6914" opacity="0.75">
      <!-- Corner diagonal lines with end circles -->
      <line x1="70" y1="70" x2="118" y2="118" stroke-width="1.2"/>
      <circle cx="118" cy="118" r="6" fill="none" stroke-width="1"/>
      <line x1="430" y1="70" x2="382" y2="118" stroke-width="1.2"/>
      <circle cx="382" cy="118" r="6" fill="none" stroke-width="1"/>
      <line x1="70" y1="430" x2="118" y2="382" stroke-width="1.2"/>
      <circle cx="118" cy="382" r="6" fill="none" stroke-width="1"/>
      <line x1="430" y1="430" x2="382" y2="382" stroke-width="1.2"/>
      <circle cx="382" cy="382" r="6" fill="none" stroke-width="1"/>

      <!-- Base lines (striker areas) -->
      <!-- Bottom -->
      <line x1="95" y1="380" x2="405" y2="380" stroke-width="1.2"/>
      <circle cx="175" cy="380" r="4.5" fill="none" stroke-width="1"/>
      <circle cx="325" cy="380" r="4.5" fill="none" stroke-width="1"/>
      <line x1="95" y1="396" x2="405" y2="396" stroke-width="0.6" opacity="0.4"/>
      <!-- Top -->
      <line x1="95" y1="120" x2="405" y2="120" stroke-width="1.2"/>
      <circle cx="175" cy="120" r="4.5" fill="none" stroke-width="1"/>
      <circle cx="325" cy="120" r="4.5" fill="none" stroke-width="1"/>
      <line x1="95" y1="104" x2="405" y2="104" stroke-width="0.6" opacity="0.4"/>
      <!-- Left -->
      <line x1="120" y1="95" x2="120" y2="405" stroke-width="1.2"/>
      <circle cx="120" cy="175" r="4.5" fill="none" stroke-width="1"/>
      <circle cx="120" cy="325" r="4.5" fill="none" stroke-width="1"/>
      <line x1="104" y1="95" x2="104" y2="405" stroke-width="0.6" opacity="0.4"/>
      <!-- Right -->
      <line x1="380" y1="95" x2="380" y2="405" stroke-width="1.2"/>
      <circle cx="380" cy="175" r="4.5" fill="none" stroke-width="1"/>
      <circle cx="380" cy="325" r="4.5" fill="none" stroke-width="1"/>
      <line x1="396" y1="95" x2="396" y2="405" stroke-width="0.6" opacity="0.4"/>

      <!-- Center circles -->
      <circle cx="250" cy="250" r="22" fill="none" stroke-width="1.5"/>
      <circle cx="250" cy="250" r="60" fill="none" stroke-width="1"/>
    </g>

    <!-- === COINS === -->
    <g filter="url(#coinShadow)">
      <!-- Queen (center) -->
      <g class="queen-coin">
        <circle cx="250" cy="250" r="12" fill="url(#queenG)" stroke="#8B0000" stroke-width="1.5"/>
        <circle cx="247" cy="246" r="3.5" fill="white" opacity="0.25"/>
        <circle cx="250" cy="250" r="6" fill="none" stroke="#FF6666" stroke-width="0.5" opacity="0.4"/>
      </g>

      <!-- Ring 1: 6 coins (radius 25 from center, alternating W/B) -->
      <g class="coin-group coin-r1-0"><circle cx="275" cy="250" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="273" cy="247" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r1-1"><circle cx="262.5" cy="228.3" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="260" cy="225" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r1-2"><circle cx="237.5" cy="228.3" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="235" cy="225" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r1-3"><circle cx="225" cy="250" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="223" cy="247" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r1-4"><circle cx="237.5" cy="271.7" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="235" cy="269" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r1-5"><circle cx="262.5" cy="271.7" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="260" cy="269" r="2.5" fill="white" opacity="0.15"/></g>

      <!-- Ring 2: 12 coins (radius 47 from center, alternating B/W) -->
      <g class="coin-group coin-r2-0"><circle cx="297" cy="250" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="295" cy="247" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r2-1"><circle cx="290.7" cy="226.5" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="288" cy="224" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r2-2"><circle cx="273.5" cy="209.3" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="271" cy="206" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r2-3"><circle cx="250" cy="203" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="248" cy="200" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r2-4"><circle cx="226.5" cy="209.3" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="224" cy="206" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r2-5"><circle cx="209.3" cy="226.5" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="207" cy="224" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r2-6"><circle cx="203" cy="250" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="201" cy="247" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r2-7"><circle cx="209.3" cy="273.5" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="207" cy="271" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r2-8"><circle cx="226.5" cy="290.7" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="224" cy="288" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r2-9"><circle cx="250" cy="297" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="248" cy="294" r="2.5" fill="white" opacity="0.3"/></g>
      <g class="coin-group coin-r2-10"><circle cx="273.5" cy="290.7" r="11" fill="url(#blackG)" stroke="#444" stroke-width="1"/><circle cx="271" cy="288" r="2.5" fill="white" opacity="0.15"/></g>
      <g class="coin-group coin-r2-11"><circle cx="290.7" cy="273.5" r="11" fill="url(#whiteG)" stroke="#B0A080" stroke-width="1"/><circle cx="288" cy="271" r="2.5" fill="white" opacity="0.3"/></g>

      <!-- Striker at bottom baseline -->
      <g class="striker-coin">
        <circle cx="250" cy="380" r="14" fill="url(#strikerG)" stroke="#A0A090" stroke-width="2"/>
        <circle cx="247" cy="376" r="4" fill="white" opacity="0.2"/>
        <circle cx="250" cy="380" r="7" fill="none" stroke="#C0B890" stroke-width="0.5" opacity="0.5"/>
      </g>
    </g>

    <!-- Shine sweep overlay -->
    <g class="shine-sweep">
      <rect x="28" y="28" width="444" height="444" rx="2" fill="url(#surfaceGloss)" opacity="0.8"/>
    </g>
  </svg>
</div>
`;

const BOARD_SCRIPT = `
(function() {
  var wrap = document.getElementById('carromHeroWrap');
  if (!wrap) return;
  var svg = document.getElementById('carromBoardSvg');
  var turb = document.getElementById('liqTurb');
  var disp = document.getElementById('liqDisp');
  if (!svg || !turb || !disp) return;

  var isHovering = false;
  var currentScale = 0;
  var raf = null;

  function animateLiquid() {
    if (isHovering && currentScale < 14) {
      currentScale += 0.6;
    } else if (!isHovering && currentScale > 0) {
      currentScale -= 0.4;
    }

    if (currentScale > 0) {
      disp.setAttribute('scale', String(currentScale));
      var t = Date.now() * 0.0008;
      var bfx = 0.012 + Math.sin(t) * 0.006;
      var bfy = 0.012 + Math.cos(t * 0.7) * 0.006;
      turb.setAttribute('baseFrequency', bfx + ' ' + bfy);
      raf = requestAnimationFrame(animateLiquid);
    } else {
      disp.setAttribute('scale', '0');
      raf = null;
    }
  }

  wrap.addEventListener('mouseenter', function() {
    isHovering = true;
    if (!raf) animateLiquid();
  });

  wrap.addEventListener('mouseleave', function() {
    isHovering = false;
    svg.style.transform = '';
  });

  wrap.addEventListener('mousemove', function(e) {
    var rect = wrap.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width;
    var y = (e.clientY - rect.top) / rect.height;
    var rx = (y - 0.5) * 12;
    var ry = (x - 0.5) * -12;
    svg.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(1.04)';
    svg.style.animationName = 'none';
  });
})();
`;

export function CarromBoardHero() {
  const isWeb = Platform.OS === 'web';

  React.useEffect(() => {
    if (!isWeb) return;

    // Inject the animation script after the HTML is rendered
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.textContent = BOARD_SCRIPT;
      document.body.appendChild(script);
      return () => {
        try { document.body.removeChild(script); } catch (_) {}
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isWeb]);

  if (!isWeb) {
    // Fallback for native: just a styled placeholder
    return (
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 12,
            backgroundColor: '#3D2415',
            borderWidth: 3,
            borderColor: '#5D3A1A',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 4,
              backgroundColor: '#F5DEB3',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#DC143C' }} />
          </View>
        </View>
      </View>
    );
  }

  // Web: render the full SVG board with liquid animations
  return React.createElement('div', {
    dangerouslySetInnerHTML: { __html: BOARD_HTML },
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
    },
  } as any);
}
