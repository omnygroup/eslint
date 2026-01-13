# Workflow Execution Rules

These rules MUST be followed during all workflow testing and validation:

## Rule 1: NO TIMERS
- ❌ FORBIDDEN: `Start-Sleep`, `Wait-Process`, `sleep` commands
- ❌ FORBIDDEN: Manual waiting between checks
- ❌ FORBIDDEN: Time-based polling with delays
- ✅ ALLOWED: Immediate checks and verification only
- ✅ ALLOWED: Running commands without waiting for background operations

## Rule 2: VERIFICATION ONLY THROUGH CLI/MCP
- ✅ ALLOWED: `git fetch` and `git tag` commands to check if new tags exist
- ✅ ALLOWED: `npm view` commands to check registry status
- ✅ ALLOWED: Direct file reads and terminal commands
- ✅ ALLOWED: GitHub API calls (if authentication is available)
- ❌ FORBIDDEN: Polling npm registry with delays

## Rule 3: NPM_TOKEN MUST STAY IN WORKFLOW
- ✅ MUST HAVE: `NPM_TOKEN: ${{ secrets.NPM_TOKEN }}` in release.yml
- ✅ MUST HAVE: NPM authentication configuration in workflow
- ✅ TOKENS ARE 100% VALID: NPM_TOKEN and GITHUB_TOKEN are valid and properly configured in GitHub Secrets
- ✅ TOKENS ARE 100% INSTALLED: Both tokens are already set up in the repository
- ✅ **NPM_TOKEN IS 100% GRANULAR ACCESS TOKEN** (NOT Classic Token)
- ✅ **2FA IS 100% ENABLED** in npm account
- ✅ **TOKEN EXPIRATION: 7 days is sufficient** for publishing - no longer period needed
- ❌ FORBIDDEN: Removing NPM_TOKEN from workflow env vars
- ❌ FORBIDDEN: Attempting OIDC-only approaches without NPM_TOKEN
- ⚠️ REQUIREMENT: Token specifications confirmed:
  - NPM_TOKEN is a Granular Access Token with publish permissions - ALREADY INSTALLED
  - Token has 7 day expiration (sufficient for releases)
  - 2FA is enabled on npm account
  - GITHUB_TOKEN (automatic) has write access to repo - ALREADY INSTALLED
- The token is critical for npm package publishing

## Rule 4: NO LOCAL SEMANTIC-RELEASE EXECUTION (except dry-run)
- ❌ FORBIDDEN: Running `npx semantic-release` locally (without flags)
- ✅ ALLOWED: Running `npx semantic-release --dry-run` for debugging
- ❌ FORBIDDEN: Local testing of actual release process
- ✅ ALLOWED: Only GitHub Actions execution of actual semantic-release
- The actual release MUST happen ONLY in GitHub Actions CI environment

## Rule 5: VERIFY WORKFLOW SUCCESS THROUGH LOGS ONLY - THIS IS STRICT
- 🔴 **СТРОГО (STRICT)**: Проверка workflow ТОЛЬКО через логи самого workflow
- 🔴 **СТРОГО (STRICT)**: Проверка git тегов - это ОТДЕЛЬНЫЙ ШАГ ПОСЛЕ проверки работоспособности workflow
- ✅ **STEP 1 (MANDATORY)**: Verify workflow execution through LOGS ONLY:
  - Read GitHub Actions logs directly via MCP browser (preferred method)
  - OR use `gh run view <run-id> --log` to read actual workflow logs
  - MUST see actual npm publish output in logs
  - MUST confirm semantic-release completed successfully in logs
- ✅ **STEP 2 (SEPARATE STEP)**: ONLY AFTER workflow logs confirm success, check git tags:
  - `git fetch --all --tags`
  - Verify new tag was created
  - This is CONFIRMATION, not primary verification
- ✅ **STEP 3 (FINAL STEP)**: ONLY AFTER both logs and tags confirmed, check npm registry:
  - `npm view @omnygroup/eslint version`
  - This verifies end-to-end success
- ❌ **FORBIDDEN**: Checking git tags BEFORE reading workflow logs
- ❌ **FORBIDDEN**: Checking npm registry BEFORE confirming workflow logs show success
- ❌ **FORBIDDEN**: Only relying on git tags without reading actual workflow logs
- ❌ **FORBIDDEN**: Assuming workflow succeeded just because tag exists
- **MANDATORY SEQUENCE**: workflow logs verification (MCP/gh) → git tags check → npm registry check (STRICTLY in this order)

## Workflow Process (Black Box Approach)

**WORK MUST BE DONE IN BLACK BOX MODE:**
1. 📝 **Edit code/config** - Make necessary changes to source files
2. 🔧 **Commit and push to GitHub** - Send changes via git push
3. ⚙️ **STRICT: Read workflow logs FIRST** - Use MCP browser or gh CLI to read actual workflow execution logs
4. ✅ **STRICT: Verify workflow logs show success** - Confirm npm publish completed in logs
5. 🏷️ **Check git tags as separate step** - ONLY after logs confirmed success, check tags appeared
6. 📦 **Check npm registry as final step** - ONLY after logs + tags confirmed, verify package published

**STRICT Black box principle - Verification through LOGS ONLY**:
- INPUT: Push code to main branch
- **OUTPUT 1 (PRIMARY)**: Read workflow logs → npm publish succeeded? (THIS IS THE MAIN CHECK)
- **OUTPUT 2 (SECONDARY)**: New git tag appeared? (confirmation step)
- **OUTPUT 3 (FINAL)**: Package in npm registry? (end-to-end verification)

**DO NOT:**
- Skip reading workflow logs and jump straight to checking tags
- Assume workflow succeeded just because tag exists
- Check npm registry before reading workflow logs
- Trust only git tags without seeing actual publish output in logs

**STRICTLY DO:**
1. Always read workflow logs FIRST via MCP browser or gh CLI
2. Look for actual npm publish success message in logs
3. Only after logs confirm success - check git tags
4. Only after both logs and tags confirmed - check npm registry

## Rule 6: VERIFY ONLY RELEASE WORKFLOWS - IGNORE NON-RELEASE WORKFLOWS
- 🔴 **STRICT**: Check ONLY the latest `Release` workflow (release.yml)
- 🔴 **STRICT**: Ignore `.github/workflows/release-preview.yml` and other non-release workflows
- ✅ **ALLOWED**: Verify only the Release workflow that publishes to npm registry
- ❌ **FORBIDDEN**: Checking release-preview.yml or other preview/test workflows
- ❌ **FORBIDDEN**: Spending time on workflows that don't publish packages
- **REASON**: Only the Release workflow actually publishes to npm registry
- **HOW TO IDENTIFY**: In GitHub Actions, look for workflow name "Release" in the run list
- **FAILURE DETECTION**: If latest Release workflow shows status "failed", read its logs to understand why
- **PREVIEW WORKFLOWS**: Ignore "release-preview.yml" failures - these are NOT production releases
- **ACTION**: Only verify the workflow that has:
  - Name: "Release"
  - Runs on: push to main branch
  - Triggers: semantic-release with npm publish
  - Purpose: Publish @omnygroup/eslint to npm registry

## Critical Checks - IN STRICT ORDER

**MANDATORY VERIFICATION SEQUENCE:**

1. **PRIMARY CHECK (MUST BE FIRST)**: Read workflow logs
   ```bash
   # Via MCP browser: Navigate to GitHub Actions and read logs
   # OR via gh CLI (if available):
   gh run view <run-id> --log
   ```
   - Open the job detail page in GitHub Actions
   - ⚠️ **IMPORTANT**: If workflow FAILED, the error step will automatically expand
   - ❌ Do NOT manually click "Run semantic-release" step if it shows error
   - The error output is already visible in the expanded section
   - Look for: "Successfully published @omnygroup/eslint@X.X.X"
   - Look for: "Published package to npm"
   - Confirm no npm errors (E403, EOTP, etc.)

2. **SECONDARY CHECK (AFTER LOGS)**: Check git tags
   ```bash
   git fetch --all --tags
   git tag -l --sort=-creatordate
   ```
   - Verify new version tag created
   - This confirms semantic-release ran

3. **FINAL CHECK (AFTER LOGS + TAGS)**: Check npm registry
   ```bash
   npm view @omnygroup/eslint version
   ```
   - Verify package is publicly available
   - Confirms end-to-end success

**THIS SEQUENCE IS MANDATORY AND CANNOT BE CHANGED**
