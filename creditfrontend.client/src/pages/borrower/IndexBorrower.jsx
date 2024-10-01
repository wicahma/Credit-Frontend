import { useEffect, useState } from "react";
import { createLoan, getHistoryBorrower } from "../../apis/ApiLoan";
import { currencyFormatter } from "../../utils/formatter";
import { validateNumber } from "../../utils/validator";
import ModalDeleteLoan from "../../components/modals/ModalDeleteLoan";
import ModalDetailLoan from "../../components/modals/ModalDetailLoan";

function IndexBorrower() {
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");
    const [loading, setLoading] = useState(false);
    const [loan, setLoan] = useState([])
    const [error, setError] = useState({});
    const [deleteId, setDeleteId] = useState(null);
    const [detailId, setDetailId] = useState(null);


    const handleCreateLoan = async () => {
        setLoading(true);
        const isValidated = validateForm();
        if (isValidated) {
            const res = await createLoan({ amount, interest });
            if (res !== null) {
                setAmount("");
                setInterest("");
                getHistoryBorrower("requested").then(res => {
                    if (res !== null) {
                        setLoan(res.data);
                    }
                })
            }
        }
        setLoading(false);
    }

    const validateForm = () => {
        const validateAmount = validateNumber(amount, true)
        const validateInterest = validateNumber(interest)

        if (validateAmount.isError) {
            setError(prev => ({
                ...prev,
                amount: validateAmount.message
            }));
        } else {
            const newError = error;
            delete newError.amount;
            setError(newError);
        }
        if (validateInterest.isError) {
            setError(prev => ({
                ...prev,
                interest: validateInterest.message
            }));
        } else {
            const newError = error;
            delete newError.interest;
            setError(newError);
        }
        if (validateAmount.isError || validateInterest.isError) {
            return false;
        }
        setError({})
        return true;

    }

    useEffect(() => {
        getHistoryBorrower("requested").then(res => {
            if (res !== null) {
                setLoan(res.data);
            }
        })
    }, [])

    useEffect(() => {
        validateForm()
    }, [amount, interest])



    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold">Dashboard Borrower</h1>
                <p>Buat dan lakukan peminjaman di dashboard kamu dengan mudah!</p>
            </div>

            <div className="base-shadow bg-gray-200 dark:bg-gray-700 border border-gray-800 mt-5">
                <h1 className="text-2xl font-semibold px-3 py-2 border-b border-b-gray-800">Create new Loan</h1>

                <div className="px-3 py-3">
                    <div className={"flex gap-2 items-center"}>
                        <p className="break-keep text-nowrap">Jumlah Pinjaman</p>
                        <input
                            type="number"
                            value={amount}
                            placeholder="Masukkan jumlah yang ingin dipinjam"
                            className={`${error.amount ? "error" : null}  dark:bg-gray-800 dark:border-gray-600 w-full p-2 mt-2 border border-gray-300 rounded-lg`}
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}
                        />
                    </div>
                    <p className="text-red-400 text-sm font-medium">
                        {error.amount}
                    </p>

                    <div className="flex gap-2 items-center">
                        <p className="break-keep text-nowrap">Bunga Pinjaman</p>
                        <input
                            type="number"
                            value={interest}
                            placeholder="Masukkan bunga per pinjaman dalam persen"
                            className={`w-full p-2 mt-2 dark:bg-gray-800 dark:border-gray-600 border border-gray-300 rounded-lg ${error.interest ? "error" : null}`}
                            onChange={(e) => {
                                setInterest(e.target.value)
                            }}
                        />
                    </div>
                    <p className="text-red-400 text-sm font-medium">
                        {error.interest}
                    </p>
                </div>
                <div className="px-3 pt-3 pb-2 border-t border-t-gray-800 flex items-center justify-end">
                    <button onClick={handleCreateLoan} className={"bg-sky-500 text-sky-100 flex gap-2 justify-center items-center"}>
                        {loading && (
                            <div className={"loader border-white"} />
                        )}
                        Create Loan
                    </button>
                </div>
            </div>

            <div className="mt-5 bg-gray-200 dark:bg-gray-800 pb-3 pt-2 base-shadow px-2 border border-gray-800">
                <h1 className="text-2xl font-semibold">History Requested Loan</h1>
                <div className="space-y-2 mt-4">
                    {loan.map((l, i) => (
                        <div key={i} onClick={() => setDetailId(l.id)} className={"border overflow-hidden dark:bg-gray-700 border-gray-800 justify-stretch items-stretch bg-sky-100 h-24 base-shadow flex gap-2"}>
                            <div className="px-3 py-1 grow">
                                <p>Status
                                    <span className={`px-2 ms-1 rounded-lg border text-sm uppercase text-white ${l.status.includes("requested") && "bg-sky-500 border-sky-600"} ${l.status.includes("funded") && "bg-orange-500 border-orange-600"} ${l.status.includes("repaid") && "bg-green-500 border-green-600"}`}>{l.status}</span>
                                </p>
                                <div className="flex mb-2 gap-1 items-end">
                                    <h1 className="text-xl font-semibold">{currencyFormatter(l.amount)}</h1>
                                    <p className="text-sm">dengan bunga {l.interestRate} %</p>
                                </div>
                                <p>Durasi peminjaman <span className="px-1 bg-sky-500 text-white text-sm border border-sky-600 rounded-lg">{l.duration} Bulan</span></p>
                            </div>
                            <div onClick={() => setDeleteId(l.id)} className="aspect-square h-full bg-red-500 flex items-center justify-center text-xl font-bold text-white hover:bg-red-600">
                                Hapus
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ModalDeleteLoan id={deleteId} closeCallback={(loans) => {
                setDeleteId(null);
                if (loans) {
                    setLoan(loans);
                }
            }} />

            <ModalDetailLoan id={detailId} closeCallback={() => {
                setDeleteId(null);
            }} />
        </>
    );
}

export default IndexBorrower;