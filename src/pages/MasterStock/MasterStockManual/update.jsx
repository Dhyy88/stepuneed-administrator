import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import axios from "../../../API/Axios";
import ApiEndpoint from "../../../API/Api_EndPoint";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Select from "react-select";
import Switch from "@/components/ui/Switch";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/ui/Alert";
import LoadingButton from "../../../components/LoadingButton";
import { useParams } from "react-router-dom";
import { index } from "d3-array";

const UpdateManualStock = () => {
  const navigate = useNavigate();
  let { uid } = useParams();

  const [dataProduct, setDataProduct] = useState([]);
  const [selectedVariantDetails, setSelectedVariantDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [note, setNote] = useState("");
  const [site, setSite] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  const [variants, setVariants] = useState([""]);
  const [quantities, setQuantities] = useState([""]);
  const [price, setPrice] = useState([""]);

  const previousPage = () => {
    navigate(-1);
  };

  const getDataById = () => {
    try {
      if (uid) {
        axios.get(`${ApiEndpoint.MANUAL_STOCK}/${uid}`).then((response) => {
          const stockData = response.data.data;
          setSelectedSite({
            value: response?.data?.data?.site?.uid,
            label: response?.data?.data?.site?.name,
          });
          setNote(stockData.note);

          if (
            stockData.manual_stock_products &&
            stockData.manual_stock_products.length > 0
          ) {
            const variantsData = stockData.manual_stock_products.map(
              (item) => ({
                variant: item.uid,
                price: item.price,
                quantity: item.quantity,
                label: `${item.variant.sku}`,
                extra: `Rp ${item.price.toLocaleString("id-ID")}`,
                value: item.uid,
              })
            );

            const variants = variantsData.map((item) => item?.variant);
            const quantities = variantsData.map((item) => item?.quantity)
            const price = variantsData.map((item) => item?.price);
            setSelectedVariantDetails(variantsData);

            setVariants(variants);
            setQuantities(quantities);
            setPrice(price);
          } else {
            setVariants([]);
            setQuantities([]);
            setPrice([]);
            setSelectedVariantDetails([]);
          }
        });
      }
    } catch (error) {
      setError(error.response.data.errors);
      console.error("Error fetching data:", error);
    }
  };

  const getSite = async () => {
    try {
      const warehouse_response = await axios.get(ApiEndpoint.WAREHOUSE_LIST);
      const whstore_response = await axios.get(ApiEndpoint.STORE_WH_LIST);
      const site_response = [
        ...warehouse_response?.data?.data,
        ...whstore_response?.data?.data,
      ];

      setSite(site_response);
    } catch (error) {
      Swal.fire("Gagal", error.response.data.message, "error");
    }
  };

  useEffect(() => {
    getSite();
  }, []);

  useEffect(() => {
    getDataById();
  }, []);

  const handleAddProduct = () => {
    setVariants([...variants, ""]);
    setQuantities([...quantities, ""]);
    setPrice([...price, ""]);
    setSelectedVariantDetails([...selectedVariantDetails, null]);
  };

  const handleRemoveProduct = (index) => {
    const updatedVariants = [...variants];
    const updatedPrices = [...price];
    const updatedQuantities = [...quantities];
    const updatedSelectedVariantDetails = [...selectedVariantDetails];

    updatedVariants.splice(index, 1);
    updatedQuantities.splice(index, 1);
    updatedPrices.splice(index, 1);
    updatedSelectedVariantDetails.splice(index, 1);

    setVariants(updatedVariants);
    setQuantities(updatedQuantities);
    setPrice(updatedPrices);
    setSelectedVariantDetails(updatedSelectedVariantDetails);
  };

  const handleVariantChange = (value, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = value.value;
    setVariants(updatedVariants);

    const updatedSelectedVariantDetails = [...selectedVariantDetails];
    updatedSelectedVariantDetails[index] = value;
    setSelectedVariantDetails(updatedSelectedVariantDetails);
    const selectedVariant = dataProduct.find(
      (variant) => variant.value === value.value
    );
    if (selectedVariant) {
      const updatePrice = [...price];
      updatePrice[index] = selectedVariant.extra; 
      setPrice(updatePrice);
    }
  };

  const handleQuantityChange = (value, index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
  };

  const handlePriceChange = (value, index) => {
    const updatedPrices = [...price];
    updatedPrices[index] = value;
    setPrice(updatedPrices);
  };

  const fetchVariants = async () => {
    try {
      const response = await axios.get(ApiEndpoint.ALL_VARIANT);
      const formattedVariants = response?.data?.data
        ?.flatMap((dataProduct) => {
          // console.log(dataProduct);
          if (!dataProduct.variants || dataProduct.variants.length === 0) {
            return dataProduct
              ? {
                  value: dataProduct.uid,
                  label: `${dataProduct.full_name}`,
                  alias: `${dataProduct.full_name}`,
                  extra: `${dataProduct.sell_price}`,
                  // extra: `Rp ${dataProduct.buy_price.toLocaleString("id-ID")}`,
                }
              : null;
          } else {
            const primaryVariantUid = dataProduct.primary_variant?.uid;
            const primaryVariantExistsInVariants =
              primaryVariantUid &&
              dataProduct.variants.some(
                (variant) => variant.uid === primaryVariantUid
              );

            if (primaryVariantExistsInVariants) {
              return dataProduct.variants.map((variant) => ({
                value: variant.uid,
                label: `${dataProduct.product.name} `,
                alias: `${dataProduct.full_name}`,
                extra: `Rp. ${variant.sell_price.toLocaleString("id-ID")}`,
              }));
            } else {
              const primaryVariant = dataProduct.primary_variant;
              const primaryVariantData = primaryVariant
                ? [
                    {
                      value: primaryVariant.uid,
                      label: `${dataProduct.product.name}`,
                      alias: `${dataProduct.full_name}`,
                      extra: `Rp ${primaryVariant.price.toLocaleString(
                        "id-ID"
                      )}`,
                    },
                  ]
                : [];

              return [
                ...primaryVariantData,
                ...dataProduct.variants.map((variant) => ({
                  value: variant.uid,
                  label: `${dataProduct.product.name}`,
                  alias: `${dataProduct.full_name}`,
                  extra: `Rp ${variant.price.toLocaleString("id-ID")}`,
                })),
              ];
            }
          }
        })
        .filter((variant) => variant !== null);

      setDataProduct(formattedVariants);
    } catch (error) {
      console.error("Error fetching product variants:", error);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const getFilteredOptions = (index) => {
    const selectedVariantIds = variants.filter((variant, i) => i !== index);
    return dataProduct.filter(
      (variant) => !selectedVariantIds.includes(variant.value)
    );
  };

  const renderVariantInputs = (index) => (
    <div key={index}>
      <div className="grid xl:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5 mb-4">
        <div className="">
          <label htmlFor={`variant_${index}`} className="form-label ">
            Pilih Produk *
          </label>
          <Select
            id={`variant_${index}`}
            className="react-select mt-2"
            classNamePrefix="select"
            placeholder="Pilih Produk..."
            options={getFilteredOptions(index)}
            value={selectedVariantDetails[index]}
            onChange={(value) => handleVariantChange(value, index)}
          />
        </div>
        <div className="">
          <Textinput
            label="Harga Produk *"
            type="number"
            placeholder="Tentukan nilai harga produk"
            value={price[index]}
            onChange={(e) => handlePriceChange(e.target.value, index)}
          />
        </div>
        <div className="flex justify-between items-end space-x-5">
          <div className="flex-1">
            <Textinput
              label="Jumlah Produk *"
              type="number"
              placeholder="Tentukan jumlah yang diinginkan"
              value={quantities[index]}
              onChange={(e) => handleQuantityChange(e.target.value, index)}
            />
          </div>
          <div className="flex-none relative">
            <button
              className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
              onClick={() => handleRemoveProduct(index)}
            >
              <Icon icon="heroicons:trash" />
            </button>
          </div>
        </div>
      </div>
      {selectedVariantDetails[index] && (
        <Alert
          icon="heroicons-outline:arrow-right"
          className="light-mode alert-success mb-5"
        >
          <div>
            <p>Nama Produk : {selectedVariantDetails[index].label}</p>
            <p>Harga Beli : {selectedVariantDetails[index].extra}</p>
          </div>
        </Alert>
      )}
    </div>
  );

  const onSubmit = async () => {
    setIsLoading(true);
    const confirmation = await Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin ingin memperbaharui permintaan ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    });
    setIsLoading(true);

    if (confirmation.isConfirmed) {
      try {
        const formData = {
          site : selectedSite?.value,
          note,
          variants: variants.map((variant, index) => ({
            uid : variant,
            price: price[index],
            quantity: quantities[index],
          })),
        };

        await axios.post(
          `${ApiEndpoint.MANUAL_STOCK}/${uid}`,
          formData
        );
        Swal.fire("Berhasil!", "Permintaan stok berhasil diperbaharui.", "success");
        setIsLoading(false);
        previousPage();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          Swal.fire("Error!", error.response.data.message, "error");
          setError(error.response.data.errors);
        } else {
          setError("Terjadi kesalahan saat memperbaharui permintaan.");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:col-span-12 col-span-12">
      <Card title={"Atur produk supplier"}>
        <Card className="mb-4">
          <div className="text-base text-slate-600 dark:text-slate-300 mb-4">
            <label htmlFor=" hh" className="form-label ">
              Pilih Toko/Cabang *
            </label>
            <Select
              className="react-select mt-2"
              classNamePrefix="select"
              placeholder="Pilih toko/cabang..."
              options={site?.map((item) => ({
                value: item.uid,
                label: item.name,
              }))}
              onChange={(selectedOption) => setSelectedSite(selectedOption)}
              value={selectedSite}
              isClearable
            />
            {error && (
              <span className="text-danger-600 text-xs py-2">{error.site}</span>
            )}
          </div>
          <div className="text-base text-slate-600 dark:text-slate-300 mb-5">
            <Textarea
              label="Catatan (Optional)"
              id="pn4"
              rows="6"
              placeholder="Masukkan catatan jika diperlukan"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </Card>

        <Card className="mb-4">
          <div className="flex justify-end mb-2">
            <Button
              text="Tambah Produk"
              className="btn-primary light"
              onClick={handleAddProduct}
            />
          </div>
          {variants.map((item, index) => renderVariantInputs(index))}
        </Card>

        <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
          <Button
            text="Batal"
            className="btn-secondary light w-full"
            onClick={previousPage}
          />
          <Button
            text={isLoading ? <LoadingButton /> : "Simpan"}
            className="btn-primary dark w-full "
            type="submit"
            onClick={onSubmit}
            disabled={isLoading}
          />
        </div>
      </Card>
    </div>
  );
};

export default UpdateManualStock;
