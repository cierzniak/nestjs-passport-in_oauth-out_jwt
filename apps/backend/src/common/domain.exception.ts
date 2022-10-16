import { HttpStatus } from '@nestjs/common';

export abstract class DomainException extends Error {
  status = HttpStatus.INTERNAL_SERVER_ERROR;

  getStatus() {
    return this.status;
  }

  getResponse() {
    return this.message;
  }
}

export class ResourceNotFound extends DomainException {
  status = HttpStatus.NOT_FOUND;
  message = 'Resource not found';
}
