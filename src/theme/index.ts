import { COLORS, SPACING, RADIUS } from './colors';

export const THEME = {
    colors: COLORS,
    spacing: SPACING,
    radius: RADIUS,
    shadows: {
        light: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 5,
        },
        premium: {
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 8,
        }
    }
};
