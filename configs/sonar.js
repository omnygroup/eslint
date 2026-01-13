import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig } from 'eslint/config';

/**
 * SonarJS plugin configuration
 * Includes rules for bug detection, code smells, and security
 */
export default defineConfig({
	name: '@omny/eslint/sonar',
	files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
	plugins: {
		sonarjs,
	},
	rules: {
		// === Bug Detection ===
		
		// Обнаружение одинаковых веток в if-else
		'sonarjs/no-all-duplicated-branches': 'error',

		// Предотвращение перезаписи элементов массива
		'sonarjs/no-element-overwrite': 'error',

		// Обнаружение идентичных условий
		'sonarjs/no-identical-conditions': 'error',

		// Обнаружение идентичных выражений
		'sonarjs/no-identical-expressions': 'error',
		
		// Обнаружение использования пустых return значений
		'sonarjs/no-use-of-empty-return-value': 'error',

		// === Code Smell Detection ===

		// Ограничение когнитивной сложности
		'sonarjs/cognitive-complexity': ['error', 15],

		// Ограничение количества case в switch
		'sonarjs/max-switch-cases': ['error', 30],

		// Обнаружение вложенных if, которые можно объединить
		'sonarjs/no-collapsible-if': 'error',

		// Обнаружение дублирующихся строковых литералов
		'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],

		// Обнаружение идентичных функций
		'sonarjs/no-identical-functions': 'error',

		// Обнаружение инвертированных boolean проверок
		'sonarjs/no-inverted-boolean-check': 'error',

		// Обнаружение избыточных boolean литералов
		'sonarjs/no-redundant-boolean': 'error',

		// Обнаружение switch с малым количеством case
		'sonarjs/no-small-switch': 'error',

		// Обнаружение неиспользуемых коллекций
		'sonarjs/no-unused-collection': 'error',

		// Обнаружение бесполезных catch блоков
		'sonarjs/no-useless-catch': 'error',

		// Предпочтение немедленного return
		'sonarjs/prefer-immediate-return': 'error',

		// Предпочтение объектных литералов
		'sonarjs/prefer-object-literal': 'error',

		// Предпочтение одного boolean return
		'sonarjs/prefer-single-boolean-return': 'error',

		// === Security ===

		// Запрет использования незащищенных протоколов
		'sonarjs/no-clear-text-protocols': 'error',
	},
});
