import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = (data) => {
    const P = parseFloat(data.amount);
    const r = parseFloat(data.rate) / 100 / 12;
    const n = parseInt(data.years) * 12;

    if (P && r && n) {
      const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;

      setResult({
        monthly: monthly.toFixed(2),
        total: total.toFixed(2),
      });
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex items-center justify-center">
      <div className="bg-white  rounded shadow max-w-5xl w-full flex flex-col md:flex-row gap-6">

        {/* Form Section */}
        <div className="flex-1 max-w-md m-6">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Mortgage Calculator</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Loan Amount */}
            <div>
              <label className="block mb-1 font-semibold">Mortgage  Amount</label>
              <div className="flex items-center border rounded overflow-hidden">
                <span  className="bg-blue-100 text-black px-3 py-2">₹</span>
                <input
                  type="number"
                  {...register("amount", { required: "Loan amount is required" })}
                  placeholder="Enter amount"
                  className="flex-grow p-2 focus:outline-none"
                />
              </div>
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>
             <div className="lg:grid grid-cols-2 gap-2  ">


       {/* Loan Term */}
            <div>
              <label className="block mb-1 font-semibold">Mortgage  Term</label>
              <div className="flex items-center border rounded overflow-hidden">
                <input
                  type="number"
                  {...register("years", { required: "Loan term is required" })}
                  placeholder="Enter years"
                  className="flex-grow px-2 py-1 text-sm focus:outline-non"
                />
                <span className="bg-blue-100 text-black px-1 py-2">years</span>
              </div>
              {errors.years && <p className="text-red-500 text-sm mt-1">{errors.years.message}</p>}
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block mb-1 font-semibold">Interest Rate</label>
              <div className="flex items-center border rounded overflow-hidden">
                <input
                  type="number"
                  step="0.01"
                  {...register("rate", { required: "Interest rate is required" })}
                  placeholder="Enter rate"
                  className="flex-grow px-2 py-1 text-sm focus:outline-non"
                />
                <span className="bg-blue-100 text-black px-3 py-2">%</span>
              </div>
              {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>}
            </div>

     
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
        <div style={{ backgroundColor: "#002633" }} className="flex-1 flex flex-col items-center justify-center   rounded-bl-3xl rounded-tr-lg">
          {!result ? (
            <div className="text-white flex flex-col items-center gap-5 p-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                alt="Placeholder"
                className="w-28 h-28 mx-auto mb-4 opacity-60"
              />
              <h2 className="text-3xl">Result Shown Here</h2>
              <p className="text-lg text-blue-100">Complete the form and click "calculate repayments to see what your monthly repayments would be.</p>
            </div>
          ) : (
            <div className="p-9 flex flex-col gap-10">
              <h2 className="text-xl font-semibold text-white mb-2">Yours resulst</h2>
              <p className="text-blue-100">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
              <div className="bg-slate-900 p-6 border-t-4 rounded-2xl border-amber-300">
              <p className="text-lg text-gray-300">Your Monthly repayments</p>
              <p style={{ color: 'hsl(61, 70%, 52%)' }} className="text-3xl font-bold  mb-3">₹{result.monthly}</p>
              <  hr />
              <p className="text-lg text-gray-400">Total Repayment:</p>
              <p className="text-2xl font-bold text-gray-300">₹{result.total}</p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
