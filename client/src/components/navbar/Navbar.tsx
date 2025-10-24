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
import { Plus, User, Settings, List } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

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
        <Link to={"/dashboard"}><h1 className="text-xl font-bold tracking-tight">Crate Companion</h1></Link>
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