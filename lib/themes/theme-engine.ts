// Theme Engine - Core system for applying customization
import { ColorPalette, getPaletteById } from './color-palettes';
import { BackgroundStyle, getBackgroundById } from './backgrounds';
import { ButtonStyle, getButtonStyleById } from './button-styles';
import { LinkAnimation, getAnimationById, generateKeyframesCSS } from './animations';
import { FontOption, getFontById, generateGoogleFontsURL, generateFontFamilyCSS } from './fonts';

export interface UserTheme {
    // Colors
    colorPaletteId: string;
    customColors?: {
        primary?: string;
        secondary?: string;
        accent?: string;
        background?: string;
        text?: string;
    };

    // Background
    backgroundId: string;
    backgroundOpacity?: number; // 0-100
    backgroundBlur?: number; // 0-20

    // Buttons
    buttonStyleId: string;
    buttonRadius?: number; // 0-50
    buttonShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

    // Animations
    hoverAnimationId?: string;
    entryAnimationId?: string;
    clickAnimationId?: string;
    continuousAnimationId?: string;

    // Typography
    headingFontId: string;
    bodyFontId: string;
    fontSize?: 'sm' | 'md' | 'lg';
    fontWeight?: number;
    letterSpacing?: number;

    // Advanced
    spacing?: 'compact' | 'normal' | 'relaxed';
    borderRadius?: number; // Global border radius
    iconStyle?: 'filled' | 'outlined' | 'sharp';
}

export class ThemeEngine {
    private theme: UserTheme;

    constructor(theme: UserTheme) {
        this.theme = theme;
    }

    // Generate CSS variables for the theme
    generateCSSVariables(): string {
        const palette = getPaletteById(this.theme.colorPaletteId);
        if (!palette) return '';

        const colors = {
            ...palette.colors,
            ...this.theme.customColors,
        };

        return `
      :root {
        /* Colors */
        --primary-color: ${colors.primary};
        --secondary-color: ${colors.secondary};
        --accent-color: ${colors.accent};
        --background-color: ${colors.background};
        --text-color: ${colors.text};
        --link-color: ${colors.link};
        
        /* Typography */
        --font-size-base: ${this.getFontSize()};
        --font-weight: ${this.theme.fontWeight || 400};
        --letter-spacing: ${this.theme.letterSpacing || 0}px;
        
        /* Spacing */
        --spacing: ${this.getSpacing()};
        
        /* Border Radius */
        --border-radius: ${this.theme.borderRadius || 12}px;
        --button-radius: ${this.theme.buttonRadius || 12}px;
      }
    `;
    }

    // Generate background CSS
    generateBackgroundCSS(): string {
        const background = getBackgroundById(this.theme.backgroundId);
        if (!background) return '';

        let css = background.css;

        // Apply opacity if set
        if (this.theme.backgroundOpacity !== undefined) {
            css += `\nopacity: ${this.theme.backgroundOpacity / 100};`;
        }

        // Apply blur if set
        if (this.theme.backgroundBlur) {
            css += `\nfilter: blur(${this.theme.backgroundBlur}px);`;
        }

        return css;
    }

    // Generate button CSS
    generateButtonCSS(): string {
        const buttonStyle = getButtonStyleById(this.theme.buttonStyleId);
        if (!buttonStyle) return '';

        return `
      .link-button {
        ${buttonStyle.css.base}
      }
      
      .link-button:hover {
        ${buttonStyle.css.hover}
      }
    `;
    }

    // Generate animation CSS
    generateAnimationCSS(): string {
        let css = '';

        // Add keyframes
        css += generateKeyframesCSS();

        // Apply animations
        if (this.theme.hoverAnimationId) {
            const animation = getAnimationById(this.theme.hoverAnimationId);
            if (animation) {
                css += `\n.link-button { ${animation.css} }`;
            }
        }

        if (this.theme.entryAnimationId) {
            const animation = getAnimationById(this.theme.entryAnimationId);
            if (animation) {
                css += `\n.link-item { ${animation.css} }`;
            }
        }

        if (this.theme.clickAnimationId) {
            const animation = getAnimationById(this.theme.clickAnimationId);
            if (animation) {
                css += `\n.link-button { ${animation.css} }`;
            }
        }

        if (this.theme.continuousAnimationId) {
            const animation = getAnimationById(this.theme.continuousAnimationId);
            if (animation) {
                css += `\n.link-item { ${animation.css} }`;
            }
        }

        return css;
    }

    // Generate font imports
    generateFontImports(): string {
        const fontIds = [this.theme.headingFontId, this.theme.bodyFontId];
        return generateGoogleFontsURL(fontIds);
    }

    // Generate font CSS
    generateFontCSS(): string {
        const headingFont = getFontById(this.theme.headingFontId);
        const bodyFont = getFontById(this.theme.bodyFontId);

        if (!headingFont || !bodyFont) return '';

        return `
      h1, h2, h3, h4, h5, h6 {
        ${generateFontFamilyCSS(this.theme.headingFontId)}
      }
      
      body, p, span, a, button {
        ${generateFontFamilyCSS(this.theme.bodyFontId)}
      }
    `;
    }

    // Generate complete theme CSS
    generateCompleteCSS(): string {
        return `
      ${this.generateCSSVariables()}
      
      ${this.generateFontCSS()}
      
      ${this.generateButtonCSS()}
      
      ${this.generateAnimationCSS()}
      
      .page-background {
        ${this.generateBackgroundCSS()}
      }
    `;
    }

    // Helper methods
    private getFontSize(): string {
        switch (this.theme.fontSize) {
            case 'sm': return '14px';
            case 'lg': return '18px';
            default: return '16px';
        }
    }

    private getSpacing(): string {
        switch (this.theme.spacing) {
            case 'compact': return '8px';
            case 'relaxed': return '20px';
            default: return '12px';
        }
    }
}

// Default theme
export const defaultTheme: UserTheme = {
    colorPaletteId: 'ocean-breeze',
    backgroundId: 'solid-white',
    buttonStyleId: 'solid',
    headingFontId: 'poppins',
    bodyFontId: 'inter',
    fontSize: 'md',
    spacing: 'normal',
    borderRadius: 12,
    buttonRadius: 12,
};

// Apply theme to page
export const applyTheme = (theme: UserTheme) => {
    const engine = new ThemeEngine(theme);

    // Inject CSS
    const styleId = 'linkingo-theme-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = engine.generateCompleteCSS();

    // Load fonts
    const fontURL = engine.generateFontImports();
    if (fontURL) {
        const linkId = 'linkingo-theme-fonts';
        let linkElement = document.getElementById(linkId) as HTMLLinkElement;

        if (!linkElement) {
            linkElement = document.createElement('link');
            linkElement.id = linkId;
            linkElement.rel = 'stylesheet';
            document.head.appendChild(linkElement);
        }

        linkElement.href = fontURL;
    }
};
