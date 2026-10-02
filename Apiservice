const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function analyzeMediaUrl(url: string) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to analyze URL');
  }

  return data;
}

export async function initiateDownloadJob(params: {
  url: string;
  quality?: string;
  format?: string;
  title?: string;
  platform?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to start download');
  }

  return data;
}

export async function checkJobStatus(jobId: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/status/${encodeURIComponent(jobId)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to check download status');
  }

  return data;
}

export async function trackDownloadEvent(
  type: string,
  platform?: string,
  format?: string
) {
  const response = await fetch(`${API_BASE_URL}/api/stats/increment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, platform, format }),
  });

  if (!response.ok) {
    throw new Error('Unable to track download event');
  }

  return response.json();
}

export async function fetchGlobalStats() {
  const response = await fetch(`${API_BASE_URL}/api/stats`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to fetch statistics');
  }

  return data;
}
