import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";

const Contoh = () => {
  const [sku, setSku] = useState([""]);
  const [buyPrices, setBuyPrices] = useState([""]);
  const [sellPrices, setSellPrices] = useState([""]);

  const [commonBuyPrice, setCommonBuyPrice] = useState("");
  const [commonSellPrice, setCommonSellPrice] = useState("");

  const applyCommonPrices = () => {
    setBuyPrices(buyPrices.map(() => commonBuyPrice));
    setSellPrices(sellPrices.map(() => commonSellPrice));
  };

  return (
    <div className="lg:col-span-12 col-span-12">
      <Card title={"Tambah Produk"}>
        <>
          <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 mb-5">
            <div className="">
              <Textinput
                type="text"
                label="Atur semua Harga Beli"
                value={commonBuyPrice}
                onChange={(e) => setCommonBuyPrice(e.target.value)}
              />
            </div>
            <div className="">
              <Textinput
                type="text"
                label="Atur semua Harga Jual"
                value={commonSellPrice}
                onChange={(e) => setCommonSellPrice(e.target.value)}
              />
            </div>
            <div className="">
              <Button
                text="Terapkan harga"
                className="btn-primary light w-full"
                onClick={applyCommonPrices}
              />
            </div>
          </div>

          {sku.map((_, index) => (
            <div key={index} className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 mb-5">
              <div className="">
                <Textinput
                  type="text"
                  label="SKU Produk"
                  value={sku[index]}
                  onChange={(e) => {
                    const newSku = [...sku];
                    newSku[index] = e.target.value;
                    setSku(newSku);
                  }}
                />
              </div>
              <div className="">
                <Textinput
                  type="text"
                  label="Harga Beli"
                  value={buyPrices[index]}
                  onChange={(e) => {
                    const newBuyPrices = [...buyPrices];
                    newBuyPrices[index] = e.target.value;
                    setBuyPrices(newBuyPrices);
                  }}
                />
              </div>
              <div className="">
                <Textinput
                  type="text"
                  label="Harga Jual"
                  value={sellPrices[index]}
                  onChange={(e) => {
                    const newSellPrices = [...sellPrices];
                    newSellPrices[index] = e.target.value;
                    setSellPrices(newSellPrices);
                  }}
                />
              </div>
            </div>
          ))}
        </>
      </Card>
    </div>
  );
};

export default Contoh;
