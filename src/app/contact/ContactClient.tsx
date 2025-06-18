"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClientNavigation from "@/components/ClientNavigation";
import {
  companyConfig,
  getContactDisplay,
  getMapUrl,
  getDirectionsUrl,
} from "@/lib/config";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Truck,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
  preferredContact: string;
}

export default function ContactClient() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "",
    preferredContact: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = getContactDisplay();

  const inquiryTypes = [
    { value: "quote", label: "Request a Quote" },
    { value: "product", label: "Product Information" },
    { value: "installation", label: "Installation Services" },
    { value: "warranty", label: "Warranty Claim" },
    { value: "general", label: "General Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" },
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const isFormValid = () =>
    formData.name &&
    formData.email &&
    formData.message &&
    formData.inquiryType;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ClientNavigation currentPage="contact" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <CardTitle className="text-2xl">Message Sent Successfully!</CardTitle>
              <CardDescription className="text-blue-100">
                Thank you for contacting All Tanks Limited
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">We'll be in touch soon!</h3>
                <p className="text-gray-600 max-w-lg mx-auto">
                  Your inquiry has been received and assigned reference number: <strong>ATL-{Date.now().toString().slice(-6)}</strong>
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-left max-w-md mx-auto">
                  <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We'll review your inquiry within 2 business hours</li>
                    <li>• A tank specialist will contact you directly</li>
                    <li>• We'll provide detailed information or schedule a consultation</li>
                  </ul>
                </div>
                <div className="flex gap-4 justify-center mt-6">
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                  <Button asChild>
                    <a href={`tel:${companyConfig.contact.phone}`}>
                      Call Us Now
                    </a>
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
      <ClientNavigation currentPage="contact" />
      {/* Your full layout including headers, cards, and form goes here */}
      {/* You can paste the remaining layout exactly as before, below this line */}
    </div>
  );
}
