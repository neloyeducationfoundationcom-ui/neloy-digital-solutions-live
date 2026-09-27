const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
};

function withLeadCors(response){const headers=new Headers(response.headers);for(const [k,v] of Object.entries(CORS_HEADERS))headers.set(k,v);headers.set("Cross-Origin-Resource-Policy","cross-origin");headers.set("Cache-Control","no-store");return new Response(response.body,{status:response.status,statusText:response.statusText,headers});}

export { CORS_HEADERS, withLeadCors };
