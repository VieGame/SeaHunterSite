import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
    // Download Links
    const ANDROID_DOWNLOAD_LINK = process.env.ANDROID_DOWNLOAD_LINK || '#';
    const IOS_DOWNLOAD_LINK = process.env.IOS_DOWNLOAD_LINK || '#';
    const ABOUT_VIEGAME_LINK = process.env.NEXT_PUBLIC_WEBSITE_URL;
    const CONTACT_US_LINK = process.env.NEXT_PUBLIC_WEBSITE_URL + '/contact' || '#';
    const PRIVACY_POLICY_LINK = process.env.NEXT_PUBLIC_WEBSITE_URL + '/policy/privacy' || '#';
    const TERMS_OF_SERVICE_LINK = process.env.NEXT_PUBLIC_WEBSITE_URL + '/policy/terms' || '#';
    const HELP_CENTER_LINK = process.env.NEXT_PUBLIC_WEBSITE_URL + '/contact' || '#';

    return (
        <footer className="pt-[70px] pb-[102px] border-t border-t-[#21262D]">
            <div>
                <div className="container mx-auto max-w-[1200px] px-4 box-border">
                    <div className="flex flex-col lg:flex-row gap-[50px] xl:gap-[84px]">
                        <div className='xl:col-span-1 flex flex-col items-start gap-[25px]'>
                            <div className="uppercase text-h4 font-squada-one leading-1">
                                SEA HUNTERS
                            </div>
                            <NewsletterForm />
                            <p className="text-body max-w-[360px]">
                                Don&apos;t miss out on our giveaways and exclusive content. Follow us on social media!
                            </p>
                        </div>
                        <div className='flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                            <div className='space-y-4'>
                                <h4 className="text-w-50 font-bold">Company</h4>
                                <ul className="space-y-[10px] text-w-300 text-body transition-all">
                                    <li><a href={ABOUT_VIEGAME_LINK} className="hover:text-white">About VieGame</a></li>
                                    <li><a href={CONTACT_US_LINK} className="hover:text-white">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className='space-y-4'>
                                <h4 className="text-w-50 font-bold">Support</h4>
                                <ul className="space-y-[10px] text-w-300 text-body transition-all">
                                    <li><a href={HELP_CENTER_LINK} className="hover:text-white">Help Center</a></li>
                                    <li><a href={PRIVACY_POLICY_LINK} className="hover:text-white">Privacy Policy</a></li>
                                    <li><a href={TERMS_OF_SERVICE_LINK} className="hover:text-white">Terms of Service</a></li>
                                </ul>
                            </div>

                            <div className='space-y-4'>
                                <h4 className="text-w-50 font-bold">Download</h4>
                                <ul className="space-y-[10px] text-w-300 text-body transition-all">
                                    <li><a href={ANDROID_DOWNLOAD_LINK} className="flex gap-[10px] items-center justify-start hover:text-white">
                                        <Image src="/img/playstore-icon.svg" alt="Google Play Download" width={100} height={100} className='h-[14px] block w-fit object-contain' />
                                        Google Play
                                    </a></li>
                                    <li><a href={IOS_DOWNLOAD_LINK} className="flex gap-[10px] items-center justify-start hover:text-white">
                                        <Image src="/img/apple-icon.svg" alt="App Store Download" width={100} height={100} className='h-[14px] block w-fit object-contain' />
                                        App Store</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className="mt-8 px-4 box-border border-t-2 border-[#fff1] py-[29px] text-center text-k-white-50 text-body">
                    <p>© 2025 VIEGAME, LLC. VIEGAME and any associated logos are trademarks, service marks, and/or registered trademarks of VIEGAME, LLC.</p>
                </div> */}
            </div>
        </footer>
    );
}
