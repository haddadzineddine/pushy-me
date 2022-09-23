/**
 * Validate API Key
 * @param apiKey Your Pushy API key
 * @returns boolean
 */

export const isValideApiKey = (apiKey: string) => apiKey.match(/^[0-9a-zA-Z]+$/) !== null;
