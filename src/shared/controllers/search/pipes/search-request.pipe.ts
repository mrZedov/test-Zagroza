import { ValidationPipe } from '@nestjs/common';

export class SearchRequestPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        exposeDefaultValues: true,
        exposeUnsetFields: false,
        excludeExtraneousValues: true,
      },
    });
  }
}
