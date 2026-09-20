import type { AnalysisResult } from './mockData';
import { MOCK_FAN_RESULT, MOCK_HAZARD_RESULT, MOCK_CABLE_RESULT } from './mockData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Analyze an item image via the /analyze endpoint.
 * Falls back to mock data if the endpoint is unavailable or not configured.
 */
export async function analyzeItem(imageFile: File): Promise<AnalysisResult> {
  // If no API base URL configured, use mock immediately
  if (!API_BASE) {
    return simulateMockAnalysis(imageFile);
  }

  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);

    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as AnalysisResult;
  } catch (err) {
    console.warn('[CampusCycle] API unavailable, falling back to mock data:', err);
    return simulateMockAnalysis(imageFile);
  }
}

/**
 * Simulates a realistic API delay and returns mock analysis data
 * based on the image file name (for demo purposes).
 */
async function simulateMockAnalysis(imageFile: File): Promise<AnalysisResult> {
  // Simulate network latency (1.5–3s)
  const delay = 1500 + Math.random() * 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const name = imageFile.name.toLowerCase();

  if (name.includes('hazard') || name.includes('chemical') || name.includes('unknown')) {
    return MOCK_HAZARD_RESULT;
  }
  if (name.includes('cable') || name.includes('hdmi') || name.includes('wire')) {
    return MOCK_CABLE_RESULT;
  }

  // Default: fan result (most interesting demo)
  return MOCK_FAN_RESULT;
}
