/**
 * Prettier configuration for Omny projects
 * 
 * This configuration can be imported and used in your project's .prettierrc.js:
 * 
 * @example
 * // .prettierrc.js
 * import prettierConfig from '@omny/eslint/prettier';
 * export default prettierConfig;
 * 
 * Or extend it with custom options:
 * 
 * @example
 * // .prettierrc.js
 * import prettierConfig from '@omny/eslint/prettier';
 * export default {
 *   ...prettierConfig,
 *   printWidth: 100, // Override specific options
 * };
 */
export default {
	semi: true,
	trailingComma: 'es5',
	singleQuote: true,
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	arrowParens: 'always',
	endOfLine: 'lf',
};
