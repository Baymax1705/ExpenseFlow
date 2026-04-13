# 🚀 FinSense — VM Deployment Guide

This guide walks you through deploying **FinSense** on a Linux VM using Docker and Docker Compose.

---

## 📋 Prerequisites

| Requirement | Minimum Version |
|---|---|
| OS | Ubuntu 22.04 LTS (recommended) |
| Docker | 24.x+ |
| Docker Compose | v2.x+ (plugin, not standalone) |
| RAM | 1 GB (2 GB recommended) |
| Disk | 5 GB free |
| Open Ports | 80, 443 (optional), 3000 |

---

## 1️⃣ VM Setup — Install Docker

SSH into your VM and run the following commands:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine + Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Allow running Docker without sudo (log out and back in after this)
sudo usermod -aG docker $USER
```

Verify installation:

```bash
docker --version
docker compose version
```

---

## 2️⃣ Clone the Repository

```bash
git clone https://github.com/akt9802/FinSense.git
cd FinSense/FinSense
```

---

## 3️⃣ Configure Environment Variables

Copy the sample env file and fill in your values:

```bash
cp .env.sample .env
nano .env   # or use vim / any editor
```

Fill in **all** the following variables:

```env
# Backend
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/finsense?retryWrites=true&w=majority
JWT_SECRET=<your_strong_jwt_secret>
JWT_REFRESH_SECRET=<your_strong_refresh_secret>
NODE_ENV=production

# Brevo SMTP
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<your_brevo_smtp_user>
SMTP_PASS=<your_brevo_smtp_password>
SMTP_FROM_EMAIL=<your_verified_sender_email>
SMTP_FROM_NAME=Finsense Team

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>

# Frontend (public vars — baked at build time)
NEXT_PUBLIC_BACKEND_URL=http://<your-vm-ip>:5000
NEXT_PUBLIC_API_BASE_URL=http://<your-vm-ip>:5000
```

> ⚠️ **Never commit your `.env` file to Git.** It is already in `.gitignore`.

---

## 4️⃣ Build & Start the App

```bash
# Build the Docker image and start the container
docker compose up -d --build
```

This will:
- Build a 3-stage optimized Next.js image
- Start the container as `finsense-app`
- Expose the app on port **3000**
- Restart automatically on crashes (`unless-stopped`)

Check running containers:

```bash
docker compose ps
```

View live logs:

```bash
docker compose logs -f
```

---

## 5️⃣ Verify the Deployment

```bash
# Check if the app is responding
curl http://localhost:3000

# Check health endpoint
curl http://localhost:3000/api/health
```

Open in browser: `http://<your-vm-ip>:3000`

---

## 6️⃣ (Optional) Expose via Nginx Reverse Proxy

If you want to serve on port 80 / use a domain name, install Nginx:

```bash
sudo apt install -y nginx

sudo nano /etc/nginx/sites-available/finsense
```

Paste this config:

```nginx
server {
    listen 80;
    server_name your-domain.com;   # or your VM IP

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/finsense /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7️⃣ (Optional) Enable HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

Certbot will auto-configure HTTPS and set up auto-renewal.

---

## 🔄 Updating the App

To pull the latest code and redeploy:

```bash
git pull origin main
docker compose up -d --build
```

Old containers are replaced automatically with zero manual cleanup needed.

---

## 🛑 Stopping the App

```bash
docker compose down
```

To remove the built image as well:

```bash
docker compose down --rmi all
```

---

## 🧹 Useful Docker Commands

| Command | Description |
|---|---|
| `docker compose ps` | List running containers |
| `docker compose logs -f` | Stream live logs |
| `docker compose restart` | Restart the app container |
| `docker compose down` | Stop and remove containers |
| `docker system prune -f` | Free up unused Docker resources |
| `docker exec -it finsense-app sh` | Open a shell inside the container |

---

## 🐛 Troubleshooting

### Container keeps restarting
```bash
docker compose logs finsense
```
Check for missing env variables or failed DB connections.

### Port 3000 already in use
```bash
sudo lsof -i :3000
# Kill the conflicting process or change the port in docker-compose.yml
```

### Build fails (bcrypt native module)
The Dockerfile installs `python3 make g++` for native modules. If it still fails:
```bash
docker compose build --no-cache
```

### `.env` file not found
Make sure `.env` exists in the same directory as `docker-compose.yml`:
```bash
ls -la .env
```
