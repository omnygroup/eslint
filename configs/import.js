import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

/**
 * Import plugin configuration
 * Includes rules for import ordering, validation, and best practices
 */
export default defineConfig({
	name: '@omny/eslint/import',
	files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
	plugins: {
		import: importPlugin,
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
	rules: {
		// Группировка и сортировка импортов
		'import/order': [
			'error',
			{
				groups: [
					'builtin', // Node.js встроенные модули
					'external', // npm пакеты
					'internal', // Внутренние path aliases
					'parent', // Родительские импорты
					'sibling', // Соседние импорты
					'index', // index файлы
					'type', // TypeScript type импорты
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				pathGroups: [
					{
						pattern: 'core/**',
						group: 'internal',
						position: 'before',
					},
					{
						pattern: 'events/**',
						group: 'internal',
						position: 'before',
					},
					{
						pattern: 'sdk/**',
						group: 'internal',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin', 'type'],
			},
		],

		// Проверка наличия расширений .js для ESM
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'always',
				mjs: 'always',
				ts: 'never',
				tsx: 'never',
			},
		],

		// Запрет дублирования импортов
		'import/no-duplicates': ['error', { 'prefer-inline': true }],

		// Проверка существования импортируемых файлов
		'import/no-unresolved': 'error',

		// Запрет циклических зависимостей
		'import/no-cycle': ['error', { maxDepth: 3 }],

		// Запрет импорта из devDependencies в production коде
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/*.test.ts',
					'**/*.spec.ts',
					'**/tests/**',
					'**/*.config.*',
					'**/vitest.config.*',
				],
			},
		],
	},
});
