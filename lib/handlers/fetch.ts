import { ActionResponse } from "@/Types/global";
import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./errors";

interface FetchOptions extends RequestInit {
    timeout?: number;
}

function isError(error:unknown):  error is Error {
    return error instanceof Error;
}

export async function fetchHandler<T>(url:string,
    option:FetchOptions={}):Promise<ActionResponse<T>>{
        const {timeout=20000,headers:customHeaders,...restOptions}=option;
        const controller=new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const defaultHeaders: HeadersInit={
            'Content-Type':'application/json',
            'Accept':'application/json',
        }
        const headers:HeadersInit={...defaultHeaders,...customHeaders};
        const config:RequestInit={
            ...restOptions,
            headers,
            signal:controller.signal,
        };
        try {
            const response=await fetch(url,config);
            clearTimeout(id);
            if (!response.ok) {
                throw new RequestError(response.status,`HTTP error! status: ${response.status}`);
            }
            return await response.json() as ActionResponse<T>;
        } catch (err) {
            const error = isError(err) ? err : new Error('Unknown error occurred during fetch');
            if (error.name === 'AbortError') {
                logger.warn(`Request to ${url} timed out after ${timeout}ms`);
            }else{
                logger.error(`Fetch error: ${error.message}`);
            }
            return handleError(error) as ActionResponse<T>;
        }
    }