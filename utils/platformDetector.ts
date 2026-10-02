export const PLATFORMS_DATA = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    icon: 'Youtube',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'Flame',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: 'Twitter',
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'Pin',
  },
  reddit: {
    id: 'reddit',
    name: 'Reddit',
    icon: 'MessageSquare',
  },
  snapchat: {
    id: 'snapchat',
    name: 'Snapchat',
    icon: 'Ghost',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    icon: 'AtSign',
  },
  generic: {
    id: 'generic',
    name: 'Direct Media',
    icon: 'Globe',
  },
} as const;

export function detectPlatform(url: string): string {
  const value = url.trim().toLowerCase();

  if (value.includes('youtube.com') || value.includes('youtu.be')) {
    return value.includes('/shorts/') ? 'youtube-shorts' : 'youtube';
  }

  if (value.includes('instagram.com')) {
    return value.includes('/reel/') || value.includes('/reels/')
      ? 'instagram-reels'
      : 'instagram';
  }

  if (value.includes('tiktok.com')) return 'tiktok';
  if (value.includes('facebook.com') || value.includes('fb.watch')) return 'facebook';
  if (value.includes('twitter.com') || value.includes('x.com')) return 'twitter';
  if (value.includes('pinterest.com') || value.includes('pin.it')) return 'pinterest';
  if (value.includes('reddit.com') || value.includes('redd.it')) return 'reddit';
  if (value.includes('snapchat.com')) return 'snapchat';
  if (value.includes('linkedin.com')) return 'linkedin';
  if (value.includes('threads.net')) return 'threads';

  return 'generic';
    }
