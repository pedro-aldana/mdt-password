
import Link from "next/link";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";



export default function Sidebar() {
  return (
    <>

        <div className="py-6">
        <Link href="/">
            <h1 className="text-xl font-bold">
                MDTPassword
            </h1>
        </Link>
        </div>
        <SidebarRoutes/>
    
    </>
  )
}
