import { Outlet } from "react-router";
import Navbar from "../components/nav/Navbar";
export default function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}