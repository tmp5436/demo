export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
  password?: string;
}

export interface Category {
  id?: number;
  name: string;
  expiration_time: Date;
  creator?: number;
  votes?: number;
}

export interface Candidate {
  id?: number;
  name: string;
  countvotes: number;
}
export interface Stats {
  countCategories: number;
  countVotes: number;
  topCategory: string;
  topCategoryId: number;
}

export interface SearchParams {
  sortBy: Params;
  order: Order;
  sought: string;
  page: number;
  size: number;
}

export enum Params {
  RELEVANCE,
  NAME,
}
export enum Order {
  ASC,
  DESC,
}


