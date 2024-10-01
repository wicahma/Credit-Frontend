import { useEffect, useState } from "react";
import { getHistoryBorrower } from "../../apis/ApiLoan";
import { currencyFormatter } from "../../utils/formatter";
import ModalDetailLoan from "../../components/modals/ModalDetailLoan";
import ModalDeleteLoan from "../../components/modals/ModalDeleteLoan";

function HistoryBorrower() {
    const [deleteId, setDeleteId] = useState(null);
    const [detailId, setDetailId] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getHistoryBorrower("all").then(res => {
            console.log(res)
            if (res !== null) {
                setHistory(res.data)
            }
        })
    }, [])
    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold">History Borrower</h1>
                <p>Lhat riwayat peminjaman kamu disini!</p>
            </div>

            <div className="space-y-2 mt-4">
                {history.map((history, i) => (<div key={i} onClick={() => setDetailId(history.id)} className={"border overflow-hidden border-gray-800 justify-stretch items-stretch bg-sky-100 dark:bg-gray-700 h-24 base-shadow flex gap-2"}>
                    <div className="px-3 py-1 grow">
                        <p>Status
                            <span className={`px-2 ms-1 rounded-lg border text-sm uppercase text-white ${history.status.includes("requested") && "bg-sky-500 border-sky-600"} ${history.status.includes("funded") && "bg-orange-500 border-orange-600"} ${history.status.includes("repaid") && "bg-green-500 border-green-600"}`}>{history.status}</span>
                        </p>
                        <div className="flex mb-2 gap-1 items-end">
                            <h1 className="text-xl font-semibold">{currencyFormatter(history.amount)}</h1>
                            <p className="text-sm">dengan bunga {history.interestRate} %</p>
                        </div>
                        <p>Durasi peminjaman <span className="px-1 bg-sky-500 text-white text-sm border border-sky-600 rounded-lg">{history.duration} Bulan</span></p>
                    </div>
                    {history.status.includes("requested") &&
                        <div onClick={() => setDeleteId(history.id)} className="aspect-square h-full bg-red-500 flex items-center justify-center text-xl font-bold text-white hover:bg-red-600">
                            Hapus
                        </div>
                    }
                </div>))}
            </div>
            <ModalDeleteLoan id={deleteId} closeCallback={(loans) => {
                setDeleteId(null);
                if (loans) {
                    setLoan(loans);
                }
            }} />

            <ModalDetailLoan id={detailId} closeCallback={() => {
                setDetailId(null);
            }} />
        </>
    );
}

export default HistoryBorrower;