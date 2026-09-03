# CrackDetection

CrackDet is a comprehensive system for automated crack detection, metric analysis, and visualization. It uses deep learning for accurate crack segmentation from stereo images, calculates physical dimensions (in millimeters) based on stereo camera baselines, and provides an interactive dashboard with an integrated AI assistant.

The project is divided into two primary components:
1. **Analysis (Backend)**: A FastAPI-based service handling the heavy lifting of computer vision and AI models.
2. **Dashboard (Frontend)**: A modern Next.js web application for monitoring and interacting with the analysis results.

---

## 🏗️ Architecture

### 1. Analysis Backend (`/analysis`)
The backend is built with **FastAPI** and handles image processing, deep learning segmentation, and the AI chatbot integration.
- **Crack Segmentation**: Uses a custom PyTorch U-Net model (`crack_unet_checkpoint.pth`) to precisely segment cracks from images.
- **Physical Scale Calculation**: Computes the `mm/pixel` scale using stereo image pairs and a known baseline, translating pixel measurements into real-world dimensions.
- **Metrics Generation**: Calculates maximum width, average width, and total area of the detected cracks. Also generates visual overlays and heatmaps.
- **AI Chatbot**: Powered by LangChain and Google GenAI, allowing users to ask questions contextually about the crack data.
- **Deployment**: Configured for containerization via Docker and deployment on Railway (`railway.toml`).

### 2. Dashboard Frontend (`/dashboard`)
The frontend is a modern React application built using **Next.js (App Router)** and **Tailwind CSS**.
- **Visualizations**: Utilizes `recharts` for charting crack metrics over time or across different scans.
- **Database Integration**: Connects to MongoDB via `mongoose` to store historical crack analysis data.
- **Image Management**: Integrates with Cloudinary for handling image uploads and asset delivery.
- **UI/UX**: Features smooth animations (`framer-motion`), modern icons (`lucide-react`), and a clean, responsive layout.

---

## 💻 Tech Stack

**Frontend**
- **Next.js**: React Framework for production.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Recharts**: Composable charting library built on React components.
- **Framer Motion**: Production-ready motion library for React.
- **Lucide React**: Beautiful and consistent icons.

**Backend**
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python.
- **Uvicorn**: ASGI web server implementation for Python.
- **OpenCV**: Open source computer vision and machine learning software library.
- **LangChain**: Framework for developing applications powered by language models.

**AI & Machine Learning**
- **PyTorch**: Deep learning framework used for the crack segmentation U-Net model.
- **Google GenAI**: Generative AI models powering the interactive chatbot.
- **scikit-image & scipy**: Libraries for scientific image processing and metrics calculation.

**Database & Storage**
- **MongoDB**: NoSQL database for storing crack analysis history (via Mongoose).
- **Cloudinary**: Cloud service for image hosting and delivery.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 
- **Python** 
- **MongoDB** (Local or Atlas)
- **Cloudinary Account**
- **Google GenAI API Key** (for Chatbot)

### Setting up the Analysis Backend
1. Navigate to the analysis directory:
   ```bash
   cd analysis
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   # Note: Install torch and torchvision separately if you want GPU support, 
   # as requirements.txt assumes CPU-only for lighter container builds.
   ```
4. Configure environment variables:
   - Create a `.env` file in the `analysis` folder.
   - Add your Google GenAI API key and any other necessary secrets.
5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Setting up the Dashboard Frontend
1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `example.env` to `.env`.
   - Fill in your MongoDB connection string, Cloudinary credentials, and the Backend API URL (default: `http://localhost:8000`).
4. Run the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## 📡 API Endpoints (Backend)

- `GET /`: Health check endpoint.
- `POST /analyze-crack`: 
  - **Payload**: JSON containing `left_path` (image URL/path), `right_path` (image URL/path), and `baseline_mm` (float).
  - **Returns**: Scale (`mm/pixel`), metrics (max width, avg width, area), and base64-encoded overlay & heatmap images.
- `POST /chat`: 
  - **Payload**: JSON containing the conversation `messages` and optional `crack_data` context.
  - **Returns**: AI assistant's text response.

---


## 📄 License
This project is proprietary or licensed as defined by the repository owner.
