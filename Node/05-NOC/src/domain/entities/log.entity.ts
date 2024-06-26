import { SeverityLevel } from "@prisma/client";

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntytyOptions {
    message: string;
    severityLevel: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public severityLevel: LogSeverityLevel;
    public message: string;
    public origin: string;
    public createdAt: Date;
    
    constructor( options: LogEntytyOptions ){
        this.message = options.message;
        this.severityLevel = options.severityLevel;
        this.origin = options.origin;
        this.createdAt = ( options.createdAt ) ? options.createdAt : new Date();        
    }

    static fromJson = ( json: string ): LogEntity => {
        json = ( json === '' ) ? '{}': json;
        const { message, severityLevel, createdAt, origin } = JSON.parse(json);

        if ( !message ) throw new Error('Message is required');
        if ( !severityLevel ) throw new Error('Severity level is required');
        if ( !createdAt ) throw new Error('Created at is required');
        if ( !origin ) throw new Error('Origin is required');

        const log = new LogEntity({
            message, 
            severityLevel, 
            createdAt: new Date(createdAt),
            origin, 
        } );
        // const log = new LogEntity({message, severityLevel, origin, createdAt} );

        return log; 
    }

    static fromObject = ( object: { [key: string]: any }): LogEntity => {
        const { message, severityLevel, createdAt, origin } = object;

        if ( !message ) throw new Error('Message is required');
        if ( !severityLevel ) throw new Error('Severity level is required');
        if ( !createdAt ) throw new Error('Created at is required');
        if ( !origin ) throw new Error('Origin is required');

        const log = new LogEntity({message, severityLevel, origin, createdAt})
        
        return log;
    }
    
    

}
