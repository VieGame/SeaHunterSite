import Image from 'next/image';

export default function HeroSection() {

    return (
        <section id="hero" className="bg-[url(/img/hero-background.png)] bg-size-[auto_100%] bg-no-repeat lg:bg-cover bg-bottom lg:bg-center pt-40 xl:pt-[240px] pb-0">
            <div className='max-w-[1440px] mx-auto px-4'>
                {/* Hero Title */}
                <h1 className="font-squada-one text-h3 md:text-h2 lg:text-h1 mb-4 lg:mb-8 text-center leading-[0.5]">
                    SEA HUNTERS
                </h1>
                <div className='text-center my-2 leading-[1] text-h4 font-squada-one'>
                    Dramatic Adventure Under the Deep Ocean
                </div>
                <div className='text-center font-black text-body block max-w-[750px] mx-auto'>
                    Sea Hunter is a completely free Casual - Fishing Narrative Adventure game. It combines fast-paced action gameplay with a thrilling storyline, leading players on a journey of survival and exploration in a futuristic underwater world. The game retains the classic features of traditional fish shooting games but enhances the experience with stunning 3D graphics, epic Bosses, and unique skills.
                </div>
                <div className='flex gap-4 lg:gap-[40px] justify-center items-center mt-[44px] mb-18 lg:mb-[123px]'>
                    <a href="#">
                        <Image
                            src="/img/google-play-download-button.svg"
                            alt="Download on Google Play"
                            width={180}
                            height={60}
                            className="block object-contain h-[60px] w-auto"
                        />
                    </a>
                    <a href="#">
                        <Image
                            src="/img/app-store-download-button.svg"
                            alt="Download on App Store"
                            width={180}
                            height={60}
                            className="block object-contain h-[60px] w-auto"
                        />
                    </a>
                </div>
                <div className='w-fit mx-auto mb-10'>
                    <div className='pt-4 lg:pt-[38px] px-2 lg:px-[61px] z-0 pb-0 w-fit lg:bg-[url(/img/hero-game-screen-shot-shadow.svg)] bg-no-repeat bg-center bg-size-[100%] mx-auto'>
                        <div className='p-2 lg:pt-[21px] h-fit lg:px-[21px] lg:pb-0 z-10 bg-[#FFFFFF26] w-fit mx-auto rounded-[24px] lg:rounded-none lg:rounded-t-[24px]'>
                            <Image
                                src={'/img/game-screenshot-hero.png'}
                                width={1204}
                                height={555}
                                alt='Sea Hunter Game Screenshot'
                                className='w-auto h-fit object-contain mx-auto max-w-full rounded-[12px] lg:rounded-none lg:rounded-t-[12px]'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
