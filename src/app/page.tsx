import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Truck, Clock, Star, CheckCircle, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClientNavigation from "@/components/ClientNavigation";

export default function HomePage() {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "UV-Stabilized HDPE",
      description: "Built to withstand harsh tropical conditions and UV exposure"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Custom Sizes Available",
      description: "Tailored solutions from 100L to 50,000L capacity"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "10-Year Warranty",
      description: "Manufacturer guarantee on all our premium tanks"
    },
    {
      icon: <Truck className="h-8 w-8 text-purple-600" />,
      title: "Delivered Nationwide",
      description: "Professional delivery and installation services"
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Built for Cyclones",
      description: "Engineered to withstand extreme weather conditions"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "ISO Certified",
      description: "Meeting international quality standards"
    }
  ];

  const testimonials = [
    {
      name: "John A.",
      company: "Ramu AgriDev",
      product: "5000L Water Storage Tank",
      review: "We've used All Tanks Limited for our rural development project. The durability is unmatched.",
      rating: 5
    },
    {
      name: "Sarah M.",
      company: "Pacific Resources Ltd",
      product: "Industrial Chemical Tank",
      review: "Excellent build quality and professional installation. Highly recommended.",
      rating: 5
    },
    {
      name: "Michael K.",
      company: "Highland Farms",
      product: "Custom Feed Trough",
      review: "Perfect solution for our livestock operation. Built to last in harsh conditions.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <ClientNavigation currentPage="home" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-800">
                Leading Manufacturer Since 1995
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Built to Last.
                <br />
                <span className="text-blue-300">Engineered for the Tropics.</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Premium polyethylene water tanks and industrial solutions for every environment.
                Trusted by thousands across Papua New Guinea and the Pacific.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/quote">Get a Free Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-900">
                  <Link href="/products">Shop Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png"
                  alt="Premium Water Tank"
                  className="w-full max-w-md mx-auto h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-300 rounded-full opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose All Tanks Limited?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're the trusted choice for durable, high-quality polyethylene tanks across the Pacific region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Best Selling Products
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular tank solutions for residential and commercial use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <img
                  src="https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png"
                  alt="5000L Water Tank"
                  className="h-32 w-auto"
                />
                <Badge className="absolute top-4 right-4 bg-orange-500">Best Seller</Badge>
              </div>
              <CardHeader>
                <CardTitle>5000L Water Storage Tank</CardTitle>
                <CardDescription>Perfect for residential homes and small businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-600">K2,850</p>
                  <p className="text-sm text-gray-500">Starting price, delivered</p>
                  <Button className="w-full mt-4">Get Quote</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <img
                  src="https://ugc.same-assets.com/JmhlAMTC_QyeGmMxD8hHuXgK8xCj5n4Q.png"
                  alt="10000L Industrial Tank"
                  className="h-32 w-auto"
                />
              </div>
              <CardHeader>
                <CardTitle>10000L Industrial Tank</CardTitle>
                <CardDescription>Heavy-duty solution for commercial operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-600">K4,950</p>
                  <p className="text-sm text-gray-500">Starting price, delivered</p>
                  <Button className="w-full mt-4">Get Quote</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <img
                  src="https://ugc.same-assets.com/3pJyRT84KSMujzQ35LvY3qVBK3fuPftm.png"
                  alt="Septic Tank System"
                  className="h-32 w-auto"
                />
              </div>
              <CardHeader>
                <CardTitle>Septic Tank Systems</CardTitle>
                <CardDescription>Complete wastewater treatment solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-600">K3,200</p>
                  <p className="text-sm text-gray-500">Starting price, installed</p>
                  <Button className="w-full mt-4">Get Quote</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by businesses and homeowners across the Pacific
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`star-${testimonial.name}-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                    <p className="text-sm text-blue-600">{testimonial.product}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your tank requirements or speak with one of our tank experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/quote">Request a Custom Tank</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/contact">Speak to a Tank Expert</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">All Tanks Limited</h3>
              <p className="text-gray-400 mb-4">
                Leading manufacturer of premium polyethylene tanks in Papua New Guinea.
              </p>
              <p className="text-gray-400">
                Built to last. Engineered for the tropics.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products/water-tanks" className="hover:text-white">Water Tanks</Link></li>
                <li><Link href="/products/septic-tanks" className="hover:text-white">Septic Tanks</Link></li>
                <li><Link href="/products/chemical-tanks" className="hover:text-white">Chemical Tanks</Link></li>
                <li><Link href="/products/accessories" className="hover:text-white">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/quote" className="hover:text-white">Get Quote</Link></li>
                <li><Link href="/order" className="hover:text-white">Place Order</Link></li>
                <li><Link href="/installation" className="hover:text-white">Installation</Link></li>
                <li><Link href="/maintenance" className="hover:text-white">Maintenance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Port Moresby, PNG</li>
                <li>Phone: +675 XXX XXXX</li>
                <li>Email: info@alltanks.com.pg</li>
                <li>Mon-Fri: 8AM-5PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 All Tanks Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
