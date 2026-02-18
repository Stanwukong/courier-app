import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY_INFO } from "@/lib/constants";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    value: COMPANY_INFO.address,
  },
  {
    icon: Phone,
    label: "Phone",
    value: COMPANY_INFO.phone,
  },
  {
    icon: Mail,
    label: "Email",
    value: COMPANY_INFO.email,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: COMPANY_INFO.hours,
  },
];

export function ContactInfo() {
  return (
    <Card className="bg-slate-50 border-0 shadow-sm">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Contact Information</h3>
        <div className="space-y-5">
          {contactItems.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <p className="text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
