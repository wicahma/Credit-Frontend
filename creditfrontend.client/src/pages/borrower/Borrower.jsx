import { Outlet } from "../../../node_modules/react-router-dom/dist/index";

function Borrower() {
  return (
      <div>
          <p>Page Borrower</p>
          <Outlet />
      </div>
  );
}

export default Borrower;