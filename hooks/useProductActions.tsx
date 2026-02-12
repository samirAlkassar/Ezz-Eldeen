import { useToast } from "@/components/Toast";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/router";

const handleResponse = async (res: Response, actionName: string, lang: typeLang) => {
  const {toast} = useToast();
  const router = useRouter();
  
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    toast({
      title: "Login required",
      description: data.message || `You must login to ${actionName}`,
      variant: "error",
      icon: <AlertTriangle />,
      position: "bottom-right",
    });
    router.replace(`/${lang}/login`);
    throw new Error("Not authenticated");
  }

  if (res.status === 403) {
    toast({
      title: "Not authorized",
      description: data.message || `You don't have permission to ${actionName}`,
      variant: "error",
      icon: <AlertTriangle />,
      position: "bottom-right",
    });
    router.replace(`/${lang}`);
    throw new Error("Not authorized");
  }

  if (!res.ok) {
    throw new Error(data.message || `Failed to ${actionName}`);
  }

  return data;
};

export default handleResponse;