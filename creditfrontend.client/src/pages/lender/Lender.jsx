import { Outlet } from "../../../node_modules/react-router-dom/dist/index";

function Lender() {
    return (
        <div className="mx-auto container px-3">
            <div className="mt-5">
                <h1 className="text-3xl font-semibold">Dashboard Lender</h1>
                <p>Lihat dan terima pengajuan yang menurut kamu meyakinkan!</p>
                <Outlet />
            </div>
        </div>
    );
}

export default Lender;