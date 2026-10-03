export type SupportedPlatformId =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'twitter'
  | 'pinterest'
  | 'reddit'
  | 'snapchat'
  | 'linkedin'
  | 'threads'
  | 'generic';

export interface QualityOption {
  id: string;
  quality: string;
  format: string;
  label: string;
  fileSize?: string;
  isAvailable: boolean;
  downloadUrl: string;
}

export interface CarouselItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}

export interface MediaAnalysisResult {
  platform: SupportedPlatformId | string;
  platformName: string;
  originalUrl: string;
  title: string;
  author?: string;
  mediaType: string;
  thumbnailUrl: string;
  duration?: string;
  aspectRatio?: string;
  carouselItems?: CarouselItem[];
  qualities: QualityOption[];
}
