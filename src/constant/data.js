export const menuItems = [
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    isOpen: true,
    isHide: true,
    link: '/dashboard'
  },  
  
  //Menu Master Inventory
  {
    isHeadr: true,
    title: "Master Data",
  },
  {
    title: "Brand",
    icon: "heroicons-outline:tag",
    isOpen: true,
    isHide: true,
    link: '/brands'
  },
  {
    title: "Kategori",
    icon: "heroicons-outline:puzzle-piece",
    isOpen: true,
    isHide: true,
    link: '/categories'
  },
  {
    title: "Produk",
    icon: "heroicons-outline:rectangle-group",
    link: "/app/home",
    child: [
      {
        childtitle: "List Produk",
        childlink: "/products",
      },
      {
        childtitle: "List Variasi Produk",
        childlink: "/productvariants",
      },
      {
        childtitle: "Tambah Produk",
        childlink: "/product/create",
      },
    ]
  },
  //Menu Master Toko
  {
    title: "Supplier",
    icon: "heroicons-outline:building-storefront",
    isOpen: true,
    isHide: true,
    link: '/suppliers'
  },
  {
    title: "Toko/Cabang",
    icon: "heroicons-outline:building-office-2",
    link: "/app/home",
    child: [
      {
        childtitle: "Data Toko/Cabang",
        childlink: "/sites",
        isHide: false,
      },
      {
        childtitle: "Tambah Toko/Cabang",
        childlink: "/site/create",
        // isHide: true,
      }
    ]
  },

  {
    title: "Data PO",
    icon: "heroicons-outline:clipboard-document-list",
    link: "/app/home",
    child: [
      {
        childtitle: "Data Permintaan PO",
        childlink: "/pobyme"
      },  
      {
        childtitle: "Data Persetujuan PO",
        childlink: "/poapprove"
      },  
      {
        childtitle: "Tambah PO",
        childlink: "/po/create"
      },  
    ]
  },

  {
    title: "Data Stok",
    icon: "heroicons-outline:inbox-stack",
    link: "/app/home",
    child: [
      {
        childtitle: "Stok Toko/Cabang",
        childlink: "/stocks"
      },  
      {
        childtitle: "Stok Manual",
        childlink: "/manualstocks"
      },  
    ]
  },

  //Menu Master Dealer

  // {
  //   isHeadr: true,
  //   title: "Master Data Sales",
  // },

  // {
  //   title: "Master Produk",
  //   icon: "heroicons-outline:rectangle-group",
  //   link: "/app/home",
  //   child: [
  //     {
  //       childtitle: "Data Bundle Produk",
  //       childlink: "/bundles",
  //       isHide: false,
  //     },
  //     {
  //       childtitle: "Data Konten Army",
  //       childlink: "/contents/army",
  //       // isHide: true,
  //     }
  //   ]
  // },

  //Menu Master Sales
  // {
  //   title: "Sales",
  //   icon: "heroicons-outline:user-group",
  //   link: "/app/home",
  //   child: [
  //     {
  //       childtitle: "Sales Army",
  //       childlink: "/army",
  //     },
  //     {
  //       childtitle: "SPV Sales Army",
  //       childlink: "/spvarmy",
  //     },
  //     {
  //       childtitle: "Customer Sales Army",
  //       childlink: "/customerarmy",
  //     },
  //     {
  //       childtitle: "Sales Internal",
  //       childlink: "/coming-soon"
  //     }
  //   ]
  // },

  // {
  //   title: "Master Dealer Sales",
  //   icon: "heroicons-outline:truck",
  //   link: "/dealers",
  // },

  // {
  //   isHeadr: true,
  //   title: "Master Pengguna SJM",
  //   isHide: true,
  // },

  //Menu Master Pengguna
  {
    isHeadr: true,
    title: "Master Pengguna",
  },
  {
    title: "Admin Kantor",
    icon: "heroicons-outline:users",
    link: "/app/home",
    child: [
      {
        childtitle: "Admin Kantor",
        childlink: "/users",
        childicon: "heroicons-outline:users",
      },
      {
        childtitle: "Role Admin Kantor",
        childlink: "/permissions",
        childicon: "heroicons-outline:shield-exclamation",
      },
    ]
  },
  {
    title: "Admin Gudang",
    icon: "heroicons-outline:users",
    link: "/app/home",
    child: [
      {
        childtitle: "Admin Gudang",
        childlink: "/warehouse",
        childicon: "heroicons-outline:users",
      },
      {
        childtitle: "Admin SPV Gudang",
        childlink: "/warehousespv",
        childicon: "heroicons-outline:users",
      },
    ]
  },
  {
    title: "Admin Kasir",
    icon: "heroicons-outline:users",
    isOpen: true,
    isHide: true,
    link: '/cashiers'
  },  
  {
    title: "Sales",
    icon: "heroicons-outline:users",
    isOpen: true,
    isHide: true,
    link: '/sales'
  },  
  

  {
    isHeadr: true,
    title: "Laporan ",
  },

  {
    title: "Laporan PO",
    icon: "heroicons-outline:clipboard-document",
    isOpen: true,
    isHide: true,
    link: '/poreport'
  },  
  {
    title: "Laporan Stock Opname",
    icon: "heroicons-outline:clipboard-document",
    isOpen: true,
    isHide: true,
    link: '/soreport'
  },  
];

export const topMenu = [

  // Menu Dashboard
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "dashboard",
  },

  {
    title: "Master Data",
    icon: "heroicons-outline:view-boards",
    link: "/app/home",
    megamenu: [
      {
        megamenutitle: "Master Produk",
        megamenuicon: "heroicons-outline:rectangle-group",
        singleMegamenu: [
          {
            m_childtitle: "List Brand",
            m_childlink: "/brands",
          },
          {
            m_childtitle: "List Kategori",
            m_childlink: "/categories",
          },
          {
            m_childtitle: "List Supplier",
            m_childlink: "/suppliers",
          },
          {
            m_childtitle: "List Produk",
            m_childlink: "/products",
          },
          {
            m_childtitle: "List Variasi Produk",
            m_childlink: "/productvariants",
          },
        ],
      },
      {
        megamenutitle: "Master Cabang/Toko",
        megamenuicon: "heroicons-outline:building-office-2",
        singleMegamenu: [
          {
            m_childtitle: "List Cabang/Toko",
            m_childlink: "/sites",
          },
          {
            m_childtitle: "Tambah Cabang/Toko",
            m_childlink: "/site/create",
          },
          
        ],
      },
      {
        megamenutitle: "Master PO",
        megamenuicon: "heroicons-outline:clipboard-document-list",
        singleMegamenu: [
          {
            m_childtitle: "List Permintaan PO",
            m_childlink: "/pobyme",
          },
          {
            m_childtitle: "List Persetujuan PO",
            m_childlink: "/poapprove",
          },
          {
            m_childtitle: "Tambah PO",
            m_childlink: "/po/create",
          },
          
        ],
      },
      {
        megamenutitle: "Master Pengguna",
        megamenuicon: "heroicons-outline:chip",
        singleMegamenu: [
          {
            m_childtitle: "Admin Kantor",
            m_childlink: "/users",
          },
          {
            m_childtitle: "Admin SPV Gudang",
            m_childlink: "/warehousespv",
          },
          {
            m_childtitle: "Admin Gudang",
            m_childlink: "/warehouse",
          },
          {
            m_childtitle: "Admin Kasir",
            m_childlink: "/cashiers",
          },
          {
            m_childtitle: "Sales",
            m_childlink: "/sales",
          },
          {
            m_childtitle: "Pengaturan Perijinan Akun",
            m_childlink: "/permissions",
          },
          
        ],
      },
      
    ],
  },

  // Master PO

  // {
  //   title: "Master PO",
  //   icon: "heroicons-outline:clipboard-document-list",
  //   link: "/app/home",
  //   isHide: true,
  //   child: [
  //     {
  //       childtitle: "Data Permintaan PO",
  //       link: "/pobyme",
  //       childicon: "heroicons-outline:folder-arrow-down",
  //     },
  //     {
  //       childtitle: "Data Persetujuan PO",
  //       link: "/poapprove",
  //       childicon: "heroicons-outline:document-check",
  //     },
  //     {
  //       childtitle: "Tambah PO",
  //       link: "/po/create",
  //       childicon: "heroicons-outline:plus-circle",
  //     },
  //   ],
  // },

  //Menu Master Pengguna

  // {
  //   title: "Pengguna SJM",
  //   icon: "heroicons-outline:chip",
  //   link: "/app/home",
  //   isHide: true,
  //   child: [
  //     {
  //       childtitle: "Admin Warehouse",
  //       link: "/warehouse",
  //       childicon: "heroicons-outline:user",
  //     },
  //     {
  //       childtitle: "Admin SPV Warehouse",
  //       link: "/warehousespv",
  //       childicon: "heroicons-outline:user-circle",
  //     },
  //     {
  //       childtitle: "Admin Office",
  //       link: "/users",
  //       childicon: "heroicons-outline:users",
  //     },
  //     {
  //       childtitle: "Role Admin Office",
  //       link: "/permissions",
  //       childicon: "heroicons-outline:shield-exclamation",
  //     },
  //   ],
  // },

  //Master Report

  {
    title: "Laporan",
    icon: "heroicons-outline:information-circle",
    link: "/app/home",
    isHide: true,
    child: [
      {
        childtitle: "Laporan PO",
        link: "/poreport",
        childicon: "heroicons-outline:clipboard-document",
      },
      {
        childtitle: "Laporan Stok Opname",
        link: "/soreport",
        childicon: "heroicons-outline:clipboard-document",
      },
    ],
  },
  
];

// import User1 from "@/assets/images/all-img/user.png";
// export const notifications = [
//   {
//     title: "Your order is placed",
//     desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",

//     image: User1,
//     link: "#",
//   },
// ];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

// export const hexToRGB = (hex, alpha) => {
//   var r = parseInt(hex.slice(1, 3), 16),
//     g = parseInt(hex.slice(3, 5), 16),
//     b = parseInt(hex.slice(5, 7), 16);

//   if (alpha) {
//     return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
//   } else {
//     return "rgb(" + r + ", " + g + ", " + b + ")";
//   }
// };



// BACKUP MENU

  //Menu Master Inventory 
  // {
  //   title: "POS",
  //   icon: "heroicons-outline:rectangle-group",
  //   link: "/app/home",
  //   child: [
  //     {
  //       childtitle: "Data Produk",
  //       link: "/products",
  //     },
  //     {
  //       childtitle: "Data Kategori",
  //       link: "/categories"
  //     },
  //     {
  //       childtitle: "Data Mobil",
  //       link: "/cars"
  //     }
  //   ]
  // },

  // //Menu Master Cabang 
  // {
  //   title: "Master Cabang",
  //   icon: "heroicons-outline:building-office-2",
  //   link: "/app/home",
  //   child: [
  //     {
  //       childtitle: "Data Cabang",
  //       link: "/sites",
  //     },
  //     {
  //       childtitle: "Tambah Cabang",
  //       link: "/sites/create",
  //     },
  //   ]
  // },

  // //Menu Master Dealer 
  // {
  //   title: "Master Dealer",
  //   icon: "heroicons-outline:truck",
  //   link: "/dealers",
  // },

  // // Menu Master Sales
  // {
  //   title: "Master Sales",
  //   icon: "heroicons-outline:user-group",
  //   link: "/app/home",
  //   child: [
  //     {
  //       childtitle: "Sales Army",
  //       link: "/army",
  //     },
  //     {
  //       childtitle: "Sales Internal",
  //       link: "/coming-soon"
  //       // link: "/salesInternal"
  //     }
  //   ]
  // },