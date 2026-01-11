# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-11

### Added

- ✨ Complete ESLint 9+ flat config system support
- ✨ TypeScript strict type-checked rules from `typescript-eslint`
- ✨ TypeScript stylistic type-checked rules
- ✨ SonarJS plugin integration for bug detection and code smell analysis
- ✨ Import plugin with automatic sorting and validation
- ✨ Prettier configuration export for consistent formatting
- ✨ EditorConfig template for IDE consistency
- ✨ Modular configuration exports (base, typescript, import, sonar)
- ✨ Comprehensive documentation with usage examples
- ✨ Custom naming conventions for TypeScript
- ✨ Strict boolean expressions
- ✨ Switch exhaustiveness checking
- ✨ No variable shadowing
- ✨ Cognitive complexity limits
- ✨ Security rules (no clear-text protocols)

### Configuration Details

#### Base Rules
- ESLint recommended rules
- No console.log in production (warn)
- Prefer const over let
- No var keyword
- Strict equality (===)
- No parameter reassignment

#### TypeScript Rules
- Explicit function return types
- Explicit module boundary types
- Promise function async
- Naming conventions (PascalCase, camelCase, UPPER_CASE)
- Strict boolean expressions
- Switch exhaustiveness
- No shadow variables

#### Import Rules
- Automatic import ordering and grouping
- Alphabetical sorting
- Newlines between groups
- File extension validation
- No duplicate imports
- No circular dependencies
- DevDependencies validation

#### SonarJS Rules
- Bug detection (duplicated branches, identical conditions, etc.)
- Code smell detection (cognitive complexity, duplicate strings, etc.)
- Security (no clear-text protocols)

[1.0.0]: https://github.com/omny/eslint-config/releases/tag/v1.0.0
