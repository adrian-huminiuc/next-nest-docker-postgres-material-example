import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { isString, isUUID } from 'class-validator';
import { EntityManager } from 'typeorm';

@Injectable()
export class EntityByIdPipe implements PipeTransform {
  constructor(readonly em: EntityManager) {}

  async transform(value: string, metadata: ArgumentMetadata): Promise<object> {
    if (!metadata.metatype) {
      throw new Error(
        `The @Param must specify an entity type. Ex: @Param('id', EntityByIdPipe) provider: UserEntity`,
      );
    }

    if (!isString(value) || !isUUID(value)) {
      throw new BadRequestException('search value must be an uuid');
    }

    const entity = await this.em.findOne(metadata.metatype, {
      where: { uuid: value },
    });

    if (!entity || !entity.uuid || entity.uuid !== value) {
      throw new NotFoundException(`Cannot find resource with uuid [${value}]`);
    }

    return entity;
  }
}
