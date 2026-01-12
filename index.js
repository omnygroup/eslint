import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

import baseConfig from './configs/base.js';
import importConfig from './configs/import.js';
import sonarConfig from './configs/sonar.js';
import typescriptConfig from './configs/typescript.js';

/**
 * Main ESLint configuration for Omny projects
 * 
 * Includes:
 * - Base ESLint rules
 * - TypeScript strict type-checked rules
 * - Import plugin rules
 * - SonarJS rules for bug detection and code smells
 * - Prettier integration
 * 
 * @example
 * // eslint.config.mjs
 * import omnyConfig from '@omny/eslint';
 * 
 * export default [
 *   ...omnyConfig,
 *   // Your custom rules
 * ];
 */
export default defineConfig(
	// Global ignore patterns
	globalIgnores([
		'**/node_modules/**',
		'**/dist/**',
		'**/coverage/**',
		'**/.eslintcache',
		'**/*.config.js',
		'**/*.config.mjs',
		'**/*.log',
	]),

	// Apply noInlineConfig globally
	{
		linterOptions: {
			noInlineConfig: true,
		},
	},

	// Base configuration
	...baseConfig,

	// TypeScript configuration
	...typescriptConfig,

	// Import configuration
	importConfig,

	// SonarJS configuration
	sonarConfig,

	// Prettier integration (must be last)
	{
		name: '@omny/eslint/prettier',
		...prettierConfig,
	}
);
