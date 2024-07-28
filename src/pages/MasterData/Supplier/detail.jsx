import React, { useEffect, useState, Fragment } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ApiEndpoint from "../../../API/Api_EndPoint";
import axios from "../../../API/Axios";
import { useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/LoadingButton";
import Alert from "@/components/ui/Alert";
import { Modal } from "antd";
import Select from "react-select";
import Loading from "../../../components/Loading";
import Tooltip from "@/components/ui/Tooltip";

import image1 from "@/assets/images/all-img/widget-bg-1.png";

const DetailSupplier = () => {
  let { uid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const getDataById = () => {
    setIsLoading(true);
    try {
      if (uid) {
        axios.get(`${ApiEndpoint.SUPPLIER}/${uid}`).then((response) => {
          setData(response?.data?.data);
          setIsLoading(false);
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };


  async function getProducts(query) {
    setIsLoading(true);
    try {
      const response = await axios.post(`${ApiEndpoint.SUPPLIER}/${uid}/products`, {
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

  async function onDelete(uid) {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Apakah Anda yakin ingin menghapus supplier ini?",
        text: "Anda tidak akan dapat mengembalikannya!",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const { value: input } = await Swal.fire({
          icon: "warning",
          title: "Verifikasi",
          text: `Silahkan ketik "hapus" untuk melanjutkan verifikasi hapus data !`,
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Konfirmasi",
          cancelButtonText: "Batal",
          inputValidator: (value) => {
            if (!value || value.trim().toLowerCase() !== "hapus") {
              return 'Anda harus memasukkan kata "hapus" untuk melanjutkan verifikasi hapus data!';
            }
          },
        });

        if (input && input.trim().toLowerCase() === "hapus") {
          await axios.delete(`${ApiEndpoint.SUPPLIER}/${uid}`);
          Swal.fire(
            "Berhasil!",
            "Anda berhasil menghapus data supplier ini.",
            "success"
          );
          navigate(`/suppliers`);
        } else {
          Swal.fire("Batal", "Hapus data supplier dibatalkan.", "info");
        }
      }
    } catch (err) {
      Swal.fire("Gagal", err.response.data.message, "error");
    }
  }


  return (
    <div>
      <div className="space-y-5 profile-page">
        <div
          className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
          style={{
            backgroundImage: `url(${image1})`,
          }}
        >
          <div className="max-w-[169px]">
            <div className="text-xl font-medium text-slate-900 mb-2">
              {data?.name}
            </div>
            <p className="text-sm text-slate-800">{data?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 ">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info Supplier" className="mb-4">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:paper-clip" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Kode Supplier
                    </div>
                    {data?.code ? (
                      <>{data?.code}</>
                    ) : (
                      <span>Kode supplier belum diatur</span>
                    )}
                  </div>

                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:device-phone-mobile" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      No Telepon
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {data?.phone_number ? (
                        <>{data?.phone_number}</>
                      ) : (
                        <span>No Telepon belum diatur</span>
                      )}
                    </div>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:user" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Nama Rekening
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {data?.bank_account_name ? (
                        <>{data?.bank_account_name}</>
                      ) : (
                        <span>Nama bank belum diatur</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:credit-card" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      No Rekening
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {data?.bank_account_number ? (
                        <>
                          {data?.bank_account_number} {data?.bank}
                        </>
                      ) : (
                        <span>Rekening belum diatur</span>
                      )}
                    </div>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:map-pin" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Provinsi / Kota
                    </div>
                    {data?.province?.name ? (
                      <>
                        {data?.province?.name} / {data?.city?.name}
                      </>
                    ) : (
                      <span>Provinsi kota belum diatur </span>
                    )}
                  </div>
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:rectangle-group" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Total Produk
                    </div>
                    {data?.product_count ? (
                      <>{data?.product_count}</>
                    ) : (
                      <span>Produk belum tersedia </span>
                    )}
                  </div>
                </li>
              </ul>
            </Card>

            <Card bodyClass="p-0" noborder>
              <header
                className={`border-b px-4 pt-4 pb-3 flex items-center  border-danger-500`}
              >
                <h6 className={`card-title mb-0  text-danger-500`}>
                  Danger Zone
                </h6>
              </header>
              <div className="py-3 px-5">
                <div className="card-title2 mb-2">Perbaharui Supplier</div>
                <div className="flex row justfiy-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm">
                      Harap memperhatikan kembali data dari supplier yang ingin
                      diperbaharui.
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="">
                      <Button
                        text="Perbaharui Supplier"
                        className="btn-warning dark w-full btn-sm "
                        onClick={() => navigate(`/supplier/update/${uid}`)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3 px-5">
                <div className="card-title2 mb-2">Hapus Supplier</div>
                <div className="flex row justfiy-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm">
                      Setelah anda menghapus supplier, tidak ada akses untuk
                      mengembalikan data. Harap mempertimbangkannya kembali.
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="">
                      <Button
                        text="Hapus Supplier"
                        className="btn-danger dark w-full btn-sm "
                        onClick={() => onDelete(uid)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 col-span-12">
            <Card title="Info Produk" className="mb-4">
              <div className="md:flex justify-end items-center py-4 px-6 gap-6">
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
                <div className="md:flex items-center gap-3">
                  <div className="row-span-3 md:row-span-4">
                    <Button
                      text="Atur Produk Supplier"
                      className=" btn-primary light"
                      onClick={() => navigate(`/supplier/product/${uid}`)}
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
                            SKU
                          </th>
                          <th scope="col" className=" table-th ">
                            Barcode
                          </th>
                          <th scope="col" className=" table-th ">
                            Alias Produk
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Supplier
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
                            SKU
                          </th>
                          <th scope="col" className=" table-th ">
                            Barcode
                          </th>
                          <th scope="col" className=" table-th ">
                            Alias Produk
                          </th>
                          <th scope="col" className=" table-th ">
                            Harga Supplier
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
                          SKU
                        </th>
                        <th scope="col" className=" table-th ">
                          Barcode
                        </th>
                        <th scope="col" className=" table-th ">
                          Alias Produk
                        </th>
                        <th scope="col" className=" table-th ">
                          Harga Supplier
                        </th>
                        <th scope="col" className=" table-th ">
                          Harga Jual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {products?.data?.map((item, index) => (
                        <tr key={index}>
                          <td className="table-td">{item?.sku ? item?.sku : "-"}</td>
                          <td className="table-td">{item?.barcode ? item?.barcode : "-"}</td>
                          <td className="table-td">
                            {item?.detail?.product_name_alias}
                          </td>
                          <td className="table-td">
                            {item?.detail?.price ? (
                              <span>
                                Rp{" "}
                                {item?.detail?.price.toLocaleString("id-ID")}
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

export default DetailSupplier;