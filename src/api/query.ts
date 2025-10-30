import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  addStore,
  deleteProduct,
  deleteStore,
  editProduct,
  editStore,
  fetchProductById,
  fetchProducts,
  fetchStoreById,
  fetchStores,
  loginHook,
  registerHook,
} from "./hooks";
import { message } from "antd";

export const useRegisterAdminMutation = () => {
  return useMutation({
    mutationFn: async (adminData: {
      fullname: string;
      username: string;
      password: string;
      email: string;
    }) => {
      registerHook(adminData);
    },
  });
};

export const useLoginAdminMutation = () => {
  return useMutation({
    mutationFn: async (adminData: { username: string; password: string }) => {
      await loginHook(adminData);
    },
  });
};

export const useStoreQuery = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      return fetchStores();
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
    retry: 1,
  });
};
export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return fetchProducts();
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
    retry: 1,
  });
};

export const useStoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (object: {
      name: string;
      category: string;
      subcategory: string;
      discount: number;
      img: File;
      floor: number;
    }) => {
      addStore(object);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      message.success(`Successfully added store`);
    },
  });
};

export const useStoreIdQuery = (id: string) => {
  return useQuery<{
    category: string;
    discount: number;
    floor: number;
    id: string;
    img: string;
    name: string;
    products: {
      id: string;
      name: string;
      img: string;
      price: number;
      discount: number;
      description: string;
    }[];
    subcategory: string;
  }>({
    queryKey: ["stores", id],
    queryFn: async () => {
      return fetchStoreById(id);
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
    retry: 3,
  });
};

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (object: {
      name: string;
      img: File;
      price: number;
      discount: number;
      description: string;
      storeId: string;
    }) => {
      await addProduct(object);
      return object;
    },
    onSuccess: (object) => {
      if (object.storeId) {
        queryClient.invalidateQueries({ queryKey: ["stores", object.storeId] });
        message.success(`Successfully added the product ${object.name}`);
      }
    },
  });
};

export const useProductIdQuery = (id: string) => {
  return useQuery<{
    id: string;
    name: string;
    img: string;
    price: number;
    discount: number;
    description: string;
  }>({
    queryKey: ["product", id],
    queryFn: async () => fetchProductById(id),
    staleTime: 5 * 60 * 1000,
    enabled: true,
    retry: 3,
  });
};

export const useEditProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (object: {
      id: string;
      name: string;
      price: number;
      discount: number;
      description: string;
    }) => {
      return await editProduct(object);
    },
    onSuccess: (object) => {
      if (object.id) {
        queryClient.invalidateQueries({ queryKey: ["product", object.id] });
        message.success(`Successfully edited the product ${object.name}`);
      }
    },
  });
};
export const useEditStoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (object: {
      id: string;
      name: string;
      category: string;
      subcategory: string;
      discount: number;
      img?: File;
      floor: number;
    }) => {
      return await editStore(object);
    },
    onSuccess: (object) => {
      if (object.id) {
        queryClient.invalidateQueries({ queryKey: ["stores", object.id] });
        queryClient.invalidateQueries({ queryKey: ["stores"] });
        message.success(`Successfully edited store ${object.name}`);
      }
    },
  });
};

export const useDeleteStoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteStore(id);
    },
    onSuccess: (id) => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["stores"] });
        message.success(`Successfully deleted store`);
      }
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, storeId }: { id: string; storeId?: string }) => {
      await deleteProduct(id);
      return { id, storeId };
    },
    onSuccess: (object) => {
      if (object.id) {
        queryClient.invalidateQueries({ queryKey: ["product", object.id] });
        message.success(`Successfully deleted product`);
      }
      if (object.storeId) {
        queryClient.invalidateQueries({ queryKey: ["stores", object.storeId] });
        message.success(`Successfully deleted product`);
      }
    },
  });
};
