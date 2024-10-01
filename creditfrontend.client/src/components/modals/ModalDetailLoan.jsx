import { useState, useEffect } from "react";
import { getDetailFunding } from "../../apis/ApiFunding";
import { getDetailRepayment } from "../../apis/ApiRepayment";
import { addMonthsToDate, currencyFormatter, dateTimeFormatter } from "../../utils/formatter";
import { payLoan } from "../../apis/ApiLoan";

function ModalDetailLoan({ id, closeCallback }) {
    const [detailRepayment, setDetailRepayment] = useState(null);
    const [detailFunding, setDetailFunding] = useState(null);
    const [monthPaid, setMonthPaid] = useState(0);
    const [role, setRole] = useState("")

    useEffect(() => {
        if (id !== null) {
            getDetailFunding(id).then(res => {
                if (res !== null) {
                    setDetailFunding(res.data)
                }
            })
            getDetailRepayment(id).then(res => {
                if (res !== null) {
                    setDetailRepayment(res.data)
                }
            })
        }
        const role = localStorage.getItem("role")
        if (role) {
            setRole(role)
        }
    }, [id])

    const handlePayLoan = async () => {
        await payLoan(monthPaid, id).then(res => {
            if (res !== null) {
                getDetailRepayment(id).then(res => {
                    if (res !== null) {
                        setDetailRepayment(res.data)
                    }
                })
            }
        })
    }

    return id !== null && detailFunding !== null && detailRepayment !== null ? (
        <div>
            <div
                onClick={() => {
                    setDetailFunding(null)
                    setDetailRepayment(null)
                    closeCallback()
                }}
                className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-[1100]"
            ></div>
            <div className="fixed top-1/2 overflow-hidden w-[700px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:border rounded-lg z-[1101]">
                <div className="px-3 border-b py-2">
                    <h1 className="flex items-center justify-between text-2xl grow font-semibold">Detail Loan
                        <span className={`px-2 ms-1 rounded-lg border text-lg uppercase text-white ${detailFunding.status.includes("requested") && "bg-sky-500 border-sky-600"} ${detailFunding.status.includes("funded") && "bg-orange-500 border-orange-600"} ${detailFunding.status.includes("repaid") && "bg-green-500 border-green-600"}`}>{detailFunding.status}</span>
                    </h1>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                    <h2 className="px-3 pt-3 text-lg font-medium">
                        Loan
                    </h2>
                    <div className="my-3">
                        {detailRepayment.repaymentHistory.length <= 0 ?
                            (<div className="flex justify-between items-center border-y font-semibold text-xl px-3 py-1 border-y-gray-200 dark:border-y-gray-500 dark:bg-gray-800 bg-gray-100"> <h1>Lender - {detailFunding.lenderName}</h1> <span className={`uppercase font-bold text-lg text-white rounded-lg px-2 border 
                        border-orange-700 bg-orange-400`}>
                                on repay
                            </span></div>) : (
                                <div className="flex justify-between items-center border-y font-semibold text-xl px-3 py-1 border-y-gray-200 dark:border-y-gray-500 dark:bg-gray-800 bg-gray-100"> <h1>Lender - {detailFunding.lenderName}</h1> <span className={`uppercase font-bold text-lg text-white rounded-lg px-2 border 
                        ${detailRepayment.repaymentHistory[0].repaidStatus.includes("done") ? "border-green-700 bg-green-500" : " border-orange-700 bg-orange-400"}`}>
                                    {detailRepayment.repaymentHistory[0].repaidStatus ?? "on repay"}
                                </span></div>
                            )}
                        <p className="px-3 pt-3">Total loan {currencyFormatter(detailFunding.amount + (detailFunding.amount * (detailFunding.interestRate / 100)))} in {detailFunding.duration} month.</p>
                        <p className="px-3 ">Start at {dateTimeFormatter(detailFunding.createdAt)}</p>
                        {role.includes("borrower") && (
                            <div className="flex gap-2 items-center justify-between px-3 h-11">
                                <p className="text-nowrap">Bulan Bayar</p>
                                <input
                                    type="number"
                                    placeholder="Masukkan jumlah bulan yang ingin di bayar"
                                    className="w-full p-2 dark:bg-gray-800 h-full dark:border-gray-600 mt-2 border border-gray-300 rounded-lg"
                                    value={monthPaid}
                                    onChange={(e) => {
                                        setMonthPaid(e.target.value)
                                    }}
                                />
                                <button onClick={handlePayLoan} className="border border-green-700 bg-green-500 h-full px-3 translate-y-[0px]">Simpan</button>
                            </div>
                        )}
                    </div>
                    <h2 className="text-lg font-medium px-3">
                        History Payment
                    </h2>
                    <div className="mt-3 space-y-2 px-3 mb-5">
                        {
                            detailRepayment.repaymentHistory.map((repay, i) => (
                                <div key={i} className="base-shadow flex flex-col bg-green-400 dark:bg-green-700 border border-gray-800 h-40">
                                    <div className="px-3 py-1 grow">
                                        <h1 className="text-xl font-bold">Remain Debt {currencyFormatter(repay.balanceAmount)}</h1>
                                        <p className="text-sm leading-3 mt-3">Total debt {currencyFormatter(repay.amount)}</p>
                                        <p className="text-sm leading-5 mb-2">Monthly amount {currencyFormatter(repay.repaidAmount)}</p>
                                        <p>Status <span className={`uppercase ${repay.repaidStatus.includes("on repay") ? "border-orange-700 bg-orange-400" : "border-green-700 bg-green-400"} rounded-lg px-2 text-xs font-semibold text-white border`}>{repay.repaidStatus}</span></p>
                                    </div>
                                    <div className="border-t px-3 py-1 font-semibold border-t-gray-800">
                                        <p>Paid at {dateTimeFormatter(repay.paidAt)}</p>
                                    </div>
                                </div>
                            )).reverse()
                        }
                        {
                            Array.from(Array(detailFunding.duration - detailRepayment.repaymentHistory.length)).map((_, i) =>
                            (<div key={i} className="base-shadow border border-gray-800 overflow-hidden h-40 flex flex-col">
                                <div className="px-3 py-1 grow">
                                    <h1 className="text-xl font-bold">
                                        This month's debt {currencyFormatter((detailFunding.amount + (detailFunding.amount * (detailFunding.interestRate / 100))) / detailFunding.duration)}
                                    </h1>
                                    <p className="text-sm leading-3 mt-3">Total debt {currencyFormatter(detailFunding.amount)}</p>
                                    <p>Status <span className={`uppercase border-orange-700 bg-orange-400 rounded-lg px-2 text-xs font-semibold text-white border`}>unpaid</span></p>
                                </div>
                                <div className="border-t px-3 py-1 font-semibold border-t-gray-800">
                                    <p>Deadline at {addMonthsToDate(detailFunding.createdAt, i + 1)}</p>
                                </div>
                            </div>))
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalDetailLoan;