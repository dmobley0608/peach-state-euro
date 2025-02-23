
import Announcement from "@/components/layout/Announcement";
import Banner from "@/components/layout/Banner";
import Hero from "@/components/layout/Hero";
import IconRow from "@/components/layout/IconRow";


export default function Home() {
  return (
    <div className="animate-fadeIn" >
      <Hero/>
      <div className='absolute top-[275px] md:top-[350px] lg:top-[405px] left-0 w-full'>
                <Banner />
            </div>
            <div className='absolute top-[405px] md:top-[535px] lg:top-[605px] left-0 w-full z-20'>
                <IconRow />
            </div>
    </div>
  );
}
