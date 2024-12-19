import { HttpStatus } from '@nestjs/common';

export type Metadata = {
  path?: string;
  version?: string;
  feature?: string;
  timeStamp?: string;
  message?: string;
  statusCode: HttpStatus;
};

export interface IResponse {
  success?: boolean;
  _metaData: Metadata;
  _data: {
    data: unknown;
  };
}

export interface IPaginatedResponse extends IResponse {
  _pagination: {
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  _data: {
    data: unknown;
  };
}

export type IPaginate<T> = {
  list: Array<T>;
  totalCount: number;
};

export type GlobalException = {
  success: boolean;
  _metaData: Metadata;
  _error: {
    cause: string;
    code: number; //custom error code
  };
};

export type JWTPayload = {
  id: string;
};

export interface IAuthUser {
  id: string;
}

export type PaginationParam = {
  take: number;
  skip: number;
};

export interface IProductEntity {
  categoryId: string;
  name: string;
  description: string | null;
  code: string;
  stocks: number;
  lowStocks: number;
}

export interface IProductDetail {
  productId: string;
}

export interface IProductImage {
  colorId: string;
  image: unknown;
}

export interface IProductInformation {
  productDetailId: string;
  sizeId: string;
  sizeDescription?: string | null;
  stocks: number;
  purchasePrice: number;
  sellingPrice: number;
  colorIds: string[];
}

export interface IGoogleProfile {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
}
