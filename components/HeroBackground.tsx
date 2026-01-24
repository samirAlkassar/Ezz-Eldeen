import Image from "next/image";

const HeroBackground = () => {
    return (
        <div className="bg-orange-400/40 inset-0 absolute -z-10 overflow-clip">
            <div className="relative w-full h-full">
                <div className="bg-linear-90 from-white to-amber-700 opacity-20 inset-0 absolute z-10"></div>
                <Image src={"/images/splash-orange.jpg"} alt={"splash image"} fill className="object-cover"/>
            </div>
            {/* <span className="h-[180px] w-[220px] bg-blue-400/20 absolute top-[15%] left-[10%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[100px] w-[100px] bg-red-400/40 absolute top-[2%] left-[2%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[240px] w-[200px] bg-green-500/30 absolute top-[40%] left-[70%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[150px] w-[180px] bg-orange-600/25 absolute top-[65%] left-[30%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[220px] w-[200px] bg-red-500/15 absolute top-[20%] left-[50%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[170px] w-[210px] bg-pink-500/10 absolute top-[65%] left-[5%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[200px] w-[250px] bg-cyan-400/25 absolute top-[55%] left-[60%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[260px] w-[230px] bg-purple-600/30 absolute top-[35%] right-[12%] rounded-full blur-2xl animate-pulse"></span>
            <span className="h-[190px] w-[210px] bg-emerald-600/25 absolute top-[10%] left-[80%] rounded-full blur-2xl animate-pulse"></span> */}
        </div>
    )
}

export default HeroBackground;