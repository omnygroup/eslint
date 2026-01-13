import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

/**
 * TypeScript ESLint configuration
 * Includes strict type-checked rules and stylistic rules
 */
export default defineConfig(
	// TypeScript language options
	{
		name: '@omny/eslint/typescript-language-options',
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			parser: tseslint.parser,
			parserOptions: {
				project: true,
			},
		},
	},

	// Strict type-checked rules - only apply to TypeScript files
	...tseslint.configs.strictTypeChecked.map((config) => ({
		...config,
		files: config.files || ['**/*.ts', '**/*.tsx'],
	})),

	// Stylistic type-checked rules - only apply to TypeScript files
	...tseslint.configs.stylisticTypeChecked.map((config) => ({
		...config,
		files: config.files || ['**/*.ts', '**/*.tsx'],
	})),

	// Custom TypeScript rules
	{
		name: '@omny/eslint/typescript-custom',
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			// Allow variables prefixed with underscore (used for intentionally ignoring values)
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],

			// Обязательные типы возвращаемых значений для экспортируемых функций
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
					allowDirectConstAssertionInArrowFunctions: true,
				},
			],

			// Обязательные типы для экспортируемых модулей
			'@typescript-eslint/explicit-module-boundary-types': 'error',

			// Требование Promise в return statements для async функций
			'@typescript-eslint/promise-function-async': 'error',

			// Строгие правила именования
			'@typescript-eslint/naming-convention': [
				'error',
				// Интерфейсы в PascalCase
				{
					selector: 'interface',
					format: ['PascalCase'],
				},
				// Type aliases в PascalCase
				{
					selector: 'typeAlias',
					format: ['PascalCase'],
				},
				// Классы в PascalCase
				{
					selector: 'class',
					format: ['PascalCase'],
				},
				// Enums в PascalCase
				{
					selector: 'enum',
					format: ['PascalCase'],
				},
				// Variables в camelCase или UPPER_CASE для констант
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allow',
				},
				// Functions в camelCase
				{
					selector: 'function',
					format: ['camelCase'],
				},
				// Methods в camelCase
				{
					selector: 'method',
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},
				// Properties в camelCase
				{
					selector: 'property',
					format: ['camelCase', 'UPPER_CASE'],
					leadingUnderscore: 'allow',
				},
			],

			// Строгие boolean выражения
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowString: false,
					allowNumber: false,
					allowNullableObject: false,
				},
			],

			// Требование switch-case для union types
			'@typescript-eslint/switch-exhaustiveness-check': 'error',

			// Запрет shadowing переменных
			'@typescript-eslint/no-shadow': 'error',
		},
	}
);
