import { Link } from "react-router-dom";
import { User, Building, Users, CreditCard, LogOut, Menu } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div
            className={`sidebar ${isOpen ? "open" : "closed"}`}
        >
            <div>
                <div className="flex items-center justify-between mb-6">
                    {isOpen && <h2 className="text-2xl font-bold text-red-600">ControlFitness Gym</h2>}
                    <button onClick={toggleSidebar} className="text-red-600 hover:text-red-800 focus:outline-none">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex flex-col space-y-4">
                    <Link to="/usuarios" className="sidebar-link">
                        <User className="w-5 h-5" />
                        {isOpen && <span className="ml-2">Usuarios</span>}
                    </Link>
                    <Link to="/sucursales" className="sidebar-link">
                        <Building className="w-5 h-5" />
                        {isOpen && <span className="ml-2">Sucursales</span>}
                    </Link>
                    <Link to="/socios" className="sidebar-link">
                        <Users className="w-5 h-5" />
                        {isOpen && <span className="ml-2">Socios</span>}
                    </Link>
                    <Link to="/membresias" className="sidebar-link">
                        <CreditCard className="w-5 h-5" />
                        {isOpen && <span className="ml-2">Membresías</span>}
                    </Link>
                </nav>
            </div>
            <button
                className="logout-button"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
            >
                <LogOut className="w-5 h-5" />
                {isOpen && <span>Cerrar sesion</span>}
            </button>
        </div>
    );
}