export type TUser = {
  fullname: string;
  username: string;
  password: string;
  email: string;
};

export type TStore = {
  id?: string;
  name: string;
  category: string;
  subcategory: string;
  discount: number;
  img: File | string;
  floor: number;
};

export type TStoreProducts = TStore & {
  products: TProduct[];
};

export type TEditStore = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  discount: number;
  img?: File;
  floor: number;
};

export type TProduct = {
  id?: string;
  name: string;
  img: File | string;
  price: number;
  discount: number;
  description: string;
  storeId: string;
};

export type TEditProduct = {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
};
