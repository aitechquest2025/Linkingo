// Button Styles for Linkingo Customization
// 10 professionally designed button styles

export interface ButtonStyle {
    id: string;
    name: string;
    isPremium: boolean;
    css: {
        base: string;
        hover: string;
    };
    preview?: string;
}

export const buttonStyles: ButtonStyle[] = [
    // ===== FREE BUTTON STYLES (2) =====
    {
        id: 'solid',
        name: 'Solid',
        isPremium: false,
        css: {
            base: `
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
      `,
            hover: `
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      `,
        },
    },
    {
        id: 'outline',
        name: 'Outline',
        isPremium: false,
        css: {
            base: `
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
      `,
            hover: `
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
      `,
        },
    },

    // ===== PREMIUM BUTTON STYLES (8) =====
    {
        id: 'gradient',
        name: 'Gradient',
        isPremium: true,
        css: {
            base: `
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      `,
            hover: `
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        filter: brightness(1.1);
      `,
        },
    },
    {
        id: 'glass',
        name: 'Glass (Glassmorphism)',
        isPremium: true,
        css: {
            base: `
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        color: var(--text-color);
        transition: all 0.3s ease;
      `,
            hover: `
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      `,
        },
    },
    {
        id: 'neon',
        name: 'Neon Glow',
        isPremium: true,
        css: {
            base: `
        background: var(--primary-color);
        color: white;
        border: 2px solid var(--accent-color);
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-color);
      `,
            hover: `
        box-shadow: 0 0 20px var(--accent-color), 0 0 40px var(--accent-color), 0 0 60px var(--accent-color);
        transform: translateY(-2px);
      `,
        },
    },
    {
        id: 'shadow',
        name: 'Elevated Shadow',
        isPremium: true,
        css: {
            base: `
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      `,
            hover: `
        transform: translateY(-4px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      `,
        },
    },
    {
        id: 'soft',
        name: 'Soft (Neumorphism)',
        isPremium: true,
        css: {
            base: `
        background: var(--background-color);
        color: var(--primary-color);
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7);
      `,
            hover: `
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.7);
      `,
        },
    },
    {
        id: 'minimal',
        name: 'Minimal',
        isPremium: true,
        css: {
            base: `
        background: transparent;
        color: var(--text-color);
        border: none;
        border-bottom: 2px solid var(--primary-color);
        border-radius: 0;
        padding: 14px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
      `,
            hover: `
        background: rgba(0, 0, 0, 0.02);
        border-bottom-width: 3px;
      `,
        },
    },
    {
        id: 'pill',
        name: 'Pill (Fully Rounded)',
        isPremium: true,
        css: {
            base: `
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 14px 32px;
        font-weight: 600;
        transition: all 0.3s ease;
      `,
            hover: `
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      `,
        },
    },
    {
        id: 'sharp',
        name: 'Sharp (No Radius)',
        isPremium: true,
        css: {
            base: `
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0;
        padding: 14px 24px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
      `,
            hover: `
        background: var(--accent-color);
        transform: translateX(4px);
      `,
        },
    },
];

// Additional button customization options
export interface ButtonCustomization {
    borderRadius: number; // 0-50px
    shadowIntensity: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    hoverEffect: 'lift' | 'scale' | 'glow' | 'none';
}

export const shadowPresets = {
    none: 'box-shadow: none;',
    sm: 'box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);',
    md: 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);',
    lg: 'box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);',
    xl: 'box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);',
};

export const hoverEffects = {
    lift: 'transform: translateY(-2px);',
    scale: 'transform: scale(1.05);',
    glow: 'box-shadow: 0 0 20px var(--accent-color);',
    none: '',
};

// Helper functions
export const getFreeButtonStyles = () => buttonStyles.filter(b => !b.isPremium);
export const getPremiumButtonStyles = () => buttonStyles.filter(b => b.isPremium);
export const getButtonStyleById = (id: string) => buttonStyles.find(b => b.id === id);
