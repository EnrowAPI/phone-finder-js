const BASE_URL = 'https://api.enrow.io';

export interface FindPhoneParams {
  apiKey: string;
  linkedinUrl?: string;
  fullName?: string;
  companyDomain?: string;
  companyName?: string;
  webhook?: string;
}

export interface FindPhonesParams {
  apiKey: string;
  searches: Array<{
    linkedinUrl?: string;
    fullName?: string;
    companyDomain?: string;
    companyName?: string;
    custom?: Record<string, unknown>;
  }>;
  webhook?: string;
}

export interface PhoneResult {
  id: string;
  number?: string;
  country?: string;
  qualification?: string;
  status?: string;
  message?: string;
  creditsUsed?: number;
}

export interface BulkPhoneResult {
  batchId: string;
  total: number;
  status: string;
  creditsUsed?: number;
}

export interface BulkPhoneResults {
  batchId: string;
  status: string;
  total: number;
  completed?: number;
  creditsUsed?: number;
  results?: PhoneResult[];
}

async function request(apiKey: string, method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `API error ${res.status}`);
  return data;
}

export async function findPhone(params: FindPhoneParams): Promise<PhoneResult> {
  const body: Record<string, unknown> = {};
  if (params.linkedinUrl) body.linkedin_url = params.linkedinUrl;
  if (params.fullName) body.fullname = params.fullName;
  if (params.companyDomain) body.company_domain = params.companyDomain;
  if (params.companyName) body.company_name = params.companyName;
  if (params.webhook) {
    body.settings = { webhook: params.webhook };
  }
  return request(params.apiKey, 'POST', '/phone/single', body);
}

export async function getPhoneResult(apiKey: string, id: string): Promise<PhoneResult> {
  return request(apiKey, 'GET', `/phone/single?id=${id}`);
}

export async function findPhones(params: FindPhonesParams): Promise<BulkPhoneResult> {
  const body: Record<string, unknown> = {
    searches: params.searches.map((s) => ({
      ...(s.linkedinUrl && { linkedin_url: s.linkedinUrl }),
      ...(s.fullName && { fullname: s.fullName }),
      ...(s.companyDomain && { company_domain: s.companyDomain }),
      ...(s.companyName && { company_name: s.companyName }),
      ...(s.custom && { custom: s.custom }),
    })),
  };
  if (params.webhook) {
    body.settings = { webhook: params.webhook };
  }
  return request(params.apiKey, 'POST', '/phone/bulk', body);
}

export async function getPhoneResults(apiKey: string, id: string): Promise<BulkPhoneResults> {
  return request(apiKey, 'GET', `/phone/bulk?id=${id}`);
}
