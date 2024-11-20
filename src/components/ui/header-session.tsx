import { Avatar, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Header({ session }) {
  function greets() {
    const n = new Date();
    const h = n.getHours();

    if (h >= 6 && h < 12) {
      return `Bom dia ${session.user.name}`;
    } else if (h >= 12 && h < 18) {
      return `Boa tarde ${session.user.name}`;
    } else {
      return `Boa noite ${session.user.name}`;
    }
  }

  if (session) {
    return (
      <header className="p-5 flex h-[60px] flex-row gap-3 justify-between items-center">
        <h4 className="relative left-4 font-black text-pretty text-lg">
          StackFlex
        </h4>
        <span>
          <ul className="flex list-none flex-row gap-5 justify-between">
            <li className="flex gap-1 items-center">Dashboard</li>
            <li className="flex gap-1 items-center">ERP</li>
            <li className="flex gap-1 items-center">Dashboard</li>
          </ul>
        </span>
        <span className="">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user.image} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Pagamentos</DropdownMenuItem>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuração</DropdownMenuItem>
              <Link href="/auth/signout">
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </header>
    );
  }
}
