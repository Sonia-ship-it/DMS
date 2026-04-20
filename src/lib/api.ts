export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api-proxy';
import { useAuthStore } from '@/stores/authStore';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth-token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${baseUrl}${cleanEndpoint}`;

    console.log(`[apiFetch] Calling: ${fullUrl}`);

    const response = await fetch(fullUrl, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            useAuthStore.getState().logout();
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return response.json();
}
