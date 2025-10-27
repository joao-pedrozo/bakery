"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { CartDrawer } from "@/components/cart-drawer";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const router = useRouter();

  const subtotal = items.reduce((sum, item) => {
    const price = Number.parseFloat(
      item.price.replace("R$", "").replace(",", ".").trim()
    );
    return sum + price * item.quantity;
  }, 0);

  const delivery = 8.5;
  const total = subtotal + delivery;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">Meu Carrinho</h1>
            </div>

            {items.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-muted/30 rounded-full p-8 mb-6">
                  <ShoppingBag className="h-24 w-24 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Seu carrinho está vazio
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Parece que você ainda não adicionou nenhum produto ao
                  carrinho. Explore nossos deliciosos doces!
                </p>
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={() => router.push("/")}
                >
                  Explorar Produtos
                </Button>
              </div>
            ) : (
              /* Cart with items */
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-primary font-bold text-xl mt-1">
                              {item.price}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 rounded-full bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-semibold w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 rounded-full bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
                    <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Entrega</span>
                        <span>R$ {delivery.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span className="text-primary">
                            R$ {total.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="coupon" className="text-sm font-medium">
                          Cupom de desconto
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="coupon"
                            placeholder="Digite o cupom"
                            className="rounded-full"
                          />
                          <Button
                            variant="outline"
                            className="rounded-full bg-transparent"
                          >
                            Aplicar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button size="lg" className="w-full rounded-full mb-3">
                      Finalizar Compra
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full rounded-full bg-transparent"
                      onClick={() => router.push("/")}
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <CartDrawer />
    </div>
  );
}
