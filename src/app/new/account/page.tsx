"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "@uploadthing/react/styles.css";
import { CircleAlert, ScrollText, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UploadButton } from "../../../../utils/uploadthing";
import { useForm } from "react-hook-form";
import CreateUser from "@/components/db/createUser";
import { Toggle } from "@/components/ui/toggle";

export default function NewUser() {
  const [avatar, setAvatar] = useState<any>(
    "https://utfs.io/f/SHkctA3zZK7UNJJh7RPsirWFqgMZSXO8ta0lynz9TEYoj2Hv"
  );

  const [toggleStore, setToggleStore] = useState<boolean>(false);

  const handleToggle = () => {
    setToggleStore(!toggleStore);
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const formSubmit = async (data: any) => {
    if (!data.cpf) {
      return toast("CPF Inválido");
    }
    let a = await CreateUser(data);
    if (a) {
      toast(a.msg);
    }
  };

  return (
    <section className="p-10 h-screen w-screen bg-zinc-200 flex overflow-scroll justify-center items-center">
      <div>
        <form
          className="mt-10 flex flex-wrap flex-row gap-16 justify-center items-center"
          onSubmit={handleSubmit(formSubmit)}
        >
          <span className="flex flex-col gap-2 justify-center bg-zinc-300 w-fit p-8 rounded-lg shadow-md">
            <p className="font-bold text-lg flex items-center gap-1">
              <User strokeWidth={2.5} /> Usuário
            </p>
            <span>
              <Label htmlFor="cpf">CPF</Label>
              <Input {...register("cpf")} name="cpf" />
            </span>
            <span>
              <Label htmlFor="username">Nome Completo</Label>
              <Input {...register("username")} name="username" />
            </span>
            <span>
              <Label htmlFor="email">E-mail</Label>
              <Input {...register("email")} name="email" />
            </span>
            <span>
              <Label htmlFor="passwd">Senha</Label>
              <Input {...register("password")} name="passwd" type="password" />
            </span>
            <span>
              <Label htmlFor="passwdr">Confirme sua Senha</Label>
              <Input name="passwdr" type="password" />
            </span>
            <span className="flex flex-row gap-5 justify-center items-center">
              <UploadButton
                content={{
                  button: ({ ready, isUploading }) => {
                    if (!ready) return "Preparando...";
                    if (isUploading) return "Enviando...";
                    return "Enviar Avatar";
                  },
                  allowedContent: ({ ready, fileTypes, isUploading }) => {
                    if (!ready) return "";
                    if (isUploading) return "Enviando imagem...";
                    return `Arquivos até 4mb`;
                  },
                }}
                className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  toast("Avatar definido com sucesso.", {
                    icon: <CircleAlert size={18} />,
                  });
                  let url = res.shift();
                  setAvatar(url?.appUrl.toString());
                }}
                onUploadError={(error: Error) => {
                  alert(`${error}`);
                }}
              />
              <Avatar className="mb-3">
                <AvatarImage src={avatar} />
              </Avatar>
            </span>
            <Toggle onClick={handleToggle}>Conta PJ</Toggle>
            <input {...register("avatarurl")} value={avatar} hidden />
          </span>
          {toggleStore ? (
            <>
              <span className="flex flex-col gap-2 justify-center bg-zinc-300 w-fit p-8 rounded-lg shadow-md">
                <p className="font-bold text-lg flex items-center gap-1">
                  <ScrollText strokeWidth={2.5} /> Empresa
                </p>
                <span>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input {...register("cnpj")} name="cnpj" />
                </span>
                <span>
                  <Label htmlFor="cnpj">Nome Fantásia</Label>
                  <Input {...register("storeName")} name="storeName" />
                </span>
                <span>
                  <Label htmlFor="storeDescription">Descrição Curta</Label>
                  <Input
                    {...register("storeDescription")}
                    name="storeDescription"
                  />
                </span>
              </span>
            </>
          ) : (
            <></>
          )}

          <Button className="absolute bottom-8 right-8">Cadastrar</Button>
        </form>
      </div>
    </section>
  );
}
