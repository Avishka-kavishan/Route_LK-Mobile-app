import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device (iPhone 11/12/13/14 size)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scales value based on screen width
 */
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scales value based on screen height
 */
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Moderate scale with a factor (default 0.5) to keep it from scaling too drastically on large screens
 */
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

/**
 * Percentage width
 */
const wp = (widthPercent: number) => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};

/**
 * Percentage height
 */
const hp = (heightPercent: number) => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

export { scale, verticalScale, moderateScale, wp, hp, SCREEN_WIDTH, SCREEN_HEIGHT };
