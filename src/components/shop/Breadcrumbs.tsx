import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 font-body text-xs text-muted-foreground">
    {items.map((c, i) => (
      <span key={i} className="flex items-center gap-1.5">
        {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
        {c.to ? (
          <Link to={c.to} className="transition-colors hover:text-gold">
            {c.label}
          </Link>
        ) : (
          <span className="text-foreground">{c.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
