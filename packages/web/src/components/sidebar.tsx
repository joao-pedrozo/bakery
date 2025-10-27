"use client";

import { cn } from "@/lib/utils";
import { Cake, Home, ShoppingBag, Heart, User, Settings } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Início", icon: Home, href: "#" },
  { name: "Produtos", icon: ShoppingBag, href: "#produtos" },
  { name: "Favoritos", icon: Heart, href: "#favoritos" },
  { name: "Perfil", icon: User, href: "#perfil" },
  { name: "Configurações", icon: Settings, href: "#config" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Produtos");

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-muted/30">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
          <Cake className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">Doce Encanto</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setActiveItem(item.name)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              activeItem === item.name
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Usuário
            </p>
            <p className="text-xs text-muted-foreground truncate">
              usuario@email.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
