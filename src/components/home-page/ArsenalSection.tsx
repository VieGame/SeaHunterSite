'use client';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import TabNavigation from '../TabNavigation';
import ChevronLeftIcon from '../icon/ChevronLeftIcon';
import ChevronRightIcon from '../icon/ChevronRightIcon';

interface WeaponData {
    id: string;
    name: string;
    description: string;
    image: string;
    specs: {
        damage: number;
        range: number;
        fireRate: number;
        accuracy: number;
    };
    features: string[];
}

interface WeaponCategory {
    id: string;
    name: string;
    description: string;
    weapons: WeaponData[];
}

const arsenalData: WeaponCategory[] = [
    {
        id: 'touch-type-guns',
        name: 'Touch Guns',
        description: 'Precise weapons fire exactly where you tap, rewarding skill and focus with maximized damage.',
        weapons: [
            {
                id: 'stingbolt',
                name: 'Stingbolt',
                description: 'Features a sleek, modern spear-like design with silver body and vibrant neon-blue energy conduits that glow like high-voltage circuits.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 95, range: 85, fireRate: 60, accuracy: 90 },
                features: ['AoE Blast', 'Lightning Chain', 'Precision Targeting']
            },
            {
                id: 'pierce-fang',
                name: 'Pierce Fang',
                description: 'Inspired by shark fangs and deep-sea harpoons with tapered, sharp metallic point and luminous aqua-blue energy grooves.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 100, range: 90, fireRate: 45, accuracy: 95 },
                features: ['Multi-Pierce', 'Piercing Shot', 'Deep Penetration']
            },
            {
                id: 'frostlace',
                name: 'Frostlace',
                description: 'Designed with ice crystals and jellyfish tentacles inspiration, slender and gracefully curved with shimmering ice-crystal patterns.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 85, range: 80, fireRate: 55, accuracy: 88 },
                features: ['Slow Effect', 'Frozen Trail', 'Crowd Control']
            }
        ]
    },
    {
        id: 'auto-type-guns',
        name: 'Auto Guns',
        description: 'Perfect for a relaxed playstyle, focusing on clearing groups of fish and controlling the battlefield with automatic targeting.',
        weapons: [
            {
                id: 'burstnet',
                name: 'Burstnet',
                description: 'Compact and broad design resembling a handheld net launcher with robust body, wide muzzle, and three fanned barrels.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 70, range: 75, fireRate: 85, accuracy: 75 },
                features: ['Multi-Projectile', 'Overdrive Spray', 'Wide Spread']
            },
            {
                id: 'voltslicer',
                name: 'Voltslicer',
                description: 'Inspired by plasma blades with sharp, slanted design and dual-pronged muzzle resembling electric horns for energy projection.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 80, range: 70, fireRate: 75, accuracy: 80 },
                features: ['Mini-Bomb AoE', 'Reactive Pulse', 'Energy Cuts']
            },
            {
                id: 'gravlock',
                name: 'Gravlock',
                description: 'Angular, mechanical design inspired by gravity generators and armored marine creatures, built for battlefield control.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 75, range: 85, fireRate: 60, accuracy: 85 },
                features: ['Gravity Control', 'Gravity Well', 'Enemy Positioning']
            }
        ]
    },
    {
        id: 'universal-skill',
        name: 'Universal Skill',
        description: 'Special abilities equipped to every Hunter, key to turning the tide in critical situations or optimizing hunting efficiency.',
        weapons: [
            {
                id: 'deep-shockwave',
                name: 'Deep Shockwave',
                description: 'Unleashes a powerful shockwave dealing wide-area damage to ALL fish on the map, perfect for relieving pressure from swarms.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 0, range: 100, fireRate: 0, accuracy: 100 },
                features: ['Area Damage', 'Swarm Control', 'Emergency Relief']
            },
            {
                id: 'lock-on-beacon',
                name: 'Lock-On Beacon',
                description: 'All shots automatically home in on selected target for 10 seconds with 25% damage boost, ensuring valuable targets can\'t escape.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 0, range: 100, fireRate: 0, accuracy: 100 },
                features: ['Auto-Targeting', 'Damage Boost', 'Target Focus']
            },
            {
                id: 'gold-surge',
                name: 'Gold Surge',
                description: 'For 6 seconds, every defeated fish drops DOUBLE pearls/shells, maximizing rewards and accelerating progress.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 0, range: 100, fireRate: 0, accuracy: 100 },
                features: ['Double Rewards', 'Pearl Boost', 'Progress Acceleration']
            },
            {
                id: 'time-freeze',
                name: 'Time Freeze',
                description: 'Freezes all fish on the map for 3 seconds, allowing easy defeats or repositioning without pressure.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 0, range: 100, fireRate: 0, accuracy: 100 },
                features: ['Time Control', 'Map Freeze', 'Strategic Positioning']
            },
            {
                id: 'voltide-spike',
                name: 'Voltide Spike',
                description: 'Drop 3 random Voltide energy mines that explode when touched, dealing damage and creating battlefield control.',
                image: '/img/weapon/weapon.png',
                specs: { damage: 0, range: 80, fireRate: 0, accuracy: 100 },
                features: ['Mine Deployment', 'Explosive Traps', 'Battlefield Control']
            }
        ]
    }
];

export default function ArsenalSection() {
    const [activeCategory, setActiveCategory] = useState<string>('touch-type-guns');
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: 'start',
            containScroll: false,
            slidesToScroll: 1,
            duration: 30,
            skipSnaps: false,
            breakpoints: {
                '(max-width: 767px)': { slidesToScroll: 1 },
                '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 2 },
                '(min-width: 1024px)': { slidesToScroll: 3 }
            },
        },
        [Fade()]
    );

    const currentCategory = arsenalData.find(cat => cat.id === activeCategory) || arsenalData[0];
    const tabNavigationItems = arsenalData.map(cat => ({
        label: cat.name,
        value: cat.id
    }));

    const scrollPrev = useCallback(() => {
        if (emblaApi && emblaApi.canScrollPrev()) {
            emblaApi.scrollPrev();
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi && emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
        }
    }, [emblaApi]);

    const onInit = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [activeCategory, emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [activeCategory, emblaApi]);

    // Function to ensure slides fill the last view
    const getSlidesWithFiller = useCallback(() => {
        const weapons = currentCategory.weapons;
        const totalSlides = weapons.length;

        // We'll prepare for all breakpoints by ensuring we have enough slides
        // The maximum slides per view is 3 (desktop), so we ensure divisibility by 3
        const maxSlidesPerView = 3;
        const remainder = totalSlides % maxSlidesPerView;

        if (remainder === 0) {
            return weapons;
        }

        // Add slides from the beginning to fill the last view
        // This creates a seamless loop effect
        const slidesToAdd = maxSlidesPerView - remainder;
        const fillerSlides = weapons.slice(0, slidesToAdd);

        return [...weapons, ...fillerSlides];
    }, [currentCategory.weapons]);

    useEffect(() => {
        if (emblaApi) {
            onInit();
            emblaApi.on('reInit', onInit);
            emblaApi.on('select', onSelect);
            emblaApi.scrollTo(0);
        }
    }, [emblaApi, onInit, onSelect]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0);
        }
    }, [activeCategory, emblaApi]);

    return (
        <section className="pt-12 pb-0">
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Section Header */}
                <div className="text-center mb-[18px] max-w-[958px] mx-auto">
                    <h2 className="text-h4 lg:text-h3 font-squada-one font-bold text-white mb-[11px]">
                        Unique Arsenal
                    </h2>
                    <p className="text-body font-svn-gilroy">
                        Discover 6 types of guns inspired by precious energy sources like Voltide, ice crystals, plasma blades, and deep-sea electricity, all with a distinct neon-tech aesthetic.
                    </p>
                </div>

                {/* Tab Navigation */}
                <TabNavigation
                    items={tabNavigationItems}
                    activeTab={activeCategory}
                    onTabChange={(tab) => setActiveCategory(tab.value)}
                />

                {/* Description */}
                <div className="text-center mt-[28px] mb-[30px]">
                    <p className="text-body font-svn-gilroy text-[#8b949e] max-w-3xl mx-auto">
                        {currentCategory.description}
                    </p>
                </div>

            </div>
            {/* Weapons Carousel */}
            <div className="border-t border-b border-[#21262D] w-full box-border flex items-center justify-center overflow-hidden">
                <button
                    onClick={scrollPrev}
                    className={`weapon-prev hidden lg:flex flex-shrink-0 ${prevBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                    disabled={prevBtnDisabled}
                >
                    <ChevronLeftIcon className='w-[27px] h-auto text-white' />
                </button>
                <div className="w-full flex-1 min-w-0 box-border px-4 max-w-[1280px]">
                    <div className="embla box-border w-full relative" ref={emblaRef}>
                        <div className="embla__container box-border w-full flex border-l border-[#21262d]">
                            {getSlidesWithFiller().map((weapon, index) => (
                                <div
                                    key={`${weapon.id}-${index}`}
                                    className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 border-r border-[#21262d]"
                                >
                                    <div className="box-border p-8 lg:pt-[40px] lg:pl-[48px] lg:pr-[38px] lg:pb-[58px] w-full">
                                        <div className='relative h-full'>
                                            <Image
                                                src={weapon.image}
                                                alt={weapon.name}
                                                width={300}
                                                height={300}
                                                className="mx-auto mb-4 w-full h-auto"
                                            />
                                            <h3 className="text-h4 font-bold text-[#D7DDE4] absolute top-0 left-0">{weapon.name}</h3>
                                        </div>
                                        <div className='text-body mb-[14px] font-black text-[#8B949E]'>{currentCategory.name}</div>
                                        <p title={weapon.description} className="text-title font-bold h-fit min-h-[calc(3rem*1.3)] text-white">{weapon.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <button
                    onClick={scrollNext}
                    className={`weapon-next hidden lg:flex flex-shrink-0 ${nextBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                    disabled={nextBtnDisabled}
                >
                    <ChevronRightIcon className='w-[27px] h-auto text-white' />
                </button>
            </div>
            {/* Mobile Navigation Buttons */}
            <div className="flex lg:hidden justify-center gap-4 mt-6">
                <button
                    onClick={scrollPrev}
                    className={`weapon-prev-mobile h-10 w-10 p-2 flex justify-center items-center rounded-full border border-[#21262d] ${prevBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : 'hover:bg-[#21262d]'}`}
                    disabled={prevBtnDisabled}
                >
                    <ChevronLeftIcon className='w-auto h-full text-white' />
                </button>
                <button
                    onClick={scrollNext}
                    className={`weapon-next-mobile h-10 w-10 p-2 flex justify-center items-center rounded-full border border-[#21262d] ${nextBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : 'hover:bg-[#21262d]'}`}
                    disabled={nextBtnDisabled}
                >
                    <ChevronRightIcon className='w-auto h-full text-white' />
                </button>
            </div>
        </section>
    );
}
