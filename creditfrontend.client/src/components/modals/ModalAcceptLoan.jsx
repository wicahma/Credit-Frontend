import { useState } from "react";
import { acceptLoan, getListRequestedLoan } from "../../apis/ApiLoan";
import { get_user } from "../../apis/ApiAuth";

function ModalAcceptLoan({ id, closeCallback }) {
    const [loading, setLoading] = useState(false);
    const handleAccLoan = async (e) => {
        setLoading(true);
        e.preventDefault();
        e.stopPropagation();

        const res = await acceptLoan(id);

        get_user()
        if (res !== null) {
            getListRequestedLoan().then(res => {
                closeCallback(res.data);
            })
        }
        setLoading(false);
    };

    return id !== null ? (
        <div>
            <div
                onClick={() => closeCallback()}
                className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-[1100]"
            ></div>
            <div className="fixed top-1/2 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-lg z-[1101]">
                <div className="px-3 border-b py-2">
                    <h1 className="text-2xl grow font-semibold pe-3">Terima Loan?</h1>
                </div>
                <p className="text-center text-sm p-3 mb-5">
                    Loan yang diterima tidak dapat dikembalikan lagi.
                </p>
                <div className="flex justify-center w-full h-10">
                    <div
                        onClick={handleAccLoan}
                        className="bg-green-500 flex gap-2 justify-center items-center text-white hover:bg-green-600 transition-colors px-3 py-1 grow"
                    >
                        {loading && (
                            <div className="loader border-white" />
                        )}
                        Terima
                    </div>
                    <div
                        onClick={() => closeCallback()}
                        className="bg-gray-200 flex items-center justify-center text-gray-800 hover:bg-gray-300 transition-colors px-3 py-1 grow"
                    >
                        Batal
                    </div>
                </div>
            </div>
        </div>
    ) : undefined;
}

export default ModalAcceptLoan;