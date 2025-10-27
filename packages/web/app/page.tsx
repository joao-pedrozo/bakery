"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

const products = [
  {
    id: 1,
    name: "Cupcakes Artesanais",
    description: "Cupcakes fofos com coberturas cremosas",
    price: "R$ 12,00",
    image: "/pastel-cupcake-with-frosting.jpg",
    badge: "Mais Vendido",
    category: "Cupcakes",
  },
  {
    id: 2,
    name: "Macarons Franceses",
    description: "Delicados macarons em sabores variados",
    price: "R$ 8,00",
    image: "/colorful-french-macarons.png",
    badge: "Novidade",
    category: "Macarons",
  },
  {
    id: 3,
    name: "Brownies Gourmet",
    description: "Brownies úmidos e intensos de chocolate",
    price: "R$ 15,00",
    image: "/gourmet-chocolate-brownie.jpg",
    badge: null,
    category: "Brownies",
  },
  {
    id: 4,
    name: "Cookies Recheados",
    description: "Cookies crocantes com recheios especiais",
    price: "R$ 10,00",
    image: "/stuffed-cookies-pastel.jpg",
    badge: null,
    category: "Cookies",
  },
  {
    id: 5,
    name: "Bolos Personalizados",
    description: "Bolos sob medida para sua celebração",
    price: "Sob consulta",
    image: "/decorated-birthday-cake-pastel.jpg",
    badge: "Personalizado",
    category: "Bolos",
  },
  {
    id: 6,
    name: "Docinhos de Festa",
    description: "Brigadeiros, beijinhos e cajuzinhos",
    price: "R$ 3,50",
    image: "/brazilian-brigadeiro-sweets.jpg",
    badge: null,
    category: "Docinhos",
  },
  {
    id: 7,
    name: "Torta de Limão",
    description: "Torta cremosa com merengue suíço",
    price: "R$ 45,00",
    image: "/lemon-meringue-pie-pastel.jpg",
    badge: null,
    category: "Tortas",
  },
  {
    id: 8,
    name: "Cheesecake de Frutas",
    description: "Cheesecake cremoso com frutas vermelhas",
    price: "R$ 38,00",
    image: "/fruit-cheesecake-pastel.jpg",
    badge: null,
    category: "Tortas",
  },
];

const categories = [
  "Todos",
  "Cupcakes",
  "Macarons",
  "Brownies",
  "Cookies",
  "Bolos",
  "Docinhos",
  "Tortas",
];

export default function Default() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addItem, toggleCart } = useCartStore();

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toggleCart();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg group"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-3 right-3 rounded-full"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    favorites.includes(product.id)
                      ? "fill-primary text-primary"
                      : ""
                  }`}
                />
              </Button>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-foreground line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-primary">{product.price}</span>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
