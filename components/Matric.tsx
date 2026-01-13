import { LucideIcon } from "lucide-react";

interface MetricProps {
  icon: LucideIcon;
  value: number | string;
  title: string;
  href?: string;
  isAuthor?: boolean;
  textStyles?: string;
  imgStyles?: string;
}

const Metric = ({
  icon: Icon,
  value,
  title,
  textStyles,
  imgStyles,
}: MetricProps) => (
  <div className="flex items-center gap-1.5 flex-wrap">
    <Icon size={16} className={imgStyles || "text-muted-foreground"} />
    <p className={`${textStyles} flex items-center gap-1`}>
      {value}
      {title && (
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
      )}
    </p>
  </div>
);

export default Metric;
