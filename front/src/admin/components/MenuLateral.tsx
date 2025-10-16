
import { useAdminStore } from "../context/AdminContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBoxOpen, FaUsers } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

export function MenuLateral() {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, deslogaAdmin } = useAdminStore();

  return (
    <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
  <div className="h-full px-3 py-4 overflow-y-auto bg-[#0a174e]">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/admin"
              className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${location.pathname === '/admin' ? 'bg-[#142a5c] shadow-lg text-white scale-[0.98]' : 'hover:bg-[#142a5c] text-blue-100'}`}
            >
              <span className="h-5 text-gray-200 text-2xl"><BiSolidDashboard /></span>
              <span className="ms-2 mt-1">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/produtos"
              className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${location.pathname === '/admin/produtos' ? 'bg-[#142a5c] shadow-lg text-white scale-[0.98]' : 'hover:bg-[#142a5c] text-blue-100'}`}
            >
              <span className="h-5 text-gray-200 text-2xl"><FaBoxOpen /></span>
              <span className="ms-2 mt-1">Produtos / Estoque</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/clientes"
              className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${location.pathname === '/admin/clientes' ? 'bg-[#142a5c] shadow-lg text-white scale-[0.98]' : 'hover:bg-[#142a5c] text-blue-100'}`}
            >
              <span className="h-5 text-gray-200 text-2xl"><FaUsers /></span>
              <span className="ms-2 mt-1">Controle de Clientes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/compras"
              className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${location.pathname === '/admin/compras' ? 'bg-[#142a5c] shadow-lg text-white scale-[0.98]' : 'hover:bg-[#142a5c] text-blue-100'}`}
            >
              <span className="h-5 text-gray-200 text-2xl"><BsCashCoin /></span>
              <span className="ms-2 mt-1">Controle de Compras</span>
            </Link>
          </li>
          {admin.nivel == 3 &&
            <>
              <li>
                <Link
                  to="/admin/cadAdmin"
                  className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${location.pathname === '/admin/cadAdmin' ? 'bg-[#142a5c] shadow-lg text-white scale-[0.98]' : 'hover:bg-[#142a5c] text-blue-100'}`}
                >
                  <span className="h-5 text-gray-200 text-2xl"><FaRegUser /></span>
                  <span className="ms-2 mt-1">Cadastro de Admins</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/cadAdmin/novo"
                  className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${location.pathname === '/admin/cadAdmin/novo' ? 'bg-green-700 shadow-lg text-white scale-[0.98]' : 'hover:bg-green-700 text-green-100'}`}
                >
                  <span className="h-5 text-green-200 text-2xl"><FaRegUser /></span>
                  <span className="ms-2 mt-1">Novo Admin</span>
                </Link>
              </li>
            </>
          }
          <li>
            <span className="flex items-center p-2 cursor-pointer rounded-lg hover:bg-blue-800 text-blue-100">
              <span className="h-5 text-gray-200 text-2xl"><IoExitOutline /></span>
              <span className="ms-2 mt-1" onClick={() => {
                if (confirm("Confirma Saída?")) {
                  deslogaAdmin();
                  navigate("/", { replace: true });
                }
              }}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}