export interface Stock {
    id: number;
    productName: string;
    productDescription: string;
    productUnit: string;
    productPrice: number;
    productQuantity: number;
    productStatus: string;
    category: {
        categoryId: number;
        categoryName: string;
        categoryDescription: string;
    };
    supplier:
        | {
              id: number;
              supplierName: string;
              supplierPhone: string;
              supplierFax: string;
              supplierEmail: string;
              supplierOtherDetails: string;
          }
        | undefined;
    productOtherDetails: string | null;
}

export interface Category {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
}

export interface Supplier {
    id: number;
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
