import { LucideVerified } from "lucide-react";
import { useTranslations } from "next-intl";

type RoleBadgeProps = {
  role?: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const t = useTranslations("profile.badges")
  if (role === "admin") {
    return (
    <div className="bg-primary/15 text-primary mt-1 rounded-full px-2 py-0.5 text-sm text-center flex items-center justify-center gap-1">
      <LucideVerified size={15}/>
      <p>{t("admin")}</p>
    </div>
    );
  }

  return (
    <div className="bg-primary/15 text-primary mt-1 rounded-full px-2 py-0.5 text-sm text-center flex items-center justify-center gap-1">
      <LucideVerified size={15}/>
      <p>{t("customer")}</p>
    </div>
  );
}
