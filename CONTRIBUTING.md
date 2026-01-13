# Contributing to QueryStack

Thank you for your interest in contributing to QueryStack! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

### Suggesting Features

We welcome feature suggestions! Please:

- Check existing issues first to avoid duplicates
- Clearly describe the feature and its use case
- Explain why this feature would benefit users

### Code Contributions

1. **Fork the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/QueryStack.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**

   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

5. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Link related issues
   - Add screenshots for UI changes

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types (avoid `any` when possible)
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Add "use client" directive only when needed (interactivity, hooks)
- Keep components focused and reusable
- Use proper naming conventions (PascalCase for components)

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Support dark/light themes

### File Structure

```
components/
├── ComponentName.tsx       # Component file
└── ComponentName.css       # (Optional) Component-specific styles
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_QUESTIONS`)
- **Types/Interfaces**: PascalCase with `I` prefix for interfaces (e.g., `IUser`)

## 🧪 Testing

Before submitting:

1. Test in both light and dark modes
2. Test responsive design (mobile, tablet, desktop)
3. Verify no console errors
4. Test authentication flows
5. Ensure database operations work correctly

## 🔀 Git Workflow

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(auth): add Google OAuth support
fix(profile): resolve image upload issue
docs(readme): update installation instructions
```

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/what-changed` - Refactoring

## 🚫 What Not to Do

- Don't commit `.env.local` files
- Don't commit `node_modules/`
- Don't commit generated files (`.next/`, `build/`)
- Don't make breaking changes without discussion
- Don't submit PRs with linting errors

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] No linting errors (`npm run lint`)
- [ ] Code builds successfully (`npm run build`)
- [ ] Changes are tested locally
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow conventions
- [ ] PR description is clear and detailed

## 🆘 Getting Help

If you need help:

- Check existing documentation
- Search existing issues
- Ask questions in discussions
- Contact maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

**Thank you for contributing to QueryStack! 🎉**
