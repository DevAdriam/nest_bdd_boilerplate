import { DocumentBuilder } from '@nestjs/swagger';

export const document = new DocumentBuilder()
  .setTitle('Nest BDD boiler plate')
  .setDescription('The boilerplate for nestjs Behaviour-Driven Development')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
