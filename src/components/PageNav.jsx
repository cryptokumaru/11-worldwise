import { NavLink } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" element={Homepage}>
            Home
          </NavLink>{" "}
        </li>
        <li>
          <NavLink to="/product" element={Product}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing" element={Pricing}>
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink to="/404x" element={Pricing}>
            Pagenotfound test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
