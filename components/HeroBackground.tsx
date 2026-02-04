import Image from "next/image";

const HeroBackground = () => {
    return (
        <div className="bg-orange-400/40 inset-0 absolute -z-10 overflow-clip">
            <div className="relative w-full h-full">
                <div className="bg-linear-90 from-white to-amber-700 opacity-20 inset-0 absolute z-10"></div>
                <Image src={"/images/splash-orange.jpg"} alt={"splash image"} fill className="object-cover"/>
            </div>
        </div>
    )
}

export default HeroBackground;