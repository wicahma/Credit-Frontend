import { useEffect, useState } from "react";
import { createUser, getAllUser, updateUser } from "../../apis/ApiUser";
import { currencyFormatter } from "../../utils/formatter";
import { alertService } from "../../utils/alert";
import ModalDeleteUser from "../../components/modals/ModalDeleteUser";

const Admin = () => {
    const [inputUser, setInputUser] = useState({
        type: "create",
        data: null,
    });
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUser().then(res => {
            console.log(res);
            if (res !== null) setUsers(res.data);
        })
    }, []);

    const handleEditId = async () => {
        if (inputUser.data === null || typeof inputUser.data.nama === undefined) {
            return alertService.error("Data User tidak boleh kosong!");
        }

        await updateUser(inputUser.data, editId);
        await getAllUser().then(res => {
            if (res !== null) setUsers(res.data);
        })
        setEditId(null);
        setInputUser({
            type: "create",
            data: null,
        });
    };

    const handleCreateUser = async () => {
        await createUser(inputUser.data);
        await getAllUser().then(res => {
            if (res !== null) setUsers(res.data);
        });
        setInputUser({
            type: "create",
            data: null,
        });
    }


    return (
        <>
            <div className="container mx-auto px-3">
                <div className="mt-5 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Manage User
                        </h2>
                        <p>
                            Atur data pengguna dengan mengedit, menghapus atau mengupdate data data yang ada.
                        </p>
                    </div>
                    <div>
                        <button onClick={() => setInputUser({
                            type: "create",
                            data: {
                                name: "",
                                email: "",
                                role: "lender",
                                balance: "",
                            },
                        })} className="flex gap-1 items-center justify-center h-8 bg-lime-500 text-white text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                            Tambah User
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                <th className="text-start text-gray-800 font-normal rounded-s-lg bg-gray-200 py-3 ps-3">
                                    No.
                                </th>
                                <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                                    ID
                                </th>
                                <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                                    Name
                                </th>
                                <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                                    Email
                                </th>
                                <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                                    Role
                                </th>
                                <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                                    Balance
                                </th>
                                <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3 rounded-e-lg">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-900 dark:text-gray-100">
                            {
                                users.map((user, i) => (
                                    <tr key={i} className="group relative">
                                        <td className="rounded-s-lg max-w-fit border-l border-y px-3 h-12 border-gray-200">
                                            {i + 1}
                                        </td>
                                        <td className="border-y border-gray-200 h-12 max-w-fit w-fit break-keep text-nowrap px-3">
                                            {user.id}
                                        </td>
                                        {editId !== null && editId === user.id ?
                                            (<td className="border border-gray-200 h-12 max-w-full w-full">
                                                <input
                                                    type="text"
                                                    defaultValue={user.name}
                                                    onChange={(e) =>
                                                        setInputUser((prev) => ({
                                                            type: "update",
                                                            data: { ...prev.data, name: e.target.value },
                                                        }))
                                                    }
                                                    className="h-full px-3 w-full"
                                                    placeholder="Masukkan nama pengguna..."
                                                />
                                            </td>)
                                            :
                                            (<td className="border-y border-gray-200 h-12 max-w-full w-full px-3">
                                                {user.name}
                                            </td>)}
                                        <td className="border-y border-gray-200 h-12 max-w-full w-full px-3">
                                            {user.email}
                                        </td>
                                        {editId !== null && editId === user.id && user.role !== "admin" ?
                                            (<td className="border border-gray-200 h-12 max-w-full w-full">
                                                <select name="role"
                                                    className="base-shadow h-full rounded-lg border border-gray-800 base-transform"
                                                    defaultValue={user.role}
                                                    onChange={(e) => {
                                                        setInputUser((prev) => ({
                                                            type: "update",
                                                            data: { ...prev.data, role: e.target.value },
                                                        }))
                                                    }}>
                                                    <option value="lender">Lender</option>
                                                    <option value="borrower">Borrower</option>
                                                </select>
                                            </td>)
                                            :
                                            (<td className="border-y border-gray-200 h-12 max-w-full w-full px-3">
                                                {user.role}
                                            </td>)}
                                        {editId !== null && editId === user.id ?
                                            (<td className="border border-gray-200 h-12 max-w-full w-full">
                                                <input
                                                    type="text"
                                                    defaultValue={user.balance}
                                                    onChange={(e) =>
                                                        setInputUser((prev) => ({
                                                            type: "update",
                                                            data: { ...prev.data, balance: e.target.value },
                                                        }))
                                                    }
                                                    className="h-full px-3 w-full"
                                                    placeholder="Masukkan saldo pengguna..."
                                                />
                                            </td>)
                                            :
                                            (<td className="border-y border-gray-200 h-12 max-w-full w-full px-3">
                                                {currencyFormatter(user.balance)}
                                            </td>)}
                                        <td className="rounded-e-lg border-r border-y h-12 aspect-[2/1] border-gray-200 overflow-hidden">
                                            <div className="flex flex-nowrap h-full">
                                                <div
                                                    disabled={deleteId !== null && deleteId === user.id}
                                                    onClick={() => {
                                                        if (editId !== null && editId === user.id) {
                                                            handleEditId();
                                                        } else {
                                                            setEditId(user.id);
                                                            setDeleteId(null);
                                                            setInputUser({
                                                                type: "update",
                                                                data: { name: user.name, role: user.role, balance: user.balance },
                                                            });
                                                        }
                                                    }}
                                                    className={`aspect-square p-3 h-full ${editId !== null && editId === user.id
                                                        ? "bg-lime-500 ring-lime-500 hover:bg-lime-500 hover:ring-lime-500"
                                                        : "bg-orange-400 ring-orange-400 hover:bg-orange-500 hover:ring-orange-500"
                                                        }  disabled:bg-orange-100 disabled:ring-orange-100 text-white ring-2 transition-colors`}
                                                >
                                                    {editId !== null && editId === user.id ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div
                                                    disabled={editId !== null && editId === user.id}
                                                    onClick={() => {
                                                        setDeleteId(user.id);
                                                        setEditId(null);
                                                    }}
                                                    className={`aspect-square p-3 h-full disabled:bg-red-200 disabled:ring-red-200 bg-red-600 text-white ring-2 ring-red-600 hover:bg-red-700 hover:ring-red-700 transition-colors`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            {
                                inputUser.type === "create" && inputUser.data !== null &&
                                (<tr className="group relative">
                                    <td className="rounded-s-lg max-w-fit border-l border-y px-3 h-12 border-gray-200">
                                        {users.length + 1}
                                    </td>
                                    <td className="border-y border-gray-200 h-12 max-w-fit w-fit break-keep text-nowrap px-3">
                                        User ID
                                    </td>
                                    <td className="border border-gray-200 h-12 max-w-full w-full">
                                        <input
                                            type="text"
                                            value={inputUser.data.name ?? ""}
                                            onChange={(e) =>
                                                setInputUser((prev) => ({
                                                    type: "create",
                                                    data: { ...prev.data, name: e.target.value },
                                                }))
                                            }
                                            className="h-full px-3 w-full"
                                            placeholder="Masukkan nama pengguna..."
                                        />
                                    </td>
                                    <td className="border-y border-gray-200 h-12 max-w-full w-full px-3">
                                        <input
                                            type="email"
                                            value={inputUser.data.email ?? ""}
                                            onChange={(e) =>
                                                setInputUser((prev) => ({
                                                    type: "create",
                                                    data: { ...prev.data, email: e.target.value },
                                                }))
                                            }
                                            className="h-full px-3 w-full"
                                            placeholder="Masukkan email pengguna..."
                                        />
                                    </td>
                                    <td className="border border-gray-200 h-12 max-w-full w-full">
                                        <select name="role"
                                            className="base-shadow h-full rounded-lg border border-gray-800 base-transform"
                                            value={inputUser.data.role ?? ""}
                                            onChange={(e) => {
                                                setInputUser((prev) => ({
                                                    type: "create",
                                                    data: { ...prev.data, role: e.target.value },
                                                }))
                                            }}>
                                            <option value="admin">Admin</option>
                                            <option value="lender">Lender</option>
                                            <option value="borrower">Borrower</option>
                                        </select>
                                    </td>
                                    <td className="border border-gray-200 h-12 max-w-full w-full">
                                        <input
                                            type="text"
                                            value={inputUser.data.pass ?? ""}
                                            onChange={(e) =>
                                                setInputUser((prev) => ({
                                                    type: "create",
                                                    data: { ...prev.data, pass: e.target.value },
                                                }))
                                            }
                                            className="h-full px-3 w-full"
                                            placeholder="Masukkan password pengguna..."
                                        />
                                    </td>
                                    <td className="rounded-e-lg border-r border-y h-12 aspect-[2/1] border-gray-200 overflow-hidden">
                                        <div className="flex flex-nowrap h-full">
                                            <div
                                                onClick={handleCreateUser}
                                                className={`aspect-square p-3 h-full bg-lime-500 ring-lime-500 hover:bg-lime-500 hover:ring-lime-500 disabled:bg-orange-100 disabled:ring-orange-100 text-white ring-2 transition-colors`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setInputUser({
                                                        type: "create",
                                                        data: null,
                                                    });
                                                }}
                                                className={`aspect-square p-3 h-full disabled:bg-red-200 disabled:ring-red-200 bg-red-600 text-white ring-2 ring-red-600 hover:bg-red-700 hover:ring-red-700 transition-colors`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <ModalDeleteUser
                id={deleteId}
                closeCallback={(users) => {
                    setDeleteId(null);
                    if (users) {
                        setUsers(users);
                    }
                }}
            />
        </>
    );
}

export default Admin;