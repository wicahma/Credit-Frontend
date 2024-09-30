import { useState } from "react";
import { deleteUser, getAllUser } from "../../apis/ApiUser";

const ModalDeleteUser = ({ id, closeCallback }) => {
    const [loading, setLoading] = useState(false);
    const handleDeleteUser = async (e) => {
        setLoading(true);
        e.preventDefault();
        e.stopPropagation();

        const res = await deleteUser(id);

        if (res !== null) {
            getAllUser().then(res => {
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
            <div className="fixed top-1/2 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-[1101]">
                <div className="px-3 border-b py-2">
                    <h1 className="text-2xl grow font-semibold pe-3">Hapus User?</h1>
                </div>
                <p className="text-center text-sm p-3 mb-5">
                    User yang dihapus tidak dapat dikembalikan lagi.
                </p>
                <div className="flex justify-center w-full h-10">
                    <div
                        onClick={handleDeleteUser}
                        className="bg-red-500 flex gap-2 justify-center items-center text-white hover:bg-red-600 transition-colors px-3 py-1 grow"
                    >
                        {loading && (
                            <div className="loader border-white" />
                        )}
                        Hapus
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
};

export default ModalDeleteUser;
