FROM node:22-bookworm

RUN apt-get update && \
    apt-get install -y ffmpeg python3 python3-pip && \
    pip3 install --break-system-packages -U yt-dlp && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV FFMPEG_PATH=/usr/bin/ffmpeg
ENV YTDLP_PATH=/usr/local/bin/yt-dlp

EXPOSE 10000

CMD ["npm", "start"]
