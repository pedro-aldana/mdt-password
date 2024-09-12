import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SidebarRoutes from '../SidebarRoutes/SidebarRoutes'
import { Button } from "@/components/ui/button"

export default function SidebarMobile() {
  return (
    <Sheet>
  <SheetTrigger asChild>
    <Button>
        <Menu size={24} />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="bg-gray-700 text-white">
    <SheetHeader className="text-left mb-5">
      <SheetTitle className="text-white">MDTPassword</SheetTitle>
      <SheetDescription className="text-slate-100">
        Crea y maneja tus contraseñas
      </SheetDescription>
    </SheetHeader>
    <SidebarRoutes/>
  </SheetContent>
</Sheet>
  )
}
