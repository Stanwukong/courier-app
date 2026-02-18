import { MapPin } from "lucide-react";

export function MapEmbed() {
  return (
    // Replace with Google Maps iframe when API key is available
    // Example: <iframe src="https://www.google.com/maps/embed?pb=..." ... />
    <div className="h-64 bg-slate-100 rounded-lg flex flex-col items-center justify-center gap-3 border border-slate-200">
      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
        <MapPin className="h-6 w-6 text-slate-500" />
      </div>
      <p className="text-sm font-medium text-slate-500">Map Location</p>
    </div>
  );
}
