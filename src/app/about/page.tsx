import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata('about');

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ClientNavigation from "@/components/ClientNavigation";
import { Factory, Shield, Award, Users, Globe, Truck, Calendar, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const milestones = [
    { year: "1995", title: "Company Founded", description: "All Tanks Limited established in Port Moresby" },
    { year: "2000", title: "First Major Contract", description: "Supplied tanks for mining operation in Western Province" },
    { year: "2005", title: "ISO Certification", description: "Achieved ISO 9001 quality management certification" },
    { year: "2010", title: "Facility Expansion", description: "Doubled manufacturing capacity with new equipment" },
    { year: "2015", title: "Product Innovation", description: "Introduced UV-stabilized tank technology" },
    { year: "2020", title: "Digital Transformation", description: "Launched online ordering and quote system" },
    { year: "2024", title: "Market Leadership", description: "Leading tank manufacturer in Papua New Guinea" }
  ];

  const certifications = [
    { name: "ISO 9001", description: "Quality Management Systems", icon: <Award className="h-6 w-6" /> },
    { name: "ISO 14001", description: "Environmental Management", icon: <Globe className="h-6 w-6" /> },
    { name: "OHSAS 18001", description: "Occupational Health & Safety", icon: <Shield className="h-6 w-6" /> },
    { name: "PNG Standards", description: "Local Compliance Certification", icon: <Target className="h-6 w-6" /> }
  ];

  const features = [
    {
      icon: <Factory className="h-8 w-8 text-blue-600" />,
      title: "State-of-the-Art Manufacturing",
      description: "Modern rotational molding equipment with precision temperature control and quality monitoring systems."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Assurance",
      description: "Rigorous testing procedures including pressure testing, UV exposure testing, and material quality checks."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Expert Team",
      description: "Experienced engineers and technicians with decades of polyethylene manufacturing expertise."
    },
    {
      icon: <Truck className="h-8 w-8 text-purple-600" />,
      title: "Nationwide Delivery",
      description: "Professional delivery and installation services to all provinces across Papua New Guinea."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavigation currentPage="about" />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About All Tanks Limited</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Nearly three decades of excellence in polyethylene tank manufacturing
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 1995, All Tanks Limited has grown from a small local manufacturer to become
                Papua New Guinea's leading provider of premium polyethylene storage solutions. Our journey
                began with a simple mission: to provide durable, high-quality tanks that can withstand
                the unique challenges of tropical environments.
              </p>
              <p>
                Over nearly three decades, we have continuously innovated and expanded our capabilities,
                always staying true to our core values of quality, reliability, and customer service.
                Today, we serve customers across all sectors - from residential homeowners to large
                industrial operations.
              </p>
              <p>
                Our commitment to excellence has made us the trusted choice for thousands of customers
                throughout Papua New Guinea and the broader Pacific region. We take pride in every tank
                we manufacture, knowing that it will serve our customers reliably for years to come.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-lg">
              <img
                src="https://ugc.same-assets.com/KV3s_Xh4rAQUyXTDE1Vp7EZn-qlu9EU_.png"
                alt="Manufacturing Facility"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">29+</p>
                <p className="text-sm text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose All Tanks Limited?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality and innovation sets us apart in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">
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
        </section>

        {/* Manufacturing Process */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-xl text-gray-600">
              State-of-the-art rotational molding technology ensures consistent quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Material Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  High-grade HDPE pellets are carefully measured and prepared with UV stabilizers
                  and colorants to meet exact specifications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Rotational Molding</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced rotational molding machines heat and rotate molds to create
                  seamless, stress-free tank walls with consistent thickness.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <CardTitle>Quality Control</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Each tank undergoes rigorous testing including pressure testing,
                  dimensional checks, and visual inspection before delivery.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our growth and development
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Standards
            </h2>
            <p className="text-xl text-gray-600">
              We maintain the highest standards of quality and compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name} className="text-center p-6">
                <CardHeader>
                  <div className="mx-auto mb-4 text-blue-600">
                    {cert.icon}
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{cert.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust All Tanks Limited for their storage solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/quote">Get a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
