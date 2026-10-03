import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Vite API plugin for development mode
function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host}`);

        // Helper to parse JSON body
        const getBody = async (): Promise<any> => {
          return new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try { resolve(JSON.parse(body)); } catch { resolve({}); }
            });
          });
        };

        // 1. POST /api/analyze
        if (url.pathname === '/api/analyze' && req.method === 'POST') {
          const body = await getBody();
          const targetUrl = (body.url || '').trim();

          if (!targetUrl) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Valid URL is required.' }));
          }

          let platform = 'generic';
          let platformName = 'Public Web Media';
          let mediaType = 'video';
          let title = 'Public Media Item';
          let author = 'Creator';
          let thumbnailUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
          let duration = '0:45';
          let durationSeconds = 45;
          let aspectRatio = '16:9';

          const lower = targetUrl.toLowerCase();
          if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
            const isShorts = lower.includes('/shorts/');
            platform = isShorts ? 'youtube-shorts' : 'youtube';
            platformName = isShorts ? 'YouTube Shorts' : 'YouTube';
            mediaType = isShorts ? 'shorts' : 'video';
            aspectRatio = isShorts ? '9:16' : '16:9';
            duration = isShorts ? '0:30' : '3:45';
            title = isShorts ? 'Trending YouTube Short' : 'High Definition YouTube Video';
            author = 'YouTube Creator';

            // Attempt oEmbed
            try {
              const oRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`);
              if (oRes.ok) {
                const data = (await oRes.json()) as any;
                if (data.title) title = data.title;
                if (data.author_name) author = data.author_name;
                if (data.thumbnail_url) thumbnailUrl = data.thumbnail_url;
              }
            } catch {}
          } else if (lower.includes('instagram.com') || lower.includes('instagr.am')) {
            const isReel = lower.includes('/reel/') || lower.includes('/reels/');
            platform = isReel ? 'instagram-reels' : 'instagram';
            platformName = isReel ? 'Instagram Reels' : 'Instagram';
            mediaType = isReel ? 'reel' : 'post';
            aspectRatio = isReel ? '9:16' : '1:1';
            duration = isReel ? '0:25' : '';
            title = isReel ? 'Instagram Reel Clip' : 'Instagram High-Resolution Post';
            author = '@instagram_creator';
            thumbnailUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
          } else if (lower.includes('tiktok.com')) {
            platform = 'tiktok';
            platformName = 'TikTok';
            mediaType = 'video';
            aspectRatio = '9:16';
            duration = '0:22';
            title = 'TikTok Trending Video';
            author = '@tiktok_creator';
            thumbnailUrl = 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80';

            try {
              const oRes = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(targetUrl)}`);
              if (oRes.ok) {
                const data = (await oRes.json()) as any;
                if (data.title) title = data.title;
                if (data.author_name) author = `@${data.author_name}`;
                if (data.thumbnail_url) thumbnailUrl = data.thumbnail_url;
              }
            } catch {}
          } else if (lower.includes('twitter.com') || lower.includes('x.com')) {
            platform = 'twitter';
            platformName = 'X (Twitter)';
            mediaType = 'video';
            title = 'X (Twitter) Public Post Media';
            author = '@x_user';
            thumbnailUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
          } else if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
            platform = 'facebook';
            platformName = 'Facebook';
            mediaType = 'video';
            title = 'Facebook Public Video';
            author = 'Public Page';
            thumbnailUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80';
          } else if (lower.includes('pinterest.com') || lower.includes('pin.it')) {
            platform = 'pinterest';
            platformName = 'Pinterest';
            mediaType = 'image';
            aspectRatio = '2:3';
            title = 'Pinterest High-Resolution Pin';
            author = 'Pinterest Creator';
            thumbnailUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
          } else if (lower.includes('reddit.com') || lower.includes('redd.it')) {
            platform = 'reddit';
            platformName = 'Reddit';
            mediaType = 'video';
            title = 'Reddit Video & Audio Stream';
            author = 'u/reddit_user';
            thumbnailUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
          }

          const mediaId = 'media_' + Math.random().toString(36).substring(2, 9);
          const safeTitle = encodeURIComponent(title.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50));

          const qualities = [
            {
              id: 'q_1080p',
              label: '1080p Full HD',
              quality: '1080p',
              format: 'mp4',
              fileSize: '24.8 MB',
              bitrate: '4500 kbps',
              hasAudio: true,
              isAvailable: true,
              downloadUrl: `/api/proxy-download?q=1080p&fmt=mp4&title=${safeTitle}`
            },
            {
              id: 'q_720p',
              label: '720p HD (Fast)',
              quality: '720p',
              format: 'mp4',
              fileSize: '12.4 MB',
              bitrate: '2200 kbps',
              hasAudio: true,
              isAvailable: true,
              downloadUrl: `/api/proxy-download?q=720p&fmt=mp4&title=${safeTitle}`
            },
            {
              id: 'q_480p',
              label: '480p SD',
              quality: '480p',
              format: 'mp4',
              fileSize: '7.1 MB',
              bitrate: '1100 kbps',
              hasAudio: true,
              isAvailable: true,
              downloadUrl: `/api/proxy-download?q=480p&fmt=mp4&title=${safeTitle}`
            },
            {
              id: 'q_audio',
              label: 'Audio Only (MP3 - 320kbps)',
              quality: 'audio',
              format: 'mp3',
              fileSize: '3.6 MB',
              bitrate: '320 kbps',
              hasAudio: true,
              isAvailable: true,
              downloadUrl: `/api/proxy-download?q=audio&fmt=mp3&title=${safeTitle}`
            },
            {
              id: 'q_thumb',
              label: 'Thumbnail HD (JPG)',
              quality: 'thumbnail',
              format: 'jpg',
              fileSize: '420 KB',
              hasAudio: false,
              isAvailable: true,
              downloadUrl: `/api/proxy-download?q=thumbnail&fmt=jpg&title=${safeTitle}`
            }
          ];

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            id: mediaId,
            platform,
            platformName,
            originalUrl: targetUrl,
            title,
            author,
            thumbnailUrl,
            duration,
            durationSeconds,
            mediaType,
            aspectRatio,
            qualities
          }));
        }

        // 2. POST /api/download
        if (url.pathname === '/api/download' && req.method === 'POST') {
          const body = await getBody();
          const jobId = 'job_' + Date.now();
          const safeTitle = encodeURIComponent((body.title || 'media').replace(/[^a-zA-Z0-9_-]/g, '_'));

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            jobId,
            status: 'completed',
            progress: 100,
            estimatedSeconds: 1,
            downloadUrl: `/api/proxy-download?q=${body.quality || '1080p'}&fmt=${body.format || 'mp4'}&title=${safeTitle}`
          }));
        }

        // 3. GET /api/status/:jobId
        if (url.pathname.startsWith('/api/status/')) {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            jobId: 'job_done',
            status: 'completed',
            progress: 100
          }));
        }

        // 4. GET /api/proxy-download
        if (url.pathname === '/api/proxy-download') {
          const fmt = url.searchParams.get('fmt') || 'mp4';
          const title = url.searchParams.get('title') || 'OmniFetch_Media';
          const filename = `${title}.${fmt}`;

          res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
          if (fmt === 'mp3') {
            res.writeHead(302, { Location: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg' });
            return res.end();
          } else if (fmt === 'jpg' || fmt === 'png') {
            res.writeHead(302, { Location: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' });
            return res.end();
          } else {
            res.writeHead(302, { Location: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' });
            return res.end();
          }
        }

        // 5. GET /api/stats
        if (url.pathname === '/api/stats') {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            totalRequests: 54920,
            successfulDownloads: 52410,
            failedDownloads: 2510,
            activeUsers: 1750,
            updatedAt: new Date().toISOString(),
            platformsBreakdown: {
              youtube: 21200,
              instagram: 13500,
              tiktok: 10900,
              facebook: 4100,
              twitter: 2900,
              pinterest: 1550,
              reddit: 1200,
              snapchat: 820,
              linkedin: 510,
              threads: 390
            },
            formatBreakdown: {
              '1080p MP4': 22400,
              '720p MP4': 16100,
              'MP3 Audio': 9800,
              'HD JPG Image': 5100
            }
          }));
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base: "/omnifetch/",
    plugins: [react(), tailwindcss(), apiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },

    };
  });
