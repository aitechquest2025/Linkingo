// Background Styles for Linkingo Customization
// 30 professionally designed backgrounds

export interface BackgroundStyle {
    id: string;
    name: string;
    category: 'gradient' | 'pattern' | 'image' | 'animated' | 'solid';
    isPremium: boolean;
    css: string;
    preview?: string; // Preview image URL
}

export const backgroundStyles: BackgroundStyle[] = [
    // ===== FREE BACKGROUNDS (5) =====
    {
        id: 'solid-white',
        name: 'Clean White',
        category: 'solid',
        isPremium: false,
        css: 'background: #FFFFFF;',
    },
    {
        id: 'solid-light-gray',
        name: 'Light Gray',
        category: 'solid',
        isPremium: false,
        css: 'background: #F3F4F6;',
    },
    {
        id: 'gradient-blue-purple',
        name: 'Blue to Purple',
        category: 'gradient',
        isPremium: false,
        css: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
    },
    {
        id: 'gradient-orange-pink',
        name: 'Sunset Gradient',
        category: 'gradient',
        isPremium: false,
        css: 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);',
    },
    {
        id: 'gradient-green-blue',
        name: 'Ocean Gradient',
        category: 'gradient',
        isPremium: false,
        css: 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);',
    },

    // ===== PREMIUM GRADIENTS (7 more) =====
    {
        id: 'gradient-peach',
        name: 'Peach Glow',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);',
    },
    {
        id: 'gradient-purple-pink',
        name: 'Purple Dream',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);',
    },
    {
        id: 'gradient-dark-blue',
        name: 'Deep Space',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);',
    },
    {
        id: 'gradient-warm',
        name: 'Warm Flame',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%);',
    },
    {
        id: 'gradient-cool-mint',
        name: 'Cool Mint',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #a1ffce 0%, #faffd1 100%);',
    },
    {
        id: 'gradient-royal',
        name: 'Royal Purple',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #360033 0%, #0b8793 100%);',
    },
    {
        id: 'gradient-aurora',
        name: 'Aurora',
        category: 'gradient',
        isPremium: true,
        css: 'background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);',
    },

    // ===== PREMIUM PATTERNS (10) =====
    {
        id: 'pattern-dots',
        name: 'Polka Dots',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #f0f0f0;
background-image: radial-gradient(circle, #d0d0d0 1px, transparent 1px);
background-size: 20px 20px;`,
    },
    {
        id: 'pattern-grid',
        name: 'Grid Lines',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #ffffff;
background-image: linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px);
background-size: 20px 20px;`,
    },
    {
        id: 'pattern-waves',
        name: 'Wave Pattern',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #667eea;
background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");`,
    },
    {
        id: 'pattern-diagonal',
        name: 'Diagonal Stripes',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #f0f0f0;
background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #e0e0e0 10px, #e0e0e0 20px);`,
    },
    {
        id: 'pattern-hexagon',
        name: 'Hexagon',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #667eea;
background-image: url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
    },
    {
        id: 'pattern-circuit',
        name: 'Circuit Board',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #1a1a2e;
background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2300f2fe' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");`,
    },
    {
        id: 'pattern-topographic',
        name: 'Topographic',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #667eea;
background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");`,
    },
    {
        id: 'pattern-bubbles',
        name: 'Bubbles',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #a8edea;
background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2%, transparent 0%);
background-size: 50px 50px;`,
    },
    {
        id: 'pattern-stars',
        name: 'Starry Night',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #0f2027;
background-image: radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 60px 70px, white, transparent), radial-gradient(1px 1px at 50px 50px, white, transparent), radial-gradient(1px 1px at 130px 80px, white, transparent), radial-gradient(2px 2px at 90px 10px, white, transparent);
background-size: 200px 100px;`,
    },
    {
        id: 'pattern-geometric',
        name: 'Geometric Shapes',
        category: 'pattern',
        isPremium: true,
        css: `background-color: #f0f0f0;
background-image: linear-gradient(30deg, #e0e0e0 12%, transparent 12.5%, transparent 87%, #e0e0e0 87.5%, #e0e0e0), linear-gradient(150deg, #e0e0e0 12%, transparent 12.5%, transparent 87%, #e0e0e0 87.5%, #e0e0e0), linear-gradient(30deg, #e0e0e0 12%, transparent 12.5%, transparent 87%, #e0e0e0 87.5%, #e0e0e0), linear-gradient(150deg, #e0e0e0 12%, transparent 12.5%, transparent 87%, #e0e0e0 87.5%, #e0e0e0), linear-gradient(60deg, #d0d0d0 25%, transparent 25.5%, transparent 75%, #d0d0d0 75%, #d0d0d0), linear-gradient(60deg, #d0d0d0 25%, transparent 25.5%, transparent 75%, #d0d0d0 75%, #d0d0d0);
background-size: 80px 140px;
background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;`,
    },

    // ===== PREMIUM ANIMATED (5) =====
    {
        id: 'animated-gradient-shift',
        name: 'Gradient Shift',
        category: 'animated',
        isPremium: true,
        css: `background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    },
    {
        id: 'animated-aurora',
        name: 'Aurora Borealis',
        category: 'animated',
        isPremium: true,
        css: `background: linear-gradient(60deg, #667eea, #764ba2, #f093fb, #4facfe);
background-size: 300% 300%;
animation: aurora 20s ease infinite;
@keyframes aurora {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
    },
    {
        id: 'animated-breathing',
        name: 'Breathing Effect',
        category: 'animated',
        isPremium: true,
        css: `background: radial-gradient(circle, #667eea 0%, #764ba2 100%);
animation: breathing 8s ease-in-out infinite;
@keyframes breathing {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}`,
    },
    {
        id: 'animated-particles',
        name: 'Floating Particles',
        category: 'animated',
        isPremium: true,
        css: `background-color: #667eea;
position: relative;
overflow: hidden;`,
    },
    {
        id: 'animated-waves',
        name: 'Wave Motion',
        category: 'animated',
        isPremium: true,
        css: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
position: relative;
overflow: hidden;`,
    },

    // ===== PREMIUM IMAGES (3) =====
    {
        id: 'image-abstract',
        name: 'Abstract Art',
        category: 'image',
        isPremium: true,
        css: 'background-image: url("/backgrounds/abstract.jpg"); background-size: cover; background-position: center;',
    },
    {
        id: 'image-minimal',
        name: 'Minimalist',
        category: 'image',
        isPremium: true,
        css: 'background-image: url("/backgrounds/minimal.jpg"); background-size: cover; background-position: center;',
    },
    {
        id: 'image-texture',
        name: 'Texture',
        category: 'image',
        isPremium: true,
        css: 'background-image: url("/backgrounds/texture.jpg"); background-size: cover; background-position: center;',
    },
];

// Helper functions
export const getFreeBackgrounds = () => backgroundStyles.filter(b => !b.isPremium);
export const getPremiumBackgrounds = () => backgroundStyles.filter(b => b.isPremium);
export const getBackgroundById = (id: string) => backgroundStyles.find(b => b.id === id);
export const getBackgroundsByCategory = (category: BackgroundStyle['category']) =>
    backgroundStyles.filter(b => b.category === category);
