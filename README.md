# Navadeep's Developer Portfolio

A modern, responsive developer portfolio website built with Flask and React, featuring smooth animations, dark mode, and a clean UI design.

## 🚀 Features

- **Modern Design**: Clean, minimal UI with smooth animations and transitions
- **Fully Responsive**: Optimized for both mobile and desktop devices
- **Dark Mode**: Beautiful dark theme with gradient accents
- **Interactive Components**: Hover effects, loading states, and micro-interactions
- **Project Showcase**: Featured projects with detailed pages
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Fast Loading**: Optimized assets and lazy loading

## 🛠️ Tech Stack

### Backend
- **Flask**: Python web framework
- **Werkzeug**: WSGI utility library

### Frontend
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful icon library
- **Babel Standalone**: In-browser JSX transformation

## 📁 Project Structure

```
portfolio/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   ├── index.html        # Main portfolio page
│   └── project.html      # Project detail pages
├── static/
│   ├── css/              # Custom CSS files
│   └── js/               # JavaScript files
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 📱 Sections

### 1. Hero Section
- Name and title display
- Professional tagline
- Call-to-action buttons (View Projects, Resume, GitHub)
- Smooth fade-in animations

### 2. Projects Section
- **CivicEye AI** (Featured): AI-powered civic issue detection
- **Smart Expense Tracker**: Full-stack expense management
- **Real-time Chat App**: Live messaging application
- Project cards with tech stack and features
- Links to GitHub repositories and live demos

### 3. Skills Section
- Frontend technologies (React, JavaScript, HTML/CSS, Tailwind)
- Backend technologies (Python, Flask, Node.js, MongoDB)
- Development tools (Git, Firebase, VS Code, Docker)

### 4. About Section
- Professional summary
- Focus on problem-solving and real-world applications

### 5. Why Hire Me Section
- Scalability focus
- Real-world project experience
- Fast learning ability
- Clean code practices

### 6. Contact Section
- Functional contact form
- Social links (GitHub, LinkedIn)
- Email contact information

## 🎨 Design Features

### Animations & Transitions
- Fade-in effects on scroll
- Slide-up animations for content
- Smooth hover states on cards and buttons
- Loading spinner for async operations
- Bounce animation for scroll indicators

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interface elements

### UI Components
- Gradient text effects
- Glass morphism effects
- Card hover animations
- Custom loading states
- Interactive skill icons

## 🔧 Customization

### Adding New Projects

1. **Update the projects array** in `templates/index.html`:
   ```javascript
   const projects = [
     // ... existing projects
     {
       id: 'your-project-id',
       title: 'Your Project Title',
       description: 'Project description...',
       tech: ['Tech1', 'Tech2'],
       features: ['Feature1', 'Feature2'],
       featured: false,
       github: 'https://github.com/your-username/your-repo',
       demo: 'https://your-demo-url.com'
     }
   ];
   ```

2. **Add project details** in `templates/project.html`:
   ```javascript
   const projectsData = {
     'your-project-id': {
       title: 'Your Project Title',
       // ... project details
     }
   };
   ```

### Customizing Colors

Modify the Tailwind config in the HTML files:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-secondary-color',
      }
    }
  }
}
```

### Updating Personal Information

Edit the following sections:
- **Hero Section**: Name, title, and tagline
- **Contact Section**: Email and social links
- **About Section**: Professional summary
- **Skills Section**: Add/remove skills as needed

## 🌐 Deployment

### Render (Recommended)

1. **Create a Render account** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Environment Variables:
     - `RENDER`: `true`
4. **Deploy** - Render will automatically build and deploy your app

### Heroku

1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create app: `heroku create your-app-name`
4. Deploy: `git push heroku main`

### Vercel

1. Install Vercel CLI
2. Run: `vercel`
3. Follow the prompts

### PythonAnywhere

1. Create a PythonAnywhere account
2. Upload your files
3. Install requirements in the virtual environment
4. Configure the web app

## 📋 Render Deployment Checklist

- [ ] Create Render account
- [ ] Push code to GitHub
- [ ] Create Web Service on Render
- [ ] Set environment variables
- [ ] Configure build and start commands
- [ ] Test deployment
- [ ] Set up custom domain (optional)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Contact

- **Email**: navadeep@example.com
- **GitHub**: [github.com/navadeep](https://github.com/navadeep)
- **LinkedIn**: [linkedin.com/in/navadeep](https://linkedin.com/in/navadeep)

---

Built with ❤️ using Flask, React, and Tailwind CSS
