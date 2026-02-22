# Contributing to the ISC2 NJ Mentoring Toolkit

## Development Workflow

### 1. Issue Tracking

All changes should have a corresponding GitHub Issue created before or after the work is done — bug fixes, features, refactors, and documentation updates all count. Reference the issue number in commit messages:

```
fix: dead links in data files (#12)
feat: add session export to CSV (#15)
docs: update whitelabel guide (#18)
```

### 2. Committing to Main

Small changes (bug fixes, content updates, docs) can be committed directly to `main` with a clear commit message.

### 3. Feature Branches and Pull Requests

Large or risky changes (TypeScript migration, major refactors, new features) must use a feature branch and Pull Request before merging to `main`.

### 4. Branch Naming Conventions

| Prefix       | Use for                          |
| ------------ | -------------------------------- |
| `feature/`   | New functionality                |
| `fix/`       | Bug fixes                        |
| `docs/`      | Documentation changes            |
| `refactor/`  | Code restructuring without behavior changes |

Examples: `feature/csv-export`, `fix/navbar-mobile`, `docs/readme-update`, `refactor/typescript-migration`.

### 5. TypeScript Migration

Before starting a TypeScript migration, always create a branch called `refactor/typescript-migration`. This is a large, cross-cutting change that must go through a Pull Request.

### 6. JSON Import Security

The JSON import feature validates file structure and shape but does **not** sanitize content. Any future changes to import handling should include a content sanitization review.

### 7. Pre-Release Checks

Run the link checker before any release to catch dead external URLs:

```bash
npm run check-links
```

### 8. AI-Assisted Development

When using Claude Code (or any AI tool) on this project, the tool must always:

- **Show new files** before creating them
- **Show replacements** before applying them
- **Show the plan** before executing it
- **Convert or refactor one file at a time**, showing each before applying
- **Never apply multiple changes in bulk** without review
- **Create GitHub Issues** for all changes
- **Use branches** for large changes
- **Run `npm run check-links`** before any release

No change should be applied to the codebase without the developer reviewing and explicitly approving it first. This applies to all operations — creates, edits, deletes, and refactors.
