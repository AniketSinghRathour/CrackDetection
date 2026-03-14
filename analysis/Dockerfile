# ── Single-stage build (avoids missing shared-lib issues) ──
FROM python:3.11-slim

WORKDIR /app

# Install system deps needed for building AND runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0t64 \
    libsm6 \
    libxext6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

# Install CPU-only PyTorch FIRST (much smaller ~200MB vs ~2GB)
RUN pip install --no-cache-dir \
    torch==2.2.2+cpu \
    torchvision==0.17.2+cpu \
    --index-url https://download.pytorch.org/whl/cpu

# Install remaining dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Remove build-essential to save space (runtime doesn't need it)
RUN apt-get purge -y --auto-remove build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy application code
COPY . .

# Expose port (Railway/Render inject PORT env var)
EXPOSE 8000

# Start command — uses $PORT if set (Railway/Render), fallback to 8000
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
