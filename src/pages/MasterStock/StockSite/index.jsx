import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import axios from "../../../API/Axios";
import ApiEndpoint from "../../../API/Api_EndPoint";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import Product from "@/assets/images/logo/logopng.png";
import Select from "react-select";
import Alert from "@/components/ui/Alert";

const StocksSite = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [site, setSite] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  const [query, setQuery] = useState({
    search: "",
    paginate: 5,
    site: "",
  });

  async function getDataProducts(query) {
    setIsLoading(true);
    try {
      const response = await axios.post(ApiEndpoint.STOCK, {
        page: query?.page,
        search: query?.search,
        paginate: 8,
        site: query?.site,
      });
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
      Swal.fire("Gagal", err?.response?.data?.message, "error");
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  const getSite = async () => {
    try {
      const store_response = await axios.get(ApiEndpoint.WAREHOUSE_LIST);
      const whstore_response = await axios.get(ApiEndpoint.STORE_WH_LIST);
      const site_response = [
        ...store_response?.data?.data,
        ...whstore_response?.data?.data,
      ];

      setSite(site_response);
    } catch (error) {
      Swal.fire("Gagal", error.response.data.message, "error");
    }
  };

  const handlePrevPagination = () => {
    if (data.prev_page_url) {
      setQuery({ ...query, page: data.current_page - 1 });
    }
  };

  const handleNextPagination = () => {
    if (data.next_page_url) {
      setQuery({ ...query, page: data.current_page + 1 });
    }
  };

  const handleFirstPagination = () => {
    setQuery({ ...query, page: 1 });
  };

  const handleLastPagination = () => {
    setQuery({ ...query, page: data.last_page });
  };

  const generatePageNumbers = () => {
    const totalPages = data.last_page;
    const maxPageNumbers = 5;
    const currentPage = data.current_page;
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
    getDataProducts(query);
  }, [query]);

  useEffect(() => {
    getSite();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-12 col-span-12">
          <Card title="Data Stok Produk Berdasarkan Cabang">
            <Alert
              icon="heroicons-outline:exclamation"
              className="light-mode alert-primary mb-5"
            >
              Silahkan melakukan filter toko atau cabang terlebih dahulu untuk
              melihat stok tiap toko atau cabang !
            </Alert>
            <div className="md:flex justify-end items-center mb-4">
              <div className="md:flex items-center gap-3">
                <div className="row-span-3 md:row-span-4 w-48">
                  <Select
                    className="react-select py-2 w-full"
                    classNamePrefix="select"
                    placeholder="Filter cabang..."
                    options={[
                      { value: "", label: "Semua Cabang" },
                      ...(site?.map((item) => ({
                        value: item.uid,
                        label: item.name,
                      })) || []),
                    ]}
                    onChange={(value) => {
                      setQuery({ ...query, site: value?.value });
                      setSelectedSite(value);
                    }}
                    value={selectedSite}
                    showSearch
                    isClearable
                  />
                </div>
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
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  {isLoading ? (
                    <>
                      <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                        <thead className="bg-slate-200 dark:bg-slate-700">
                          <tr>
                            <th scope="col" className=" table-th ">
                              Nama Produk
                            </th>
                            <th scope="col" className=" table-th ">
                              Harga Beli
                            </th>
                            <th scope="col" className=" table-th ">
                              Harga Jual
                            </th>
                            <th scope="col" className=" table-th ">
                              Total Stok
                            </th>
                          </tr>
                        </thead>
                      </table>

                      <div className="w-full flex justify-center text-secondary p-10">
                        <Loading />
                      </div>
                    </>
                  ) : data?.data?.length === 0 ? (
                    <>
                      <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                        <thead className="bg-slate-200 dark:bg-slate-700">
                          <tr>
                            <th scope="col" className=" table-th ">
                              Nama Produk
                            </th>
                            <th scope="col" className=" table-th ">
                              Harga Beli
                            </th>
                            <th scope="col" className=" table-th ">
                              Harga Jual
                            </th>
                            <th scope="col" className=" table-th ">
                              Total Stok
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
                            Harga Beli
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Jual
                          </th>
                          <th scope="col" className=" table-th ">
                            Total Stok
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                        {data?.data?.map((item, index) => (
                          <tr key={index}>
                            <td className="table-td">{item?.full_name} </td>
                            <td className="table-td">
                              {item?.buy_price ? (
                                <span>
                                  Rp {item?.buy_price.toLocaleString("id-ID")}
                                </span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td className="table-td">
                              {item?.sell_price ? (
                                <span>
                                  Rp {item?.sell_price.toLocaleString("id-ID")}
                                </span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td className="table-td">{item?.stocks_count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
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
                          className={`${
                            pageNumber.active ? "active" : ""
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
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StocksSite;
