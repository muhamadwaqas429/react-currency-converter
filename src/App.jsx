import React, { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/usecurrencyinfo.js";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: rates, error, loading } = useCurrencyInfo(fromCurrency);
  const options = Object.keys(rates);

  useEffect(() => {
    if (rates && rates[toCurrency] != null) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [rates, amount, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-5 backdrop-blur-sm bg-white/30 shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Currency Converter
        </h1>

        {loading && (
          <p className="text-center text-blue-600 mb-3">Fetching rates...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-3">Error: {error}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (rates[toCurrency]) {
              setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
            }
          }}
        >
          {/* From Input */}
          <div className="w-full mb-3">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={setAmount}
              onCurrencyChange={setFromCurrency}
              currencyOptions={options}
              selectedCurrency={fromCurrency}
            />
          </div>

          {/* Swap Button */}
          <div className="relative w-full h-0.5 my-3">
            <button
              type="button"
              onClick={swapCurrencies}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-1 hover:bg-blue-700"
            >
              Swap
            </button>
          </div>

          {/* To Input */}
          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              onCurrencyChange={setToCurrency}
              currencyOptions={options}
              selectedCurrency={toCurrency}
              amountDisable={true}
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Convert
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
