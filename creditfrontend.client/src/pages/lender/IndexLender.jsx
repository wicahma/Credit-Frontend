import { useEffect, useState } from "react";
import { getListRequestedLoan } from "../../apis/ApiLoan";
import { currencyFormatter } from "../../utils/formatter";
import ModalAcceptLoan from "../../components/modals/ModalAcceptLoan";

function IndexLender() {
    const [loans, setLoans] = useState([]);
    const [acceptId, setAcceptId] = useState(null);
    useEffect(() => {
        getListRequestedLoan().then(res => {
            if (res !== null) {
                setLoans(res.data)
            }
        })
    }, [])
    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold">Dashboard Lender</h1>
                <p>Lihat dan terima pengajuan yang menurut kamu meyakinkan!</p>
            </div>

            <div className="mt-5 bg-gray-200 dark:bg-gray-800 pb-3 pt-2 base-shadow px-2 border border-gray-800">
                <h1 className="text-2xl font-semibold">Requested Loan</h1>
                <div className="space-y-2 mt-4">
                    {loans.map((l, i) => (
                        <div key={i} className={"border overflow-hidden dark:bg-gray-700 border-gray-800 justify-stretch items-stretch bg-sky-100 h-24 base-shadow flex gap-2"}>
                            <div className="px-3 py-1 grow">
                                <p>Status
                                    <span className={`px-2 ms-1 rounded-lg border text-sm uppercase text-white ${l.status.includes("requested") && "bg-sky-500 border-sky-600"} ${l.status.includes("funded") && "bg-orange-500 border-orange-600"} ${l.status.includes("repaid") && "bg-green-500 border-green-600"}`}>{l.status}</span>
                                </p>
                                <div className="flex mb-2 gap-1 items-end">
                                    <h1 className="text-xl font-semibold">{currencyFormatter(l.amount)}</h1>
                                    <p className="text-sm">dengan bunga {l.interest} %</p>
                                </div>
                                <p>Durasi peminjaman <span className="px-1 bg-sky-500 text-white text-sm border border-sky-600 rounded-lg">{l.duration} Bulan</span></p>
                            </div>
                            <div onClick={() => setAcceptId(l.id)} className="aspect-square leading-4 h-full bg-green-500 flex text-end pr-2 items-center justify-end cursor-pointer text-xl font-bold text-white hover:bg-green-600">
                                Acc this Loan
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ModalAcceptLoan id={acceptId} closeCallback={(loans) => {
                setAcceptId(null);
                console.log(loans);
                if (loans) {
                    setLoans(loans)
                }
            }} />
        </>
    );
}

export default IndexLender;