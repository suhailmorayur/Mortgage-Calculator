import React from 'react';

function Result({ result }) {
    return (
        <>
            <div className=" bg-[hsl(202,55%,16%)] flex-1 flex flex-col items-center justify-center   rounded-bl-3xl rounded-tr-lg">
                {!result ? (
                    <div className="text-white flex flex-col items-center gap-5 p-6">
                        <img
                            src="illustration.svg"
                            alt="Placeholder"
                            className=" mx-auto mb-4 opacity-60"
                        />
                        <h2 className="text-3xl">Result Shown Here</h2>
                        <p className="text-base text-center text-[hsl(203,87%,94%)]">Complete the form and click "calculate repayments to see what your monthly repayments would be.</p>
                    </div>
                ) : result.type === "repayment" ? (
                    <div className="p-9 flex flex-col gap-10">
                        <h2 className="text-xl font-semibold text-white mb-2">Yours results</h2>
                        <p className="text-[hsl(203,87%,94%)]">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                        <div className="bg-slate-900 p-6 border-t-4 rounded-2xl border-amber-300">
                            <p className="text-lg text-[hsl(203,41%,72%)]">Your Monthly repayments</p>
                            <p style={{ color: 'hsl(61, 70%, 52%)' }} className="text-3xl font-bold  mb-3">₹{result.monthly}</p>
                            <  hr />
                            <p className="text-lg text-[hsl(203,41%,72%)]">Total Repayment:</p>
                            <p className="text-2xl font-bold text-white">₹{result.total}</p>
                        </div>

                    </div>
                ) : (
                    <div className="p-9 flex flex-col gap-10" >
                        <h2 className="text-xl font-semibold text-white mb-2">Interest-Only Result</h2>
                        <p className="text-[hsl(203,87%,94%)]">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                        <div className="bg-slate-900 p-6 border-t-4 rounded-2xl border-amber-300" >
                            <p className="text-lg text-[hsl(203,41%,72%)]">Monthly Interest Payment:</p>
                            <p style={{ color: 'hsl(61, 70%, 52%)' }} className="text-3xl font-bold  mb-3">₹{result.interestOnly}</p>
                        </div>
                    </div>)}
            </div>
        </>
    );
}

export default Result;