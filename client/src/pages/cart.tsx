import { useCartStore } from "@/lib/cart-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard, Receipt, Utensils } from "lucide-react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertOrder } from "@shared/schema";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  customerAddress: z.string().min(10, "Address must be at least 10 characters"),
  specialInstructions: z.string().optional(),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Invalid card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(4, "CVV must be 3-4 digits"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getTax,
    getDeliveryFee,
    getTotal,
  } = useCartStore();

  const { toast } = useToast();

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      specialInstructions: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: InsertOrder) => {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Your order has been placed!",
        description: "Payment processed successfully. We'll start preparing your food right away.",
      });
      clearCart();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      console.error("Order error:", error);
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    const orderData: InsertOrder = {
      ...data,
      items: JSON.stringify(items),
      subtotal: getSubtotal().toFixed(2),
      tax: getTax().toFixed(2),
      deliveryFee: getDeliveryFee().toFixed(2),
      total: getTotal().toFixed(2),
      status: "pending",
    };

    createOrderMutation.mutate(orderData);
  };

  const subtotal = getSubtotal();
  const tax = getTax();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-soft-cream to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Cart
            </h1>
          </div>

          <Card className="card-premium text-center py-16">
            <CardContent>
              <div className="bg-gradient-to-r from-deep-orange to-rich-red text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <ShoppingCart className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Your cart is empty
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Add some delicious items from our menu to get started
              </p>
              <Link href="/menu">
                <Button 
                  className="btn-premium btn-primary text-lg px-8 py-4 rounded-full shadow-xl"
                  data-testid="button-browse-menu"
                >
                  <Utensils className="mr-3 h-6 w-6" />
                  Browse Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-cream to-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Review your order and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="card-premium shadow-xl">
              <CardHeader className="bg-gradient-to-r from-deep-orange to-rich-red text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center">
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  Order Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                        index === items.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                      data-testid={`cart-item-${item.id}`}
                    >
                      <div className="flex items-center space-x-6">
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                          />
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-grow min-w-0">
                          <h4 className="text-lg font-bold text-gray-900 mb-1" data-testid={`text-cart-item-name-${item.id}`}>
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2" data-testid={`text-cart-item-description-${item.id}`}>
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold text-deep-orange" data-testid={`text-cart-item-price-${item.id}`}>
                              ${parseFloat(item.price).toFixed(2)}
                            </p>
                            <p className="text-base font-semibold text-gray-700">
                              ${(parseFloat(item.price) * item.quantity).toFixed(2)} total
                            </p>
                          </div>
                        </div>
                        
                        {/* Quantity & Remove Controls */}
                        <div className="flex flex-col items-end space-y-4">
                          <div className="flex items-center bg-soft-cream rounded-full p-2 shadow-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 p-0 rounded-full hover:bg-deep-orange hover:text-white transition-all duration-300"
                              data-testid={`button-decrease-quantity-${item.id}`}
                            >
                              <Minus className="h-5 w-5" />
                            </Button>
                            <span 
                              className="w-14 text-center font-bold text-gray-800 text-lg"
                              data-testid={`text-cart-item-quantity-${item.id}`}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 p-0 rounded-full hover:bg-deep-orange hover:text-white transition-all duration-300"
                              data-testid={`button-increase-quantity-${item.id}`}
                            >
                              <Plus className="h-5 w-5" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-rich-red hover:text-white hover:bg-rich-red rounded-full p-3 shadow-md transition-all duration-300 hover:scale-110"
                            data-testid={`button-remove-item-${item.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <Card className="card-premium sticky top-24 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-deep-orange to-rich-red text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center">
                  <Receipt className="mr-3 h-7 w-7" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Order Total */}
                <div className="bg-gradient-to-r from-soft-cream to-accent-cream rounded-xl p-6 mb-8 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-700 text-lg">
                      <span className="font-semibold">Subtotal:</span>
                      <span className="font-bold" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-lg">
                      <span className="font-semibold">Delivery Fee:</span>
                      <span className="font-bold" data-testid="text-delivery-fee">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-lg">
                      <span className="font-semibold">Tax:</span>
                      <span className="font-bold" data-testid="text-tax">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-gray-300" />
                  
                  <div className="flex justify-between text-3xl font-bold text-deep-orange">
                    <span>Total:</span>
                    <span data-testid="text-total">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <div className="mb-8">
                  <Button
                    className="w-full btn-premium btn-primary text-xl py-6 rounded-full shadow-2xl"
                    data-testid="button-proceed-to-checkout"
                  >
                    <CreditCard className="mr-3 h-6 w-6" />
                    Proceed to Checkout
                  </Button>
                </div>

                {/* Checkout Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-warm-orange" />
                        Delivery Information
                      </h3>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="customerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your full name" 
                                  {...field} 
                                  className="border-gray-300 focus:border-warm-orange focus:ring-warm-orange"
                                  data-testid="input-customer-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(555) 123-4567" 
                                  {...field}
                                  className="border-gray-300 focus:border-warm-orange focus:ring-warm-orange"
                                  data-testid="input-customer-phone"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Delivery Address</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter your complete delivery address"
                                  rows={3}
                                  {...field}
                                  className="border-gray-300 focus:border-warm-orange focus:ring-warm-orange resize-none"
                                  data-testid="input-customer-address"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialInstructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Special Instructions (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any special delivery instructions..."
                                  rows={2}
                                  {...field}
                                  className="border-gray-300 focus:border-warm-orange focus:ring-warm-orange resize-none"
                                  data-testid="input-special-instructions"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Payment Information Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-deep-orange" />
                        Payment Information
                      </h3>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Card Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="1234 5678 9012 3456" 
                                  {...field}
                                  maxLength={19}
                                  onChange={(e) => {
                                    // Format card number with spaces
                                    const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                    field.onChange(value);
                                  }}
                                  className="border-gray-300 focus:border-deep-orange focus:ring-deep-orange"
                                  data-testid="input-card-number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold">Expiry Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="MM/YY" 
                                    {...field}
                                    maxLength={5}
                                    onChange={(e) => {
                                      // Format expiry date with slash
                                      const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                                      field.onChange(value);
                                    }}
                                    className="border-gray-300 focus:border-deep-orange focus:ring-deep-orange"
                                    data-testid="input-expiry-date"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold">CVV</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="123" 
                                    {...field}
                                    maxLength={4}
                                    type="password"
                                    onChange={(e) => {
                                      // Only allow numbers
                                      const value = e.target.value.replace(/\D/g, '');
                                      field.onChange(value);
                                    }}
                                    className="border-gray-300 focus:border-deep-orange focus:ring-deep-orange"
                                    data-testid="input-cvv"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                          <p className="text-sm text-blue-800">
                            🔒 This is a demo payment form. No real payment processing occurs.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                      disabled={createOrderMutation.isPending}
                      data-testid="button-place-order"
                    >
                      {createOrderMutation.isPending ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-5 w-5" />
                          Pay & Place Order - ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
