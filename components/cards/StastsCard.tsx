// --- Reusable Helper Component ---
interface StatsCardProps {
  imgName: string;
  value: number;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatsCard = ({
  imgName,
  value,
  title,
  icon,
  bgColor,
}: StatsCardProps) => {
  return (
    <div className="card-wrapper flex flex-wrap items-center justify-start gap-4 rounded-[10px] border border-border p-6 shadow-sm bg-card transition-all hover:shadow-md">
      <div
        className={`rounded-md ${bgColor} p-3 flex items-center justify-center`}
      >
        {icon}
      </div>

      <div>
        <p className="paragraph-semibold text-foreground font-bold text-xl">
          {value}
        </p>
        <p className="body-medium text-muted-foreground capitalize">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
