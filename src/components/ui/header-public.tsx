import { Button } from "./button";

export default function HeaderPublic() {
  return (
    <header
      className="
    flex gap-3 dark:bg-gray-700 bg-zinc-200
    shadow-2xl w-full h-full p-3 justify-between
    "
    >
      <span className="flex items-center ml-5 gap-3">
        <h6 className="left-5 font-black font-mono text-xl mr-10">StackFlex</h6>
        <Button variant="link"> Preços </Button>
        <Button variant="link"> Funcionalidades </Button>
      </span>

      <span className="flex items-center gap-3">
        <Button variant="ghost">Abra sua conta</Button>
        <Button variant="secondary">Área do Cliente</Button>
      </span>
    </header>
  );
}
