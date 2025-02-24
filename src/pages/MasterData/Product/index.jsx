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

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null,
  });
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [is_active, setIsActive] = useState("");
  const [selected_category, setSelectedCategory] = useState(null);
  const [selected_brand, setSelectedBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState({
    search: "",
    is_active: "",
    paginate: 5,
    category: "",
    brand: "",
  });

  const typeStatus = [
    { value: "", label: "Semua Status" },
    { value: "1", label: "Aktif" },
    { value: "0", label: "Nonaktif" },
  ];

  async function getDataProducts(query) {
    setIsLoading(true);
    try {
      const response = await axios.post(ApiEndpoint.PRODUCTS, {
        page: query?.page,
        search: query?.search,
        is_active: query?.is_active,
        paginate: 10,
        category: query?.category,
        brand: query?.brand,
      });
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      Swal.fire("Gagal", err?.response?.data?.message, "error");
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  const getCategory = () => {
    axios.get(ApiEndpoint.CATEGORY).then((response) => {
      setCategory(response?.data?.data);
    });
  };

  const getBrand = () => {
    axios.get(ApiEndpoint.BRANDS).then((response) => {
      setBrand(response?.data?.data);
    });
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
    getCategory();
    getBrand();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-12 col-span-12">
          <Card title="Data Produk">
            <div className="md:flex justify-between items-center mb-4">
              <div className="md:flex items-center gap-3">
                <div className="row-span-3 md:row-span-4">
                  <Button
                    text="Tambah Produk"
                    className="btn-primary dark w-full btn-sm "
                    onClick={() => navigate(`/product/create`)}
                  />
                </div>
              </div>
              <div className="md:flex items-center gap-3">
                <div className="row-span-3 md:row-span-4 w-48">
                  <Select
                    className="react-select py-2 w-full"
                    classNamePrefix="select"
                    placeholder="Filter status..."
                    options={typeStatus}
                    value={is_active}
                    onChange={(value) => {
                      setQuery({ ...query, is_active: value?.value });
                      setIsActive(value);
                    }}
                    isClearable
                  />
                </div>

                <div className="row-span-3 md:row-span-4 w-48">
                  <Select
                    className="react-select py-2 w-full"
                    classNamePrefix="select"
                    placeholder="Filter kategori..."
                    options={[
                      { value: "", label: "Semua Kategori" },
                      ...(category?.map((item) => ({
                        value: item.uid,
                        label: item.name,
                      })) || []),
                    ]}
                    onChange={(value) => {
                      setQuery({ ...query, category: value?.value });
                      setSelectedCategory(value);
                    }}
                    value={selected_category}
                    showSearch
                    isClearable
                  />
                </div>

                <div className="row-span-3 md:row-span-4 w-48">
                  <Select
                    className="react-select py-2 w-full"
                    classNamePrefix="select"
                    placeholder="Filter brand..."
                    options={[
                      { value: "", label: "Semua Brand" },
                      ...(brand?.map((item) => ({
                        value: item.uid,
                        label: item.name,
                      })) || []),
                    ]}
                    onChange={(value) => {
                      setQuery({ ...query, brand: value?.value });
                      setSelectedBrand(value);
                    }}
                    value={selected_brand}
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
                              Brand
                            </th>
                            <th scope="col" className=" table-th ">
                              Kategori
                            </th>
                            <th scope="col" className=" table-th ">
                              Jenis Kelamin
                            </th>
                            <th scope="col" className=" table-th ">
                              Harga Jual
                            </th>
                            <th scope="col" className=" table-th ">
                              Status
                            </th>
                            <th scope="col" className=" table-th ">
                              Total Stok
                            </th>
                            <th scope="col" className=" table-th ">
                              Thumbnail
                            </th>
                            <th scope="col" className=" table-th ">
                              Aksi
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
                              Brand
                            </th>
                            <th scope="col" className=" table-th ">
                              Kategori
                            </th>
                            <th scope="col" className=" table-th ">
                              Jenis Kelamin
                            </th>
                            <th scope="col" className=" table-th ">
                              Harga Jual
                            </th>
                            <th scope="col" className=" table-th ">
                              Status
                            </th>
                            <th scope="col" className=" table-th ">
                              Total Stok
                            </th>
                            <th scope="col" className=" table-th ">
                              Thumbnail
                            </th>
                            <th scope="col" className=" table-th ">
                              Aksi
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
                            Brand
                          </th>
                          <th scope="col" className=" table-th ">
                            Kategori
                          </th>
                          <th scope="col" className=" table-th ">
                            Jenis Kelamin
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Jual
                          </th>
                          <th scope="col" className=" table-th ">
                            Status
                          </th>
                          <th scope="col" className=" table-th ">
                            Total Stok
                          </th>
                          <th scope="col" className=" table-th ">
                            Thumbnail
                          </th>
                          <th scope="col" className=" table-th ">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                        {data?.data?.map((item, index) => (
                          <tr key={index}>
                            <td className="table-td">{item?.full_name} </td>
                            <td className="table-td">{item?.brand?.name} </td>
                            <td className="table-td">
                              {item?.category?.name}{" "}
                            </td>
                            <td className="table-td">{item?.gender} </td>
                            <td className="table-td">
                              {item?.primary_variant?.sell_price ? (
                                <span>
                                  Rp {item?.primary_variant?.sell_price.toLocaleString("id-ID")}
                                </span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>

                            <td className="table-td">
                              {item?.is_active === true ? (
                                <span className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500">
                                  Aktif
                                </span>
                              ) : (
                                <span className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
                                  Nonaktif
                                </span>
                              )}
                            </td>
                            <td className="table-td">{item?.stocks_count}</td>
                            <td className="table-td">
                              {item?.primary_image?.url ? (
                                <img
                                  src={item?.primary_image?.url}
                                  alt=""
                                  className="w-16 h-16 object-cover rounded-full"
                                />
                              ) : (
                                <img
                                  src={Product}
                                  alt=""
                                  className="w-16 h-16 object-cover rounded-full"
                                />
                              )}
                            </td>

                            <td className="table-td">
                              <div className="flex space-x-3 rtl:space-x-reverse">
                                <Tooltip
                                  content="Detail Produk"
                                  placement="top"
                                  arrow
                                  animation="shift-away"
                                >
                                  <button
                                    className="action-btn"
                                    type="button"
                                    onClick={() =>
                                      navigate(`/product/detail/${item.uid}`)
                                    }
                                  >
                                    <Icon icon="heroicons:eye" />
                                  </button>
                                </Tooltip>
                              </div>
                            </td>
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

export default Products;
