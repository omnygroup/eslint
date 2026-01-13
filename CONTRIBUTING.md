# Внесение вклада в @omnygroup/eslint

## Содержание

- [Conventional Commits](#conventional-commits)
- [Процесс разработки](#процесс-разработки)
- [Автоматические релизы](#автоматические-релизы)
- [Устранение проблем](#устранение-проблем)

## Conventional Commits

Этот проект использует [Conventional Commits](https://www.conventionalcommits.org/) формат для автоматического определения версии и генерации changelog'а.

### Формат коммита

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Типы коммитов

- **feat**: новая функция → **MINOR версия** (1.0.0 → 1.1.0)
- **fix**: исправление ошибки → **PATCH версия** (1.0.0 → 1.0.1)
- **BREAKING CHANGE**: несовместимые изменения → **MAJOR версия** (1.0.0 → 2.0.0)
- **docs**: изменения документации (без версионирования)
- **style**: форматирование кода (без версионирования)
- **refactor**: переработка кода (без версионирования)
- **perf**: улучшение производительности → **PATCH версия**
- **test**: добавление/изменение тестов (без версионирования)
- **chore**: изменения зависимостей/инструментов (без версионирования)
- **ci**: изменения CI/CD конфигурации (без версионирования)

### Примеры коммитов

#### Новая функция
```
feat: добавить новую ESLint конфигурацию для React

Добавлена конфигурация со всеми необходимыми плагинами
для проектов на React.
```
Результат: версия 1.0.0 → 1.1.0

#### Исправление ошибки
```
fix: исправить конфликт правил в base конфигурации
```
Результат: версия 1.0.0 → 1.0.1

#### Несовместимые изменения
```
feat: переписать структуру конфигов

BREAKING CHANGE: путь импорта изменился с ./configs/base на ./base
```
Результат: версия 1.0.0 → 2.0.0

## Процесс разработки

### 1. Создание ветки для разработки

```bash
git checkout -b feature/your-feature-name
```

### 2. Внесение изменений

Вносите необходимые изменения в конфигурации ESLint.

### 3. Проверка коммитов

Перед push'ем убедитесь что:
- Ваши коммиты следуют [Conventional Commits](#conventional-commits) формату
- commitlint автоматически проверит сообщения коммитов
- Если коммит не соответствует формату, он будет отклонён

```bash
# commitlint проверит автоматически при коммите
git commit -m "feat: добавить новую конфигурацию"
```

### 4. Создание Pull Request

1. Push ветка на GitHub
2. Создайте Pull Request на `main` ветку
3. GitHub Actions автоматически запустит **Release Preview**
4. В комментарии PR вы увидите какая версия будет создана при merge'е

### 5. Merge и автоматический релиз

После merge PR в `main`:
1. GitHub Actions автоматически запустит Release workflow
2. semantic-release определит номер новой версии
3. Обновится CHANGELOG.md
4. Пакет будет опубликован в npm registry
5. Будет создан GitHub Release с notes

## Автоматические релизы

### Как это работает?

```
коммиты с Conventional Commits → semantic-release определяет версию → 
обновляет CHANGELOG → публикует в npm → создаёт GitHub Release
```

### Пример сценария

1. Текущая версия: `1.0.0`
2. Вы добавили 2 фичи и 1 исправление:
   - `feat: добавить конфиг A`
   - `feat: добавить конфиг B`
   - `fix: исправить конфиг C`
3. semantic-release анализирует коммиты и определяет: **MINOR версия**
4. Новая версия становится: `1.1.0`
5. CHANGELOG.md обновляется автоматически
6. Пакет публикуется в npm с провенансом (подтверждение подлинности)

### GitHub Actions Workflows

#### Release (главный релиз)
- **Триггер**: push на `main` ветку
- **Что делает**: 
  - Проверяет npm audit
  - Запускает semantic-release
  - Публикует в npm с OIDC провенансом
  - Создаёт GitHub Release

#### Release Preview (предпросмотр на PR)
- **Триггер**: создание/обновление PR на `main`
- **Что делает**:
  - Запускает semantic-release в dry-run режиме
  - Показывает какая будет следующая версия
  - Комментирует PR с результатами

## Устранение проблем

### Коммит отклонён commitlint'ом

**Ошибка**: `commit-msg` hook отклонил коммит

**Причина**: сообщение коммита не соответствует Conventional Commits формату

**Решение**:
```bash
# Переделайте последний коммит с правильным форматом
git commit --amend -m "type(scope): правильное сообщение"
```

**Правильный формат**:
```
type: краткое описание (без точки в конце)
```

Где `type` один из: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

### Release не произошёл после merge PR

**Возможные причины**:

1. **PR не был merge'ен в `main`** —릴리스 запускается только при push в `main`
2. **Коммиты не Conventional** — если все коммиты были `docs`, `style`, `chore` и т.д. (без версионирования), релиз не создаётся
3. **GitHub Actions не выполнился** — проверьте вкладку Actions в репозитории на ошибки

**Проверка статуса**:
```bash
# Посмотрите логи в GitHub Actions
# Settings → Actions → Recent Workflow Runs
```

### Ошибка при публикации в npm

Если выпечатается `403 Forbidden` ошибка:

1. **Trusted Publishing не настроен** — убедитесь на npmjs.com что организация `@omnygroup` имеет GitHub как Trusted Publisher
2. **OIDC токен не сгенерирован** — проверьте что в workflow есть `permissions: id-token: write`
3. **Неверный scope пакета** — убедитесь что `package.json` имеет `"name": "@omnygroup/eslint"`

### Версия не обновляется

Проверьте что:
1. Коммиты следуют Conventional Commits формату (`feat:`, `fix:` и т.д.)
2. Не все коммиты являются типами без версионирования (`docs`, `style`, `chore`)
3. В PR preview показана ожидаемая версия перед merge'ем

## Дополнительные ресурсы

- [Conventional Commits](https://www.conventionalcommits.org/)
- [semantic-release документация](https://semantic-release.gitbook.io/)
- [commitlint документация](https://commitlint.js.org/)
- [Trusted Publishing (npm)](https://docs.npmjs.com/about/trusted-publishers)
- [Provenance в npm](https://docs.npmjs.com/generating-provenance-statements)

## Вопросы?

Создайте issue на GitHub с описанием проблемы.
