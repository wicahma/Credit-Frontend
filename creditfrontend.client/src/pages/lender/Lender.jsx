import { Outlet } from "../../../node_modules/react-router-dom/dist/index";

function Lender() {
    return (
        <div className="mx-auto container px-3">
            <div className="mt-5">
                <Outlet />
            </div>
        </div>
    );
}

export default Lender;