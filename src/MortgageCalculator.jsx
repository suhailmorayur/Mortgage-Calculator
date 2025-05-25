import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Result from "./Result";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [selectedType, setSelectedType] = useState("repayment");

  const onSubmit = (data) => {
    const P = parseFloat(data.amount);
    const r = parseFloat(data.rate) / 100 / 12;
    const n = parseInt(data.years) * 12;

    if (P && r && n) {
      if (data.type === "repayment") {
        const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = monthly * n;

        setResult({
          type: "repayment",
          monthly: monthly.toFixed(2),
          total: total.toFixed(2),
        });
      } else if (data.type === "interestOnly") {
        const interestOnly = P * r;

        setResult({
          type: "interestOnly",
          interestOnly: interestOnly.toFixed(2),
        });
      }
    }
  };


  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="min-h-screen bg-[rgb(227,243,253)] p-6 flex items-center justify-center">
      <div className="bg-white  rounded shadow max-w-5xl w-full flex flex-col md:flex-row gap-6">

        {/* Form Section */}
        <div className="flex-1 max-w-md m-6">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Mortgage Calculator</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Loan Amount */}
            <div>
              <label className="block mb-1 font-semibold">Mortgage  Amount</label>
              <div className={`flex items-center border rounded overflow-hidden ${errors.amount ? 'border-red-500' :
                  focusedField === 'amount' ? 'border-yellow-400' :
                    'border-gray-300'}`}>
                <span className={`px-3 py-2 text-black ${errors.amount ? 'bg-red-500' :
                    focusedField === 'amount' ? 'bg-yellow-400' :
                      'bg-[rgb(227,243,253)]'
                  }`}>₹</span>
                <input
                  type="number"
                  {...register("amount", { required: "Loan amount is required" })}
                  placeholder="Enter amount"
                  className="flex-grow p-2 focus:outline-none"
                  onFocus={() => setFocusedField("amount")}
                  onBlur={() => setFocusedField("")}
                />
              </div>
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>
            <div className="lg:grid grid-cols-2 gap-2  ">


              {/* Loan Term */}
              <div>
                <label className="block mb-1 font-semibold">Mortgage Term</label>
                <div className={`flex items-center border rounded overflow-hidden ${errors.years ? 'border-red-500' :
                    focusedField === 'years' ? 'border-yellow-400' :
                      'border-gray-300'
                  }`}>
                  <input
                    type="number"
                    {...register("years", { required: "Loan term is required" })}
                    placeholder="Enter years"
                    className="flex-grow px-2 py-1 text-sm focus:outline-none"
                    onFocus={() => setFocusedField("years")}
                    onBlur={() => setFocusedField("")}
                  />
                  <span className={`px-2 py-2 text-black ${errors.years ? 'bg-red-500' :
                      focusedField === 'years' ? 'bg-yellow-400' :
                        'bg-[rgb(227,243,253)]'
                    }`}>
                    years
                  </span>
                </div>
                {errors.years && (
                  <p className="text-red-500 text-sm mt-1">{errors.years.message}</p>
                )}
              </div>


              {/* Interest Rate  */}
              <div>
                <label className="block mb-1 font-semibold">Interest Rate</label>
                <div className={`flex items-center border rounded overflow-hidden ${errors.rate ? 'border-red-500' :
                    focusedField === 'rate' ? 'border-yellow-400' :
                      'border-gray-300'
                  }`}>
                  <input
                    type="number"
                    step="0.01"
                    {...register("rate", { required: "Interest rate is required" })}
                    placeholder="Enter rate"
                    className="flex-grow px-2 py-1 text-sm focus:outline-none"
                    onFocus={() => setFocusedField("rate")}
                    onBlur={() => setFocusedField("")}
                  />
                  <span className={`px-3 py-2 text-black ${errors.rate ? 'bg-red-500' :
                      focusedField === 'rate' ? 'bg-yellow-400' :
                        'bg-[rgb(227,243,253)]'
                    }`}>
                    %
                  </span>
                </div>
                {errors.rate && (
                  <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>
                )}
              </div>



            </div>
            <div className="flex flex-col gap-3">
              <label
                className={`flex items-center border p-3 rounded cursor-pointer font-medium text-base ${selectedType === "repayment" ? "border-yellow-400 bg-yellow-100" : "border-black"
                  }`}
              >
                <input
                  type="radio"
                  value="repayment"
                  {...register("type", { required: true })}
                  className="mr-2 "
                  defaultChecked
                  onChange={() => setSelectedType("repayment")}
                />
                Repayment
              </label>

              <label
                className={`flex items-center border p-3 rounded cursor-pointer font-medium text-base ${selectedType === "interestOnly" ? "border-yellow-400 bg-yellow-100" : "border-black"
                  }`}
              >
                <input
                  type="radio"
                  value="interestOnly"
                  {...register("type", { required: true })}
                  className="mr-2"
                  onChange={() => setSelectedType("interestOnly")}
                />
                Interest Only
              </label>

            </div>

            <button
              type="submit" style={{ backgroundColor: 'hsl(61, 70%, 52%)' }}
              className=" flex gap-3 text-xl py-2 rounded-3xl px-8 hover:bg-blue-700"
            >
              <img src="calculate.png" alt="" />
              Calculate Reypeyment
            </button>
          </form>
        </div>

        {/* Result Section */}

        <Result result={result} />

      </div>
    </div>
  );
}

export default App;
