import { cn } from "@/shared";

interface ISpinnerLoader {
  className?: string;
}

const SpinnerLoader = ({ className }: ISpinnerLoader) => {
  return (
    <div
      className={cn(
        "border-gray-12 dark:border-gray-4 h-6 w-6 animate-spin rounded-full border-[3px] border-t-blue-7 dark:border-t-blue-15",
        className
      )}
    />
  );
};

export default SpinnerLoader;
