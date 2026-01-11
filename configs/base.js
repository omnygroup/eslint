import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';

/**
 * Base ESLint configuration
 * Includes recommended ESLint rules and common code quality rules
 */
export default defineConfig(
	// ESLint recommended rules
	{
		name: '@omny/eslint/base-recommended',
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
		...eslint.configs.recommended,
	},

	// JavaScript language options for .js and .mjs files
	{
		name: '@omny/eslint/js-language-options',
		files: ['**/*.js', '**/*.mjs'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
		},
	},

	// Common code quality rules
	{
		name: '@omny/eslint/code-quality',
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
		rules: {
			// Запрет console.log в production коде
			'no-console': ['warn', { allow: ['warn', 'error'] }],

			// Предпочитать const где возможно
			'prefer-const': 'error',

			// Запрет var
			'no-var': 'error',

			// Требование === вместо ==
			eqeqeq: ['error', 'always'],

			// Требование return в getter'ах
			'getter-return': 'error',

			// Запрет изменения параметров функций
			'no-param-reassign': ['error', { props: true }],
		},
	}
);
