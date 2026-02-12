import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

const DashboardPage = async ({params}:{params: Promise<{ lang: typeLang }>}) => {
    const { lang } = await params;
    return (
        <ProtectedRoute lang={lang}>
            <Dashboard lang={lang}/>
        </ProtectedRoute>
    )
};

export default DashboardPage;