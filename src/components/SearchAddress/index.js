import { useState, useContext, useRef } from "react";
import ForecastContext from "@/context/Forecast";
import useLookup from "@/hooks/useLookup";
import { Roboto } from "@next/font/google";
import dynamic from "next/dynamic";
import styles from "./style.module.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

const SearchResult = dynamic(() => import("../SearchResult"));

export default function SearchAddress() {
  const { selectCoordinates, clear } = useContext(ForecastContext);
  const [address, setAddress] = useState("");
  const { possibleAddresses, clearTips, isLoading, error } = useLookup(address);

  const tipInput = useRef();

  const copyTipAddress = () => {
    const tipInputElement = tipInput.current;
    tipInputElement.select();
    tipInputElement.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(tipInputElement.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchField}>
        <input
          className={[roboto.className, styles.input].join(" ")}
          placeholder="Ex.: 4600 Silver Creek Drive, Sherwood (street, city, state)"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />

        {address !== "" && (
          <button
            className={[roboto.className, styles.clearButton].join(" ")}
            type="button"
            onClick={() => {
              setAddress("");
              clear();
            }}
          >
            clear
          </button>
        )}

        {!isLoading && possibleAddresses && (
          <SearchResult
            isLoading={isLoading}
            error={error}
            addresses={possibleAddresses}
            onItemClick={(address) => {
              selectCoordinates(address.coordinates);
              clearTips();
            }}
          />
        )}
      </div>

      <p className={roboto.className}>
        Try:
        <input
          ref={tipInput}
          readOnly
          className={[roboto.className, styles.tipAddress].join(" ")}
          value="4600 Silver Creek Drive, Sherwood"
        />
        <button
          className={[roboto.className, styles.copyButton].join(" ")}
          type="button"
          onClick={copyTipAddress}
        >
          copy
        </button>
      </p>
    </div>
  );
}
