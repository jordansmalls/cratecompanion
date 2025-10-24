// import { useAuthStore } from "../../store/authStore";
// import LogoutButton from "../buttons/LogoutButton";

// const Navbar = () => {

//     const user = useAuthStore((state) => state.user)

//     return (
//         <div className="flex justify-around lg:mx-[2rem] lg:my-[4rem] items-center">
//             <div>
//                 <span className="font-bold">Crate Companion</span>
//             </div>
//             <div className="flex items-center gap-4">
//                 <span>{user?.email}</span>
//                 <LogoutButton className={"w-[8rem]"} />
//             </div>
//         </div>
//      );
// }

// export default Navbar;

import LogoutButton from "../buttons/LogoutButton";
import { useAuthStore } from "../../store/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, User, Settings, List, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate()

  const handleImportTracklist = () => {
    navigate("/import-tracklist")
  };

  const handleSettings = () => {
    navigate("/settings")
  };

  return (
    <nav className="bg-primary text-white flex justify-between items-center px-6 py-4 lg:px-8">
      <div>
        <h1 className="text-xl font-bold">Crate Companion</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleImportTracklist}
          variant="secondary"
          className="gap-2 text-primary"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Tracklist</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">{user?.email}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleImportTracklist}>
              <List className="mr-2 h-4 w-4" />
              <span>View Tracklists</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton variant={"destructive"} className={"w-full"} text={`Logout`} ></LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;