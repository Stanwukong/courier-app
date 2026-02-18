"use client";

import { useState, type FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/shared/container";
import TrackingResults from "@/components/home/tracking-results";
import type { TrackingResult } from "@/lib/types";

export default function TrackTraceForm() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackingResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = trackingNumber.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/tracking/${encodeURIComponent(trimmed)}`);

      if (response.status === 404) {
        setError("Tracking number not found. Please check and try again.");
        return;
      }

      if (!response.ok) {
        setError("Something went wrong. Please try again later.");
        return;
      }

      const data = await response.json();
      setResult(data.data ?? data);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="track" className="relative z-10 -mt-16 bg-transparent">
      <Container className="max-w-2xl">
        <Card className="border-slate-200 bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
              <Search className="h-5 w-5 text-orange-500" />
              Track Your Shipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="text"
                  placeholder='Enter tracking number (e.g., USC-ABC1234567)'
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-11 flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !trackingNumber.trim()}
                  className="h-11 bg-orange-500 px-8 font-semibold text-white hover:bg-orange-600 sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    "Track Now"
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
            )}

            {result && <TrackingResults result={result} />}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
