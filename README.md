# 🤖 NoteAI - AI-Powered Note-Taking Application

**Your intelligent companion for smart note-taking with AI-powered features!** ✨

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-5.2.1-green?logo=django)](https://www.djangoproject.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple?logo=openai)](https://openai.com/)

🔗 **Live Repository**: [https://github.com/shree-bd/NoteAI](https://github.com/shree-bd/NoteAI)

---

## 🌟 **What Makes NoteAI Special?**

NoteAI transforms your note-taking experience with cutting-edge AI features that help you write better, organize smarter, and be more productive!

### 🎯 **Key Features**

#### **🧠 AI-Powered Intelligence**
- **Smart Auto-Tagging**: AI automatically suggests relevant categories
- **Content Enhancement**: Improve grammar, style, and clarity with one click
- **Smart Title Generation**: Generate perfect titles from your content
- **AI Content Analysis**: Get intelligent summaries and writing suggestions

#### **📝 Rich Note-Taking Experience**
- **Rich Text Editor**: Format text with headers, lists, links, and styling
- **Real-time Search**: Find notes instantly across all content
- **Categories & Organization**: Work, Personal, Ideas, Projects, and more
- **Favorites & Archives**: Pin important notes and archive old ones

#### **🎨 Modern & Beautiful UI**
- **Dark/Light Mode**: Switch themes seamlessly
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Beautiful transitions powered by Framer Motion
- **Professional Interface**: Clean, intuitive, and user-friendly

#### **🔐 Secure & Personal**
- **JWT Authentication**: Secure user accounts
- **Private Notes**: Your data is yours alone
- **RESTful API**: Modern, scalable backend architecture

---

## 🚀 **Quick Start**

### **Prerequisites**
- Python 3.8+ 
- Node.js 16+
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/shree-bd/NoteAI.git
   cd NoteAI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup** (Open a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access NoteAI**
   - Frontend: http://localhost:5175 (or next available port)
   - Backend API: http://127.0.0.1:8000

---

## 🤖 **AI Features Guide**

### **🎯 How to Activate AI Features**

NoteAI comes with **two AI modes**:

#### **1. Demo Mode (Default - No API Key Required) ✅**
- **Ready to use immediately!** 
- Smart content analysis using intelligent algorithms
- Auto-category detection based on keywords
- Grammar improvements and content enhancement
- Perfect for testing and daily use

#### **2. Full AI Mode (OpenAI Integration) 🚀**
- **Advanced AI capabilities** with OpenAI GPT models
- More sophisticated content analysis
- Better writing suggestions and enhancements

**To enable Full AI Mode:**
1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/)
2. Set environment variable: `OPENAI_API_KEY=your_api_key_here`
3. Change `DEMO_MODE = False` in `backend/api/ai_service.py`
4. Restart the backend server

### **✨ Using AI Features**

#### **1. AI Assistant Panel**
1. **Create or edit a note** - Click "New Note" button
2. **Write some content** (at least 10 characters)
3. **Click "AI Assistant"** button (purple gradient button)
4. **Get instant suggestions**:
   - Smart category recommendations (clickable tags)
   - Content summaries
   - Writing improvement tips

#### **2. Content Enhancement**
1. **Write your note content**
2. **Click "Enhance" button** (blue button)
3. **AI improves**:
   - Grammar and spelling corrections
   - Sentence structure improvements
   - Writing clarity enhancements

#### **3. Smart Title Generation**
1. **Write your note content**
2. **Click "Smart Title" button** (green button)
3. **Get AI-generated titles** based on your content
4. **Title automatically fills** in the title field

#### **4. Auto-Category Suggestions**
- AI analyzes content and suggests categories:
  - **Work**: meetings, projects, deadlines, tasks
  - **Personal**: life, family, hobbies, personal thoughts
  - **Ideas**: brainstorming, concepts, creative thoughts
  - **Meeting**: agendas, discussions, team meetings

---

## 🛠 **Project Structure**

```
NoteAI/
├── backend/                 # Django REST API
│   ├── api/
│   │   ├── ai_service.py   # 🤖 AI functionality
│   │   ├── models.py       # Note data models
│   │   ├── views.py        # API endpoints (including AI)
│   │   └── urls.py         # API routes
│   ├── manage.py
│   └── requirements.txt    # Python dependencies
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AI/         # 🤖 AI components
│   │   │   ├── Auth/       # Authentication pages
│   │   │   ├── Layout/     # App layout & navigation
│   │   │   └── Notes/      # Note management
│   │   ├── contexts/       # React contexts
│   │   └── pages/          # App pages
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Styling configuration
└── README.md               # This file
```

---

## 🎨 **Screenshots & Demo**

### **🔐 Beautiful Authentication**
- Modern login/register pages with NoteAI branding
- Gradient designs and smooth animations
- "Welcome back to NoteAI" messaging

### **📝 AI-Powered Note Editor**
- Rich text editing with formatting toolbar
- **AI Assistant panel** with smart suggestions
- Real-time content enhancement
- **AI-powered category suggestions**

### **🗂 Smart Organization**
- Sidebar with categories and search
- AI-suggested tags and organization
- Favorites and archive functionality
- **NoteAI branding throughout**

---

## 🔧 **API Endpoints**

### **Notes Management**
- `GET /api/notes/` - List all notes
- `POST /api/notes/` - Create new note
- `GET /api/notes/{id}/` - Get specific note
- `PUT /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note

### **🤖 AI Features**
- `POST /api/ai/analyze/` - AI note analysis with suggestions
- `POST /api/ai/enhance/` - Content enhancement
- `POST /api/ai/title/` - Smart title generation

### **Authentication**
- `POST /api/token/` - Login
- `POST /api/user/register/` - Register
- `POST /api/token/refresh/` - Refresh token

---

## 🌟 **Technologies Used**

### **Frontend**
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Quill** - Rich text editor
- **Heroicons** - Beautiful icons

### **Backend**
- **Django 5.2** - Web framework
- **Django REST Framework** - API development
- **JWT Authentication** - Secure auth
- **OpenAI API** - AI capabilities
- **SQLite/PostgreSQL** - Database

---

## 🚀 **Deployment**

### **Deploy to Production**

1. **Set environment variables**:
   ```bash
   export OPENAI_API_KEY=your_api_key_here
   export DEBUG=False
   export SECRET_KEY=your_secret_key
   ```

2. **Database setup** (for production):
   ```bash
   python manage.py collectstatic
   python manage.py migrate
   ```

3. **Build frontend**:
   ```bash
   npm run build
   ```

---

## 🤝 **Contributing**

We welcome contributions! Here's how:

1. **Fork the repository** from [https://github.com/shree-bd/NoteAI](https://github.com/shree-bd/NoteAI)
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 **Roadmap**

### **Upcoming AI Features**
- 🔍 **Semantic Search** - Find notes by meaning, not just keywords
- 💬 **AI Chat Assistant** - Ask questions about your notes
- 📊 **Writing Analytics** - Track your writing habits and improvements
- 🏷️ **Smart Templates** - AI-generated note templates
- 🔗 **Note Connections** - AI-discovered relationships between notes

### **Planned Enhancements**
- 📱 Mobile app development
- 🌐 Multi-language support
- 📤 Export to various formats
- 🔄 Real-time collaboration
- ☁️ Cloud synchronization

---

## 💪 **Support**

- 🐛 **Issues**: [GitHub Issues](https://github.com/shree-bd/NoteAI/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/shree-bd/NoteAI/discussions)
- ⭐ **Star this repo** if you find it helpful!

---

## 🎉 **Acknowledgments**

- OpenAI for providing AI capabilities
- React and Django communities
- All contributors and users

---

**Made with ❤️ and 🤖 AI**

*Transform your note-taking experience with NoteAI - where artificial intelligence meets productivity!*

---

## 🔥 **Quick Demo**

Try NoteAI right now:

1. Clone: `git clone https://github.com/shree-bd/NoteAI.git`
2. Install dependencies (see Quick Start above)
3. Run both frontend and backend
4. Create a note and click **"AI Assistant"** to see the magic! ✨
