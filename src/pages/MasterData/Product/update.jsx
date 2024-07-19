import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ApiEndpoint from "../../../API/Api_EndPoint";
import axios from "../../../API/Axios";
import "swiper/swiper-bundle.min.css";
import Textinput from "@/components/ui/Textinput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Fileinput from "@/components/ui/Fileinput";
import Switch from "@/components/ui/Switch";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Swal from "sweetalert2";
import { Modal, Select } from "antd";
import { TreeSelect } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import Alert from "@/components/ui/Alert";
import LoadingButton from "../../../components/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select2 from "react-select";

const UpdateProduct = () => {
  const navigate = useNavigate();
  let { uid } = useParams();

  const [data_variant_generator, setDataVariantGenerator] = useState([]);
  const [query, setQuery] = useState({
    search: "",
    is_active: "",
    paginate: 9999,
  });

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [min_order, setMinOrder] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState(null);

  const [is_active, setIsActive] = useState(false);
  const [primary_image, setPrimaryImage] = useState(null);
  const [images, setImages] = useState([]);
  const [deleted_images, setDeletedImages] = useState([]);
  const [primaryImageOld, setPrimaryImageOld] = useState(null);
  const [imageOld, setImageOld] = useState([]);

  const [variant_type_one, setVariantTypeOne] = useState("");
  const [variant_type_two, setVariantTypeTwo] = useState("");
  const [variant_option_one, setVariantOptionOne] = useState([]);
  const [variant_option_two, setVariantOptionTwo] = useState([]);

  const [check_is_variant, setCheckIsVariant] = useState(false);
  const [check_is_primary_variant, setCheckPrimaryVariant] = useState(false);

  const [variants, setVariants] = useState([
    {
      barcode: "",
      buy_price: "",
      sell_price: "",
      weight: "",
      sku: "",
      is_primary: false,
      image: null,
    },
  ]);

  const [barcode, setBarcode] = useState([]);
  const [sku, setSku] = useState([]);
  const [buy_price, setBuyPrice] = useState([]);
  const [sell_price, setSellPrice] = useState([]);
  const [weight, setWeight] = useState([]);

  const [disabledForms, setDisabledForms] = useState([false]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("");
  const [visibleSubCategories, setVisibleSubCategories] = useState({});
  const [treeData, setTreeData] = useState([]);
  const [isSubmitGenerator, setIsSubmitGenerator] = useState(false);
  const [variant_generator_data, setIsVariantGeneratorData] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [commonBuyPrice, setCommonBuyPrice] = useState("");
  const [commonSellPrice, setCommonSellPrice] = useState("");
  const [commonWeight, setCommonWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  const [sku_single, setSkuSingle] = useState("");
  const [barcode_single, setBarcodeSingle] = useState("");
  const [buy_price_single, setBuyPriceSingle] = useState("");
  const [sell_price_single, setSellPriceSingle] = useState("");
  const [weight_single, setWeightSingle] = useState("");

  const [variantImages, setVariantImages] = useState([]);

  const getDataById = () => {
    try {
      if (uid) {
        axios.get(`${ApiEndpoint.PRODUCTS}/${uid}`).then((response) => {
          const productUid = response?.data?.data;
          setCategory(productUid?.category?.uid);
          setSelectedBrand({
            value: productUid?.brand?.uid,
            label: productUid.brand?.name,
          });
          setName(productUid?.name);
          setDescription(productUid?.description);
          setMinOrder(productUid?.minimal_order);
          setGender(
            typeGender.find(
              (type) => type.value === response?.data?.data?.gender
            )
          );
          setLength(productUid?.length);
          setWidth(productUid?.width);
          setHeight(productUid?.height);

          setIsActive(productUid?.is_active);
          setPrimaryImageOld(response?.data?.data?.primary_image);
          setImageOld(response?.data?.data?.images);
          setVariantImages(
            response?.data?.data?.variants.map((variant) => variant.image)
          );

          if (productUid?.variants && productUid?.variants?.length > 0) {
            const variantsData = productUid?.variants?.map((variant) => ({
              barcode: variant?.barcode,
              sku: variant?.sku,
              buy_price: variant?.buy_price,
              sell_price: variant?.sell_price,
              weight: variant?.weight,
              is_primary: variant?.is_primary,
            }));
            setVariants(variantsData);
            const primaryVariantIndex = variantsData.findIndex(
              (variant) => variant?.is_primary
            );
            setCheckPrimaryVariant(
              primaryVariantIndex !== -1 ? primaryVariantIndex : false
            );
          }

          if (productUid?.variant_type_one !== null) {
            setVariantTypeOne(
              typeVariant.find(
                (variant_type_one) =>
                  variant_type_one?.value === productUid?.variant_type_one
              )
            );
            setVariantTypeTwo(
              typeVariant.find(
                (variant_type_two) =>
                  variant_type_two?.value === productUid?.variant_type_two
              )
            );
            setVariantOptionOne(productUid?.variant_option_one);
            setVariantOptionTwo(productUid?.variant_option_two);
            setCheckIsVariant(true);
          } else {
            setCheckIsVariant(false);
            setBarcodeSingle(productUid?.primary_variant?.barcode);
            setSkuSingle(productUid?.primary_variant?.sku);
            setBuyPriceSingle(productUid?.primary_variant?.buy_price);
            setSellPriceSingle(productUid?.primary_variant?.sell_price);
            setWeightSingle(productUid?.primary_variant?.weight);
            // setSku(productUid.variants[0].sku);
            // setPrice(productUid.variants[0].price);
          }
        });
      }
    } catch (error) {
      setError(err.response.data.errors);
      console.error("Error fetching data:", error);
    }
  };

  const getBrand = () => {
    axios.get(ApiEndpoint.BRANDS).then((response) => {
      setBrand(response?.data?.data);
    });
  };

  useEffect(() => {
    getBrand();
  }, []);

  useEffect(() => {
    getDataById();
  }, [uid]);

  const handleSelectFirstVariant = (selected) => {
    setVariantOptionOne(selected);
  };

  const handleSelectSecondVariant = (selected) => {
    setVariantOptionTwo(selected);
  };

  useEffect(() => {
    if (check_is_variant) {
      onSetupVariants();
    }
  }, [check_is_variant]);

  const findCategoryByUid = (categories, categoryUid) => {
    for (const category of categories) {
      if (category.uid === categoryUid) {
        return category;
      }
      if (category.sub_count > 0) {
        const subCategory = findCategoryByUid(
          category.sub_categories,
          categoryUid
        );
        if (subCategory) {
          return subCategory;
        }
      }
    }
    return null;
  };

  const getCategoryLabelByUid = async (categoryUid) => {
    try {
      const category = findCategoryByUid(selectedCategory, categoryUid);
      if (category) {
        setSelectedCategoryLabel(category.name);
      } else {
        console.error("Category not found for UID:", categoryUid);
      }
    } catch (error) {
      console.error("Error fetching category label:", error);
    }
  };

  useEffect(() => {
    if (category && selectedCategory.length > 0) {
      getCategoryLabelByUid(category);
    }
  }, [category, selectedCategory]);

  const applyCommonPrices = () => {
    const updatedVariants = variant_generator_data.map((variantGroup, index) => ({
      ...variants[index],
      buy_price: commonBuyPrice,
      // sell_price: commonSellPrice,
      // weight: commonWeight
    }));
  
    const updatedBuyPrices = new Array(variant_generator_data.length).fill(commonBuyPrice);
    // const updatedSellPrices = new Array(variant_generator_data.length).fill(commonSellPrice);
    // const updatedWeights = new Array(variant_generator_data.length).fill(commonWeight);
  
    setVariants(updatedVariants);
    setBuyPrice(updatedBuyPrices);
    // setSellPrice(updatedSellPrices);
    // setWeight(updatedWeights);
  };

  const applyCommonSellPrice = () => {
    const updatedVariants = variant_generator_data.map((variantGroup, index) => ({
      ...variants[index],
      sell_price: commonSellPrice,
    }));
  
    const updatedSellPrices = new Array(variant_generator_data.length).fill(commonSellPrice);
  
    setVariants(updatedVariants);
    setSellPrice(updatedSellPrices);
  };

  const applyCommonWeight = () => {
    const updatedVariants = variant_generator_data.map((variantGroup, index) => ({
      ...variants[index],
      weight: commonWeight,
    }));
  
    const updatedWeights = new Array(variant_generator_data.length).fill(commonWeight);
  
    setVariants(updatedVariants);
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

    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], buy_price: value };
    setVariants(updatedVariants);
  };

  const handleSellPriceChange = (value, index) => {
    const updateSellPrice = [...sell_price];
    updateSellPrice[index] = value;
    setSellPrice(updateSellPrice);

    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], sell_price: value };
    setVariants(updatedVariants);
  };

  const handleWeightChange = (value, index) => {
    const updateWeight = [...weight];
    updateWeight[index] = value;
    setWeight(updateWeight);

    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], weight: value };
    setVariants(updatedVariants);
  };

 
  const handlePrimaryVariantChange = (index) => {
    setCheckPrimaryVariant(index);

    const updatedVariants = variants.map((variant, i) => ({
      ...variant,
      is_primary: i === index,
    }));

    setVariants(updatedVariants);
  };

  const handleFileChangePrimary = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrimaryImage(file);
      setPrimaryImageOld(null);
    }
  };

  const handleFileChangeImages = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setImages(filesArray);
    // setImageOld(null);
  };

  const handleDeleteImage = (index) => {
    if (deleted_images.includes(index)) {
      setDeletedImages(deleted_images.filter((i) => i !== index));
    } else {
      setDeletedImages([...deleted_images, index]);
    }
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

  useEffect(() => {
    const getCategory = () => {
      axios.get(ApiEndpoint.CATEGORIES).then((response) => {
        setSelectedCategory(response?.data?.data);
        // console.log(response?.data?.data);
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const selectedCategoryTreeData =
      mapSelectedCategoryToTreeData(selectedCategory);
    setTreeData(selectedCategoryTreeData);
  }, [selectedCategory]);

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
      // setBarcodeSingle("")
      // setBuyPriceSingle("");
      // setSellPriceSingle("");
      // setWeightSingle("");
      // setBarcode("");
      // setBuyPrice("");
      // setSellPrice("");
      // setWeight("");
    } catch (error) {
      Swal.fire("Error", "Gagal mengatur variasi", "error");
    }
  };

  async function handleVariantGenerator() {
    try {
      if (variant_option_one.length || variant_option_two.length) {
        const requestData = {};

        if (variant_option_one?.length) {
          requestData.variant_type_one = variant_type_one?.value;
          requestData.variant_option_one = variant_option_one || [];
        }

        if (variant_option_two?.length) {
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
    if (isSubmitGenerator && data_variant_generator) {
      setIsVariantGeneratorData(data_variant_generator);
    }
  }, [data_variant_generator, isSubmitGenerator]);

  const onSubmit = async (e) => {
    // setIsLoading(true);
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
    formData.append("length", length || "");
    formData.append("width", width || "");
    formData.append("height", height || "");
    formData.append("is_active", active);
    formData.append("check_is_variant", is_variant);

    formData.append("variant_type_one", variant_type_one?.value || "");
    for (let i = 0; i < variant_option_one.length; i++) {
      formData.append("variant_option_one[]", variant_option_one[i]);
    }

    if (variant_option_two?.length > 0) {
      formData.append("variant_type_two", variant_type_two?.value || "");
      for (let i = 0; i < variant_option_two?.length; i++) {
        formData.append("variant_option_two[]", variant_option_two[i]);
      }
    }
    if (check_is_variant) {
      variant_generator_data.forEach((variantGenerator, index) => {
        formData.append(`variants[${index}][sku]`, variants[index].sku || "");
        formData.append(
          `variants[${index}][barcode]`,
          variants[index].barcode || ""
        );
        formData.append(
          `variants[${index}][buy_price]`,
          variants[index].buy_price || ""
        );
        formData.append(
          `variants[${index}][sell_price]`,
          variants[index].sell_price || ""
        );
        formData.append(`variants[${index}][weight]`, variants[index].weight || "");

        formData.append(
          `variants[${index}][is_primary]`,
          variants[index].is_primary ? 1 : 0
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
      formData.append("sku", sku_single || "");
      formData.append("barcode", barcode_single || "");
      formData.append("buy_price", buy_price_single || "");
      formData.append("sell_price", sell_price_single || "");
      formData.append("weight", weight_single || "");
    }

    if (primary_image) {
      formData.append("primary_image", primary_image || "");
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }

    for (let i = 0; i < deleted_images.length; i++) {
      formData.append("deleted_images[]", deleted_images[i]);
    }

    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Anda yakin data yang dimasukkan sudah benar?",
      showCancelButton: true,
      confirmButtonText: "Ya, Perbaharui",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${ApiEndpoint.PRODUCTS}/${uid}`,
            formData
          );
          Swal.fire("Berhasil", "Produk telah diperbaharui", "success");
          setIsLoading(false);
          navigate("/products");
          setIsLoading(false);
          // }
        } catch (error) {
          Swal.fire("Gagal", error?.response?.data?.message, "error");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  const previousPage = () => {
    navigate(-1);
  };

  return (
    <div className="lg:col-span-12 col-span-12">
      <Card title={"Perbaharui Produk"}>
        <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Kategori Produk *
            </label>
            <TreeSelect
              treeData={treeData}
              value={selectedCategoryLabel}
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
              onChange={(e) => setMinOrder(e.target.value)}
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
              type="number"
              label="Panjang ( Optional )"
              placeholder="Panjang produk ( sentimeter )"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="">
            <Textinput
              type="number"
              label="Lebar ( Optional )"
              placeholder="Lebar produk ( sentimeter )"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="">
            <Textinput
              type="number"
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
                  ["link"],
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
              Gambar Utama *
            </label>
            <Alert
              icon="heroicons-outline:exclamation"
              className="light-mode alert-warning mb-5"
            >
              <p>
                Format gambar JPG/JPEG dengan rasio 1:1 , Abaikan form ini jika
                tidak ingin mengubah gambar !
              </p>
            </Alert>
            <Fileinput
              selectedFile={primary_image}
              onChange={handleFileChangePrimary}
              preview
              isClearable={true}
            />
            {primaryImageOld && (
              <div className="flex flex-wrap space-x-5 rtl:space-x-reverse justify-center">
                <div className="xl:w-1/5 md:w-1/3 w-1/2 rounded mt-6 border p-2  border-slate-200  ">
                  <img
                    src={primaryImageOld?.url}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              </div>
            )}
            {error && (
              <span className="text-danger-600 text-xs py-2">
                {error.primary_image}
              </span>
            )}
          </div>
          <div className="">
            <label htmlFor=" hh" className="form-label ">
              Gambar Pendukung (optional)
            </label>
            <Alert
              icon="heroicons-outline:exclamation"
              className="light-mode alert-warning mb-5"
            >
              <p>
                Format gambar JPG/JPEG dengan rasio 1:1. Abaikan form ini jika
                tidak ingin mengubah gambar dan untuk menghapus gambar silahkan
                ceklis gambar yang ingin dihapus !
              </p>
            </Alert>
            <Fileinput
              name="basic"
              selectedFiles={images}
              onChange={handleFileChangeImages}
              multiple
              preview
            />
            {imageOld && imageOld.length > 0 && (
              <div className="flex flex-wrap space-x-5 rtl:space-x-reverse">
                {imageOld?.map((item, index) => (
                  <div
                    className="xl:w-1/5 md:w-1/3 w-1/2 rounded mt-6 border p-2  border-slate-200"
                    key={index}
                  >
                    <div className="mb-2">
                      <img
                        src={item.url}
                        alt={`Image ${index}`}
                        className="object-cover w-full h-full rounded"
                      />
                    </div>
                    <div className="">
                      <Checkbox
                        label="Hapus Gambar"
                        activeClass="ring-danger-500 bg-danger-500"
                        value={deleted_images.includes(item.uid)}
                        onChange={() => handleDeleteImage(item.uid)}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 mb-5">
                <div>
                  <Button
                    text="Terapkan Harga Beli"
                    className="btn-primary light w-full "
                    onClick={applyCommonPrices}
                  />
                </div>
                <div>
                  <Button
                    text="Terapkan Harga Jual"
                    className="btn-primary light w-full "
                    onClick={applyCommonSellPrice}
                  />
                </div>
                <div>
                  <Button
                    text="Terapkan Berat Produk"
                    className="btn-primary light w-full "
                    onClick={applyCommonWeight}
                  />
                </div>
              </div>
            </Card>
            {variant_generator_data?.length > 0 && (
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
                          label="SKU Variasi Produk "
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
                          value={variants[index] ? variants[index].barcode : ""}
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
                          // value={
                          //   variants[index] ? variants[index].buy_price : ""
                          // }
                          // onChange={(e) => {
                          //   const newBuyPrices = [...buy_price];
                          //   newBuyPrices[index] = e.target.value;
                          //   setBuyPrice(newBuyPrices);

                          //   const updatedVariants = [...variants];
                          //   updatedVariants[index] = {
                          //     ...updatedVariants[index],
                          //     buy_price: e.target.value,
                          //   };
                          //   setVariants(updatedVariants);
                          // }}
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
                          // value={sell_price[index] || ""}
                          // value={
                          //   variants[index] ? variants[index].sell_price : ""
                          // }
                          // onChange={(e) => {
                          //   const newSellPrice = [...sell_price];
                          //   newSellPrice[index] = e.target.value;
                          //   setSellPrice(newSellPrice);

                          //   const updatedVariants = [...variants];
                          //   updatedVariants[index] = {
                          //     ...updatedVariants[index],
                          //     sell_price: e.target.value,
                          //   };
                          //   setVariants(updatedVariants);
                          // }}
                        />
                      </div>
                      <div className="">
                        <Textinput
                          type="number"
                          label="Berat Produk (Gram)"
                          placeholder=""
                          disabled={disabledForms[index]}
                          value={variants[index] ? variants[index].weight : ""}
                          onChange={(e) =>
                            handleWeightChange(e.target.value, index)
                          }
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </Card>
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
                  value={sku_single}
                  onChange={(e) => setSkuSingle(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="text"
                  label="Barcode Produk ( Optional )"
                  placeholder="Masukkan barcode produk jika tersedia"
                  value={barcode_single}
                  onChange={(e) => setBarcodeSingle(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="number"
                  label="Harga Beli Produk"
                  placeholder="Masukkan harga beli produk"
                  value={buy_price_single}
                  onChange={(e) => setBuyPriceSingle(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="number"
                  label="Harga Jual Produk *"
                  placeholder="Masukkan harga jual produk"
                  value={sell_price_single}
                  onChange={(e) => setSellPriceSingle(e.target.value)}
                />
              </div>
              <div className="">
                <Textinput
                  type="number"
                  label="Berat Produk ( Optional )"
                  placeholder="Masukkan berat satuan produk"
                  value={weight_single}
                  onChange={(e) => setWeightSingle(e.target.value)}
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

export default UpdateProduct;
