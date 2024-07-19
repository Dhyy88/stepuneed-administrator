import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import axios from "../../../API/Axios";
import ApiEndpoint from "../../../API/Api_EndPoint";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/LoadingButton";
import Checkbox from "@/components/ui/Checkbox";

const CreatePermission = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");

  const getPermission = async () => {
    await axios.get(ApiEndpoint.GET_PERMISSION).then((response) => {
      setData(response?.data?.data);
    });
  };

  const handleCheckboxChange = (access) => {
    if (access === "manage-all") {
      setSelectAllChecked(!selectAllChecked);
      setPermissions(selectAllChecked ? [] : [access]);
    } else {
      const updatedPermissions = permissions.includes(access)
        ? permissions.filter((item) => item !== access)
        : [...permissions, access];
      setPermissions(updatedPermissions.filter(item => item !== "manage-all"));
      setSelectAllChecked(false);
    }
  };

  const onSubmit = async () => {
    setIsLoadingButton(true);
    const confirmResult = await Swal.fire({
      title: "Konfirmasi",
      text: "Anda yakin data yang dimasukkan sudah benar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Tambahkan",
      cancelButtonText: "Batal",
    });
    setIsLoadingButton(false);

    if (confirmResult.isConfirmed) {
      try {
        await axios.post(ApiEndpoint.ROLE + "/create", {
          name: name,
          permissions: permissions,
        });
        Swal.fire("Sukses", "Perijinan berhasil ditambahkan", "success").then(
          () => {
            setIsLoadingButton(false);
            resetForm();
            navigate("/permissions");
          }
        );
      } catch (err) {
        setError(err.response.data.errors);
        Swal.fire("Gagal", err.response.data.message, "error");
        setIsLoadingButton(false);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const resetForm = () => {
    setName("");
    setPermissions([]);
    setChecked(false);
    setSelectAllChecked(false);
  };

  return (
    <>
      <div className="lg:col-span-12 col-span-12">
        <Card title={"Tambah Akses Admin"}>
          <div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mb-5">
            <div className="">
              <Textinput
                label="Nama Akses *"
                type="text"
                placeholder="Masukkan nama akses"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* {error && (
                <span className="text-danger-600 text-sm py-2">
                  {error.name}
                </span>
              )} */}
            </div>
          </div>

          <Card bodyClass="p-0 mb-5" noborder>
            <header
              className={`border-b px-4 pt-4 pb-3 flex items-center  border-warning-300`}
            >
              <h6 className={`card-title text-sm mb-0 text-warning-500`}>
                Pilih Perijinan agar admin dapat mengakses fitur-fitur tertentu
              </h6>
            </header>
            <div className="grid grid-cols-4 gap-4 py-5 px-5">
              {data.map((permission, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    label={permission.name}
                    value={permissions.includes(permission.access)}
                    onChange={() => handleCheckboxChange(permission.access)}
                    disabled={
                      selectAllChecked && permission.access !== "manage-all"
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Button
              text="Reset"
              className="btn-primary light w-full"
              onClick={resetForm}
            />
            <Button
              text={isLoadingButton ? <LoadingButton /> : "Simpan"}
              className="btn-primary dark w-full "
              type="submit"
              onClick={onSubmit}
              disabled={isLoadingButton}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreatePermission;
