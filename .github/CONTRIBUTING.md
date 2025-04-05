# Contributing Guide

Thank you for your interest in contributing to this project!
We welcome bug reports, feature requests, documentation improvements, and code contributions.

---

## 📌 Prerequisites

- Node.js (preferably latest LTS)
- pnpm / npm / yarn (project uses: **[specify package manager here]**)
- Git

Clone the repository:

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
pnpm install # or npm install / yarn
```

---

## 🛠️ Development Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes.
3. Ensure tests pass:
   ```bash
   pnpm test
   ```

4. Lint and format:
   ```bash
   pnpm lint
   pnpm format
   ```

5. Commit using clear messages:
   ```bash
   git commit -m "feat: add support for custom DOCX footers"
   ```

6. Push and open a pull request against the `main` branch.

---

## 🧪 Running Tests

Unit tests are located in the `tests/` directory.

To run tests:
```bash
pnpm test
```

To watch tests during development:
```bash
pnpm test:watch
```

---

## ✍️ Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) to keep a clean history and enable automated releases.

Example formats:
- `feat: add PDF watermark option`
- `fix: handle null input in DOCX generator`
- `docs: update usage example in README`

---

## 🔍 Submitting Issues

If you're reporting a bug or requesting a feature, please use the appropriate issue template:

- 🐛 [Bug Report (User)](.github/ISSUE_TEMPLATE/1-bug-report-user.yml)
- 🧪 [Bug Report (Dev)](.github/ISSUE_TEMPLATE/2-bug-report-dev.yml)
- 💡 [Feature Request](.github/ISSUE_TEMPLATE/3-feature-request.yml)
- ❓ [General Question](.github/ISSUE_TEMPLATE/4-general-question.yml)

---

## 🤝 Code of Conduct

By participating, you agree to follow our [Code of Conduct](.github/CODE_OF_CONDUCT).

---

## 🙏 Thank You

We appreciate your time and contributions to improving this project!
