# QueryStack 🚀

A modern Stack Overflow-inspired Q&A platform built with Next.js 16, featuring AI-powered question answering, advanced search, social authentication, and a beautiful dark mode UI.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0-green?style=flat-square&logo=mongodb)
![NextAuth](https://img.shields.io/badge/NextAuth-5.0-purple?style=flat-square)

## ✨ Features

### 🔐 Authentication

- **OAuth Support**: Sign in with GitHub or Google
- **Email/Password**: Traditional credentials-based authentication
- **Secure Sessions**: Protected routes with NextAuth.js v5
- **Profile Management**: Upload profile images and manage user profiles

### 💬 Q&A Platform

- **Ask Questions**: Rich MDX editor for creating detailed questions
- **Answer Questions**: Provide comprehensive answers with markdown support
- **AI-Powered Answers**: Get instant AI-generated answers using OpenAI
- **Voting System**: Upvote/downvote questions and answers
- **Advanced Search**: Filter by tags, users, and content
- **Collections**: Save questions to your personal collections

### 🎨 User Experience

- **Dark/Light Mode**: Theme switching with next-themes
- **Responsive Design**: Mobile-first design approach
- **Tag System**: Organize questions with relevant tags
- **User Profiles**: View user statistics, questions, answers, and tags
- **Activity Tracking**: Monitor user interactions and contributions

### 🔍 SEO & Performance

- **SEO Optimized**: Meta tags, OpenGraph, and Twitter cards on all pages
- **Sitemap**: Auto-generated sitemap for better indexing
- **Robots.txt**: Configured for search engine crawlers
- **Server Components**: Lightning-fast page loads with RSC

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Editor**: [MDXEditor](https://mdxeditor.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

### Backend

- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) with OpenAI

### Tools & Utilities

- **Logging**: [Pino](https://getpino.io/)
- **Date Formatting**: [Day.js](https://day.js.org/)
- **URL Slugs**: [slugify](https://www.npmjs.com/package/slugify)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Code Highlighting**: [rehype-highlight](https://github.com/rehypejs/rehype-highlight)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0 or higher (comes with Node.js)
- **MongoDB**: Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) account
- **Git**: For version control ([Download](https://git-scm.com/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RamRaj110/QueryStack.git
cd QueryStack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string
# Example: mongodb+srv://username:password@cluster.mongodb.net/

# NextAuth
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret

AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret

# OpenAI (for AI-powered answers)
OPENAI_API_KEY=your_openai_api_key

# Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Logging (Optional)
LOG_LEVEL=info
```

### 4. Set Up OAuth Providers

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: QueryStack (or your preferred name)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and **Client Secret** to your `.env.local`

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure the consent screen
6. Select "Web application" as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
8. Copy the **Client ID** and **Client Secret** to your `.env.local`

#### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key to your `.env.local`

### 5. Set Up MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Go to "Database Access" and create a database user
4. Go to "Network Access" and add your IP address (or `0.0.0.0/0` for development)
5. Click "Connect" → "Connect your application"
6. Copy the connection string and replace `<password>` with your database user password
7. Add the connection string to `MONGODB_URI` in `.env.local`

#### Option B: Local MongoDB

1. Install MongoDB locally ([Installation Guide](https://docs.mongodb.com/manual/installation/))
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/codequestiondb`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📚 Project Structure

```
project/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── sign-in/         # Sign in page
│   │   └── sign-up/         # Sign up page
│   ├── (root)/              # Main application routes
│   │   ├── ask-question/    # Create question page
│   │   ├── collection/      # User collections
│   │   ├── community/       # Users listing
│   │   ├── profile/         # User profiles
│   │   ├── question/        # Question details
│   │   ├── tags/            # Tags listing
│   │   └── page.tsx         # Home page
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── editor/              # MDX editor components
│   ├── filters/             # Search and filter components
│   ├── forms/               # Form components
│   ├── navigation/          # Navigation components
│   └── ui/                  # Reusable UI components
├── database/                # Mongoose models
│   ├── account.modules.ts   # Account model
│   ├── answer.modules.ts    # Answer model
│   ├── collection.modules.ts # Collection model
│   ├── question.modules.ts  # Question model
│   ├── tag.modules.ts       # Tag model
│   ├── user.modules.ts      # User model
│   └── vote.modules.ts      # Vote model
├── lib/                     # Utility functions
│   ├── actions/             # Server actions
│   ├── api.ts               # API client
│   ├── mongoose.ts          # MongoDB connection
│   ├── validation.ts        # Zod schemas
│   └── utils.ts             # Helper functions
├── Types/                   # TypeScript types
├── constant/                # Constants and configurations
├── public/                  # Static assets
├── auth.ts                  # NextAuth configuration
└── middleware.ts            # Next.js middleware

```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔑 Key Features Explained

### Authentication Flow

1. Users can sign in using GitHub, Google, or email/password
2. OAuth providers create accounts automatically on first sign-in
3. Email/password requires account creation via sign-up page
4. Sessions are managed securely with NextAuth.js

### Question Workflow

1. **Create**: Users write questions using the MDX editor
2. **Tag**: Add relevant tags for categorization
3. **Publish**: Questions appear on the home feed
4. **Answer**: Other users can provide answers
5. **Vote**: Community votes determine answer quality
6. **AI Answer**: Get instant AI-generated suggestions

### MDX Content

- Questions and answers support rich markdown formatting
- Code blocks with syntax highlighting
- Images, links, and formatted text
- GFM (GitHub Flavored Markdown) support

## 🎨 Customization

### Theme Customization

The project uses Tailwind CSS 4. You can customize the theme by modifying:

- `app/globals.css`: CSS variables and custom styles
- `tailwind.config.ts`: Tailwind configuration

### Adding New Features

1. Create server actions in `lib/actions/`
2. Add API routes in `app/api/`
3. Create database models in `database/`
4. Build UI components in `components/`

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error

```
Error: Please define the MONGODB_URI environment variable inside .env.local
```

**Solution**: Ensure `MONGODB_URI` is properly set in your `.env.local` file

#### OAuth Not Working

**Solution**: Verify that:

- OAuth credentials are correct in `.env.local`
- Callback URLs match exactly in provider settings
- You've restarted the dev server after adding env variables

#### Build Errors

**Solution**:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### ESLint Errors

**Solution**: Run `npm run lint` to identify and fix linting issues

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ram Raj**

- GitHub: [@RamRaj110](https://github.com/RamRaj110)
- Repository: [QueryStack](https://github.com/RamRaj110/QueryStack)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [MongoDB](https://www.mongodb.com/) - Database solution
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [OpenAI](https://openai.com/) - AI-powered features

## 📧 Support

If you have any questions or need help, please:

- Open an issue on [GitHub](https://github.com/RamRaj110/QueryStack/issues)
- Contact the maintainer

---

**Happy Coding! 🎉**
