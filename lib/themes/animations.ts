// Link Animations for Linkingo Customization
// 20 professionally designed animations

export interface LinkAnimation {
    id: string;
    name: string;
    category: 'hover' | 'entry' | 'click' | 'continuous';
    isPremium: boolean;
    css: string;
    keyframes?: string;
}

export const linkAnimations: LinkAnimation[] = [
    // ===== FREE ANIMATIONS (Basic - 5) =====
    {
        id: 'hover-scale',
        name: 'Scale Up',
        category: 'hover',
        isPremium: false,
        css: 'transition: transform 0.3s ease; &:hover { transform: scale(1.05); }',
    },
    {
        id: 'hover-lift',
        name: 'Lift',
        category: 'hover',
        isPremium: false,
        css: 'transition: transform 0.3s ease; &:hover { transform: translateY(-4px); }',
    },
    {
        id: 'entry-fade',
        name: 'Fade In',
        category: 'entry',
        isPremium: false,
        css: 'animation: fadeIn 0.6s ease-out;',
        keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    },
    {
        id: 'entry-slide-up',
        name: 'Slide Up',
        category: 'entry',
        isPremium: false,
        css: 'animation: slideUp 0.6s ease-out;',
        keyframes: `
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    },
    {
        id: 'click-pulse',
        name: 'Pulse',
        category: 'click',
        isPremium: false,
        css: '&:active { animation: pulse 0.3s ease; }',
        keyframes: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.95); }
      }
    `,
    },

    // ===== PREMIUM HOVER EFFECTS (3 more) =====
    {
        id: 'hover-glow',
        name: 'Glow Effect',
        category: 'hover',
        isPremium: true,
        css: `
      transition: all 0.3s ease;
      &:hover {
        box-shadow: 0 0 20px var(--accent-color), 0 0 40px var(--accent-color);
        transform: translateY(-2px);
      }
    `,
    },
    {
        id: 'hover-shake',
        name: 'Shake',
        category: 'hover',
        isPremium: true,
        css: '&:hover { animation: shake 0.5s ease; }',
        keyframes: `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
      }
    `,
    },
    {
        id: 'hover-rotate',
        name: 'Rotate',
        category: 'hover',
        isPremium: true,
        css: 'transition: transform 0.3s ease; &:hover { transform: rotate(2deg) scale(1.05); }',
    },
    {
        id: 'hover-skew',
        name: 'Skew',
        category: 'hover',
        isPremium: true,
        css: 'transition: transform 0.3s ease; &:hover { transform: skewX(-2deg) scale(1.02); }',
    },
    {
        id: 'hover-border-expand',
        name: 'Border Expand',
        category: 'hover',
        isPremium: true,
        css: `
      position: relative;
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border: 2px solid var(--accent-color);
        border-radius: inherit;
        opacity: 0;
        transition: all 0.3s ease;
      }
      &:hover::after {
        opacity: 1;
        inset: -4px;
      }
    `,
    },
    {
        id: 'hover-bg-slide',
        name: 'Background Slide',
        category: 'hover',
        isPremium: true,
        css: `
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
      }
      &:hover::before {
        left: 100%;
      }
    `,
    },

    // ===== PREMIUM ENTRY ANIMATIONS (3 more) =====
    {
        id: 'entry-slide-left',
        name: 'Slide from Left',
        category: 'entry',
        isPremium: true,
        css: 'animation: slideLeft 0.6s ease-out;',
        keyframes: `
      @keyframes slideLeft {
        from { 
          opacity: 0;
          transform: translateX(-30px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    },
    {
        id: 'entry-slide-right',
        name: 'Slide from Right',
        category: 'entry',
        isPremium: true,
        css: 'animation: slideRight 0.6s ease-out;',
        keyframes: `
      @keyframes slideRight {
        from { 
          opacity: 0;
          transform: translateX(30px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    },
    {
        id: 'entry-bounce',
        name: 'Bounce In',
        category: 'entry',
        isPremium: true,
        css: 'animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);',
        keyframes: `
      @keyframes bounceIn {
        0% { 
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }
    `,
    },
    {
        id: 'entry-zoom',
        name: 'Zoom In',
        category: 'entry',
        isPremium: true,
        css: 'animation: zoomIn 0.6s ease-out;',
        keyframes: `
      @keyframes zoomIn {
        from { 
          opacity: 0;
          transform: scale(0.8);
        }
        to { 
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
    },

    // ===== PREMIUM CLICK ANIMATIONS (2 more) =====
    {
        id: 'click-ripple',
        name: 'Ripple Effect',
        category: 'click',
        isPremium: true,
        css: `
      position: relative;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      &:active::after {
        width: 300px;
        height: 300px;
      }
    `,
    },
    {
        id: 'click-flash',
        name: 'Flash',
        category: 'click',
        isPremium: true,
        css: '&:active { animation: flash 0.3s ease; }',
        keyframes: `
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; background: var(--accent-color); }
      }
    `,
    },

    // ===== PREMIUM CONTINUOUS ANIMATIONS (3) =====
    {
        id: 'continuous-float',
        name: 'Subtle Float',
        category: 'continuous',
        isPremium: true,
        css: 'animation: float 3s ease-in-out infinite;',
        keyframes: `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
    `,
    },
    {
        id: 'continuous-pulse',
        name: 'Gentle Pulse',
        category: 'continuous',
        isPremium: true,
        css: 'animation: gentlePulse 2s ease-in-out infinite;',
        keyframes: `
      @keyframes gentlePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
    `,
    },
    {
        id: 'continuous-glow',
        name: 'Slow Glow',
        category: 'continuous',
        isPremium: true,
        css: 'animation: slowGlow 3s ease-in-out infinite;',
        keyframes: `
      @keyframes slowGlow {
        0%, 100% { 
          box-shadow: 0 0 5px var(--accent-color);
        }
        50% { 
          box-shadow: 0 0 20px var(--accent-color), 0 0 30px var(--accent-color);
        }
      }
    `,
    },
];

// Helper functions
export const getFreeAnimations = () => linkAnimations.filter(a => !a.isPremium);
export const getPremiumAnimations = () => linkAnimations.filter(a => a.isPremium);
export const getAnimationById = (id: string) => linkAnimations.find(a => a.id === id);
export const getAnimationsByCategory = (category: LinkAnimation['category']) =>
    linkAnimations.filter(a => a.category === category);

// Generate all keyframes CSS
export const generateKeyframesCSS = () => {
    return linkAnimations
        .filter(a => a.keyframes)
        .map(a => a.keyframes)
        .join('\n');
};
