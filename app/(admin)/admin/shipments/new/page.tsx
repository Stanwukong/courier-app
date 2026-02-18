import { ShipmentForm } from "@/components/admin/shipment-form";

export const metadata = {
  title: "Create New Shipment",
};

export default function NewShipmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Shipment
        </h1>
        <p className="text-muted-foreground">
          Fill in the details below to create a new shipment.
        </p>
      </div>

      <ShipmentForm mode="create" />
    </div>
  );
}
