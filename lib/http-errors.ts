export class RequestError extends Error {
    statusCode: number;
    errors?: Record<string, string[]>;

    constructor(
        statusCode: number,
        message : string,
        errors?: Record<string, string[]>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = "RequestError";
    }
}

export class NotFoundError extends RequestError {
    constructor(resource:string){
        super(404, `${resource} not found`);
        this.name = "NotFoundError";
    }
}

export class UnauthorizedError extends RequestError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
        this.name = "UnauthorizedError";
    }
}

export class ValidationError extends RequestError {
      constructor(fieldErrors: Record<string, string[]> ){
        const message  = ValidationError.formatMessage(fieldErrors);
        super(404, message, fieldErrors);
        this.name = "ValidationError";
        this.errors = fieldErrors;
      
    }
    static formatMessage(errors: Record<string, string[]>): string {
        const formatMessage = Object.entries(errors).map(
            ([field,message])=>
                {const fielname = field.charAt(0).toUpperCase() + field.slice(1);
            return `${fielname}: ${message.join(", ")}`
            if(message[0] === "Required"){
                return `${fielname} is required.`;
            }else{
                return `${fielname}: ${message.join("and ")}`;
            }}
        )
        return formatMessage.join(", ");
    }
}

export class ForbiddenError extends RequestError {
    constructor(message: string = "Forbidden") {
        super(403, message);
        this.name = "ForbiddenError";
    }
}

