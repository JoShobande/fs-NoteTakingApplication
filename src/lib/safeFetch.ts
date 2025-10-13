
export class HTTPError extends Error{
    constructor(public status:number, public data:any){
        super(
            (typeof data === 'object' &&  data.error) ||
            (typeof data === 'object' && data.message) ||
            `HTTP ${status}`
        )
    }
}

export async function safeFetch<T>(
    input:RequestInfo | URL,
    init:RequestInit = {}
): Promise<T> {
    const res = await fetch(input, {
        headers: {'Content-Type': 'application/json', ...(init.headers || {})},
        ...init
    })
    const contentType = res.headers.get('content-type') || '';
    const parse = async () => {
      if (contentType.includes('application/json')) return res.json();
      return res.text(); // allow text error payloads
    };
  
    const data = await parse().catch(() => null);
    if (!res.ok) throw new HTTPError(res.status, data);
    return data as T;
}

export const jsonBody = (body: unknown): RequestInit => ({
    body: JSON.stringify(body),
});