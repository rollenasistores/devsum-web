# Contributing to DevSum Web

Thank you for your interest in contributing to DevSum Web! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/your-username/devsum-web.git
   cd devsum-web
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

## 🛠️ Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use Prettier for code formatting
- Use ESLint for code linting

### Component Guidelines

- Use functional components with hooks
- Follow the existing component structure
- Use TypeScript interfaces for props
- Keep components focused and reusable

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Use CSS modules for component-specific styles when needed

## 📝 Making Changes

1. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test your changes thoroughly
4. Commit your changes:

   ```bash
   git commit -m "Add: your feature description"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## 🧪 Testing

- Test your changes in different browsers
- Test responsive design on different screen sizes
- Ensure accessibility standards are met

## 📋 Pull Request Guidelines

- Provide a clear description of your changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all checks pass

## 🐛 Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## 📞 Getting Help

- Check existing issues and discussions
- Join our community discussions
- Contact us at support@devsum.dev

## 📄 License

By contributing to DevSum Web, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
