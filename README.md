# 📸 eBay Photo Fixer

> Automatically detect and fix photo orientation issues in your eBay listings with AI-powered image processing

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-blue.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Overview

eBay Photo Fixer is a sophisticated web application that helps eBay sellers automatically detect and correct photo orientation issues in their listings. With an intuitive interface and smart image processing capabilities, it streamlines the process of maintaining professional-looking product photos.

## ✨ Features

### 🔍 **Smart Listing Scanner**
- 🤖 Automatically scans your eBay account for listings with orientation issues
- 📊 Intelligent detection algorithm identifies problematic photos
- 📋 Organized display of all findings with detailed listing information

### 🖼️ **Advanced Photo Processing**
- 🔄 Automatic orientation correction using AI algorithms
- 📱 Drag-and-drop photo upload interface
- 🎯 Real-time photo processing with preview capabilities
- 🖱️ Before/after comparison views

### 📝 **Listing Management**
- ✅ Batch selection of listings to fix
- 🎯 Targeted fixes for specific orientation issues
- 📈 Progress tracking throughout the fixing process
- 💾 Safe preview before applying changes

### 🎨 **User Experience**
- 🎯 Clean, professional eBay-inspired interface
- 📱 Fully responsive design for all devices
- ⚡ Fast, smooth animations and transitions
- 🔔 Real-time feedback and status updates

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite for lightning-fast development
- **Styling**: Tailwind CSS with custom eBay design tokens
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks and context
- **Routing**: React Router DOM
- **Image Processing**: HTML5 Canvas API
- **Notifications**: Sonner toast notifications

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🎯 Usage

### Getting Started

1. **Login to eBay** 📝
   - Enter your eBay credentials on the login page
   - The app will securely connect to your eBay account

2. **Browse Your Listings** 🔍
   - View all your listings or filter to show only those with orientation issues
   - Select the listings you want to fix
   - Review the detected problems before proceeding

3. **Upload and Process Photos** 📸
   - Drag and drop your corrected photos or select them manually
   - The system automatically processes and corrects orientation
   - Preview the before/after comparison

4. **Apply Changes** ✅
   - Review all changes before applying
   - Confirm which listings to update
   - Track the progress as changes are applied to your eBay listings

### Key Workflows

#### 🔄 **Automatic Orientation Detection**
The app uses advanced algorithms to detect common orientation issues:
- Sideways photos (90° rotations needed)
- Upside-down images (180° rotations)
- Mirror images and flips

#### 📊 **Batch Processing**
- Process multiple listings simultaneously
- Smart queue management for large batches
- Progress tracking and error handling

#### 🎨 **Preview System**
- Side-by-side before/after comparisons
- Zoom functionality for detailed inspection
- Undo/redo capabilities before final application

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── ListingBrowser.tsx    # eBay listing browser
│   ├── PhotoUploader.tsx     # Photo upload interface
│   ├── ListingSelector.tsx   # Listing selection component
│   └── LoginForm.tsx         # eBay authentication
├── pages/              # Application pages
│   ├── Index.tsx       # Main application page
│   └── NotFound.tsx    # 404 error page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── index.css          # Global styles and design tokens
└── main.tsx           # Application entry point
```

## 🎨 Design System

The application uses a carefully crafted design system inspired by eBay's visual identity:

### Color Palette
- **Primary**: eBay blue (#0064D2)
- **Secondary**: Complementary grays and whites
- **Status Colors**: Success green, warning yellow, error red

### Typography
- Clean, modern font stack optimized for readability
- Consistent sizing scale and spacing

### Components
- Custom styled shadcn/ui components
- Consistent interaction patterns
- Accessibility-first design approach

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Consistent code style and error detection
- **Prettier**: Automatic code formatting

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Zero-config deployment (recommended)
- **Netlify**: Easy static site hosting
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3**: Scalable static website hosting

### Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/a596b515-2333-4259-8d27-ba6a1aa0994f) and click on Share → Publish for instant deployment.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for all new code
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

### Bug Reports
If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **eBay**: For providing the inspiration and visual design language
- **shadcn/ui**: For the excellent component library
- **Radix UI**: For accessible, unstyled UI primitives
- **Tailwind CSS**: For the utility-first CSS framework
- **React Team**: For the amazing React library

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ebay-photo-fixer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/ebay-photo-fixer/discussions)
- 📧 **Email**: support@yourapp.com

## 🌟 Star the Project

If you find this project useful, please consider giving it a star on GitHub! It helps others discover the project and shows appreciation for the work.

---

**Disclaimer**: This application is not officially affiliated with eBay Inc. eBay is a trademark of eBay Inc.
