# Version Control (Git & GitHub) — Learning Notes.

**Week 2 Deliverable **
Repository: `flexisaf-fe` — practiced on the `week-02-version-control` branch

---

## 1. Why Version Control Matters

Git tracks every change made to a codebase over time, and GitHub hosts that history online so teams can collaborate without overwriting each other's work. Every action below was performed hands-on in this repo — not just read about.

---

## 2. Core Concepts Covered

### Repositories — Creating & Cloning

A **repository** ("repo") is a project folder that Git is tracking. It can live locally on your machine and/or remotely on GitHub.

```bash
# Clone an existing remote repo to your machine
git clone https://github.com/brahimlawal/flexisaf-fe.git
cd flexisaf-fe
```

Cloning downloads the full project **and** its entire commit history — not just a snapshot.

---

### Branches — Creating, Renaming, Merging

A **branch** is an independent line of development. The `main` branch is your stable, "official" version — you never edit it directly. Instead, you branch off, make changes, and merge back in once the work is reviewed.

```bash
# Create AND switch to a new branch in one command
git checkout -b week-02-version-control-b

# Rename a branch
git branch -m week-02-version-control week-2-github-practice
```

Branching means multiple pieces of work (or multiple people) can happen at once without breaking `main`.

---

### Commits — Committing & Reverting

A **commit** is a saved checkpoint of your changes, with a message describing what changed and why.

```bash
git add notes.md              # stage the file
git commit -m "Add Week 2 notes"   # save the checkpoint
```

If a commit turns out to be wrong, `git revert` undoes it **without erasing history** — it adds a new commit that reverses the change, which is safer than deleting commits outright:

```bash
git log --oneline             # find the commit hash you want to undo
git revert <commit-hash>
```

---

### Pushing & Pulling (Upstream & Downstream)

- **Push** → send your local commits up to GitHub
- **Pull** → bring GitHub's latest commits down to your machine

```bash
# Push a new branch and set it to track the remote (upstream)
git push -u origin week-02-version-control

# Later pushes only need:
git push

# Pull the latest changes from main into your local copy
git checkout main
git pull origin main
```

---

### Fetching vs Pulling

`git fetch` downloads new commits from GitHub **without** merging them into your current branch — it just lets you see what's changed. `git pull` does a fetch **and** a merge in one step.

```bash
git fetch origin      # see what's new, don't touch my files yet
git pull origin main  # fetch + merge in one go
```

Fetching first is the safer habit when working on a shared repo — you can review incoming changes before merging them in.

---

### Pull Requests — Creating, Reviewing, Merging, Reverting

A **Pull Request (PR)** is a request to merge one branch into another, done through GitHub's UI so changes can be reviewed before joining `main`.

```
1. Push your branch → GitHub shows "Compare & pull request"
2. Click it, add a description of what changed and why
3. Click "Create pull request"
4. Review the diff (or have someone else review it)
5. Click "Merge pull request"
```

If a merged PR introduces a bug, you can revert it straight from GitHub's PR page ("Revert" button) — this creates a new PR that undoes the merge, keeping full history intact.

---

## 3. Hands-On Summary (What Was Actually Done)

| Action | Command / Location |
|---|---|
| Created repo | `flexisaf-fe` on GitHub |
| Cloned repo | `git clone ...` |
| Created branch | `git checkout -b week-02-version-control-b` |
| Added & committed file | `git add` + `git commit` |
| Pushed upstream | `git push -u origin week-02-version-control` |
| Opened & merged PR | GitHub UI |
| Fetched & pulled main | `git fetch` / `git pull origin main` |
| Renamed branch | `git branch -m ...` |
| Reverted a commit | `git revert <hash>` |

This satisfies the deliverable: *"Setting up of repository using command line and practice of a few Git Commands"* — every command above was run against the live `flexisaf-fe` repo.

---

## 4. Resources

- [Atlassian — Git Glossary](https://www.atlassian.com/git/glossary)
- [LoginRadius — Git Commands Engineering Blog](https://www.loginradius.com/blog/engineering/git-commands/)