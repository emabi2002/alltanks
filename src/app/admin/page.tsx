"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3, Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye, Edit, Trash2,
  Plus, Search, Download, Settings, AlertTriangle, CheckCircle, Clock, Truck
} from "lucide-react";
import { useAuth, isAdmin } from "@/lib/auth";
import { sendOrderStatusUpdate, type OrderNotificationData } from "@/lib/notifications";
import { mockOrdersData } from "@/lib/mockOrders";
import { getProducts } from "@/sanity/queries/getProducts";
import type { Product } from "@/types/Product";
import { exportOrdersToCSV } from "@/utils/exportToCSV";

export default function AdminDashboard() {
  const { state } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [orders, setOrders] = useState(mockOrdersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    if (!state.isLoading) {
      if (!state.isAuthenticated) return router.push('/login');
      if (!isAdmin(state.user)) return router.push('/account');
    }
  }, [state, router]);

  useEffect(() => {
    async function loadProducts() {
      const res = await getProducts();
      setProducts(res);
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter ? product.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const matchesStock = stockFilter === "all" || (stockFilter === "in" && product.inStock) || (stockFilter === "out" && !product.inStock);
    return matchesCategory && matchesStock;
  });

  const formatPrice = (price: number) => `K${price.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const variants = {
      'delivered': { variant: 'default', icon: CheckCircle },
      'in-production': { variant: 'secondary', icon: Clock },
      'pending': { variant: 'outline', icon: AlertTriangle },
      'cancelled': { variant: 'destructive', icon: Trash2 }
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      const orderNotificationData: OrderNotificationData = {
        orderNumber: order.id,
        customerName: order.customer,
        customerEmail: order.email,
        orderTotal: order.total,
        orderDate: order.date,
        orderStatus: newStatus,
        items: order.items,
        shippingAddress: order.shipping.address,
        estimatedDelivery: newStatus === 'in-production' ?
          new Date(Date.now() + 14 * 86400000).toLocaleDateString() : undefined
      };
      await sendOrderStatusUpdate(orderNotificationData);
    } catch (err) {
      console.error("Email error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-6">Manage orders, products, and settings</p>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Input
                placeholder="Filter by category..."
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-60"
              />
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="in">In Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => exportOrdersToCSV(products)}>Export CSV</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Filtered and dynamic stock overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product._id} className="border rounded-lg p-4">
                      <div className="relative mb-4">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-32 object-contain bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <p className="text-lg font-bold text-blue-600 mb-3">{formatPrice(product.price)}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{product.capacity}L</span>
                        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
