import type { SupportedPlatformId } from '../types';

export interface PlatformFaq {
  question: string;
  answer: string;
}

export interface PlatformConfig {
  id: SupportedPlatformId;
  name: string;
  icon: string;
  color: string;
  seoSlug: string;
  seoTitle: string;
  seoDescription: string;
  sampleUrls: string[];
  supportedContent: string[];
  supportedFormats: string[];
  faq: PlatformFaq[];
}

const commonFaq: PlatformFaq[] = [
  {
    question: 'Is OmniFetch free to use?',
    answer: 'Yes. OmniFetch provides a free interface for supported public media URLs.'
  },
  {
    question: 'Which formats are supported?',
    answer: 'Available formats depend on the media source and the options returned by the service.'
  }
];

export const PLATFORMS_DATA: Record<SupportedPlatformId, PlatformConfig> = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    icon: 'Youtube',
    color: '#ff0000',
    seoSlug: 'youtube',
    seoTitle: 'YouTube Video Downloader',
    seoDescription: 'Download supported public YouTube media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Shorts', 'Public media'],
    supportedFormats: ['MP4', 'WebM', 'Audio'],
    faq: commonFaq
  },

  'youtube-shorts': {
    id: 'youtube-shorts',
    name: 'YouTube Shorts',
    icon: 'Youtube',
    color: '#ff0000',
    seoSlug: 'youtube-shorts',
    seoTitle: 'YouTube Shorts Downloader',
    seoDescription: 'Download supported public YouTube Shorts media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Shorts', 'Public videos'],
    supportedFormats: ['MP4', 'WebM', 'Audio'],
    faq: commonFaq
  },

  instagram: {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    color: '#e1306c',
    seoSlug: 'instagram',
    seoTitle: 'Instagram Video Downloader',
    seoDescription: 'Download supported public Instagram media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Reels', 'Videos', 'Images', 'Public posts'],
    supportedFormats: ['MP4', 'Image', 'Audio'],
    faq: commonFaq
  },

  'instagram-reels': {
    id: 'instagram-reels',
    name: 'Instagram Reels',
    icon: 'Instagram',
    color: '#e1306c',
    seoSlug: 'instagram-reels',
    seoTitle: 'Instagram Reels Downloader',
    seoDescription: 'Download supported public Instagram Reels media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Reels', 'Public videos'],
    supportedFormats: ['MP4', 'Image', 'Audio'],
    faq: commonFaq
  },

  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'Flame',
    color: '#00f2ea',
    seoSlug: 'tiktok',
    seoTitle: 'TikTok Video Downloader',
    seoDescription: 'Download supported public TikTok media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Public posts'],
    supportedFormats: ['MP4', 'Audio'],
    faq: commonFaq
  },

  facebook: {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    color: '#1877f2',
    seoSlug: 'facebook',
    seoTitle: 'Facebook Video Downloader',
    seoDescription: 'Download supported public Facebook media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Public posts', 'Reels'],
    supportedFormats: ['MP4', 'Audio'],
    faq: commonFaq
  },

  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: 'Twitter',
    color: '#ffffff',
    seoSlug: 'twitter',
    seoTitle: 'X Twitter Video Downloader',
    seoDescription: 'Download supported public X media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Public posts'],
    supportedFormats: ['MP4', 'Audio'],
    faq: commonFaq
  },

  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'Pin',
    color: '#e60023',
    seoSlug: 'pinterest',
    seoTitle: 'Pinterest Downloader',
    seoDescription: 'Download supported public Pinterest media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Images', 'Videos'],
    supportedFormats: ['Image', 'MP4'],
    faq: commonFaq
  },

  reddit: {
    id: 'reddit',
    name: 'Reddit',
    icon: 'MessageSquare',
    color: '#ff4500',
    seoSlug: 'reddit',
    seoTitle: 'Reddit Downloader',
    seoDescription: 'Download supported public Reddit media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Images', 'Public posts'],
    supportedFormats: ['MP4', 'Image', 'Audio'],
    faq: commonFaq
  },

  snapchat: {
    id: 'snapchat',
    name: 'Snapchat',
    icon: 'Ghost',
    color: '#fffc00',
    seoSlug: 'snapchat',
    seoTitle: 'Snapchat Downloader',
    seoDescription: 'Download supported public Snapchat media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Public media'],
    supportedFormats: ['MP4', 'Image'],
    faq: commonFaq
  },

  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0a66c2',
    seoSlug: 'linkedin',
    seoTitle: 'LinkedIn Downloader',
    seoDescription: 'Download supported public LinkedIn media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Public posts'],
    supportedFormats: ['MP4', 'Image'],
    faq: commonFaq
  },

  threads: {
    id: 'threads',
    name: 'Threads',
    icon: 'AtSign',
    color: '#ffffff',
    seoSlug: 'threads',
    seoTitle: 'Threads Downloader',
    seoDescription: 'Download supported public Threads media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Images', 'Public posts'],
    supportedFormats: ['MP4', 'Image'],
    faq: commonFaq
  },

  generic: {
    id: 'generic',
    name: 'Direct Media',
    icon: 'Globe',
    color: '#888888',
    seoSlug: 'download',
    seoTitle: 'Media Downloader',
    seoDescription: 'Download supported public media with OmniFetch.',
    sampleUrls: [],
    supportedContent: ['Videos', 'Images', 'Audio'],
    supportedFormats: ['MP4', 'WebM', 'MP3', 'Image'],
    faq: commonFaq
  }
};

export function detectPlatform(url: string): { platform: SupportedPlatformId } {
  const value = url.trim().toLowerCase();

  if (value.includes('youtube.com') || value.includes('youtu.be')) {
    return { platform: 'youtube' };
  }

  if (value.includes('instagram.com')) {
    return { platform: 'instagram' };
  }

  if (value.includes('tiktok.com')) {
    return { platform: 'tiktok' };
  }

  if (value.includes('facebook.com') || value.includes('fb.watch')) {
    return { platform: 'facebook' };
  }

  if (value.includes('twitter.com') || value.includes('x.com')) {
    return { platform: 'twitter' };
  }

  if (value.includes('pinterest.com') || value.includes('pin.it')) {
    return { platform: 'pinterest' };
  }

  if (value.includes('reddit.com') || value.includes('redd.it')) {
    return { platform: 'reddit' };
  }

  if (value.includes('snapchat.com')) {
    return { platform: 'snapchat' };
  }

  if (value.includes('linkedin.com')) {
    return { platform: 'linkedin' };
  }

  if (value.includes('threads.net')) {
    return { platform: 'threads' };
  }

  return { platform: 'generic' };
}
