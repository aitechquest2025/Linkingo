// Google Fonts for Linkingo Customization
// 30 professionally curated fonts

export interface FontOption {
    id: string;
    name: string;
    category: 'serif' | 'sans-serif' | 'display' | 'monospace';
    isPremium: boolean;
    googleFontName: string;
    weights: number[];
    fallback: string;
    previewText?: string;
}

export const fonts: FontOption[] = [
    // ===== FREE FONTS (5) =====
    {
        id: 'inter',
        name: 'Inter',
        category: 'sans-serif',
        isPremium: false,
        googleFontName: 'Inter',
        weights: [400, 500, 600, 700],
        fallback: 'system-ui, -apple-system, sans-serif',
    },
    {
        id: 'roboto',
        name: 'Roboto',
        category: 'sans-serif',
        isPremium: false,
        googleFontName: 'Roboto',
        weights: [400, 500, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'poppins',
        name: 'Poppins',
        category: 'sans-serif',
        isPremium: false,
        googleFontName: 'Poppins',
        weights: [400, 500, 600, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'playfair',
        name: 'Playfair Display',
        category: 'serif',
        isPremium: false,
        googleFontName: 'Playfair Display',
        weights: [400, 600, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'jetbrains-mono',
        name: 'JetBrains Mono',
        category: 'monospace',
        isPremium: false,
        googleFontName: 'JetBrains Mono',
        weights: [400, 500, 600],
        fallback: 'Consolas, monospace',
    },

    // ===== PREMIUM SERIF FONTS (9 more) =====
    {
        id: 'merriweather',
        name: 'Merriweather',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Merriweather',
        weights: [400, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'lora',
        name: 'Lora',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Lora',
        weights: [400, 600, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'crimson-text',
        name: 'Crimson Text',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Crimson Text',
        weights: [400, 600, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'eb-garamond',
        name: 'EB Garamond',
        category: 'serif',
        isPremium: true,
        googleFontName: 'EB Garamond',
        weights: [400, 600],
        fallback: 'Georgia, serif',
    },
    {
        id: 'libre-baskerville',
        name: 'Libre Baskerville',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Libre Baskerville',
        weights: [400, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'cormorant',
        name: 'Cormorant',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Cormorant',
        weights: [400, 600, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'spectral',
        name: 'Spectral',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Spectral',
        weights: [400, 600, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'cardo',
        name: 'Cardo',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Cardo',
        weights: [400, 700],
        fallback: 'Georgia, serif',
    },
    {
        id: 'bitter',
        name: 'Bitter',
        category: 'serif',
        isPremium: true,
        googleFontName: 'Bitter',
        weights: [400, 600, 700],
        fallback: 'Georgia, serif',
    },

    // ===== PREMIUM SANS-SERIF FONTS (7 more) =====
    {
        id: 'montserrat',
        name: 'Montserrat',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'Montserrat',
        weights: [400, 500, 600, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'open-sans',
        name: 'Open Sans',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'Open Sans',
        weights: [400, 600, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'lato',
        name: 'Lato',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'Lato',
        weights: [400, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'nunito',
        name: 'Nunito',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'Nunito',
        weights: [400, 600, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'work-sans',
        name: 'Work Sans',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'Work Sans',
        weights: [400, 500, 600],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'dm-sans',
        name: 'DM Sans',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'DM Sans',
        weights: [400, 500, 700],
        fallback: 'Arial, sans-serif',
    },
    {
        id: 'plus-jakarta',
        name: 'Plus Jakarta Sans',
        category: 'sans-serif',
        isPremium: true,
        googleFontName: 'Plus Jakarta Sans',
        weights: [400, 500, 600, 700],
        fallback: 'Arial, sans-serif',
    },

    // ===== PREMIUM DISPLAY FONTS (6) =====
    {
        id: 'bebas-neue',
        name: 'Bebas Neue',
        category: 'display',
        isPremium: true,
        googleFontName: 'Bebas Neue',
        weights: [400],
        fallback: 'Impact, sans-serif',
    },
    {
        id: 'righteous',
        name: 'Righteous',
        category: 'display',
        isPremium: true,
        googleFontName: 'Righteous',
        weights: [400],
        fallback: 'Impact, sans-serif',
    },
    {
        id: 'pacifico',
        name: 'Pacifico',
        category: 'display',
        isPremium: true,
        googleFontName: 'Pacifico',
        weights: [400],
        fallback: 'cursive',
    },
    {
        id: 'lobster',
        name: 'Lobster',
        category: 'display',
        isPremium: true,
        googleFontName: 'Lobster',
        weights: [400],
        fallback: 'cursive',
    },
    {
        id: 'abril-fatface',
        name: 'Abril Fatface',
        category: 'display',
        isPremium: true,
        googleFontName: 'Abril Fatface',
        weights: [400],
        fallback: 'Georgia, serif',
    },
    {
        id: 'bungee',
        name: 'Bungee',
        category: 'display',
        isPremium: true,
        googleFontName: 'Bungee',
        weights: [400],
        fallback: 'Impact, sans-serif',
    },

    // ===== PREMIUM MONOSPACE FONTS (3 more) =====
    {
        id: 'fira-code',
        name: 'Fira Code',
        category: 'monospace',
        isPremium: true,
        googleFontName: 'Fira Code',
        weights: [400, 500, 600],
        fallback: 'Consolas, monospace',
    },
    {
        id: 'source-code-pro',
        name: 'Source Code Pro',
        category: 'monospace',
        isPremium: true,
        googleFontName: 'Source Code Pro',
        weights: [400, 600],
        fallback: 'Consolas, monospace',
    },
    {
        id: 'space-mono',
        name: 'Space Mono',
        category: 'monospace',
        isPremium: true,
        googleFontName: 'Space Mono',
        weights: [400, 700],
        fallback: 'Consolas, monospace',
    },
];

// Helper functions
export const getFreeFonts = () => fonts.filter(f => !f.isPremium);
export const getPremiumFonts = () => fonts.filter(f => f.isPremium);
export const getFontById = (id: string) => fonts.find(f => f.id === id);
export const getFontsByCategory = (category: FontOption['category']) =>
    fonts.filter(f => f.category === category);

// Generate Google Fonts URL for selected fonts
export const generateGoogleFontsURL = (selectedFonts: string[]): string => {
    const fontObjects = selectedFonts
        .map(id => getFontById(id))
        .filter(Boolean) as FontOption[];

    if (fontObjects.length === 0) return '';

    const families = fontObjects.map(font => {
        const weights = font.weights.join(';');
        return `family=${font.googleFontName.replace(/ /g, '+')}:wght@${weights}`;
    });

    return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
};

// Generate CSS font-family declaration
export const generateFontFamilyCSS = (fontId: string): string => {
    const font = getFontById(fontId);
    if (!font) return '';

    return `font-family: '${font.googleFontName}', ${font.fallback};`;
};
