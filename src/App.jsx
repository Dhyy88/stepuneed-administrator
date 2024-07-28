import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AbilityProvider, useAbility } from "./API/PermissionContext";
import { createMongoAbility } from "@casl/ability";
import Layout from "./layout/Layout";
import Loading from "@/components/Loading";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/auth/login"));
const Error = lazy(() => import("./pages/404"));
const Error403 = lazy(() => import("./pages/403"));
const ComingSoonPage = lazy(() => import("./pages/utility/coming-soon"));
const UnderConstructionPage = lazy(() => import("./pages/utility/under-construction"));

// Master Account Setting
const Profiles = lazy(() => import("./pages/MasterUser/MasterAccount")); 
const ProfileSetting = lazy(() => import("./pages/MasterUser/MasterAccount/profile_setting"));
const PasswordSetting = lazy(() => import("./pages/MasterUser/MasterAccount/password_setting"));

// Master Sales Pages
const SalesArmy = lazy(() => import("./pages/MasterSales/SalesArmy"));
const DetailArmy = lazy(() => import("./pages/MasterSales/SalesArmy/detail"));
const ReviewArmy = lazy(() => import("./pages/MasterSales/SalesArmy/review"));
const ArmyContents = lazy(() => import("./pages/MasterSales/SalesArmy/ArmyContent"));

//Master Sales Army Pages
const SalesArmySPV = lazy(() => import("./pages/MasterSales/SalesArmy/SPV"));
const DetailSPVArmy = lazy(() => import("./pages/MasterSales/SalesArmy/SPV/detail"));
const ReviewSPVArmy = lazy(() => import("./pages/MasterSales/SalesArmy/SPV/review"));
const CustomerArmy = lazy(() => import("./pages/MasterSales/SalesArmy/Customer"));

const SalesInternal = lazy(() => import("./pages/MasterSales/SalesInternal"));

// Master Divisi
const Sites = lazy(() => import("./pages/MasterData/MasterSite"));
const CreateSite = lazy(() => import("./pages/MasterData/MasterSite/create"));
const UpdateSite = lazy(() => import("./pages/MasterData/MasterSite/update"));
const Warehouses = lazy(() => import("./pages/MasterUser/MasterWarehouse"));
const SPVWarehouses = lazy(() => import("./pages/MasterUser/MasterWarehouseSPV"));

// Master User
const Users = lazy(() => import("./pages/MasterUser/MasterAccountUser"));
const DetailUser = lazy(() => import("./pages/MasterUser/MasterAccountUser/detail"));
const Permissions = lazy(() => import("./pages/MasterUser/MasterPermission"));
const CreatePermission = lazy(() => import('./pages/MasterUser/MasterPermission/create'));
const UpdatePermission = lazy(() => import('./pages/MasterUser/MasterPermission/update'));
const Cashiers = lazy(() => import("./pages/MasterUser/MasterCashier"));
const Sales = lazy(() => import("./pages/MasterUser/MasterSales"));

// Master Data
const Products = lazy(() => import("./pages/MasterData/Product"));
const VariantProducts = lazy(() => import("./pages/MasterData/Product/index_variant"));
const CreateProduct = lazy(() => import("./pages/MasterData/Product/create"));
const DetailProducts = lazy(() => import("./pages/MasterData/Product/detail"));
const UpdateProduct = lazy(() => import("./pages/MasterData/Product/update"));
// const Bundles = lazy(() => import("./pages/MasterData/Bundles"));
// const CreateBundle = lazy(() => import("./pages/MasterData/Bundles/create"));
// const UpdateBundle = lazy(() => import("./pages/MasterData/Bundles/update"));
// const DetailBundles = lazy(() => import("./pages/MasterData/Bundles/detail"));
const Categories = lazy(() => import("./pages/MasterData/Category"));
const BrandsProduct = lazy(() => import("./pages/MasterData/Brands"));

const Suppliers = lazy(() => import("./pages/MasterData/Supplier"));
const DetailSupplier = lazy(() => import("./pages/MasterData/Supplier/detail"));
const CreateSupplier = lazy(() => import("./pages/MasterData/Supplier/create"));
const UpdateSupplier = lazy(() => import("./pages/MasterData/Supplier/update"));
const SetProduct = lazy(() => import("./pages/MasterData/Supplier/set_product"));
// const SetProductBundle = lazy(() => import("./pages/MasterData/Bundles/set_product_bundle"));

// Master Purchase Order
const PurchaseOrder = lazy(() => import("./pages/MasterPO"));
const PurchaseOrderByMe = lazy(() => import("./pages/MasterPO/index_by_me"));
const CreatePurchaseOrder = lazy(() => import("./pages/MasterPO/create"));
const DetailPurchaseOrder = lazy(() => import("./pages/MasterPO/detail"));
const UpdatePurchaseOrder = lazy(() => import("./pages/MasterPO/update"));
const ApprovePuchaseOrder = lazy(() => import("./pages/MasterPO/index_approve"));

// Master Stock Manual
const StockManual = lazy(() => import("./pages/MasterStock/MasterStockManual"));
const DetailManualStock = lazy(() => import("./pages/MasterStock/MasterStockManual/detail"));
const CreateStockManual = lazy(() => import("./pages/MasterStock/MasterStockManual/create"));
const UpdateManualStock = lazy(() => import("./pages/MasterStock/MasterStockManual/update"));
const StocksSite = lazy(() => import("./pages/MasterStock/StockSite"));

// Master Report
const PurchaseOrderReport = lazy(() => import("./pages/MasterReport/index_PO"));
const StockOpnameReport = lazy(() => import("./pages/MasterReport/index_SO"));
const DetailStockOpnameReport = lazy(() => import("./pages/MasterReport/detail"));

const Contoh = lazy(() => import("./pages/MasterData/Product/contoh"))

function App() {
  const ability = createMongoAbility();
    return (
      <AbilityProvider ability={ability}>
        <main className="App relative">
          <Routes>
            <Route path="/" element={ <Suspense fallback={<Loading />}> <Login /> </Suspense>} />
            <Route path="/*" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="contoh" element={<Contoh />} />

              {/* Route Sales Army */}
              <Route path="army" element={<SalesArmy />} />
              <Route path="army/detail/:uid" element={<DetailArmy />} />
              <Route path="army/review/:uid" element={<ReviewArmy />} />
              <Route path="contents/army" element={<ArmyContents />} />

              {/* Route Sales Army SPV */}
              <Route path="spvarmy" element={<SalesArmySPV />} />
              <Route path="spvarmy/detail/:uid" element={<DetailSPVArmy />} />
              <Route path="spvarmy/review/:uid" element={<ReviewSPVArmy />} />
              <Route path="customerarmy" element={<CustomerArmy />} />

              {/* Route Sales Internal */}
              <Route path="salesInternal" element={<SalesInternal />} />

              {/* Route Divisi */}
              <Route path="sites" element={<Sites />} />
              <Route path="site/create" element={ <Suspense fallback={<Loading />}> <CreateSiteProtect /> </Suspense> } />
              <Route path="site/update/:uid" element={ <Suspense fallback={<Loading />}> <UpdateSiteProtect /> </Suspense> } />
              <Route path="warehouse" element={<Warehouses />} />
              <Route path="warehousespv" element={<SPVWarehouses />} />
              
              {/* Route Master Data */}
              <Route path="products" element={<Products />} />
              <Route path="productvariants" element={<VariantProducts />} />
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="product/detail/:uid" element={<DetailProducts />} />
              <Route path="product/update/:uid" element={<UpdateProduct />} />
              
              {/* <Route path="bundles" element={<Bundles />} />
              <Route path="bundles/create" element={<CreateBundle />} />
              <Route path="bundles/detail/:uid" element={<DetailBundles />} />
              <Route path="bundles/update/:uid" element={<UpdateBundle />} />
              <Route path="bundles/setProduct/:uid" element={<SetProductBundle />} /> */}
              <Route path="categories" element={<Categories />} />
              <Route path="brands" element={<BrandsProduct />} />

               {/* Route Master Supplier */}
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="supplier/create" element={<CreateSupplier />} />
              <Route path="supplier/detail/:uid" element={<DetailSupplier />} />
              <Route path="supplier/update/:uid" element={<UpdateSupplier />} />
              <Route path="supplier/product/:uid" element={<SetProduct />} />

              {/* Route Master Purchase Order */}
              {/* <Route path="po" element={<PurchaseOrder />} /> */}
              <Route path="po" element={ <Suspense fallback={<Loading />}> <UserPOProtect /> </Suspense> } />
              <Route path="pobyme" element={<PurchaseOrderByMe />} />
              <Route path="poapprove" element={<ApprovePuchaseOrder />} />
              <Route path="po/create" element={<CreatePurchaseOrder />} />
              <Route path="po/detail/:uid" element={<DetailPurchaseOrder />} />
              <Route path="po/update/:uid" element={<UpdatePurchaseOrder />} />

              <Route path="manualstocks" element={<StockManual />} /> 
              <Route path="manualstock/create" element={<CreateStockManual />} /> 
              <Route path="manualstock/detail/:uid" element={<DetailManualStock />} />
              <Route path="manualstock/update/:uid" element={<UpdateManualStock />} />
              <Route path="stocks" element={<StocksSite />} /> 

              {/* Route Report */}
              <Route path="poreport" element={ <PurchaseOrderReport />} />
              <Route path="soreport" element={ <StockOpnameReport />} />
              <Route path="soreport/detail/:uid" element={ <DetailStockOpnameReport />} />

              {/* Route User */}
              <Route path="profile" element={<Profiles />} />
              <Route path="profile/setting" element={<ProfileSetting />} />
              <Route path="profile/setting/password" element={<PasswordSetting />} />
              <Route path="users" element={ <Suspense fallback={<Loading />}> <UserProtect /> </Suspense> } />
              
              <Route path="users/detail/:uid" element={<DetailUser />} />

              <Route path="cashiers" element={<Cashiers />} />
              <Route path="sales" element={<Sales />} />

              {/* Route Permission */}
              <Route path="permissions" element={<Permissions />} />
              <Route path="permission/create" element={<CreatePermission />} />
              <Route path="permission/update/:uid" element={<UpdatePermission />} />
              
              {/* Route Error */}
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="#" element={<Navigate to="/403" />} />
            </Route>

            <Route path="/404" element={ <Suspense fallback={<Loading />}> <Error /> </Suspense> } />
            <Route path="/403" element={ <Suspense fallback={<Loading />}> <Error403 /> </Suspense> } />
            <Route path="/coming-soon" element={ <Suspense fallback={<Loading />}> <ComingSoonPage /> </Suspense> } />
            <Route path="/under-construction" element={ <Suspense fallback={<Loading />}> <UnderConstructionPage /> </Suspense> } />
          </Routes>
        </main>
      </AbilityProvider>
    );
  }

  function ProtectedComponent({ action, permission, component }) {
  const ability = useAbility();
  const isSpv = localStorage.getItem("is_spv") === "true";
  const isHO = localStorage.getItem("is_spv") === "false";
    if (isSpv || ability.can(action, permission)) {
      return component;
    }
    return <Navigate to="/403" />;

  }

  function UserProtect() {
    return (
      <ProtectedComponent
        action="read"
        permission="Pengguna"
        component={<Users />}
      />
    );
  }

  function UserPOProtect() {
    return (
      <ProtectedComponent 
      
        action="read"
        permission="PO"
        component={<PurchaseOrder />}
      />
    )
  }

  function CreateSiteProtect() {
    return (
      <ProtectedComponent
        action="read"
        permission="Tambah Cabang"
        component={<CreateSite />}
      />
    );
  }
  function UpdateSiteProtect() {
    return (
      <ProtectedComponent
        action="read"
        permission="Ubah Cabang"
        component={<UpdateSite />}
      />
    );
  }

export default App;
