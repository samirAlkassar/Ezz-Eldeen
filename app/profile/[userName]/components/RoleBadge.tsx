type RoleBadgeProps = {
  role?: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  if (role === "admin") {
    return (
      <span className="
        mt-2 inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold
        text-white
        bg-[length:200%_200%]
        bg-gradient-to-r from-red-500 via-blue-500 to-purple-500
        animate-gradient
        shadow-md
      ">
        Admin
      </span>
    );
  }

  return (
    <span className="
      mt-2 inline-flex items-center gap-1 rounded-md
      bg-gray-100 px-3 py-1 text-sm font-medium
      text-gray-700
      border border-dashed border-gray-300
      font-mono
    ">
      🧾 Customer
    </span>
  );
}
