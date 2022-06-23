export interface Stock {
  id: number | undefined | null;
  productName: string;
  productDescription: string;
  productUnit: string;
  productPrice: number;
  productQuantity: number;
  productStatus: string;
  category: Category;
  supplier: Supplier | undefined;
  productOtherDetails: string | null;
}

export interface StockWithPagination {
  content: [
    {
      id: number | undefined | null;
      productName: string;
      productDescription: string;
      productUnit: string;
      productPrice: number;
      productQuantity: number;
      productStatus: string;
      category: Category;
      supplier: Supplier | undefined;
      productOtherDetails: string | null;
    }
  ];
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

export interface Supplier {
  id: number | undefined;
  supplierName: string;
  supplierAddress: string;
  supplierPhone: string;
  supplierFax: string;
  supplierEmail: string;
  supplierOtherDetails: string;
}

export interface ItemData {
  item_name: string;
  item_id: number;
}
