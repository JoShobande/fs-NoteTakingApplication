

export function logRequest ({
   method,
   requestId,
   user,
   duration,
   route,
   status,
   extra 
}:{
    method:string;
    requestId:string;
    user?:string | null;
    duration:number;
    route:string;
    status: number
    extra?:Record<string, any>
}){
    const base = `[${method}/${route}] requestId=${requestId} status=${status} duration=${duration}ms${user ? ` user=${user}` : ""}`;

    if (status >= 500) console.error(base, extra || "");
    else if (status >= 400) console.warn(base, extra || "");
    else console.info(base, extra || "");
    
}