import React, { useEffect, useState, Fragment } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ApiEndpoint from "../../API/Api_EndPoint";
import axios from "../../API/Axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Textinput from "@/components/ui/Textinput";

const DetailStockOpnameReport = () => {
  let { uid } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState({
    products: [],
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null,
  });

  const [query, setQuery] = useState({
    search: "",
    product: [uid],
    paginate: 1,
  });

  async function getProducts(query) {
    setIsLoading(true);
    try {
      const response = await axios.post(`${ApiEndpoint.STOCK_OPNAME}/${uid}/products`, {
        page: query?.page,
        paginate: 10,
        search: query?.search,
        product: [uid],
      });
      setProducts(response?.data?.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  const handlePrevPagination = () => {
    if (products.prev_page_url) {
      setQuery({ ...query, page: products.current_page - 1 });
    }
  };

  const handleNextPagination = () => {
    if (products.next_page_url) {
      setQuery({ ...query, page: products.current_page + 1 });
    }
  };

  const handleFirstPagination = () => {
    setQuery({ ...query, page: 1 });
  };

  const handleLastPagination = () => {
    setQuery({ ...query, page: products?.last_page });
  };

  const generatePageNumbers = () => {
    const totalPages = products?.last_page;
    const maxPageNumbers = 5;
    const currentPage = products?.current_page;
    const middlePage = Math.floor(maxPageNumbers / 2);
    const startPage = Math.max(currentPage - middlePage, 1);
    const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

    const pageNumbers = [];
    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push({ page, active: page === currentPage });
    }

    return pageNumbers;
  };

  useEffect(() => {
    getProducts(query);
  }, [query]);

  useEffect(() => {
    getDataById();
  }, [uid]);

  const getDataById = () => {
    setIsLoading(true);
    try {
      if (uid) {
        axios.get(`${ApiEndpoint.STOCK_OPNAME}/${uid}`).then((response) => {
          setData(response?.data?.data);
          setIsLoading(false);
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="lg:col-span-3 col-span-12">
            <Card title="Info Stock Opname" className="mb-4">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:building-office" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Cabang
                    </div>
                    {data?.site?.name ? (
                      <>{data?.site?.name}</>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:calendar-days" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Tanggal Pelaporan
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {data?.reported_at ? (
                        <>{data?.reported_at}</>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:document-text" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Catatan
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {data?.note ? <>{data?.note}</> : <span>-</span>}
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="lg:col-span-9 col-span-12">
            <Card title="Info Produk" className="mb-4">
              <div className="md:flex justify-end items-center py-4 px-6">
                <div className="md:flex items-center gap-3">
                  <div className="row-span-3 md:row-span-4">
                    <Textinput
                      // value={query || ""}
                      onChange={(event) =>
                        setQuery({ ...query, search: event.target.value })
                      }
                      placeholder="Cari produk..."
                    />
                  </div>
                </div>
              </div>
              <div className="py-4 px-6">
                {isLoading ? (
                  <>
                    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                      <thead className="bg-slate-200 dark:bg-slate-700">
                        <tr>
                          <th scope="col" className=" table-th ">
                            Nama Produk
                          </th>
                          <th scope="col" className=" table-th ">
                            Stok Keseluruhan
                          </th>
                          <th scope="col" className=" table-th ">
                            Pelaporan Stok
                          </th>
                          <th scope="col" className=" table-th ">
                            Sisa Stok
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Beli
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Jual
                          </th>
                        </tr>
                      </thead>
                    </table>

                    <div className="w-full flex justify-center text-secondary p-10">
                      <Loading />
                    </div>
                  </>
                ) : data?.products?.length === 0 ? (
                  <>
                    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                      <thead className="bg-slate-200 dark:bg-slate-700">
                        <tr>
                          <th scope="col" className=" table-th ">
                            Nama Produk
                          </th>
                          <th scope="col" className=" table-th ">
                            Stok Keseluruhan
                          </th>
                          <th scope="col" className=" table-th ">
                            Pelaporan Stok
                          </th>
                          <th scope="col" className=" table-th ">
                            Sisa Stok
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Beli
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Jual
                          </th>
                        </tr>
                      </thead>
                    </table>

                    <div className="w-full flex flex-col justify-center text-secondary p-10">
                      <div className="w-full flex justify-center mb-3">
                        <span className="text-slate-900 dark:text-white text-[100px] transition-all duration-300">
                          <Icon icon="heroicons:information-circle" />
                        </span>
                      </div>
                      <div className="w-full flex justify-center text-secondary">
                        <span className="text-slate-900 dark:text-white text-[20px] transition-all duration-300">
                          Produk belum tersedia
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                    <thead className="bg-slate-200 dark:bg-slate-700">
                      <tr>
                        <th scope="col" className=" table-th ">
                          Nama Produk
                        </th>
                        <th scope="col" className=" table-th ">
                          Jenis Kelamin
                        </th>
                        <th scope="col" className=" table-th ">
                          Keterangan
                        </th>
                        <th scope="col" className=" table-th ">
                          Stok Fisik
                        </th>
                        <th scope="col" className=" table-th ">
                          Pelaporan Stok
                        </th>
                        <th scope="col" className=" table-th ">
                          Selisih Stok
                        </th>
                        <th scope="col" className=" table-th ">
                          Harga Beli
                        </th>
                        <th scope="col" className=" table-th ">
                          Harga Jual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {products?.data?.map((item, index) => (
                        <tr key={index}>
                          <td className="table-td"> {item?.variant?.product?.name}</td>
                          <td className="table-td"> {item?.variant?.product?.gender}</td>
                          <td className="table-td">{item?.description}</td>
                          <td className="table-td">{item?.real_qty}</td>
                          <td className="table-td">{item?.report_qty}</td>
                          <td className="table-td" style={{ color: item?.missing_qty < 5 ? 'red' : 'inherit' }}>
                            {item?.missing_qty}
                          </td>
                          <td className="table-td">
                            Rp{" "}
                            {item?.variant?.buy_price.toLocaleString("id-ID")}
                          </td>
                          <td className="table-td">
                            Rp{" "}
                            {item?.variant?.sell_price.toLocaleString(
                              "id-ID"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="custom-class flex justify-end mt-4">
                  <ul className="pagination">
                    <li>
                      <button
                        className="text-xl leading-4 text-slate-900 dark:text-white h-6  w-6 flex  items-center justify-center flex-col prev-next-btn "
                        onClick={handleFirstPagination}
                      >
                        <Icon icon="heroicons-outline:chevron-double-left" />
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-xl leading-4 text-slate-900 dark:text-white h-6  w-6 flex  items-center justify-center flex-col prev-next-btn "
                        onClick={handlePrevPagination}
                      >
                        <Icon icon="heroicons-outline:chevron-left" />
                      </button>
                    </li>

                    {generatePageNumbers().map((pageNumber) => (
                      <li key={pageNumber.page}>
                        <button
                          className={`${pageNumber.active ? "active" : ""
                            } page-link`}
                          onClick={() =>
                            setQuery({ ...query, page: pageNumber.page })
                          }
                        >
                          {pageNumber.page}
                        </button>
                      </li>
                    ))}

                    <li>
                      <button
                        className="text-xl leading-4 text-slate-900 dark:text-white h-6  w-6 flex  items-center justify-center flex-col prev-next-btn "
                        onClick={handleNextPagination}
                      >
                        <Icon icon="heroicons-outline:chevron-right" />
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-xl leading-4 text-slate-900 dark:text-white h-6  w-6 flex  items-center justify-center flex-col prev-next-btn "
                        onClick={handleLastPagination}
                      >
                        <Icon icon="heroicons-outline:chevron-double-right" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStockOpnameReport;
