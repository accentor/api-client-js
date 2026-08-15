export type ErrorsBody = {
  errors: Array<AnyErrorMessage>;
};

export type AnyErrorMessage =
  ValidationErrorMessage | PermissionErrorMessage | NotFoundErrorMessage;

export type ValidationErrorMessage = {
  model: string;
  attribute: string;
  type: string;
};

export type PermissionErrorMessage = {
  model: string;
  type: "unauthorized" | "forbidden";
  action: string;
};

export type NotFoundErrorMessage = {
  model: string;
  type: "not_found";
};

// NOTE: This message can also include a trace in a structured way, but we don't care about that
export type RailsErrorMessage = {
  status: number;
  error: string;
  exception: string;
};

/**
 * We create our own subclass of error, to hold the structured errors we get from the api
 *
 * Each subclass of this needs to set a message for compatibility with the general `Error`,
 * though we probably would only use the `details`
 */
export class CustomError<T = AnyErrorMessage> extends Error {
  details: Array<T>;

  constructor(message: string, details: Array<T>) {
    super(message);
    this.name = "CustomError";
    this.details = details;
  }
}

export class UnauthorizedError extends CustomError<PermissionErrorMessage> {
  constructor(details: Array<PermissionErrorMessage>) {
    super("You are not signed in", details);
    this.name = "UnauthorizedError";
  }
}

// Our API returns a forbidden status when the user is not allowed to perform an action, or when they enter the wrong password
export class ForbiddenError extends CustomError<
  PermissionErrorMessage | ValidationErrorMessage
> {
  constructor(details: Array<PermissionErrorMessage | ValidationErrorMessage>) {
    super("You are not allowed to perform this action", details);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends CustomError<NotFoundErrorMessage> {
  constructor(details: Array<NotFoundErrorMessage>) {
    super("Could not find object", details);
    this.name = "NotFoundError";
  }
}

export class UnprocessableContentError extends CustomError<ValidationErrorMessage> {
  constructor(details: Array<ValidationErrorMessage>) {
    super("Could not save object", details);
    this.name = "UnprocessableContentError";
  }
}

export class UnknownError extends Error {
  details?: unknown;

  constructor(message: unknown, details?: unknown) {
    super(`${message}`);
    this.name = "UnknownError";
    this.details = details;
  }
}

export class UnexpectedError extends Error {
  details: object;

  constructor(message: string, details: RailsErrorMessage) {
    super(message);
    this.name = "UnexpectedError";
    this.details = details;
  }
}
