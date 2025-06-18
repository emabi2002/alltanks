"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { mockOrdersData } from "@/lib/mockOrders";
import { getProducts } from "@/sanity/queries/getProducts";
import type { Product } from "@/types/Product";

export default function AdminDashboard() {
  const { state } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [orders, setOrders] = useState(mockOrdersData);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!state.isLoading) {
      if (!state.isAuthenticated) return router.push('/login');
      if (!isAdmin(state.user)) return router.push('/account');
    }
  }, [state, router]);

  useEffect(() => {
    async function fetchProducts() {
      const result = await getProducts();
      setProducts(result);
    }
    fetchProducts();
  }, []);

  if (state.isLoading) return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    </div>
  );

  if (!state.user || !isAdmin(state.user)) return null;

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

          {/* Overview, Orders, Products, Customers, Settings content should go here */}
        </Tabs>
      </div>
    </div>
  );
}
