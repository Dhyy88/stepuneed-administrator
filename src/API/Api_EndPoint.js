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

    // DEALER AREA
    DEALER: 'ho/dealers',
    CREATE_DEALER: 'ho/dealers/create',

    // CARS AREA
    CARS: 'ho/car-models',
    CREATE_CARS: 'ho/car-models/create',

    //SITE AREA
    SITES: 'ho/sites',
    CREATE_SITES: 'ho/sites/create',
    STORE_LIST: 'ho/sites/store',
    WAREHOUSE_LIST: 'ho/sites/warehouse',
    STORE_WH_LIST: 'ho/sites/store-warehouse',

    //CATEGORY
    CATEGORY: 'ho/categories',
    CREATE_CATEGORY: 'ho/categories/create',
    CATEGORIES: 'categories/tree',

    //PRODCTS
    PRODUCTS : 'ho/products',
    VARIANT_GENERATOR: 'ho/products/variant-generator',
    CREATE_PRODUCTS: 'ho/products/create',

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
    POST_ROLES: 'ho/hos'
  }
  
  export default ApiEndpoint
  