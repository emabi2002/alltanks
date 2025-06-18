"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useAuth, getUserDisplayName, isAdmin } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import {
  User,
  Package,
  FileText,
  Settings,
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  Star,
  BarChart3,
  Users,
  Shield,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock order data
const mockOrders = [
  {
    id: "ATL-23456789",
    date: "2024-12-10",
    status: "delivered",
    total: 5850,
    items: [
      { name: "5000L Water Storage Tank", quantity: 2, color: "Blue" }
    ]
  },
  {
    id: "ATL-12345678",
    date: "2024-11-28",
    status: "in-production",
    total: 3200,
    items: [
      { name: "3000L Septic Tank System", quantity: 1, color: "Green" }
    ]
  }
];

const mockQuotes = [
  {
    id: "ATL-987654",
    date: "2024-12-15",
    status: "pending",
    total: 12500,
    items: [
      { name: "10000L Industrial Water Tank", quantity: 3, color: "Black" }
    ]
  }
];

export default function AccountPage() {
  const { state, logout } = useAuth();
  const { state: cartState, formatPrice } = useCart();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!state.user) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'delivered': 'default',
      'in-production': 'secondary',
      'pending': 'outline',
      'cancelled': 'destructive'
    } as const;

    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status.replace('-', ' ')}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {getUserDisplayName(state.user)}!
          </h1>
          <p className="text-gray-600">
            Manage your orders, quotes, and account settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                  <p className="text-2xl font-bold text-orange-600">1</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cart Items</p>
                  <p className="text-2xl font-bold text-green-600">{cartState.totalItems}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Account Type</p>
                  <p className="text-lg font-bold text-purple-600 capitalize">{state.user.role}</p>
                </div>
                {isAdmin(state.user) ? (
                  <Shield className="h-8 w-8 text-purple-600" />
                ) : (
                  <User className="h-8 w-8 text-purple-600" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Panel Access */}
        {isAdmin(state.user) && (
          <Card className="mb-8 border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">Admin Access</h3>
                  <p className="text-purple-700">Manage orders, inventory, and system settings</p>
                </div>
                <Button asChild>
                  <Link href="/admin">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Your Orders
                </CardTitle>
                <CardDescription>
                  Track and manage your tank orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(order.status)}
                            <p className="text-lg font-semibold text-blue-600 mt-1">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={`${order.id}-${item.name}-${item.color}`} className="flex justify-between text-sm">
                              <span>{item.name} ({item.color})</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-3 pt-3 border-t">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              <Star className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                          )}
                          {order.status === 'in-production' && (
                            <Button variant="outline" size="sm">
                              <Truck className="h-3 w-3 mr-1" />
                              Track
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">Start shopping for premium tank solutions</p>
                    <Button asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Quotes
                </CardTitle>
                <CardDescription>
                  Review and manage your quote requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockQuotes.length > 0 ? (
                  <div className="space-y-4">
                    {mockQuotes.map(quote => (
                      <div key={quote.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">Quote #{quote.id}</h3>
                            <p className="text-sm text-gray-500">Requested on {new Date(quote.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(quote.status)}
                            <p className="text-lg font-semibold text-blue-600 mt-1">
                              {formatPrice(quote.total)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {quote.items.map((item) => (
                            <div key={`${quote.id}-${item.name}-${item.color}`} className="flex justify-between text-sm">
                              <span>{item.name} ({item.color})</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-3 pt-3 border-t">
                          <Button size="sm">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Accept Quote
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotes yet</h3>
                    <p className="text-gray-500 mb-4">Request a custom quote for your tank requirements</p>
                    <Button asChild>
                      <Link href="/quote">Get Quote</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  View and update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 text-gray-900">{state.user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 text-gray-900">{state.user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{state.user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-gray-900">{state.user.phone || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <p className="mt-1 text-gray-900">{state.user.company || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-gray-900">{state.user.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates about your orders and quotes</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Get delivery updates via SMS</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-gray-500">Change your account password</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>

                  <div className="pt-6 border-t">
                    <Button variant="destructive" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
