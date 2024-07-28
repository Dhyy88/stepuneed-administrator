const ApiEndpoint = {
  // AUTH AREA
    LOGIN: 'ho/auth/login',
    LOGOUT: 'ho/auth/logout',
    DETAIL: 'ho/account',
    CHANGE_PASSWORD: 'ho/account/password/change',

  //HO ACCOUNT
    HO: 'ho/hos',
    HO_CREATE: 'ho/hos/create',

   // SALES EXTERNAL AREA 
    SALES_EXTERNAL: 'ho/armies',
    CREATE_SALES_EXTERNAL: 'ho/armies/create',
    CUSTOMER_SALES_EXTERNAL: 'ho/army-customers',
    SALES_EXTERNAL_NO_SPV: 'ho/armies/no-spv',

    SPV_ARMIES: 'ho/spv-armies',
    CREATE_SPV_ARMIES: 'ho/spv-armies/create',
    CUSTOMER_ARMIES: 'ho/army-customers',

    // DEALER AREA
    DEALER: 'ho/dealers',
    CREATE_DEALER: 'ho/dealers/create',

    // CARS AREA
    CARS: 'ho/car-models',
    CREATE_CARS: 'ho/car-models/create',
    BRANDS_CARS: 'ho/car-brands',

    //SITE AREA
    SITES: 'ho/sites',
    CREATE_SITES: 'ho/sites/create',
    STORE_LIST: 'ho/sites/store',
    WAREHOUSE_LIST: 'ho/sites/warehouse',
    STORE_WH_LIST: 'ho/sites/store-warehouse',

    //SITE AREA
    CASHIER: "ho/cashiers",
    CASHIER_CREATE: "ho/cashiers/create",

    SALES: "ho/sales",
    SALES_CREATE: "ho/sales/create",

    //WAREHOUSE AREA
    WAREHOUSE: 'ho/warehouses',
    CREATE_WAREHOUSE: 'ho/warehouses/create',
    SPV_WH: 'ho/spv-warehouses',
    CREATE_SPV_WH : 'ho/spv-warehouses/create',

    //PURCHASE-ORDER
    PO : 'ho/purchase-orders',
    PO_BY_ME : "ho/purchase-orders/create-by-me",
    PO_APPROVE : "ho/purchase-orders/approve-by-me",
    HO_APPROVE_PO : "ho/hos/can-approve-po",

    //CATEGORY
    CATEGORY: 'ho/categories',
    CREATE_CATEGORY: 'ho/categories/create',
    CATEGORIES: 'categories/tree',

    //BRANDS
    BRANDS: 'ho/brands',

    //PRODCTS
    PRODUCTS : 'ho/products',
    VARIANT_GENERATOR: 'ho/products/variant-generator',
    CREATE_PRODUCTS: 'ho/products/create',
    ALL_VARIANT: 'ho/products/variants',

    //MANUAL STOCK
    MANUAL_STOCK : 'ho/manual-stocks',
    CREATE_MANUAL_STOCK: 'ho/manual-stocks/create',
    STOCK: '/ho/products/stocks',

    //SUPPLIER
    SUPPLIER : 'ho/suppliers',
    CREATE_SUPPLIER: 'ho/suppliers/create',

    //BUNDLE PRODUCTS
    BUNDLES : 'ho/bundles',
    CREATE_BUNDLES : 'ho/bundles/create',

    //SALES ARMY CONTENT
    ARMY_CONTENT: 'ho/army-contents',
    CREATE_ARMY_CONTENT: 'ho/army-contents/create',

    //ADMINISTRATIVE AREA PUBLIC
    GET_PROVINCE: 'administrative-area/provinces',
    GET_CITIES: 'administrative-area/cities',

    //PERMISSION AREA
    GET_PERMISSION : 'ho/roles/permission-list',
    ROLE : 'ho/roles',
    POST_ROLES: 'ho/hos',

    //REPORT
    STOCK_OPNAME: "ho/stock-opname-reports"
  }
  
  export default ApiEndpoint
  