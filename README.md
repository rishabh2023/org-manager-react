# 🎨 Organization Manager - Frontend

A modern React application for managing organizations with **Supabase Authentication** and **FastAPI backend integration**. Built with Create React App and styled with **Tailwind CSS**, this frontend provides a seamless user experience for organization CRUD operations.

---

## ✨ Features

- 🔐 **Supabase Authentication** - Secure login/signup with JWT tokens
- 🏢 **Organization Management** - Create, read, update, and delete organizations
- 🎯 **User-Specific Data** - View and manage only your organizations
- 🎨 **Tailwind CSS Styling** - Modern, responsive UI design
- 🔄 **Zustand State Management** - Efficient global state management
- 🛡️ **Protected Routes** - Automatic auth-based navigation
- ⚡ **Fast Performance** - Optimized React components
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

---

## 📂 Project Structure

```
frontend/
├── public/
│   ├── index.html           # HTML template
│   ├── favicon.ico          # App icon
│   ├── manifest.json        # PWA manifest
│   ├── logo192.png          # App logo (small)
│   ├── logo512.png          # App logo (large)
│   └── robots.txt           # SEO robots file
│
├── src/
│   ├── auth/                # Authentication pages
│   │   ├── Login.jsx        # Login page
│   │   └── Register.jsx     # Registration page
│   │
│   ├── organisation/        # Organization module
│   │   ├── components/      # Reusable org components
│   │   │   ├── OrgCard.jsx       # Organization card display
│   │   │   ├── OrgForm.jsx       # Create/Edit form
│   │   │   ├── Toolbar.jsx       # Action toolbar
│   │   │   ├── EmptyState.jsx    # No data placeholder
│   │   │   ├── ErrorBanner.jsx   # Error display
│   │   │   └── Loading.jsx       # Loading spinner
│   │   │
│   │   ├── views/           # Organization pages
│   │   │   ├── OrganizationsList.jsx   # List all orgs
│   │   │   ├── OrganizationCreate.jsx  # Create new org
│   │   │   └── OrganizationEdit.jsx    # Edit existing org
│   │   │
│   │   └── api.js           # Organization API calls
│   │
│   ├── common/              # Shared components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── NotFound.jsx     # 404 page
│   │
│   ├── routes/              # Route protection
│   │   └── ProtectedRoute.jsx  # Auth-required wrapper
│   │
│   ├── store/               # State management
│   │   └── authStore.js     # Zustand auth store
│   │
│   ├── lib/                 # External services
│   │   ├── supabase.js      # Supabase client config
│   │   └── axios.js         # Axios instance config
│   │
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   ├── index.css            # Global styles
│   ├── App.test.js          # App tests
│   ├── setupTests.js        # Test configuration
│   └── reportWebVitals.js   # Performance monitoring
│
├── .env                     # Environment variables (git ignored)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── package-lock.json        # Dependency lock file
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
└── README.md                # This file
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js 14+ and npm
- A running FastAPI backend (see backend README)
- Supabase project with Auth enabled

### 1. Clone Repository

```bash
git clone https://github.com/your-username/org-manager-frontend.git
cd org-manager-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://<project-ref>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend API Configuration
REACT_APP_API_BASE=http://localhost:8000
```

### How to Get These Values:

#### **REACT_APP_SUPABASE_URL**

1. Go to your **Supabase Dashboard**
2. Navigate to **Project Settings → API**
3. Copy the **Project URL** (e.g., `https://abcdefghijklm.supabase.co`)

#### **REACT_APP_SUPABASE_ANON_KEY**

1. In the same **Project Settings → API** page
2. Copy the `anon` `public` key from **Project API keys** section
3. This is a public key safe to use in frontend code

#### **REACT_APP_API_BASE**

- **Development**: `http://localhost:8000` (your local FastAPI server)
- **Production**: `https://your-api-domain.com` (your deployed backend URL)

> ⚠️ **Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

---

## 🚀 Available Scripts

### Development Mode

```bash
npm start
```

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### Eject Configuration

```bash
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

---

## 🏗️ Architecture Overview

### State Management (Zustand)

Located in `src/store/authStore.js`, manages authentication state globally:

```javascript
// Example usage
import { useAuthStore } from "./store/authStore";

const { user, isAuthenticated, login, logout } = useAuthStore();
```

### Protected Routes

The `ProtectedRoute` component (in `src/routes/`) wraps pages that require authentication:

```javascript
<ProtectedRoute>
  <OrganizationsList />
</ProtectedRoute>
```

If user is not authenticated, they're redirected to the login page.

### API Integration

All API calls to the FastAPI backend are handled through:

- `src/lib/axios.js` - Configured axios instance with auth headers
- `src/organisation/api.js` - Organization-specific API functions

### Supabase Client

Configured in `src/lib/supabase.js` using environment variables:

```javascript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
```

---

## 🔐 Authentication Flow

### 1. User Registration (`src/auth/Register.jsx`)

- User fills registration form
- Supabase creates account
- User is redirected to login

### 2. User Login (`src/auth/Login.jsx`)

- User enters credentials
- Supabase validates and returns JWT token
- Token stored in auth store
- User redirected to organizations list

### 3. Authenticated Requests

- Axios interceptor adds JWT to all API requests
- Backend validates token via JWKS
- User-specific data returned

### 4. Logout

- Token cleared from store
- User redirected to login page

---

## 🛠️ Key Components

### Organization Components

| Component       | Location                                  | Purpose                                 |
| --------------- | ----------------------------------------- | --------------------------------------- |
| **OrgCard**     | `organisation/components/OrgCard.jsx`     | Displays individual organization        |
| **OrgForm**     | `organisation/components/OrgForm.jsx`     | Create/Edit form with validation        |
| **Toolbar**     | `organisation/components/Toolbar.jsx`     | Action buttons (Create, Search, Filter) |
| **EmptyState**  | `organisation/components/EmptyState.jsx`  | Shows when no organizations exist       |
| **ErrorBanner** | `organisation/components/ErrorBanner.jsx` | Displays error messages                 |
| **Loading**     | `organisation/components/Loading.jsx`     | Loading spinner component               |

### Organization Views

| View                   | Route                     | Purpose                       |
| ---------------------- | ------------------------- | ----------------------------- |
| **OrganizationsList**  | `/organizations`          | List all user's organizations |
| **OrganizationCreate** | `/organizations/create`   | Create new organization       |
| **OrganizationEdit**   | `/organizations/edit/:id` | Edit existing organization    |

### Common Components

| Component    | Location              | Purpose                       |
| ------------ | --------------------- | ----------------------------- |
| **Navbar**   | `common/Navbar.jsx`   | Top navigation with user menu |
| **NotFound** | `common/NotFound.jsx` | 404 error page                |

---

## 🎨 Styling with Tailwind CSS

This project uses **Tailwind CSS** for styling. Configuration is in `tailwind.config.js`.

### Customizing Theme

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
        secondary: "#your-color",
      },
    },
  },
  plugins: [],
};
```

### Using Tailwind Classes

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold">Hello World</h1>
</div>
```

---

## 📦 Key Dependencies

| Package                   | Purpose                   | Location                 |
| ------------------------- | ------------------------- | ------------------------ |
| **react**                 | UI library                | Core                     |
| **react-router-dom**      | Client-side routing       | Navigation               |
| **@supabase/supabase-js** | Supabase client for auth  | `src/lib/supabase.js`    |
| **axios**                 | HTTP client for API calls | `src/lib/axios.js`       |
| **zustand**               | State management          | `src/store/authStore.js` |
| **tailwindcss**           | Utility-first CSS         | Styling                  |
| **postcss**               | CSS processing            | Build tool               |

### Install Missing Dependencies

If any dependencies are missing:

```bash
npm install @supabase/supabase-js axios zustand react-router-dom
npm install -D tailwindcss postcss autoprefixer
```

---

## 🔒 Environment Variables Reference

Create a `.env.example` file for your team:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# Backend API
REACT_APP_API_BASE=http://localhost:8000
```

### Environment-Specific Configurations

#### Development (`.env.development`)

```env
REACT_APP_API_BASE=http://localhost:8000
```

#### Production (`.env.production`)

```env
REACT_APP_API_BASE=https://api.yourdomain.com
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deployment Platforms

#### **Vercel** (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

#### **Netlify**

```bash
npm install -g netlify-cli
netlify deploy
```

Or connect your GitHub repo for automatic deployments.

#### **GitHub Pages**

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/your-repo",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then deploy:

```bash
npm run deploy
```

---

## 🐛 Troubleshooting

### CORS Issues

**Error:** `Access to fetch blocked by CORS policy`

**Solution:** Ensure your FastAPI backend has CORS configured:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Environment Variables Not Loading

**Error:** `process.env.REACT_APP_SUPABASE_URL is undefined`

**Solution:**

- Ensure variable names start with `REACT_APP_`
- Restart development server after changing `.env`
- Check `.env` file is in project root (not `src/`)

### Tailwind Styles Not Working

**Error:** Styles not applying

**Solution:**

- Ensure `tailwind.config.js` and `postcss.config.js` exist
- Check `index.css` has Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Restart dev server

### Authentication Token Issues

**Error:** `Could not validate credentials`

**Solution:**

- Check that JWT token is being sent in `Authorization` header
- Verify Supabase session is active: `supabase.auth.getSession()`
- Ensure backend `SUPABASE_JWKS_URL` matches your project
- Check token expiration (default: 1 hour)

### Build Fails

**Error:** `npm run build` fails to minify

**Solution:** See [troubleshooting guide](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## 📚 Learn More

### React & Create React App

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Supabase

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

### Tailwind CSS

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### State Management

- [Zustand Documentation](https://github.com/pmndrs/zustand)

### Advanced Topics

- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment Guide](https://facebook.github.io/create-react-app/docs/deployment)

---

## 🧪 Testing

### Running Tests

```bash
npm test
```

Tests are configured in `src/setupTests.js` and individual test files like `src/App.test.js`.

### Writing Tests

Example test structure:

```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

MIT License – see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, Tailwind CSS, and Supabase**

---

## 🔗 Related Projects

- [Backend API Repository](https://github.com/your-username/org-manager-api) - FastAPI backend service

---

## 💡 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env` file with required variables:
  - [ ] `REACT_APP_SUPABASE_URL`
  - [ ] `REACT_APP_SUPABASE_ANON_KEY`
  - [ ] `REACT_APP_API_BASE`
- [ ] Start backend API server on port 8000
- [ ] Run `npm start`
- [ ] Register a new user account
- [ ] Test organization CRUD operations:
  - [ ] Create organization
  - [ ] View organizations list
  - [ ] Edit organization
  - [ ] Delete organization
- [ ] Build for production with `npm run build`

---

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Supabase Documentation](https://supabase.com/docs)
3. Check [Tailwind CSS docs](https://tailwindcss.com/docs) for styling issues
4. Open an issue on GitHub
5. Contact the development team

---

## 🎯 Project Features Breakdown

### Authentication Module (`src/auth/`)

- ✅ User registration with email/password
- ✅ User login with Supabase Auth
- ✅ JWT token management
- ✅ Protected routes
- ✅ Automatic logout on token expiration

### Organization Module (`src/organisation/`)

- ✅ List all user's organizations
- ✅ Create new organization
- ✅ Edit existing organization
- ✅ Delete organization
- ✅ Empty state handling
- ✅ Error handling and display
- ✅ Loading states

### UI/UX Features

- ✅ Responsive navigation bar
- ✅ Mobile-friendly design
- ✅ Loading spinners
- ✅ Error messages
- ✅ Success notifications
- ✅ 404 page
- ✅ Clean, modern Tailwind styling
