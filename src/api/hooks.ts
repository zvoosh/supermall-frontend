export const registerHook = async (object: {
  fullname: string;
  username: string;
  password: string;
  email: string;
}) => {
  const res = await fetch(`http://localhost:3001/api/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(object),
  });
  if (!res.ok) throw new Error("Failed to register");
  return await res.json();
};

export const loginHook = async (object: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`http://localhost:3001/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(object),
  });
  if (!res.ok) throw new Error("Failed to login");
  return await res.json();
};

export const fetchStores = async () => {
  const res = await fetch(`http://localhost:3001/api/stores`);
  if (!res.ok) throw new Error("Failed to fetch stores");
  return await res.json();
};

export const fetchProducts = async () => {
  const res = await fetch(`http://localhost:3001/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
};

export const addStore = async (object: {
  name: string;
  category: string;
  subcategory: string;
  discount: number;
  img: File;
  floor: number;
}) => {
  const formData = new FormData();
  formData.append("name", object.name);
  formData.append("category", object.category);
  formData.append("subcategory", object.subcategory);
  formData.append("discount", object.discount.toString());
  formData.append("floor", object.floor.toString());
  formData.append("img", object.img);

  const res = await fetch("http://localhost:3001/api/store", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create store");
  return await res.json();
};

export const fetchStoreById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/stores/${id}`);
  if (!res.ok) throw new Error("Failed to fetch store");
  return await res.json();
};

export const addProduct = async (object: {
  name: string;
  img: File;
  price: number;
  discount: number;
  description: string;
  storeId: string;
}) => {
  const formData = new FormData();
  formData.append("name", object.name);
  formData.append("description", object.description);
  formData.append("discount", object.discount.toString());
  formData.append("price", object.price.toString());
  formData.append("img", object.img);
  formData.append("storeId", object.storeId);

  const res = await fetch("http://localhost:3001/api/product", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create store");
  return await res.json();
};

export const fetchProductById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/product/${id}`);
  if (!res.ok) throw new Error("Failed to fetch store");
  return await res.json();
};

export const editProduct = async (object: {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
}) => {
  const formData = new FormData();
  formData.append("id", object.id);
  formData.append("name", object.name);
  formData.append("description", object.description);
  formData.append("discount", object.discount.toString());
  formData.append("price", object.price.toString());

  const res = await fetch(`http://localhost:3001/api/product/${object.id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to edit product");
  return await res.json();
};

export const editStore = async (object: {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  discount: number;
  img?: File;
  floor: number;
}) => {
  const formData = new FormData();
  formData.append("id", object.id);
  formData.append("name", object.name);
  formData.append("category", object.category);
  formData.append("subcategory", object.subcategory);
  formData.append("discount", object.discount.toString());
  formData.append("floor", object.floor.toString());
  if (object.img) formData.append("img", object.img);

  const res = await fetch(`http://localhost:3001/api/stores/${object.id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to edit store");
  return await res.json();
};

export const deleteStore = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/stores/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete store");
  return await res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/product/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return await res.json();
};
