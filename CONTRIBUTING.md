# Contributing to ELENA AI

Thank you for your interest in contributing to ELENA AI! This document provides guidelines for contributing to the project.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- Clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- Clear and descriptive title
- Detailed description of the proposed functionality
- Explanation of why this enhancement would be useful
- Possible implementation approach

### Code Contributions

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/elena-ai-cyber-assistant.git
   cd elena-ai-cyber-assistant
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm run dev  # Test in development
   npm run build  # Test build
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve bug in component"
   ```

   **Commit Message Format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Build process or tooling changes

6. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable names

```typescript
// Good ✅
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUserProfile = async (userId: string): Promise<UserProfile> => {
  // implementation
};

// Bad ❌
const getUser = async (id: any): Promise<any> => {
  // implementation
};
```

### React Components
- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components focused and small
- Use proper prop typing

```typescript
// Good ✅
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Bad ❌
export const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### Styling
- Use Tailwind CSS utility classes
- Follow existing design patterns
- Maintain consistent spacing and colors
- Add responsive design considerations

```tsx
// Good ✅
<div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors">
  {/* content */}
</div>

// Bad ❌
<div className="flex gap-4" style={{ padding: '16px', background: '#111' }}>
  {/* content */}
</div>
```

### File Organization
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── services/       # API and business logic
├── types/          # TypeScript interfaces
├── utils/          # Helper functions
└── constants/      # Configuration constants
```

## 🧪 Testing Guidelines

While we don't have automated tests yet, please manually test:

1. **Functionality**
   - Feature works as expected
   - No console errors
   - Edge cases handled

2. **Responsiveness**
   - Desktop (1920x1080, 1366x768)
   - Tablet (768x1024)
   - Mobile (375x667, 414x896)

3. **Browser Compatibility**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

## 🔒 Security Guidelines

- Never commit API keys or secrets
- Sanitize user inputs
- Use HTTPS for external requests
- Follow OWASP guidelines for web security
- Report security vulnerabilities privately

## 📝 Documentation

When adding new features:

1. Update README.md if needed
2. Add JSDoc comments to functions
3. Update type definitions
4. Include usage examples

```typescript
/**
 * Sends a message to the AI and streams the response
 * @param content - The message content to send
 * @param temperature - Controls response randomness (0.0-2.0)
 * @returns Promise that resolves when streaming is complete
 */
async function sendMessage(content: string, temperature: number): Promise<void> {
  // implementation
}
```

## 🎨 UI/UX Guidelines

- Maintain the cyberpunk aesthetic
- Use consistent color scheme (cyan/zinc)
- Add smooth transitions and animations
- Ensure accessibility (keyboard navigation, ARIA labels)
- Optimize for performance

## ❓ Questions?

If you have questions about contributing:

- Check existing issues and discussions
- Open a new discussion on GitHub
- Reach out to maintainers

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 🙏 Thank You!

Your contributions make ELENA AI better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**
