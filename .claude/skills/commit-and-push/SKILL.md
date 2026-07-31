---
name: commit-and-push
description: Use when the user asks to commit changes, commit and push, or wants staged/unstaged work turned into git commit(s) following this repo's commit conventions. Splits unrelated changes into separate commits and confirms before pushing.
---

Follow this workflow whenever the user asks to commit (and optionally push) changes in this repo, instead of improvising commit conventions.

## Steps

1. Run in parallel: `git status` (never `-uall`), `git diff` (staged + unstaged), and `git log --oneline -n 20` for style reference.
2. Group the changed files by logical concern (feature area, bug fix, styling, refactor, etc.). Do not lump unrelated changes into one commit — see "Splitting changes" below.
3. For each group, in order:
   - Stage only the files in that group, by name (never `git add -A` / `git add .`).
   - Draft a commit message following the "Commit message rules" below.
   - Create the commit.
4. After all commits are made, run `git status` and `git log --oneline` to show the result.
5. Report the split rationale to the user in one line per commit, e.g. "split into 2 commits: fix for the comments service, styling fixes for the post modal."
6. **Stop and ask before pushing.** Only run `git push` after the user explicitly confirms. Never force-push, and never push to a remote/branch other than the current branch's upstream unless the user explicitly says so.

## Commit message rules

Pulled directly from this repo's `CLAUDE.md` — follow these exactly, don't fall back to generic Conventional Commits:

- Format: `<prefix>: <summary>`.
- Prefixes: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`.
- Summary line max 100 characters total (prefix included).
- No body/footer — **including no `Co-Authored-By` trailer** — unless the user explicitly asks for one. This intentionally overrides the generic default of always appending a `Co-Authored-By: Claude` line.
- Use a heredoc for message construction to preserve formatting:

```sh
git commit -m "$(cat <<'EOF'
<prefix>: <summary>
EOF
)"
```

## Splitting changes

- Split into separate commits when changes touch unrelated features, files, or concerns (e.g. a bug fix in one component and a styling tweak in another).
- Keep as one commit when changes are all part of the same logical unit, even if they span multiple files (e.g. a feature plus its schema plus its test).

## Guidelines / safety

- Never update git config, never use `--no-verify` / `--no-gpg-sign`, never `git push --force` or run destructive resets unless the user explicitly requests it.
- Prefer creating a new commit over amending, unless the user explicitly asks to amend.
- Before staging, check the `git status` output for files that might hold secrets (`.env`, `credentials.json`, etc.) and confirm with the user before including them.
- If a pre-commit hook fails, fix the underlying issue and create a new commit — don't bypass it with `--no-verify`.
