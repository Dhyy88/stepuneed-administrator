import React, { useEffect, useState, Fragment } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ApiEndpoint from "../../../API/Api_EndPoint";
import axios from "../../../API/Axios";
import { useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

import image1 from "@/assets/images/all-img/widget-bg-1.png";

const DetailManualStock = () => {
  let { uid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getDataById = () => {
    setIsLoading(true);
    try {
      if (uid) {
        axios.get(`${ApiEndpoint.MANUAL_STOCK}/${uid}`).then((response) => {
          setData(response?.data?.data);
          setIsLoading(false);
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  async function onDelete(uid) {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Apakah Anda yakin ingin menghapus permintaan stok ini?",
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
          await axios.delete(`${ApiEndpoint.MANUAL_STOCK}/${uid}`);
          Swal.fire(
            "Berhasil!",
            "Anda berhasil menghapus data ini.",
            "success"
          );
          navigate(`/manualstocks`);
        } else {
          Swal.fire("Batal", "Hapus data dibatalkan.", "info");
        }
      }
    } catch (err) {
      Swal.fire("Gagal", err.response.data.message, "error");
    }
  }

  useEffect(() => {
    getDataById();
  }, [uid]);

  return (
    <div>
      <div className="space-y-5 profile-page">
        <div
          className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
          style={{
            backgroundImage: `url(${image1})`,
          }}
        ></div>

        <div className="grid grid-cols-12 gap-6 ">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Informasi" className="mb-4">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:paper-clip" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Catatan
                    </div>
                    {data?.note ? <>{data?.note}</> : <span>-</span>}
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:building-office" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Toko/Cabang
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
                    <Icon icon="heroicons:user" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Dibuat Oleh
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {data?.request_by?.profile?.first_name ? (
                        <>
                          {data?.request_by?.profile?.first_name}{" "}
                          {data?.request_by?.profile?.last_name}
                        </>
                      ) : (
                        <>{data?.request_by?.email}</>
                      )}
                    </div>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:check-circle" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Status Penerimaan
                    </div>
                    {data?.is_received ? (
                      <span className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-300">
                        Diterima
                      </span>
                    ) : (
                      <span className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
                        Belum Diterima
                      </span>
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
              {/* <div className="py-3 px-5">
                <div className="card-title2 mb-2">
                  Perbaharui Permintaan Stok
                </div>
                <div className="flex row justfiy-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm">
                      Harap memperhatikan kembali data dari permintaan stok yang
                      ingin diperbaharui.
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="">
                      <Button
                        text="Perbaharui"
                        className="btn-warning dark w-full btn-sm "
                        onClick={() => navigate(`/manualstock/update/${uid}`)}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="py-3 px-5">
                <div className="card-title2 mb-2">Hapus Permintaan Stok</div>
                <div className="flex row justfiy-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm">
                      Setelah anda menghapus permintaan stok, tidak ada akses
                      untuk mengembalikan data. Harap mempertimbangkannya
                      kembali.
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="">
                      <Button
                        text="Hapus"
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
              <div className="py-4 px-6">
                <div className="">
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
                            {/* <th scope="col" className=" table-th ">
                            Nama Produk
                          </th> */}
                            <th scope="col" className=" table-th ">
                              Harga
                            </th>
                            <th scope="col" className=" table-th ">
                              Jumlah
                            </th>
                            <th scope="col" className=" table-th ">
                              Total Harga
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
                            {/* <th scope="col" className=" table-th ">
                            Nama Produk
                          </th> */}
                            <th scope="col" className=" table-th ">
                              Harga
                            </th>
                            <th scope="col" className=" table-th ">
                              Jumlah
                            </th>
                            <th scope="col" className=" table-th ">
                              Total Harga
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
                          {/* <th scope="col" className=" table-th ">
                            Nama Produk
                          </th> */}
                          <th scope="col" className=" table-th ">
                            Harga
                          </th>
                          <th scope="col" className=" table-th ">
                            Jumlah
                          </th>
                          <th scope="col" className=" table-th ">
                            Total Harga
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                        {data?.manual_stock_products?.map((item, index) => (
                          <tr key={index}>
                            <td className="table-td">
                              {item?.variant?.sku ? item?.variant?.sku : "-"}
                            </td>
                            <td className="table-td">
                              {item?.variant?.barcode
                                ? item?.variant?.barcode
                                : "-"}
                            </td>
                            <td className="table-td">
                              {item?.price ? (
                                <span>
                                  Rp {item?.price.toLocaleString("id-ID")}
                                </span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td className="table-td">{item?.quantity}</td>

                            <td className="table-td">
                              {item?.total_price ? (
                                <span>
                                  Rp {item?.total_price.toLocaleString("id-ID")}
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
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailManualStock;
