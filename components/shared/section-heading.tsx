import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", centered && "text-center")}>
      <div
        className={cn(
          "mb-4 h-1 w-16 rounded-full bg-orange-500",
          centered && "mx-auto"
        )}
      />
      <h2
        className={cn(
          "text-3xl font-bold",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-2xl",
            light ? "text-slate-300" : "text-slate-600",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
