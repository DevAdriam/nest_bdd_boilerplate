import { DocumentBuilder } from '@nestjs/swagger';

export const document = new DocumentBuilder()
  .setTitle('Nest TDD boiler plate')
  .setDescription('The boilerplate for nestjs Test Driven Development')
  .setVersion('1.0')
  .build();
