'use client';
import { useState } from 'react';
import Image from 'next/image';
import TabNavigation from '../TabNavigation';
import { Accordion } from '../Accordion';

interface FeatureItem {
    id: string;
    title: string;
    content: string;
}

interface ContentData {
    title: string;
    description: string;
    image: string;
    features: FeatureItem[];
}

const contentData: Record<string, ContentData> = {
    'events': {
        title: 'Events Feature',
        description: 'Ready for unexpected challenges? The Events feature in Sea Hunters will continuously bring special and dramatic activities, from unique rare fish hunts to large-scale Boss Raids. Join now to claim limited-time rewards and assert your status as a legendary hunter!',
        image: '/img/game-features.png',
        features: [
            {
                id: '1',
                title: "Hunter's Summons",
                content: "These diverse challenges offer continuous rewards, encouraging daily play and fueling your never-ending evolution as a Sea Hunter.",
            },
            {
                id: '2',
                title: "Tournament PvP",
                content: "Think you're the best hunter out there? Prove it in Sea Hunters' Tournament PvP mode! Dive into thrilling 4-player matches, competing in damage and hunting skill to claim Pearls. Plus, colossal shared Bosses will appear, turning each battle into a fierce race to score points and climb the leaderboards, solidifying your standing in the hunter community!",
            },
            {
                id: '3',
                title: "Sea Hunt Journey",
                content: "Ready for a long-haul adventure? Sea Hunt Journey is the exclusive Season Pass in Sea Hunters, lasting 60 days and packed with exciting rewards. Progress through the tiers by completing Hunter's Summons quests and exploring the world. You'll unlock countless valuable items, from essential resources to exclusive rewards, helping you solidify your status as a legendary hunter!",
            },
            {
                id: '4',
                title: "RAID System",
                content: "In Sea Hunters, brace yourself for unexpected monster surges with the RAID System! This dynamic event feature is triggered when hunters unleash a massive amount of bullets, transforming the match into an intense survival battle. Giant schools of fish will flood the screen, pushing your skills and strategy to their limits, but simultaneously yielding incredibly valuable rewards!",
            },
            {
                id: '5',
                title: "Campaign Mode",
                content: "In Sea Hunters, Campaign Mode is the core journey that immerses you in the dramatic narrative of the year 2178. You'll progressively explore unique maps, from the Voltide-infested Coral Reclaims to the dangerous Riftdeep Core. Each map isn't just a new hunting challenge; it also unlocks deep mysteries, guiding you further into the story of survival and uncovering the secrets of Voltide!",
            }
        ]
    },
    'maps': {
        title: 'Maps',
        description: 'In Sea Hunters, your journey will take you through forgotten seas teeming with mysteries. Each map is a new chapter, unveiling terrifying secrets and endless hunting opportunities for you to discover.',
        image: '/img/maps-feature.jpg',
        features: [
            {
                id: '1',
                title: "Coral Reclaim",
                content: "Immerse yourself in a once-vibrant tropical zone, now a battlefield between natural life and the influence of Voltide. Your mission is to collect samples and data from small fish, squid, and crabs infected with Voltide to determine the extent of its spread, helping you adapt to this new threat.",
            },
            {
                id: '2',
                title: "Abyssal Vault",
                content: "Journey deeper beneath the reef, and you'll reach a former human Voltide technology testing area. Here, ancient creatures have been reborn and mutated, guarding the secret of the Voltide energy core. Your goal is to track down clues about this core and eliminate the creatures protecting it.",
            },
            {
                id: '3',
                title: "Riftdeep Core",
                content: "This is the very center of The Deep Rift, where Voltide exists in its purest and most dangerous form. The creatures here are no longer ordinary fish but conscious \"Voltide-born,\" guarding an \"Awakened Being\" that is forming. Your final mission is to prevent the awakening of this high-level entity and end the rampant mutation cycle, deciding the fate of the future beneath the ocean.",
            }
        ]
    }
};

export default function GameFeaturesSection() {
    const [activeTab, setActiveTab] = useState<string>('events');

    const currentContent = contentData[activeTab];
    const navigationItems = Object.keys(contentData).map(key => ({
        label: contentData[key].title,
        value: key
    }));

    return (
        <section id='features' className='border-b border-b-[#21262D]'>
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Section Header */}
                <h2 className="text-h4 lg:text-h3 leading-base mb-6 font-bold font-squada-one text-white mt-2 text-center max-w-[1120px] mx-auto">
                    Experience a Different Kind of Fish Shooting with Sea Hunters
                </h2>

                {/* Tab Navigation */}
                <TabNavigation
                    items={navigationItems}
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab.value)}
                />

                {/* Description */}
                <div className="text-center mt-3">
                    <p className="text-body text-[#8b949e] max-w-[762px] mx-auto">
                        {currentContent.description}
                    </p>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 mt-8 lg:mt-[78px] lg:grid-cols-2 gap-0">
                    {/* Left Side - Features List */}
                    <div className='flex order-2 lg:order-1 items-center justify-center px-4 lg:px-12 min-h-auto lg:min-h-[698px]'>
                        <Accordion
                            items={currentContent.features}
                            activeItemId='1'
                        />
                    </div>

                    {/* Right Side - Visual Content */}
                    <div className="order-1 mb-4 lg:mb-0 lg:order-2 bg-[url(/img/feature-section_right-container-bg.svg)] bg-no-repeat bg-cover bg-center flex items-center justify-center">
                        <div className='bg-[url(/img/feature-section_gradient+blur.svg)] p-8 lg:pt-10 lg:pb-5 lg:pl-[46px] lg:pr-[42px] w-full bg-no-repeat bg-contain bg-center'>
                            <div className='bg-[#FFFFFF26] px-[11px] py-[10px] rounded-[24px] broder-[#8C93FB] border w-full'>
                                <div className='h-auto min-h-auto lg:min-h-[400px] block w-full rounded-[24px] aspect-[691/417] bg-[#4E4E4E]'>
                                    <Image src={currentContent.image} alt={currentContent.title} width={691} height={417} className='h-full block rounded-[24px] w-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}