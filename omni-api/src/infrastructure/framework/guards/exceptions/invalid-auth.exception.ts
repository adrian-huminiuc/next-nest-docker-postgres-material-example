import { ForbiddenException } from '@nestjs/common';

export class InvalidAuthException extends ForbiddenException {}
