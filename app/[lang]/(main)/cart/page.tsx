import CartClient from "./components/CartClient";

export default async function name({params}: {params: {lang: typeLang}}) {
    const { lang } = await params;
    return (
        <>
            <CartClient/>
        </>
    )
}




