import { Outlet } from "../../../node_modules/react-router-dom/dist/index";

function Borrower() {
    return (
        <div className="container mx-auto px-3">
            <div className="mt-5">
                <Outlet />
            </div>
        </div>
    );
}

export default Borrower;