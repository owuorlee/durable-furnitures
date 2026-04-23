import { Star } from "lucide-react";

export const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        style={{ width: size, height: size }}
        className={
          i <= Math.floor(rating)
            ? "fill-gold text-gold"
            : i - 0.5 <= rating
              ? "fill-gold/50 text-gold"
              : "fill-none text-muted-foreground/40"
        }
        strokeWidth={1.5}
      />
    ))}
  </div>
);
