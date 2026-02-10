import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-orange-400">404</h1>
      <p className="text-lg mt-2">Page not found</p>

      <Link href="/" className="mt-6 text-blue-500 underline">
        Go back home
      </Link>
    </div>
  );
}
