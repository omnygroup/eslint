# @omny/eslint

Shared ESLint configuration for Omny projects with TypeScript, SonarJS, and Prettier support.

## Features

- ✅ **Modern ESLint 9+** - Built on the latest ESLint flat config system
- 🔒 **Strict TypeScript** - Comprehensive type-checked rules for type safety
- 🔍 **SonarJS Integration** - Advanced bug detection and code smell analysis
- 📦 **Import Management** - Automatic import sorting and validation
- 🎨 **Prettier Compatible** - Optional Prettier configuration export
- ⚙️ **EditorConfig Template** - Consistent editor settings across IDEs
- 🧩 **Modular** - Use all rules or pick specific configurations

## Installation

```bash
npm install --save-dev @omny/eslint eslint typescript
```

### Peer Dependencies

This package requires:
- `eslint` ^9.0.0
- `typescript` ^5.0.0

## Usage

### Basic Usage (Recommended)

Import the complete configuration in your `eslint.config.mjs`:

```javascript
import omnyConfig from '@omny/eslint';

export default [
	...omnyConfig,
	// Your custom rules here
];
```

### Modular Usage

Import only the configurations you need:

```javascript
import baseConfig from '@omny/eslint/base';
import typescriptConfig from '@omny/eslint/typescript';
import importConfig from '@omny/eslint/import';
import sonarConfig from '@omny/eslint/sonar';

export default [
	...baseConfig,
	...typescriptConfig,
	importConfig,
	sonarConfig,
	// Your custom rules here
];
```

### With Custom Overrides

```javascript
import omnyConfig from '@omny/eslint';

export default [
	...omnyConfig,
	{
		// Override specific rules for your project
		rules: {
			'no-console': 'off', // Allow console in this project
		},
	},
];
```

## Prettier Integration

This package includes an optional Prettier configuration that matches the ESLint rules.

### Option 1: Using .prettierrc.js (Recommended)

Create a `.prettierrc.js` file in your project root:

```javascript
import prettierConfig from '@omny/eslint/prettier';

export default prettierConfig;
```

### Option 2: Extending with Custom Options

```javascript
import prettierConfig from '@omny/eslint/prettier';

export default {
	...prettierConfig,
	printWidth: 100, // Override specific options
	semi: false,     // Customize as needed
};
```

### Option 3: Using package.json

Add to your `package.json`:

```json
{
	"prettier": "@omny/eslint/prettier"
}
```

### Prettier Configuration Details

The included Prettier configuration:

```javascript
{
	semi: true,
	trailingComma: 'es5',
	singleQuote: true,
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	arrowParens: 'always',
	endOfLine: 'lf',
}
```

## EditorConfig

An EditorConfig template is included in `templates/.editorconfig`. Copy it to your project root:

```bash
cp node_modules/@omny/eslint/templates/.editorconfig .editorconfig
```

Or create `.editorconfig` manually:

```ini
root = true

[*.{js,ts,json,md}]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## Included Configurations

### Base Configuration

- ESLint recommended rules
- Common code quality rules
- No console.log in production
- Prefer const over let
- Strict equality (===)
- No parameter reassignment

### TypeScript Configuration

- Strict type-checked rules
- Stylistic type-checked rules
- Explicit function return types
- Explicit module boundary types
- Naming conventions (PascalCase for classes, camelCase for functions, etc.)
- Strict boolean expressions
- Switch exhaustiveness checking
- No variable shadowing

### Import Configuration

- Automatic import ordering and grouping
- Alphabetical sorting within groups
- Newlines between import groups
- File extension validation
- No duplicate imports
- No circular dependencies
- DevDependencies validation

### SonarJS Configuration

#### Bug Detection
- No duplicated branches
- No element overwrite
- No identical conditions
- No identical expressions
- No one-iteration loops

#### Code Smell Detection
- Cognitive complexity limit (15)
- Max switch cases (30)
- No collapsible if statements
- No duplicate strings (threshold: 3)
- No identical functions
- Prefer immediate return
- Prefer single boolean return

#### Security
- No clear-text protocols

## Configuration Exports

| Export | Description |
|--------|-------------|
| `@omny/eslint` | Complete configuration (recommended) |
| `@omny/eslint/base` | Base ESLint rules only |
| `@omny/eslint/typescript` | TypeScript rules only |
| `@omny/eslint/import` | Import plugin rules only |
| `@omny/eslint/sonar` | SonarJS rules only |
| `@omny/eslint/prettier` | Prettier configuration |
| `@omny/eslint/all` | Alias for main configuration |

## TypeScript Configuration

This package requires a `tsconfig.json` in your project root. The TypeScript parser uses `project: true` to automatically detect your TypeScript configuration.

Example `tsconfig.json`:

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules", "dist"]
}
```

## Scripts

Add these scripts to your `package.json`:

```json
{
	"scripts": {
		"lint": "eslint src --ext .ts",
		"lint:fix": "eslint src --ext .ts --fix",
		"format": "prettier --write \"src/**/*.ts\"",
		"format:check": "prettier --check \"src/**/*.ts\""
	}
}
```

## Migration from Existing Configuration

### From eslint.config.mjs

If you have an existing `eslint.config.mjs`, replace it with:

```javascript
import omnyConfig from '@omny/eslint';

export default [
	...omnyConfig,
	// Keep your project-specific rules here
];
```

### From .eslintrc.json (Legacy)

1. Remove `.eslintrc.json`
2. Create `eslint.config.mjs` with the configuration above
3. Update your scripts to use the new config

## Customization

### Disabling Specific Rules

```javascript
import omnyConfig from '@omny/eslint';

export default [
	...omnyConfig,
	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'sonarjs/cognitive-complexity': ['error', 20], // Increase limit
		},
	},
];
```

### Project-Specific Ignore Patterns

```javascript
import omnyConfig from '@omny/eslint';
import { globalIgnores } from 'eslint/config';

export default [
	globalIgnores([
		'**/generated/**',
		'**/vendor/**',
	]),
	...omnyConfig,
];
```

### Different Rules for Tests

```javascript
import omnyConfig from '@omny/eslint';

export default [
	...omnyConfig,
	{
		files: ['**/*.test.ts', '**/*.spec.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'sonarjs/no-duplicate-string': 'off',
		},
	},
];
```

## Troubleshooting

### "Parsing error: Cannot read file 'tsconfig.json'"

Make sure you have a `tsconfig.json` in your project root. The TypeScript parser needs it to perform type-aware linting.

### "Unable to resolve path to module"

Install `eslint-import-resolver-typescript`:

```bash
npm install --save-dev eslint-import-resolver-typescript
```

### Prettier and ESLint Conflicts

This configuration includes `eslint-config-prettier` to disable conflicting rules. Make sure Prettier runs after ESLint:

```json
{
	"scripts": {
		"lint": "eslint src --ext .ts --fix && prettier --write \"src/**/*.ts\""
	}
}
```

## Contributing

Issues and pull requests are welcome! Please ensure your changes:

1. Follow the existing code style
2. Include tests if applicable
3. Update documentation as needed

## License

MIT

## Changelog

### 1.0.0 (Initial Release)

- ✨ Complete ESLint 9+ configuration
- ✨ TypeScript strict type-checked rules
- ✨ SonarJS integration for bug detection
- ✨ Import plugin with automatic sorting
- ✨ Prettier configuration export
- ✨ EditorConfig template
- ✨ Modular configuration exports

## Related Packages

- [eslint](https://eslint.org/) - Pluggable JavaScript linter
- [typescript-eslint](https://typescript-eslint.io/) - TypeScript support for ESLint
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs) - SonarJS rules
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - Import/export validation
- [prettier](https://prettier.io/) - Opinionated code formatter
