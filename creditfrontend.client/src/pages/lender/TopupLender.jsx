import { useState } from "react";
import { updateBalanceLender } from "../../apis/ApiUser";
import { get_user } from "../../apis/ApiAuth";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

function TopupLender() {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const nav = useNavigate();

    const handleUpdateBalance = async () => {
        setLoading(true);
        const res = await updateBalanceLender(balance);
        await get_user()
        nav(0)
        setLoading(false);
    }
    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold">Topup Lender</h1>
                <p>Isi Ulang saldo kamu disini!</p>
            </div>

            <div className="flex gap-2 w-full">
                <input
                    type="number"
                    placeholder="Masukkan jumlah saldo"
                    className="w-full p-2 dark:bg-gray-800 dark:border-gray-600 mt-2 border border-gray-300 rounded-lg"
                    value={balance}
                    onChange={(e) => {
                        setBalance(e.target.value)
                    }}
                />
                <button onClick={handleUpdateBalance} className={"bg-sky-500 text-white flex gap-2 justify-center items-center"}>
                    {loading && (
                        <div className={"loader border-white"} />
                    )}
                    Topup
                </button>
            </div>
        </>
    );
}

export default TopupLender;