'use client';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import TabNavigation from '../TabNavigation';
import ChevronLeftIcon from '../icon/ChevronLeftIcon';
import ChevronRightIcon from '../icon/ChevronRightIcon';

interface CreatureData {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
}

interface CreatureCategory {
    id: string;
    name: string;
    description: string;
    creatures: CreatureData[];
}

const marineCreatures: CreatureCategory[] = [
    {
        id: 'chargers',
        name: 'Chargers',
        description: `These are the first creatures you'll encounter, often appearing in schools and serving as your initial resource.`,
        creatures: [
            {
                id: 'tinytuna',
                name: 'Tinytuna',
                description: 'A sharp-nosed baby tuna with mini sonar antennae and adorably crossed eyes, yet possessing surprising burst speed.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'zapfin',
                name: 'Zapfin',
                description: 'A slender, long-tailed fish with a rotating radar on its back, always highly vigilant and capable of sudden acceleration.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'sparkfin-guppy',
                name: 'Sparkfin Guppy',
                description: 'With twinkling, glowing scales and a mini propeller attached to its tail, the Sparkfin Guppy is a tiny creature full of energy and speed.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'jetster',
                name: 'Jetster',
                description: "A unique sea urchin that uses compressed air for propulsion, the Jetster can unexpectedly rocket upwards, annoying those who aren't careful.",
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'turbo-tentacle',
                name: 'Turbo Tentacle',
                description: 'An octopus with jet propulsion capabilities, the Turbo Tentacle moves vibrantly and quickly, surprising hunters.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'voltide-puffer',
                name: 'Voltide Puffer',
                description: 'A special pufferfish that can inflate/deflate suddenly and emit Voltide electricity, posing a threat to those who get too close.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'radarfin-barracuda',
                name: 'Radarfin Barracuda',
                description: 'With a sleek, missile-like body, the Radarfin Barracuda is equipped with 360° rotating radar eyes, allowing it to scan for targets from afar and charge with incredible speed.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'hexafin-shark',
                name: 'HexaFin Shark',
                description: 'A colossal shark with six fins resembling energy cells and flexible metallic armor, the HexaFin Shark is a high-speed predator of the deep.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'giga-jawray',
                name: 'Giga Jawray',
                description: 'A ray with a rotating, saw-toothed lower jaw and a round, drill-like body, the Giga Jawray embodies raw piercing power.',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            },
            {
                id: 'neon-shrikefish',
                name: 'Neon Shrikefish',
                description: 'A blend of a small killer whale, electric stripes, and speed-geometry. It has a long, streamlined, arrow-like body with neon blue-purple stripes running along it. Its tail is split, resembling aircraft fins, creating the impression of a powerful "speed fish engine."',
                image: '/img/fish/fish.png',
                category: 'Chargers'
            }
        ]
    },
    {
        id: 'echoers',
        name: 'Echoers',
        description: 'These fish have moderate HP but offer a generous bounty of pearls, requiring players to invest more shots.',
        creatures: [
            {
                id: 'blinkfin',
                name: 'Blinkfin',
                description: 'These small fish swim in luminous clusters, with fins equipped with flickering LED lights, moving in schools and emitting faint electrical waves.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'shrimpling',
                name: 'Shrimpling',
                description: 'A mini shrimp with circuitry and LED wires attached to its antennae, the Shrimpling swims with jerky movements, creating an electromagnetic effect within its school.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'geargoby',
                name: 'Geargoby',
                description: 'A cunning little goby, the Geargoby can play dead and possesses infrared cameras hidden on its cheeks, constantly observing its surroundings.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'squiboo',
                name: 'Squiboo',
                description: 'A cute small squid with a propeller tail and a soft, candy-like body, the Squiboo effortlessly glides through the water.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'starplush',
                name: 'Starplush',
                description: 'A unique starfish with a glowing neon sphere at its center and eyes on each arm, the Starplush has an appearance that is both endearing and strange.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'copperclaw',
                name: 'Copperclaw',
                description: 'A small crab with gears attached to its legs, the Copperclaw moves sideways with mechanical agility.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'poutfin',
                name: 'Poutfin',
                description: 'A fish with a perpetually sad expression, slowly gliding with a Voltide gas filter attached to its head, exuding a melancholic aura in the deep sea.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'coral-snapper',
                name: 'Coral Snapper',
                description: 'This fish stands out with a luminous coral cluster held in its mouth, along with radar-like fins constantly scanning, guiding its school in synchronized movement.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'clicker-crab',
                name: 'Clicker Crab',
                description: 'A crab with a sturdy shell resembling a computer mouse, and eyes that blink like indicator lights, the Clicker Crab is a member of the Echoers school, moving in synchronized signals.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'aurora-lanternback',
                name: 'Aurora Lanternback',
                description: 'An anglerfish with its back adorned with vibrant RGB LEDs, the Aurora Lanternback guides its school with unique luminous signals.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'siren-ray',
                name: 'Siren Ray',
                description: 'A hybrid of a ray and a sonar antenna. It has a thin, flat shape like a ray, but its head slightly protrudes like a helmet. Two luminous fin strips on its back flicker with sound waves.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            },
            {
                id: 'ghost-lanternfish',
                name: 'Ghost Lanternfish',
                description: 'A combination of an anglerfish, a squid, and a light emitter. It has a long body with translucent, glass-like scales that reflect neon purple and blue light.',
                image: '/img/fish/fish.png',
                category: 'Echoers'
            }
        ]
    },
    {
        id: 'sentinels',
        name: 'Sentinels',
        description: `These special fish appear infrequently but offer exceptionally large rewards, challenging the hunter's patience and skill`,
        creatures: [
            {
                id: 'sentinel-squid',
                name: 'Sentinel Squid',
                description: 'A scout squid, equipped with radar and a camera mounted on its forehead, the Sentinel Squid is the first alarm for intruders, silently observing and alerting its kin.',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            },
            {
                id: 'craterback-crabzilla',
                name: 'Craterback Crabzilla',
                description: 'A gigantic crab with a moon-like, eroded carapace and massive hydraulic legs, the Craterback Crabzilla is a mobile fortress of the deep.',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            },
            {
                id: 'voltide-eel-king',
                name: 'Voltide Eel King',
                description: 'A colossal electric eel with a body emitting sound waves and sleek, shimmering electrical skin, the Voltide Eel King dominates deep waters, controlling its environment with Voltide energy.',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            },
            {
                id: 'ironback-beluga',
                name: 'Ironback Beluga',
                description: 'A massive Beluga whale with its back armored by a rotating, satellite-like shell, the Ironback Beluga possesses a majestic appearance and formidable defenses.',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            },
            {
                id: 'voltide-levikit',
                name: 'Voltide LeviKit',
                description: 'A hybrid of a mini Leviathan, a whale, and an energy shield. Its body is wide and covered with semi-mechanical armor plates that shift color with angle.',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            },
            {
                id: 'chronocrab',
                name: 'Chronocrab',
                description: 'A gigantic crab infused with a time control device. Its carapace is shaped like a clock, with gently raised mechanical gears (which can be animated to rotate).',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            },
            {
                id: 'voltide-widow',
                name: 'Voltide Widow',
                description: 'Inspired by water spiders and energy-armored scales. Its body resembles a sea spider, with 8 slightly flexible legs and glowing green joints.',
                image: '/img/fish/fish.png',
                category: 'Sentinels'
            }
        ]
    }
];

export default function MarineCreaturesSection() {
    const [activeCategory, setActiveCategory] = useState<string>('chargers');
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

    const currentCategory = marineCreatures.find(cat => cat.id === activeCategory) || marineCreatures[0];
    const tabNavigationItems = marineCreatures.map(cat => ({
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
        const creatures = currentCategory.creatures;
        const totalSlides = creatures.length;

        // We'll prepare for all breakpoints by ensuring we have enough slides
        // The maximum slides per view is 3 (desktop), so we ensure divisibility by 3
        const maxSlidesPerView = 3;
        const remainder = totalSlides % maxSlidesPerView;

        if (remainder === 0) {
            return creatures;
        }

        // Return last slides and fill previous slides to ensure the last view is full
        // This creates a seamless loop effect
        const lastSlides = creatures.slice(creatures.length - maxSlidesPerView);
        const fillerSlides = creatures.slice(0, totalSlides - remainder);

        return [...fillerSlides, ...lastSlides];
    }, [currentCategory.creatures]);

    useEffect(() => {
        if (emblaApi) {
            onInit();
            emblaApi.on('reInit', onInit);
            emblaApi.on('select', onSelect);
            emblaApi.scrollTo(0);
        }
    }, [activeCategory, emblaApi, onInit, onSelect]);

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
                        The Challenging World of Mutant Marine Creatures
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
            {/* Creatures Carousel */}
            <div className="border-t border-b border-[#21262D] w-full box-border flex items-center justify-center overflow-hidden">
                <button
                    onClick={scrollPrev}
                    className={`creature-prev hidden lg:flex flex-shrink-0 ${prevBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                    disabled={prevBtnDisabled}
                >
                    <ChevronLeftIcon className='w-[27px] h-auto text-white' />
                </button>
                <div className="w-full flex-1 min-w-0 box-border px-4 max-w-[1280px]">
                    <div className="embla box-border w-full relative" ref={emblaRef}>
                        <div className="embla__container box-border w-full flex border-l border-[#21262d]">
                            {getSlidesWithFiller().map((creature, index) => (
                                <div
                                    key={`${creature.id}-${index}`}
                                    className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 border-r border-[#21262d]"
                                >
                                    <div className="box-border p-8 lg:pt-[40px] lg:pl-[48px] lg:pr-[38px] lg:pb-[58px] w-full">
                                        <div className='relative h-full'>
                                            <Image
                                                src={creature.image}
                                                alt={creature.name}
                                                width={300}
                                                height={300}
                                                className="mx-auto mb-4 w-full h-auto"
                                            />
                                            <h3 className="text-h4 font-bold text-[#D7DDE4] absolute top-0 left-0">{creature.name}</h3>
                                        </div>
                                        <div className='text-body mb-[14px] font-black text-[#8B949E]'>{currentCategory.name}</div>
                                        <p title={creature.description} className="text-title font-bold line-clamp-4 text-white">{creature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={scrollNext}
                    className={`creature-next hidden lg:flex flex-shrink-0 ${nextBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                    disabled={nextBtnDisabled}
                >
                    <ChevronRightIcon className='w-[27px] h-auto text-white' />
                </button>
            </div>
            {/* Mobile Navigation Buttons */}
            <div className="flex lg:hidden justify-center gap-4 mt-6">
                <button
                    onClick={scrollPrev}
                    className={`creature-prev-mobile h-10 w-10 p-2 flex justify-center items-center rounded-full border border-[#21262d] ${prevBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : 'hover:bg-[#21262d]'}`}
                    disabled={prevBtnDisabled}
                >
                    <ChevronLeftIcon className='w-auto h-full text-white' />
                </button>
                <button
                    onClick={scrollNext}
                    className={`creature-next-mobile h-10 w-10 p-2 flex justify-center items-center rounded-full border border-[#21262d] ${nextBtnDisabled ? 'disabled opacity-50 cursor-not-allowed' : 'hover:bg-[#21262d]'}`}
                    disabled={nextBtnDisabled}
                >
                    <ChevronRightIcon className='w-auto h-full text-white' />
                </button>
            </div>
        </section>
    );
}