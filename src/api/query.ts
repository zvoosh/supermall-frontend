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
import type { TStoreProducts, TStore, TUser, TProduct, TEditProduct, TEditStore } from "../types/types";

type UserType = {
  uid: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  role: string;
};

export const useRegisterAdminMutation = () => {
  return useMutation({
    mutationFn: async (adminData: TUser) => {
      registerHook(adminData);
    },
  });
};

export const useLoginAdminMutation = () => {
  return useMutation<UserType, Error, { username: string; password: string }>({
    mutationFn: loginHook,
    onSuccess: (user) => {
      sessionStorage.setItem("user", JSON.stringify(user))
    },
    onError: () => {
      message.error(`Login failed. Please check your credentials and try again.`);
    }
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
    mutationFn: async (object: TStore) => {
      addStore(object);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      message.success(`Successfully added store`);
    },
  });
};

export const useStoreIdQuery = (id: string) => {
  return useQuery<TStoreProducts>({
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
    mutationFn: async (object: TProduct) => {
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
  return useQuery<TProduct>({
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
    mutationFn: async (object: TEditProduct) => {
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
    mutationFn: async (object: TEditStore) => {
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
