"use client";

const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

type LogContext = Record<string, unknown>;

class Logger {
  private level: LogLevel;
  private isProduction: boolean;

  constructor() {
    this.level = (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || "info";
    this.isProduction = process.env.NODE_ENV === "production";
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(this.level);
  }

  private format(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    return context
      ? `${prefix} ${message} ${JSON.stringify(context)}`
      : `${prefix} ${message}`;
  }

  debug(message: string, context?: LogContext) {
    if (!this.shouldLog("debug")) return;
    // eslint-disable-next-line no-console
    console.debug(this.format("debug", message, context));
  }

  info(message: string, context?: LogContext) {
    if (!this.shouldLog("info")) return;
    // eslint-disable-next-line no-console
    console.info(this.format("info", message, context));
  }

  warn(message: string, context?: LogContext) {
    if (!this.shouldLog("warn")) return;
    // eslint-disable-next-line no-console
    console.warn(this.format("warn", message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    if (!this.shouldLog("error")) return;

    const errorContext: LogContext = {
      ...context,
      ...(error instanceof Error
        ? {
            errorName: error.name,
            errorMessage: error.message,
            stack: this.isProduction ? undefined : error.stack,
          }
        : { error: String(error) }),
    };

    // eslint-disable-next-line no-console
    console.error(this.format("error", message, errorContext));
  }

  performance(label: string, startTime: number) {
    const duration = performance.now() - startTime;
    this.debug(`Performance: ${label}`, { duration: `${duration.toFixed(2)}ms` });
  }
}

export const logger = new Logger();
