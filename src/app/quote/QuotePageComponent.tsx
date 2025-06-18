"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ClientNavigation from "@/components/ClientNavigation";
import { sendQuoteReady, type QuoteNotificationData } from "@/lib/notifications";
import { Calculator, Truck, Shield, Clock, MapPin } from "lucide-react";

interface QuoteData {
  tankType: string;
  capacity: number;
  color: string;
  accessories: string[];
  quantity: number;
  deliveryLocation: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
  };
  specialRequirements: string;
}

const tankTypes = [
  { id: "water", name: "Water Storage Tank", basePrice: 480, description: "Standard water storage" },
  { id: "septic", name: "Septic Tank System", basePrice: 850, description: "Wastewater treatment" },
  { id: "chemical", name: "Chemical Storage Tank", basePrice: 1200, description: "Industrial chemical storage" },
  { id: "feed", name: "Feed Trough", basePrice: 180, description: "Livestock feeding" }
];

const capacityOptions = [
  { value: 500, multiplier: 0.6 },
  { value: 1000, multiplier: 0.8 },
  { value: 2500, multiplier: 1.0 },
  { value: 5000, multiplier: 1.4 },
  { value: 10000, multiplier: 2.1 },
  { value: 15000, multiplier: 2.8 },
  { value: 20000, multiplier: 3.4 }
];

const colorOptions = [
  { value: "blue", name: "Blue", surcharge: 0 },
  { value: "green", name: "Green", surcharge: 0 },
  { value: "black", name: "Black", surcharge: 0 },
  { value: "beige", name: "Beige", surcharge: 50 },
  { value: "custom", name: "Custom Color", surcharge: 200 }
];

const accessoryOptions = [
  { id: "inlet-kit", name: "Inlet Kit", price: 85 },
  { id: "outlet-kit", name: "Outlet Kit", price: 95 },
  { id: "overflow-kit", name: "Overflow Kit", price: 75 },
  { id: "tap-kit", name: "Tap & Valve Kit", price: 120 },
  { id: "gauge", name: "Level Gauge", price: 150 },
  { id: "cover", name: "Tank Cover", price: 180 }
];

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

export default function QuotePageComponent() {
  const [quoteData, setQuoteData] = useState<QuoteData>({
    tankType: "",
    capacity: 2500,
    color: "blue",
    accessories: [],
    quantity: 1,
    deliveryLocation: "",
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      company: "",
      address: ""
    },
    specialRequirements: ""
  });

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [showQuoteResult, setShowQuoteResult] = useState(false);

  const calculatePrice = useCallback(() => {
    if (!quoteData.tankType) return 0;

    const tankType = tankTypes.find(t => t.id === quoteData.tankType);
    if (!tankType) return 0;

    const capacity = capacityOptions.find(c => c.value === quoteData.capacity);
    if (!capacity) return 0;

    const basePrice = tankType.basePrice * capacity.multiplier;

    const colorSurcharge = colorOptions.find(c => c.value === quoteData.color)?.surcharge || 0;

    const accessoryTotal = quoteData.accessories.reduce((total, accessoryId) => {
      const accessory = accessoryOptions.find(a => a.id === accessoryId);
      return total + (accessory?.price || 0);
    }, 0);

    const shippingCost = provinces.find(p => p.value === quoteData.deliveryLocation)?.shippingCost || 0;

    const subtotal = (basePrice + colorSurcharge + accessoryTotal) * quoteData.quantity;

    return subtotal + shippingCost;
  }, [quoteData]);

  useEffect(() => {
    setCalculatedPrice(calculatePrice());
  }, [calculatePrice]);

  const handleAccessoryChange = (accessoryId: string, checked: boolean) => {
    setQuoteData(prev => ({
      ...prev,
      accessories: checked
        ? [...prev.accessories, accessoryId]
        : prev.accessories.filter(id => id !== accessoryId)
    }));
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate quote number
    const quoteNumber = `ATL-${Date.now().toString().slice(-6)}`;

    // Send quote ready notification
    try {
      const quoteNotificationData: QuoteNotificationData = {
        quoteNumber,
        customerName: quoteData.customerInfo.name,
        customerEmail: quoteData.customerInfo.email,
        quoteTotal: calculatedPrice,
        quoteDate: new Date().toLocaleDateString(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days from now
        items: [{
          name: tankTypes.find(t => t.id === quoteData.tankType)?.name || 'Tank',
          quantity: quoteData.quantity,
          color: quoteData.color,
          price: calculatedPrice
        }]
      };

      await sendQuoteReady(quoteNotificationData);
      console.log('📧 Quote ready email sent successfully');
    } catch (error) {
      console.error('Failed to send quote ready email:', error);
      // Don't block the quote process if email fails
    }

    setShowQuoteResult(true);
    // Here you would typically send the quote data to your backend
    console.log("Quote submitted:", quoteData, "Price:", calculatedPrice);
  };

  const isFormValid = () => {
    return quoteData.tankType &&
           quoteData.deliveryLocation &&
           quoteData.customerInfo.name &&
           quoteData.customerInfo.email &&
           quoteData.customerInfo.phone;
  };

  const formatPrice = (price: number) => {
    return `K${price.toLocaleString()}`;
  };

  if (showQuoteResult) {
    const selectedTankType = tankTypes.find(t => t.id === quoteData.tankType);
    const selectedProvince = provinces.find(p => p.value === quoteData.deliveryLocation);

    return (
      <div className="min-h-screen bg-gray-50">
        <ClientNavigation currentPage="quote" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <CardTitle className="text-2xl">Quote Request Submitted Successfully!</CardTitle>
              <CardDescription className="text-blue-100">
                Your quote reference: ATL-{Date.now().toString().slice(-6)}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quote Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tank Type:</span>
                      <span className="font-medium">{selectedTankType?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{quoteData.capacity.toLocaleString()}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium capitalize">{quoteData.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{quoteData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Location:</span>
                      <span className="font-medium">{selectedProvince?.name}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-600">Total Estimated Price</p>
                      <p className="text-3xl font-bold text-blue-600">{formatPrice(calculatedPrice)}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        *Price includes delivery to {selectedProvince?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">What happens next?</h4>
                </div>
                <ul className="mt-2 text-green-700 space-y-1">
                  <li>• Our tank expert will contact you within 2 business hours</li>
                  <li>• We'll confirm your requirements and finalize pricing</li>
                  <li>• Upon approval, we'll schedule production and delivery</li>
                  <li>• Professional installation can be arranged if needed</li>
                </ul>
              </div>

              <div className="mt-6 flex gap-4">
                <Button
                  onClick={() => setShowQuoteResult(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Request Another Quote
                </Button>
                <Button className="flex-1">
                  Contact Us Directly
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavigation currentPage="quote" />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Custom Quote</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Configure your tank requirements and get an instant price estimate
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmitQuote} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tank Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Tank Configuration
                </CardTitle>
                <CardDescription>Select your tank type and specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="tankType">Tank Type *</Label>
                  <Select value={quoteData.tankType} onValueChange={(value) =>
                    setQuoteData(prev => ({ ...prev, tankType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tank type" />
                    </SelectTrigger>
                    <SelectContent>
                      {tankTypes.map(tank => (
                        <SelectItem key={tank.id} value={tank.id}>
                          <div>
                            <div className="font-medium">{tank.name}</div>
                            <div className="text-sm text-gray-500">{tank.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity (Liters) *</Label>
                    <Select value={quoteData.capacity.toString()} onValueChange={(value) =>
                      setQuoteData(prev => ({ ...prev, capacity: Number.parseInt(value) }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {capacityOptions.map(option => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.value.toLocaleString()}L
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select value={quoteData.color} onValueChange={(value) =>
                      setQuoteData(prev => ({ ...prev, color: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(color => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{color.name}</span>
                              {color.surcharge > 0 && (
                                <Badge variant="secondary">+K{color.surcharge}</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Optional Accessories</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {accessoryOptions.map(accessory => (
                      <div key={accessory.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={accessory.id}
                          checked={quoteData.accessories.includes(accessory.id)}
                          onCheckedChange={(checked) =>
                            handleAccessoryChange(accessory.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={accessory.id} className="text-sm">
                          {accessory.name} (+K{accessory.price})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quoteData.quantity}
                    onChange={(e) => setQuoteData(prev => ({
                      ...prev,
                      quantity: Number.parseInt(e.target.value) || 1
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                  <Select value={quoteData.deliveryLocation} onValueChange={(value) =>
                    setQuoteData(prev => ({ ...prev, deliveryLocation: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(province => (
                        <SelectItem key={province.value} value={province.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{province.name}</span>
                            {province.shippingCost > 0 && (
                              <Badge variant="outline">+K{province.shippingCost} shipping</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      value={quoteData.customerInfo.name}
                      onChange={(e) => setQuoteData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, name: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="email"
                      value={quoteData.customerInfo.email}
                      onChange={(e) => setQuoteData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, email: e.target.value }
                      }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      value={quoteData.customerInfo.phone}
                      onChange={(e) => setQuoteData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, phone: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      value={quoteData.customerInfo.company}
                      onChange={(e) => setQuoteData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, company: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    value={quoteData.customerInfo.address}
                    onChange={(e) => setQuoteData(prev => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, address: e.target.value }
                    }))}
                    placeholder="Enter full delivery address..."
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    value={quoteData.specialRequirements}
                    onChange={(e) => setQuoteData(prev => ({
                      ...prev,
                      specialRequirements: e.target.value
                    }))}
                    placeholder="Any special requirements or modifications..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Calculator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Quote Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">Estimated Total</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {formatPrice(calculatedPrice)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      *Final price confirmed upon review
                    </p>
                  </div>

                  {quoteData.tankType && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tank Type:</span>
                        <span>{tankTypes.find(t => t.id === quoteData.tankType)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span>{quoteData.capacity.toLocaleString()}L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span>{quoteData.quantity}</span>
                      </div>
                      {quoteData.accessories.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Accessories:</span>
                          <span>{quoteData.accessories.length} items</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>2-hour response time</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Shield className="h-4 w-4" />
                      <span>10-year warranty included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>Professional delivery</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!isFormValid()}
                  >
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
