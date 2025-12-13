// Color Palettes for Linkingo Customization
// 30 professionally designed color themes

export interface ColorPalette {
    id: string;
    name: string;
    category: 'vibrant' | 'pastel' | 'dark';
    isPremium: boolean;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        link: string;
    };
}

export const colorPalettes: ColorPalette[] = [
    // ===== FREE THEMES (5) =====
    {
        id: 'ocean-breeze',
        name: 'Ocean Breeze',
        category: 'vibrant',
        isPremium: false,
        colors: {
            primary: '#0EA5E9',
            secondary: '#06B6D4',
            accent: '#3B82F6',
            background: '#F0F9FF',
            text: '#0C4A6E',
            link: '#0284C7',
        },
    },
    {
        id: 'sunset-vibes',
        name: 'Sunset Vibes',
        category: 'vibrant',
        isPremium: false,
        colors: {
            primary: '#F97316',
            secondary: '#FB923C',
            accent: '#EC4899',
            background: '#FFF7ED',
            text: '#7C2D12',
            link: '#EA580C',
        },
    },
    {
        id: 'soft-peach',
        name: 'Soft Peach',
        category: 'pastel',
        isPremium: false,
        colors: {
            primary: '#FBBF24',
            secondary: '#FCD34D',
            accent: '#FB923C',
            background: '#FFFBEB',
            text: '#78350F',
            link: '#F59E0B',
        },
    },
    {
        id: 'midnight-black',
        name: 'Midnight Black',
        category: 'dark',
        isPremium: false,
        colors: {
            primary: '#1F2937',
            secondary: '#374151',
            accent: '#6366F1',
            background: '#111827',
            text: '#F9FAFB',
            link: '#818CF8',
        },
    },
    {
        id: 'classic-white',
        name: 'Classic White',
        category: 'vibrant',
        isPremium: false,
        colors: {
            primary: '#6366F1',
            secondary: '#8B5CF6',
            accent: '#EC4899',
            background: '#FFFFFF',
            text: '#1F2937',
            link: '#4F46E5',
        },
    },

    // ===== PREMIUM VIBRANT THEMES (5 more) =====
    {
        id: 'forest-green',
        name: 'Forest Green',
        category: 'vibrant',
        isPremium: true,
        colors: {
            primary: '#10B981',
            secondary: '#34D399',
            accent: '#059669',
            background: '#ECFDF5',
            text: '#064E3B',
            link: '#047857',
        },
    },
    {
        id: 'royal-purple',
        name: 'Royal Purple',
        category: 'vibrant',
        isPremium: true,
        colors: {
            primary: '#8B5CF6',
            secondary: '#A78BFA',
            accent: '#C084FC',
            background: '#FAF5FF',
            text: '#581C87',
            link: '#7C3AED',
        },
    },
    {
        id: 'cherry-blossom',
        name: 'Cherry Blossom',
        category: 'vibrant',
        isPremium: true,
        colors: {
            primary: '#EC4899',
            secondary: '#F472B6',
            accent: '#DB2777',
            background: '#FDF2F8',
            text: '#831843',
            link: '#BE185D',
        },
    },
    {
        id: 'electric-blue',
        name: 'Electric Blue',
        category: 'vibrant',
        isPremium: true,
        colors: {
            primary: '#3B82F6',
            secondary: '#60A5FA',
            accent: '#2563EB',
            background: '#EFF6FF',
            text: '#1E3A8A',
            link: '#1D4ED8',
        },
    },
    {
        id: 'tropical-paradise',
        name: 'Tropical Paradise',
        category: 'vibrant',
        isPremium: true,
        colors: {
            primary: '#14B8A6',
            secondary: '#2DD4BF',
            accent: '#F59E0B',
            background: '#F0FDFA',
            text: '#134E4A',
            link: '#0D9488',
        },
    },

    // ===== PREMIUM PASTEL THEMES (9 more) =====
    {
        id: 'mint-fresh',
        name: 'Mint Fresh',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#6EE7B7',
            secondary: '#A7F3D0',
            accent: '#34D399',
            background: '#F0FDF4',
            text: '#065F46',
            link: '#059669',
        },
    },
    {
        id: 'baby-blue',
        name: 'Baby Blue',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#93C5FD',
            secondary: '#BFDBFE',
            accent: '#60A5FA',
            background: '#EFF6FF',
            text: '#1E3A8A',
            link: '#2563EB',
        },
    },
    {
        id: 'rose-quartz',
        name: 'Rose Quartz',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#F9A8D4',
            secondary: '#FBCFE8',
            accent: '#F472B6',
            background: '#FDF2F8',
            text: '#831843',
            link: '#DB2777',
        },
    },
    {
        id: 'lemon-sorbet',
        name: 'Lemon Sorbet',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#FDE047',
            secondary: '#FEF08A',
            accent: '#FACC15',
            background: '#FEFCE8',
            text: '#713F12',
            link: '#CA8A04',
        },
    },
    {
        id: 'lilac-mist',
        name: 'Lilac Mist',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#C4B5FD',
            secondary: '#DDD6FE',
            accent: '#A78BFA',
            background: '#FAF5FF',
            text: '#581C87',
            link: '#7C3AED',
        },
    },
    {
        id: 'coral-reef',
        name: 'Coral Reef',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#FCA5A5',
            secondary: '#FECACA',
            accent: '#F87171',
            background: '#FEF2F2',
            text: '#7F1D1D',
            link: '#DC2626',
        },
    },
    {
        id: 'sky-blue',
        name: 'Sky Blue',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#7DD3FC',
            secondary: '#BAE6FD',
            accent: '#38BDF8',
            background: '#F0F9FF',
            text: '#0C4A6E',
            link: '#0284C7',
        },
    },
    {
        id: 'butter-cream',
        name: 'Butter Cream',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#FDE68A',
            secondary: '#FEF3C7',
            accent: '#FCD34D',
            background: '#FFFBEB',
            text: '#78350F',
            link: '#D97706',
        },
    },
    {
        id: 'sage-green',
        name: 'Sage Green',
        category: 'pastel',
        isPremium: true,
        colors: {
            primary: '#86EFAC',
            secondary: '#BBF7D0',
            accent: '#4ADE80',
            background: '#F0FDF4',
            text: '#14532D',
            link: '#16A34A',
        },
    },

    // ===== PREMIUM DARK THEMES (9 more) =====
    {
        id: 'deep-ocean',
        name: 'Deep Ocean',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#0C4A6E',
            secondary: '#075985',
            accent: '#0EA5E9',
            background: '#082F49',
            text: '#E0F2FE',
            link: '#38BDF8',
        },
    },
    {
        id: 'dark-forest',
        name: 'Dark Forest',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#14532D',
            secondary: '#166534',
            accent: '#22C55E',
            background: '#052E16',
            text: '#DCFCE7',
            link: '#4ADE80',
        },
    },
    {
        id: 'charcoal-gray',
        name: 'Charcoal Gray',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#374151',
            secondary: '#4B5563',
            accent: '#9CA3AF',
            background: '#1F2937',
            text: '#F3F4F6',
            link: '#D1D5DB',
        },
    },
    {
        id: 'burgundy-wine',
        name: 'Burgundy Wine',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#881337',
            secondary: '#9F1239',
            accent: '#FB7185',
            background: '#4C0519',
            text: '#FFE4E6',
            link: '#FDA4AF',
        },
    },
    {
        id: 'navy-night',
        name: 'Navy Night',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#1E3A8A',
            secondary: '#1E40AF',
            accent: '#60A5FA',
            background: '#172554',
            text: '#DBEAFE',
            link: '#93C5FD',
        },
    },
    {
        id: 'slate-storm',
        name: 'Slate Storm',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#334155',
            secondary: '#475569',
            accent: '#94A3B8',
            background: '#0F172A',
            text: '#F1F5F9',
            link: '#CBD5E1',
        },
    },
    {
        id: 'espresso-brown',
        name: 'Espresso Brown',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#78350F',
            secondary: '#92400E',
            accent: '#FBBF24',
            background: '#451A03',
            text: '#FEF3C7',
            link: '#FDE047',
        },
    },
    {
        id: 'plum-purple',
        name: 'Plum Purple',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#581C87',
            secondary: '#6B21A8',
            accent: '#C084FC',
            background: '#3B0764',
            text: '#F3E8FF',
            link: '#D8B4FE',
        },
    },
    {
        id: 'emerald-dark',
        name: 'Emerald Dark',
        category: 'dark',
        isPremium: true,
        colors: {
            primary: '#065F46',
            secondary: '#047857',
            accent: '#34D399',
            background: '#022C22',
            text: '#D1FAE5',
            link: '#6EE7B7',
        },
    },
];

// Helper functions
export const getFreePalettes = () => colorPalettes.filter(p => !p.isPremium);
export const getPremiumPalettes = () => colorPalettes.filter(p => p.isPremium);
export const getPaletteById = (id: string) => colorPalettes.find(p => p.id === id);
export const getPalettesByCategory = (category: ColorPalette['category']) =>
    colorPalettes.filter(p => p.category === category);
