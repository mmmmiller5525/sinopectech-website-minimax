// 服务端数据访问（前台页面用）
import "server-only";
import { listProducts, getProduct as _getProduct } from "./db";
import type { Product } from "./types";

export type ClientProduct = Product;
export async function getProducts(): Promise<ClientProduct[]> { return listProducts({ activeOnly: true }); }
export async function getProduct(id: string | number): Promise<ClientProduct | null> { return _getProduct(id); }
