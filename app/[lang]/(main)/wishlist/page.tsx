import WishlistClient from "./components/WishlistClient";

export default async function WihslistPage({params}:{params: {lang:  typeLang}}) {
    const { lang } = await params;
    return (
        <main className="bg-background">
            <WishlistClient lang={lang}/>
        </main>
    )
}