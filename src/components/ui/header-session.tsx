import { Home } from "lucide-react";

export default function Header() {
  return (
    <header className="p-5 flex flex-row gap-3 justify-between items-center">
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
      <span></span>
    </header>
  );
}
