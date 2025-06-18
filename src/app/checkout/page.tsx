"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { useCart, getCartItemDisplayInfo } from "@/lib/cart";
import { companyConfig } from "@/lib/config";
import { sendOrderConfirmation, type OrderNotificationData } from "@/lib/notifications";
import {
  CreditCard,
  Truck,
  Shield,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Package,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

interface CheckoutForm {
  // Customer Information
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;

  // Shipping Address
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;

  // Payment Information
  paymentMethod: string;

  // Special Instructions
  deliveryInstructions: string;
  installationRequired: boolean;

  // Contact Preferences
  smsUpdates: boolean;
  emailUpdates: boolean;
}

const provinces = [
  { value: "ncd", name: "National Capital District", shippingCost: 0 },
  { value: "western", name: "Western Province", shippingCost: 250 },
  { value: "gulf", name: "Gulf Province", shippingCost: 300 },
  { value: "central", name: "Central Province", shippingCost: 150 },
  { value: "milne-bay", name: "Milne Bay Province", shippingCost: 350 },
  { value: "northern", name: "Oro (Northern) Province", shippingCost: 280 },
  { value: "southern-highlands", name: "Southern Highlands Province", shippingCost: 200 },
  { value: "western-highlands", name: "Western Highlands Province", shippingCost: 220 },
  { value: "enga", name: "Enga Province", shippingCost: 240 },
  { value: "chimbu", name: "Chimbu Province", shippingCost: 200 },
  { value: "eastern-highlands", name: "Eastern Highlands Province", shippingCost: 210 },
  { value: "morobe", name: "Morobe Province", shippingCost: 180 },
  { value: "madang", name: "Madang Province", shippingCost: 190 },
  { value: "east-sepik", name: "East Sepik Province", shippingCost: 320 },
  { value: "west-sepik", name: "West Sepik Province", shippingCost: 350 },
  { value: "manus", name: "Manus Province", shippingCost: 400 },
  { value: "new-ireland", name: "New Ireland Province", shippingCost: 380 },
  { value: "east-new-britain", name: "East New Britain Province", shippingCost: 360 },
  { value: "west-new-britain", name: "West New Britain Province", shippingCost: 340 }
];

const paymentMethods = [
  { value: "bank-transfer", name: "Bank Transfer", description: "Pay via bank transfer (invoice will be sent)" },
  { value: "pay-on-delivery", name: "Pay on Delivery", description: "Cash payment upon delivery" },
  { value: "company-account", name: "Company Account", description: "30-day payment terms (approved customers)" }
];

export default function CheckoutPage() {
  const { state, formatPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Papua New Guinea",
    paymentMethod: "",
    deliveryInstructions: "",
    installationRequired: false,
    smsUpdates: true,
    emailUpdates: true,
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0 && !orderPlaced) {
      window.location.href = '/products';
    }
  }, [state.items.length, orderPlaced]);

  // Calculate shipping cost when province changes
  useEffect(() => {
    if (formData.province) {
      const selectedProvince = provinces.find(p => p.value === formData.province);
      setShippingCost(selectedProvince?.shippingCost || 0);
    }
  }, [formData.province]);

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateInstallationCost = () => {
    if (!formData.installationRequired) return 0;
    return state.items.reduce((total, item) => {
      // Base installation cost per tank
      return total + (item.quantity * 150);
    }, 0);
  };

  const totalBeforeShipping = state.totalPrice;
  const installationCost = calculateInstallationCost();
  const totalCost = totalBeforeShipping + shippingCost + installationCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrderNumber = `ATL-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);

    // Send order confirmation email
    try {
      const orderNotificationData: OrderNotificationData = {
        orderNumber: newOrderNumber,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        orderTotal: totalCost,
        orderDate: new Date().toLocaleDateString(),
        orderStatus: "confirmed",
        items: state.items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          color: item.selectedColor,
          price: item.product.price
        })),
        shippingAddress: `${formData.address}, ${formData.city}, ${provinces.find(p => p.value === formData.province)?.name}, ${formData.country}`
      };

      await sendOrderConfirmation(orderNotificationData);
      console.log('📧 Order confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
      // Don't block the order process if email fails
    }

    setOrderPlaced(true);
    setIsSubmitting(false);

    // Clear cart after successful order
    clearCart();
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.province &&
      formData.paymentMethod
    );
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 text-white text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
              <CardDescription className="text-green-100">
                Thank you for your order with All Tanks Limited
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Order Number</h3>
                  <p className="text-3xl font-bold text-blue-600">{orderNumber}</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                  <h4 className="font-semibold text-blue-800 mb-3">What happens next?</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Order confirmation email sent to {formData.email}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Our team will contact you within 2 business hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Production will begin after payment confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Delivery scheduled for your specified location</span>
                    </li>
                    {formData.installationRequired && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>Professional installation team will be arranged</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button asChild variant="outline">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                  <Button asChild>
                    <a href={`tel:${companyConfig.contact.phone}`}>Contact Us</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your order for premium tank solutions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+675 ..."
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address, building name, etc."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City/Town *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <Select
                        value={formData.province}
                        onValueChange={(value) => handleInputChange("province", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map(province => (
                            <SelectItem key={province.value} value={province.value}>
                              {province.name}
                              {province.shippingCost > 0 && (
                                <span className="text-gray-500"> (+K{province.shippingCost} shipping)</span>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map(method => (
                    <div key={method.value} className="flex items-start space-x-3">
                      <Checkbox
                        id={method.value}
                        checked={formData.paymentMethod === method.value}
                        onCheckedChange={(checked) => {
                          if (checked) handleInputChange("paymentMethod", method.value);
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={method.value} className="font-medium">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Additional Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="installation"
                      checked={formData.installationRequired}
                      onCheckedChange={(checked) => handleInputChange("installationRequired", checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="installation" className="font-medium">
                        Professional Installation (+K150 per tank)
                      </Label>
                      <p className="text-sm text-gray-500">
                        Our certified technicians will install your tank including site preparation and connections
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
                    <Textarea
                      id="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={(e) => handleInputChange("deliveryInstructions", e.target.value)}
                      placeholder="Any special delivery instructions, access requirements, or preferred delivery times..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Communication Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Communication Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="smsUpdates"
                      checked={formData.smsUpdates}
                      onCheckedChange={(checked) => handleInputChange("smsUpdates", checked as boolean)}
                    />
                    <Label htmlFor="smsUpdates">Receive SMS updates about your order</Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="emailUpdates"
                      checked={formData.emailUpdates}
                      onCheckedChange={(checked) => handleInputChange("emailUpdates", checked as boolean)}
                    />
                    <Label htmlFor="emailUpdates">Receive email updates and delivery notifications</Label>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {state.items.map(item => {
                    const itemInfo = getCartItemDisplayInfo(item);
                    return (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          <p className="text-xs text-gray-500">
                            {item.product.capacity.toLocaleString()}L • {item.selectedColor} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(itemInfo.totalPrice)}</span>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                {/* Cost Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalBeforeShipping)}</span>
                  </div>

                  {shippingCost > 0 && (
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatPrice(shippingCost)}</span>
                    </div>
                  )}

                  {installationCost > 0 && (
                    <div className="flex justify-between">
                      <span>Installation</span>
                      <span>{formatPrice(installationCost)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(totalCost)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>10-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Professional delivery service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Order...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Place Order
                    </span>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our terms of service and privacy policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
