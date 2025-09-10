class NeuromorphicHardware {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.animationTimer = null;
    this.isPlaying = true;

    // original logical size
    this.baseWidth = options.baseWidth || 900;
    this.baseHeight = options.baseHeight || 600;

    this.loopInterval = options.loopInterval || 10000; // 8s + 2s pause
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    const host = document.getElementById(this.containerId);
    if (!host) {
      console.error(`Container with id ${this.containerId} not found`);
      return;
    }
    host.innerHTML = this.createHTML();
    this.scaleEl = host.querySelector('.diagram-scale');

    // responsive scaling
    this.updateScale();
    this.ro = new ResizeObserver(() => this.updateScale());
    this.ro.observe(host);
    window.addEventListener('orientationchange', () => this.updateScale(), { passive: true });

    // pause when tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stopAnimation();
      else if (!this.reducedMotion) this.startAnimation();
    });

    if (!this.reducedMotion) this.startLoopingAnimation();
  }

  updateScale() {
    const host = document.getElementById(this.containerId);
    if (!host || !this.scaleEl) return;
    const w = host.clientWidth || this.baseWidth;
    const scale = Math.max(0.2, Math.min(1, w / this.baseWidth));
    this.scaleEl.style.setProperty('--scale', scale);
    this.scaleEl.style.setProperty('--font-scale', scale < 0.7 ? 0.9 : 1);
  }

  startLoopingAnimation() {
    const tick = () => {
      if (this.isPlaying) {
        this.resetAnimation();
        this.animationTimer = setTimeout(tick, this.loopInterval);
      }
    };
    if (this.animationTimer) clearTimeout(this.animationTimer);
    this.animationTimer = setTimeout(tick, this.loopInterval);
    this.resetAnimation(); // run once now
  }

  resetAnimation() {
    const host = document.getElementById(this.containerId);
    if (!host) return;
    const container = host.querySelector('.diagram-container');
    if (!container) return;
    const animated = container.querySelectorAll('[class*="delay-"], .neuron, .param-label, .h-line, .v-line, .section-label, .input-boundary, .wta-boundary, .separator');
    animated.forEach(el => {
      el.style.animation = 'none';
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.animation = '';
    });
  }

  stopAnimation() {
    this.isPlaying = false;
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.animationTimer = null;
    }
  }

  startAnimation() {
    if (this.reducedMotion) return;
    this.isPlaying = true;
    if (!this.animationTimer) this.startLoopingAnimation();
  }

  createHTML() {
    return `
      <div class="diagram-outer">
        <div class="diagram-scale">
          ${this.innerMarkup()}
        </div>
      </div>
      <style>
        .diagram-outer {
          width: 100%;
          max-width: ${this.baseWidth}px;
          aspect-ratio: ${this.baseWidth} / ${this.baseHeight};
          position: relative;
          margin: 0 auto;
        }
        .diagram-scale {
          --scale: 1;
          --font-scale: 1;
          position: absolute;
          inset: 0;
        }
        .diagram-container {
          width: ${this.baseWidth}px;
          height: ${this.baseHeight}px;
          position: absolute;
          left: 0; top: 0;
          transform: scale(var(--scale));
          transform-origin: top left;
          background-color: #ffffff;
          padding: 40px;
          box-sizing: border-box;
        }

        .title { text-align:center; font-size: calc(28px * var(--font-scale)); font-weight:700; color:white; opacity:0; animation: fadeIn .5s ease-in-out forwards; }

        .section-label { position:absolute; font-size: calc(18px * var(--font-scale)); font-weight:700; color:white; opacity:0; animation: fadeIn .5s ease-in-out forwards; text-shadow:0 1px 2px rgba(0,0,0,.35); }
        .input-label { left:80px; top:80px; }
        .wta-label { left:420px; top:70px; }
        .output-label { right:75px; top:287px; }

        .input-boundary, .wta-boundary { position:absolute; border:2px solid #555; border-radius:5px; opacity:0; animation: fadeIn .5s ease-in-out forwards; animation-delay:.5s; }
        .input-boundary { left:40px; top:120px; width:160px; height:350px; }
        .wta-boundary { left:240px; top:100px; width:420px; height:390px; }

        .separator { position:absolute; left:220px; top:100px; width:2px; height:390px; background: repeating-linear-gradient(to bottom,#666 0px,#666 6px,transparent 6px,transparent 12px); opacity:0; animation: fadeIn .5s ease-in-out forwards; animation-delay:1s; }

        .neuron { position:absolute; width:0; height:0; border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:15px solid #d32f2f; opacity:0; animation: fadeInPulse .5s ease-in-out forwards; }
        .neuron.blue { border-bottom-color:#2196f3; animation: fadeInPulseBlue .5s ease-in-out forwards; }

        .neuron-label { position:absolute; font-size: calc(14px * var(--font-scale)); color:white; text-align:center; width:30px; margin-left:-15px; margin-top:5px; opacity:0; animation: fadeIn .5s ease-in-out forwards; text-shadow:0 1px 2px rgba(0,0,0,.35); }

        .h-line { position:absolute; height:2px; background:#888; opacity:0; }
        .h-line.red { background:#d32f2f; }
        .h-line.dotted { background: repeating-linear-gradient(to right,#888 0px,#888 4px,transparent 4px,transparent 8px); }

        .v-line { position:absolute; width:2px; background:#888; opacity:0; }
        .v-line.red { background:#d32f2f; }
        .v-line.blue { background:#2196f3; }
        .v-line.dotted { background: repeating-linear-gradient(to bottom,#888 0px,#888 4px,transparent 4px,transparent 8px); }

        .param-label { position:absolute; font-size: calc(16px * var(--font-scale)); font-weight:700; opacity:0; animation: fadeIn .5s ease-in-out forwards; text-shadow:0 1px 2px rgba(0,0,0,.35); }
        .param-label.red { color:#d32f2f; }
        .param-label.blue { color:#2196f3; }
        .param-label.white { color:white; }

        .delay-1{animation-delay:1s;animation:fadeIn .5s ease-in-out forwards;}
        .delay-2{animation-delay:2s;animation:fadeIn .5s ease-in-out forwards;}
        .delay-3{animation-delay:3s;animation:drawLine 1s ease-in-out forwards;}
        .delay-4{animation-delay:4s;animation:drawLine 1s ease-in-out forwards;}
        .delay-5{animation-delay:5s;animation:drawLine 1s ease-in-out forwards;}
        .delay-6{animation-delay:6s;animation:drawVertical 1s ease-in-out forwards;}
        .delay-7{animation-delay:7s;animation:fadeIn .5s ease-in-out forwards;}

        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fadeInPulse{0%{opacity:0;transform:scale(1)}50%{opacity:1;transform:scale(1.2);border-bottom-color:#ff5722}100%{opacity:1;transform:scale(1);border-bottom-color:#d32f2f}}
        @keyframes fadeInPulseBlue{0%{opacity:0;transform:scale(1)}50%{opacity:1;transform:scale(1.2);border-bottom-color:#03a9f4}100%{opacity:1;transform:scale(1);border-bottom-color:#2196f3}}
        @keyframes drawLine{0%{opacity:0;width:0;box-shadow:0 0 0 rgba(0,0,0,0)}50%{opacity:1;box-shadow:0 0 8px rgba(0,0,0,.2)}100%{opacity:1;box-shadow:0 0 0 rgba(0,0,0,0)}}
        @keyframes drawVertical{0%{opacity:0;height:0;box-shadow:0 0 0 rgba(0,0,0,0)}50%{opacity:1;box-shadow:0 0 8px rgba(0,0,0,.2)}100%{opacity:1;box-shadow:0 0 0 rgba(0,0,0,0)}}

        @media (prefers-reduced-motion: reduce){
          .delay-1,.delay-2,.delay-3,.delay-4,.delay-5,.delay-6,.delay-7,.neuron,.neuron.blue,.param-label,.h-line,.v-line,.section-label{animation:none!important;opacity:1!important}
        }
      </style>
    `;
  }

  // original markup moved into its own method; unchanged positions
  innerMarkup() {
    return `
      <div class="diagram-container">
        <div class="title"></div>
        <div class="section-label input-label">Input</div>
        <div class="section-label wta-label">WTA-Circuit</div>
        <div class="section-label output-label">Output</div>
        <div class="input-boundary"></div>
        <div class="wta-boundary"></div>
        <div class="separator"></div>

        <!-- Input neurons -->
        <div class="neuron delay-1" style="left: 110px; top: 420px;"></div>
        <div class="neuron-label delay-1" style="left: 110px; top: 420px;">N₁</div>
        <div class="neuron delay-1" style="left: 150px; top: 420px;"></div>
        <div class="neuron-label delay-1" style="left: 150px; top: 420px;">N₁₀</div>

        <!-- WTA neurons -->
        <div class="neuron delay-2" style="left: 290px; top: 420px;"></div>
        <div class="neuron-label delay-2" style="left: 290px; top: 420px;">N₁₁</div>
        <div class="neuron delay-2" style="left: 390px; top: 420px;"></div>
        <div class="neuron-label delay-2" style="left: 390px; top: 420px;">N₂₀</div>
        <div class="neuron blue delay-2" style="left: 480px; top: 420px;"></div>
        <div class="neuron-label delay-2" style="left: 480px; top: 420px;">N₂₁</div>
        <div class="neuron delay-2" style="left: 570px; top: 420px;"></div>
        <div class="neuron-label delay-2" style="left: 570px; top: 420px;">N₂₂</div>

        <!-- Input horizontal lines -->
        <div class="h-line red delay-3" style="left: 60px; top: 300px; width: 140px;">
          <div class="param-label white" style="left: -40px; top: -10px;">I₁₀</div>
        </div>
        <div class="h-line red delay-3" style="left: 60px; top: 350px; width: 140px;">
          <div class="param-label white" style="left: -30px; top: -10px;">I₁</div>
        </div>

        <!-- Dotted connections to WTA -->
        <div class="h-line dotted delay-4" style="left: 125px; top: 430px; width: 95px;"></div>
        <div class="h-line dotted delay-4" style="left: 165px; top: 430px; width: 55px;"></div>

        <!-- WTA horizontal grid -->
        <div class="h-line delay-5" style="left: 260px; top: 160px; width: 380px;"></div>
        <div class="h-line delay-5" style="left: 260px; top: 200px; width: 380px;"></div>
        <div class="h-line delay-5" style="left: 260px; top: 250px; width: 380px;"></div>
        <div class="h-line delay-5" style="left: 260px; top: 300px; width: 380px;"></div>
        <div class="h-line delay-5" style="left: 260px; top: 350px; width: 380px;"></div>

        <!-- WTA vertical lines -->
        <div class="v-line red delay-6" style="left: 305px; top: 160px; height: 260px;"></div>
        <div class="v-line red delay-6" style="left: 405px; top: 160px; height: 260px;"></div>
        <div class="v-line blue delay-6" style="left: 495px; top: 160px; height: 260px;"></div>
        <div class="v-line red delay-6" style="left: 585px; top: 160px; height: 260px;"></div>

        <!-- Dotted vertical lines -->
        <div class="v-line dotted delay-6" style="left: 355px; top: 200px; height: 150px;"></div>
        <div class="v-line dotted delay-6" style="left: 540px; top: 200px; height: 150px;"></div>

        <!-- Parameter labels -->
        <div class="param-label red delay-7" style="left: 315px; top: 145px;">β₁</div>
        <div class="param-label red delay-7" style="left: 415px; top: 145px;">β₁</div>
        <div class="param-label red delay-7" style="left: 315px; top: 185px;">α</div>
        <div class="param-label red delay-7" style="left: 415px; top: 185px;">α</div>
        <div class="param-label blue delay-7" style="left: 505px; top: 185px;">β₂</div>
        <div class="param-label red delay-7" style="left: 595px; top: 185px;">β₂</div>

        <!-- Weight labels -->
        <div class="param-label white delay-7" style="left: 340px; top: 285px;">w</div>
        <div class="param-label white delay-7" style="left: 520px; top: 285px;">w</div>

        <!-- Output line -->
        <div class="h-line delay-7" style="left: 680px; top: 300px; width: 80px;"></div>
      </div>
    `;
  }
}
window.NeuromorphicHardware = NeuromorphicHardware;
