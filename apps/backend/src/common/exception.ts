class DomainException extends Error {}

export class ResourceNotFound extends DomainException {
  message = 'Resource not found';
}
