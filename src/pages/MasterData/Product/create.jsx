import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ApiEndpoint from "../../../API/Api_EndPoint";
import axios from "../../../API/Axios";
import "swiper/swiper-bundle.min.css";
import Textinput from "@/components/ui/Textinput";
import Select2 from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Fileinput from "@/components/ui/Fileinput";
import Switch from "@/components/ui/Switch";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";
import { Modal, Select } from "antd";
import { TreeSelect, Space } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import Alert from "@/components/ui/Alert";
import LoadingButton from "../../../components/LoadingButton";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [data_variant_generator, setDataVariantGenerator] = useState([]);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [min_order, setMinOrder] = useState("1");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState(null);

  const [is_active, setIsActive] = useState(false);
  const [primary_image, setPrimaryImage] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const [variants, setVariants] = useState([
    {
      sku: "",
      barcode: "",
      buy_price: "",
      sell_price: "",
      weight: "",
      is_primary: false,
    },
  ]);
  const [barcode, setBarcode] = useState([]);
  const [sku, setSku] = useState([]);
  const [buy_price, setBuyPrice] = useState([]);
  const [sell_price, setSellPrice] = useState([]);
  const [weight, setWeight] = useState([]);

  const [variant_type_one, setVariantTypeOne] = useState("");
  const [variant_type_two, setVariantTypeTwo] = useState("");
  const [variant_option_one, setVariantOptionOne] = useState([]);
  const [variant_option_two, setVariantOptionTwo] = useState([]);

  const [check_is_variant, setCheckIsVariant] = useState(false);
  const [check_is_primary_variant, setCheckPrimaryVariant] = useState(false);

  const [disabledForms, setDisabledForms] = useState([false]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [visibleSubCategories, setVisibleSubCategories] = useState({});
  const [treeData, setTreeData] = useState([]);
  const [isSubmitGenerator, setIsSubmitGenerator] = useState(false);
  const [variant_generator_data, setIsVariantGeneratorData] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [commonBuyPrice, setCommonBuyPrice] = useState("");
  const [commonSellPrice, setCommonSellPrice] = useState("");
  const [commonWeight, setCommonWeight] = useState("");

  const typeGender = [
    { value: "man", label: "Pria Dewasa" },
    { value: "woman", label: "Wanita Dewasa" },
    { value: "kids", label: "Anak Kecil" },
    { value: "boy", label: "Anak Laki-laki" },
    { value: "girl", label: "Anak Perempuan" },
    { value: "unisex", label: "Semua Gender" },
  ];

  const typeVariant = [
    { value: "Warna", label: "Warna" },
    { value: "Ukuran", label: "Ukuran" },
  ];

  const filteredTypeVariantTwo = typeVariant.filter(
    (option) => option.value !== variant_type_one?.value
  );

  const filteredTypeVariantOne = typeVariant.filter(
    (option) => option.value !== variant_type_two?.value
  );

  const getBrand = () => {
    axios.get(ApiEndpoint.BRANDS).then((response) => {
      setBrand(response?.data?.data);
    });
  };

  const handleFileChangePrimary = (e) => {
    setPrimaryImage(e.target.files[0]);
  };

  const handleFileChangeImages = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setImages(filesArray);
  };

  const handleSelectFirstVariant = (selected) => {
    setVariantOptionOne(selected);
  };

  const handleSelectSecondVariant = (selected) => {
    setVariantOptionTwo(selected);
  };

  const mapSelectedCategoryToTreeData = (category) => {
    return category.map((item) => {
      if (item.sub_count > 0) {
        return {
          title: item.name,
          value: item.uid,
          children: mapSelectedCategoryToTreeData(item.sub_categories),
          disabled: true,
        };
      } else {
        return {
          title: item.name,
          value: item.uid,
        };
      }
    });
  };

  const handleTreeSelectChange = (value, label) => {
    if (label && label.trigger && label.trigger.dataRef) {
      const labelData = label.trigger.dataRef;
      setCategory(labelData.value);
    }
    if (Array.isArray(value) && value.length > 0) {
      const selectedUIDs = value.map((selectedValue) => {
        const selectedItem = selectedCategory.find(
          (item) => item.uid === selectedValue
        );
        return selectedItem ? selectedItem.uid : null;
      });
      setCategory(selectedUIDs.filter((uid) => uid !== null));
    }
  };

  const filterTreeNode = (input, treeNode) => {
    const title = treeNode.props?.title || "";
    return title.toLowerCase().includes(input.toLowerCase());
  };

  const applyCommonPrices = () => {
    const updatedVariants = variant_generator_data.map((variantGroup, index) => ({
      ...variants[index],
      buy_price: commonBuyPrice,
      sell_price: commonSellPrice,
      weight: commonWeight
    }));
  
    const updatedBuyPrices = new Array(variant_generator_data.length).fill(commonBuyPrice);
    const updatedSellPrices = new Array(variant_generator_data.length).fill(commonSellPrice);
    const updatedWeights = new Array(variant_generator_data.length).fill(commonWeight);
  
    setVariants(updatedVariants);
    setBuyPrice(updatedBuyPrices);
    setSellPrice(updatedSellPrices);
    setWeight(updatedWeights);
  };

  const handleBarcodeChange = (value, index) => {
    const updatedBarcode = [...barcode];
    updatedBarcode[index] = value;
    setBarcode(updatedBarcode);

    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], barcode: value };
    setVariants(updatedVariants);
  };

  const handleSKUChange = (value, index) => {
    const updateSKU = [...sku];
    updateSKU[index] = value;
    setSku(updateSKU);

    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], sku: value };
    setVariants(updatedVariants);
  };

  const handleBuyPriceChange = (value, index) => {
    const updateBuyPrice = [...buy_price];
    updateBuyPrice[index] = value;
    setBuyPrice(updateBuyPrice);
  };

  const handleSellPriceChange = (value, index) => {
    const updateSellPrice = [...sell_price];
    updateSellPrice[index] = value;
    setSellPrice(updateSellPrice);
  };

  const handleWeightChange = (value, index) => {
    const updateWeight = [...weight];
    updateWeight[index] = value;
    setWeight(updateWeight);
  };

  const handlePrimaryVariantChange = (index) => {
    setCheckPrimaryVariant(index);

    const updatedVariants = variants.map((variant, i) => ({
      ...variant,
      is_primary: i === index,
    }));

    setVariants(updatedVariants);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value) {
      const newTag = { label: event.target.value, value: event.target.value };
      event.target.value = "";
      event.preventDefault();
    }
  };

  const onSetupVariants = async () => {
    try {
      await handleVariantGenerator();
      setIsSubmitGenerator(true);
    } catch (error) {
      Swal.fire("Error", "Gagal mengatur variasi", "error");
    }
  };

  async function handleVariantGenerator() {
    try {
      if (variant_option_one.length || variant_option_two.length) {
        const requestData = {};

        if (variant_option_one.length) {
          requestData.variant_type_one = variant_type_one?.value;
          requestData.variant_option_one = variant_option_one || [];
        }

        if (variant_option_two.length) {
          requestData.variant_type_two = variant_type_two?.value;
          requestData.variant_option_two = variant_option_two || [];
        }

        const response = await axios.post(
          ApiEndpoint.VARIANT_GENERATOR,
          requestData
        );

        setDataVariantGenerator(response?.data?.data);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      Swal.fire("Gagal", "Masukkan minimal 1 opsi variasi", "error");
    }
  }

  useEffect(() => {
    const getCategory = () => {
      axios.get(ApiEndpoint.CATEGORIES).then((response) => {
        setSelectedCategory(response?.data?.data);
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    getBrand();
  }, []);

  useEffect(() => {
    const selectedCategoryTreeData =
      mapSelectedCategoryToTreeData(selectedCategory);
    setTreeData(selectedCategoryTreeData);
  }, [selectedCategory]);

  useEffect(() => {
    if (isSubmitGenerator && data_variant_generator) {
      setIsVariantGeneratorData(data_variant_generator);
    }
  }, [data_variant_generator, isSubmitGenerator]);

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const active = is_active ? 1 : 0;
    const is_variant = check_is_variant ? true : false;

    const formData = new FormData();
    formData.append("brand", selectedBrand?.value || "");
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("min_order", min_order);
    formData.append("gender", gender?.value || "");
    formData.append("length", length);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("is_active", active);
    formData.append("check_is_variant", is_variant);

    const updatedVariants = variants.map((variant, index) => ({
      ...variant,
      sku: sku[index] || "",
      barcode: barcode[index] || "",
      buy_price: buy_price[index] || "",
      sell_price: sell_price[index] || "",
      weight: weight[index] || "",
      is_primary: variants[index].is_primary,
    }));

    if (check_is_variant) {
      formData.append("variant_type_one", variant_type_one?.value || "");
      for (let i = 0; i < variant_option_one.length; i++) {
        formData.append("variant_option_one[]", variant_option_one[i]);
      }

      if (variant_option_two.length > 0) {
        formData.append("variant_type_two", variant_type_two?.value || "");
        for (let i = 0; i < variant_option_two.length; i++) {
          formData.append("variant_option_two[]", variant_option_two[i]);
        }
      }

      updatedVariants.forEach((variant, index) => {
        formData.append(`variants[${index}][sku]`, variant.sku || "");
        formData.append(`variants[${index}][barcode]`, variant.barcode || "");
        formData.append(`variants[${index}][buy_price]`, variant.buy_price || "");
        formData.append(`variants[${index}][sell_price]`, variant.sell_price || "");
        formData.append(`variants[${index}][weight]`, variant.weight || "");
        formData.append(
          `variants[${index}][is_primary]`,
          variant.is_primary ? 1 : 0
        );

        if (variant_generator_data[index]) {
          variant_generator_data[index].forEach((option) => {
            if (option.type === variant_type_one?.value) {
              formData.append(`variants[${index}][variant_one]`, option.option);
            }
            if (option.type === variant_type_two?.value) {
              formData.append(`variants[${index}][variant_two]`, option.option);
            }
          });
        }
      });
    } else {
      formData.append("sku", sku);
      formData.append("barcode", barcode);
      formData.append("buy_price", buy_price);
      formData.append("sell_price", sell_price);
      formData.append("weight", weight);
    }

    formData.append("primary_image", primary_image || "");
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }

    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Anda yakin data yang dimasukkan sudah benar?",
      showCancelButton: true,
      confirmButtonText: "Ya, Tambahkan",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${ApiEndpoint.CREATE_PRODUCTS}`,
            formData
          );
          Swal.fire("Berhasil", "Produk telah ditambahkan", "success");
          setIsLoading(false);
          navigate("/products");
        } catch (error) {
          setError(error?.response?.data?.message);
          Swal.fire("Gagal", error?.response?.data?.message, "error");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  // START USE EFFECT AREA

  const previousPage = () => {
    navigate(-1);
  };

  

  return (
    <div className="lg:col-span-12 col-span-12">
      <Card title={"Tambah Produk"}>
        <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Kategori Produk *
            </label>
            <TreeSelect
              treeData={treeData}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Kategori"
              onChange={(value, label, extra) =>
                handleTreeSelectChange(value, label, extra)
              }
              filterTreeNode={filterTreeNode}
              notFoundContent={
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    padding: 10,
                  }}
                >
                  <div className="">
                    <span className="text-slate-900 dark:text-white text-[100px]  transition-all duration-300 ">
                      <Icon icon="heroicons:exclamation-triangle" />
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-white text-[30px]">
                      Tidak ada data
                    </span>
                  </div>
                </div>
              }
            />
            {error && (
              <span className="text-danger-600 text-xs py-2">
                {error.category}
              </span>
            )}
          </div>
          {selectedCategory && selectedCategory.subCount > 0 && (
            <div className="">
              <label htmlFor="subCategory" className="form-label">
                Sub Kategori Produk *
              </label>
              <TreeSelect
                treeData={visibleSubCategories}
                treeCheckable
                style={{ width: "100%" }}
                placeholder="Pilih Sub Kategori"
                treeCheckStrictly
              />
            </div>
          )}
        </div>
        <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Brand Produk *
            </label>
            <Select2
              className="react-select mt-2"
              classNamePrefix="select"
              placeholder="Pilih Brand *"
              options={brand?.map((item) => ({
                value: item.uid,
                label: item.name,
              }))}
              onChange={(selectedOption) => setSelectedBrand(selectedOption)}
              value={selectedBrand}
              isClearable
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 mb-5">
          <div className="">
            <Textinput
              type="text"
              label="Nama Produk *"
              placeholder="Masukkan nama produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <span className="text-danger-600 text-xs py-2">{error.name}</span>
            )}
          </div>
          <div className="">
            <Textinput
              type="number"
              label="Minimal Pesanan *"
              placeholder="Masukkan angka minimal pesanan"
              value={min_order}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value > 0) {
                  setMinOrder(value);
                }
              }}
            />
            {error && (
              <span className="text-danger-600 text-xs py-2">
                {error.min_order}
              </span>
            )}
          </div>
          <div className="">
            <label htmlFor="for_gender" className="form-label">
              Jenis Kelamin *
            </label>
            <Select2
              className="react-select mt-2"
              classNamePrefix="select"
              placeholder="Pilih Jenis Kelamin..."
              options={typeGender}
              value={gender}
              onChange={(selectedOption) => setGender(selectedOption)}
              isClearable
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 mb-5">
          <div className="">
            <Textinput
              type="text"
              label="Panjang ( Optional )"
              placeholder="Panjang produk ( sentimeter )"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="">
            <Textinput
              type="text"
              label="Lebar ( Optional )"
              placeholder="Lebar produk ( sentimeter )"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="">
            <Textinput
              type="text"
              label="Tinggi ( Optional )"
              placeholder="Tinggi produk ( sentimeter )"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Deskripsi Produk *
            </label>

            <ReactQuill
              theme="snow"
              placeholder="Masukkan deskripsi produk..."
              value={description}
              onChange={setDescription}
              modules={{
                toolbar: [
                  [{ size: ["small", false, "large", "huge"] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                    { align: [] },
                  ],
                  [
                    {
                      color: [
                        "#000000",
                        "#e60000",
                        "#ff9900",
                        "#ffff00",
                        "#008a00",
                        "#0066cc",
                        "#9933ff",
                        "#ffffff",
                        "#facccc",
                        "#ffebcc",
                        "#ffffcc",
                        "#cce8cc",
                        "#cce0f5",
                        "#ebd6ff",
                        "#bbbbbb",
                        "#f06666",
                        "#ffc266",
                        "#ffff66",
                        "#66b966",
                        "#66a3e0",
                        "#c285ff",
                        "#888888",
                        "#a10000",
                        "#b26b00",
                        "#b2b200",
                        "#006100",
                        "#0047b2",
                        "#6b24b2",
                        "#444444",
                        "#5c0000",
                        "#663d00",
                        "#666600",
                        "#003700",
                        "#002966",
                        "#3d1466",
                        "custom-color",
                      ],
                    },
                  ],
                ],
              }}
            />
            {error && (
              <span className="text-danger-600 text-xs py-2">
                {error.description}
              </span>
            )}
          </div>
        </div>
        <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Gambar Utama (optional)
            </label>
            <Fileinput
              selectedFile={primary_image}
              onChange={handleFileChangePrimary}
              preview
              isClearable={true}
            />
          </div>
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Gambar Pendukung (optional)
            </label>
            <Fileinput
              name="basic"
              selectedFiles={images}
              onChange={handleFileChangeImages}
              multiple
              preview
            />
            {error && (
              <span className="text-danger-600 text-xs py-2">
                Format Gambar JPG / JPEG
              </span>
            )}
          </div>
        </div>

        <Card title="Opsi Produk" className="mb-5">
          <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 ">
            <div className="flex row gap-20">
              <Switch
                label="Status Produk (Optional)"
                activeClass="bg-success-500"
                value={is_active}
                onChange={() => setIsActive(!is_active)}
                badge
                prevIcon="heroicons-outline:check"
                nextIcon="heroicons-outline:x"
              />
              <Switch
                label="Variasi Produk (Optional)"
                activeClass="bg-success-500"
                value={check_is_variant}
                onChange={() => setCheckIsVariant(!check_is_variant)}
                badge
                prevIcon="heroicons-outline:check"
                nextIcon="heroicons-outline:x"
              />
            </div>
          </div>
        </Card>

        {check_is_variant ? (
          <>
            <Alert
              // dismissible
              icon="heroicons-outline:exclamation"
              className="light-mode alert-success mb-5"
            >
              <p>Silahkan mengisi variasi produk dengan benar</p>
            </Alert>
            <Card title="Variasi Produk" className="mb-5">
              <div className="flex row gap-5 mb-3">
                <div className="w-96">
                  <label htmlFor=" hh" className="form-label ">
                    Nama Variasi Pertama
                  </label>
                  <Select2
                    className="react-select mt-2"
                    classNamePrefix="select"
                    placeholder="Pilih Tipe..."
                    // options={typeVariant}
                    options={filteredTypeVariantOne}
                    value={variant_type_one}
                    onChange={(selectedOption) => {
                      setVariantTypeOne(selectedOption);
                      setVariantOptionOne([]);
                    }}
                    isClearable
                  />
                </div>
                <div className="w-full">
                  <label htmlFor=" hh" className="form-label ">
                    Opsi Variasi Pertama
                  </label>
                  <Select
                    mode="tags"
                    style={{ width: "100%", height: 40 }}
                    onChange={handleSelectFirstVariant}
                    tokenSeparators={[","]}
                    value={variant_option_one}
                    disabled={
                      !variant_type_one ||
                      (typeof variant_type_one === "string" &&
                        variant_type_one.trim() === "")
                    }
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className="flex row gap-5 mb-5">
                <div className="w-96">
                  <label htmlFor=" hh" className="form-label ">
                    Nama Variasi Kedua
                  </label>
                  <Select2
                    className="react-select mt-2"
                    classNamePrefix="select"
                    placeholder="Pilih Tipe..."
                    // options={typeVariant}
                    options={filteredTypeVariantTwo}
                    value={variant_type_two}
                    onChange={(selectedOption) => {
                      setVariantTypeTwo(selectedOption);
                      setVariantOptionTwo([]);
                    }}
                    isClearable
                  />
                </div>
                <div className="w-full">
                  <label htmlFor=" hh" className="form-label ">
                    Opsi Variasi Kedua
                  </label>
                  <Select
                    mode="tags"
                    style={{ width: "100%", height: 40 }}
                    onChange={handleSelectSecondVariant}
                    tokenSeparators={[","]}
                    value={variant_option_two}
                    disabled={
                      !variant_type_two ||
                      (typeof variant_type_two === "string" &&
                        variant_type_two.trim() === "")
                    }
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button
                  text="Terapkan Variasi"
                  className="btn-outline-success light"
                  onClick={onSetupVariants}
                />
              </div>
            </Card>
            {variant_generator_data?.length > 0 && (
              <>
                <Card title={""}>
                  <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 mb-5">
                    <div>
                      <Textinput
                        type="text"
                        label="Harga Beli Produk"
                        value={commonBuyPrice}
                        placeholder="Masukkan harga beli untuk menerapkan keseluruhan harga beli"
                        onChange={(e) => setCommonBuyPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Textinput
                        type="text"
                        label="Harga Jual Produk"
                        placeholder="Masukkan harga jual untuk menerapkan keseluruhan harga jual"
                        value={commonSellPrice}
                        onChange={(e) => setCommonSellPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Textinput
                        type="text"
                        label="Berat Produk (Gram)"
                        placeholder="Masukkan berat produk untuk menerapkan keseluruhan berat"
                        value={commonWeight}
                        onChange={(e) => setCommonWeight(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
                    <div>
                      <Button
                        text="Terapkan"
                        className="btn-primary light w-full "
                        onClick={applyCommonPrices}
                      />
                    </div>
                  </div>
                </Card>
                <Card title={`Variasi`} className="mt-5">
                  {variant_generator_data?.map((variantGroup, index) => (
                    <Card key={index} className="mt-5">
                      <div className="flex justify-between mb-5">
                        <div className="">
                          <span className="text-success-500">
                            {variantGroup?.length > 0 ? (
                              variantGroup.map((variant, variantIndex) => (
                                <div key={variantIndex} className="mb-2">
                                  <span className="text-success-500">
                                    {`${variant.type}: ${variant.option}`}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <>Tidak ada varian</>
                            )}
                          </span>
                        </div>
                        <div className="flex row justify-end gap-10">
                          <div className="">
                            <Switch
                              label="Utama"
                              activeClass="bg-success-500"
                              badge
                              prevIcon="heroicons-outline:check"
                              nextIcon="heroicons-outline:x"
                              value={index === check_is_primary_variant}
                              onChange={() => handlePrimaryVariantChange(index)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid xl:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-5 mb-5">
                        <div className="">
                          <Textinput
                            type="text"
                            label="SKU Variasi Produk * "
                            placeholder=""
                            disabled={disabledForms[index]}
                            value={variants[index] ? variants[index].sku : ""}
                            onChange={(e) =>
                              handleSKUChange(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="">
                          <Textinput
                            type="text"
                            label="Barcode Variasi Produk "
                            placeholder=""
                            disabled={disabledForms[index]}
                            value={
                              variants[index] ? variants[index].barcode : ""
                            }
                            onChange={(e) =>
                              handleBarcodeChange(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="">
                          <Textinput
                            type="number"
                            label="Harga Beli Produk *"
                            placeholder=""
                            disabled={disabledForms[index]}
                            value={
                              variants[index] ? variants[index].buy_price : ""
                            }
                            onChange={(e) =>
                              handleBuyPriceChange(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="">
                          <Textinput
                            type="number"
                            label="Harga Jual Produk *"
                            placeholder=""
                            disabled={disabledForms[index]}
                            value={
                              variants[index] ? variants[index].sell_price : ""
                            }
                            onChange={(e) =>
                              handleSellPriceChange(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="">
                          <Textinput
                            type="number"
                            label="Berat Produk (Gram)"
                            placeholder=""
                            disabled={disabledForms[index]}
                            // value={weight[index] || ""}
                            // onChange={(e) => {
                            //   const newWeight = [...weight];
                            //   newWeight[index] = e.target.value;
                            //   setWeight(newWeight);
                            // }}
                            value={
                              variants[index] ? variants[index].weight : ""
                            }
                            onChange={(e) =>
                              handleWeightChange(e.target.value, index)
                            }
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </Card>
              </>
            )}
          </>
        ) : (
          <>
            <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
              <div className="">
                <Textinput
                  type="text"
                  label="SKU Produk ( Optional )"
                  placeholder="Masukkan sku produk jika tersedia"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="text"
                  label="Barcode Produk ( Optional )"
                  placeholder="Masukkan barcode produk jika tersedia"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="number"
                  label="Harga Beli Produk"
                  placeholder="Masukkan harga beli produk"
                  value={buy_price}
                  onChange={(e) => setBuyPrice(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="number"
                  label="Harga Jual Produk *"
                  placeholder="Masukkan harga jual produk"
                  value={sell_price}
                  onChange={(e) => setSellPrice(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="number"
                  label="Berat Produk ( Optional )"
                  placeholder="Masukkan berat satuan produk"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
          <Button
            text="Batal"
            className="btn-primary light w-full"
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

export default CreateProduct;
