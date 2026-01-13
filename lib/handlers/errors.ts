import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseType =  'api'| 'sever';

const formatResponse = (
    responseType : ResponseType,
    status : number,
    message : string,
    errors?: Record<string, string[]>| undefined
)=> {
    const responseContent = {
        success:false,
        error:{
            message,
            details:errors,
        },
        message, // Added top-level message
    }
    return responseType === 'api' ?
    NextResponse.json(responseContent, {status}) :
    {status, ...responseContent};
}

const handleError = (error:unknown,
    responseType : ResponseType = "sever"
)=>{
    if(error instanceof RequestError ){
        // Don't log "Unauthorized" at ERROR level - it's expected for protected routes
        if (error.message !== "Unauthorized") {
            logger.error(
                {err: error},
                `${responseType.toUpperCase()} Error: ${error.message}`
            )
        }
    }
    if(error instanceof RequestError){
        return formatResponse(
            responseType,
            error.statusCode,
            error.message,
            error.errors
        );
    }
    if(error instanceof ZodError){
        const validationError=new ValidationError(
            error.flatten().fieldErrors as Record<string, string[]>
        );
        logger.error(
            {err:error},
            `${responseType.toUpperCase()} Validation Error: ${validationError.message}`
        )
        return formatResponse(
            responseType,
            validationError.statusCode,
            validationError.message,
            validationError.errors
        );
    }
    if(error instanceof Error){
        logger.error(
            {err:error},
            `${responseType.toUpperCase()} Error: ${error.message}`
        )
        return formatResponse(
            responseType,
            500,    
            error.message
        );
    }
    logger.error(
        {err:error},
        `${responseType.toUpperCase()} Unknown Error`
    )
    return formatResponse(
        responseType,
        500,
        "An unknown error occurred"
    );
}

export default handleError;