import { HttpStatus } from '@nestjs/common';

export type Metadata = {
  path?: string;
  version?: string;
  feature?: string;
  timeStamp?: string;
  message?: string;
  statusCode: HttpStatus;
};

export type Responser = {
  success?: boolean;
  _metaData: Metadata;
  _data: {
    data: any;
  };
};

export type GlobalException = {
  success: boolean;
  _metaData: Metadata;
  _error: {
    cause: string;
    code: number; //custom error code
  };
};
