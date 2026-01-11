import mainConfig from './index.js';

/**
 * Complete ESLint configuration with all rules enabled
 * 
 * This is an alias for the main configuration.
 * Use this when you want to be explicit about using all rules.
 * 
 * @example
 * // eslint.config.mjs
 * import omnyConfigAll from '@omny/eslint/all';
 * 
 * export default [
 *   ...omnyConfigAll,
 *   // Your custom rules
 * ];
 */
export default mainConfig;
