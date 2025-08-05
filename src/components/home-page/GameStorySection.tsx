'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function GameStorySection() {
    const storyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!storyRef.current) return;
        const paragraphs = storyRef.current.querySelectorAll('div');

        // Split text into characters for each paragraph
        paragraphs.forEach((paragraph) => {
            const text = paragraph.textContent || '';
            const chars = text.split('');

            // Wrap each character in a span with typewriter effect
            paragraph.innerHTML = chars
                .map(char => {
                    if (char === ' ') {
                        return '<span class="inline-block">&nbsp;</span>';
                    }
                    return `<span class="inline-block opacity-0">${char}</span>`;
                })
                .join('');
        });

        // Create one master timeline for sequential paragraph animation
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: storyRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        // Add each paragraph to the master timeline sequentially
        paragraphs.forEach((paragraph, index) => {
            const charSpans = paragraph.querySelectorAll('span');

            // Add typewriter animation for this paragraph
            masterTimeline.to(charSpans, {
                opacity: 1,
                duration: 0.5,
                ease: "none",
                stagger: {
                    amount: 2.0, // Time to complete each paragraph
                    from: "start"
                }
            })
                .to({}, {
                    duration: index === paragraphs.length - 1 ? 0 : 0.5,
                });
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id='game-story' className='bg-[url(/img/game-story-bg.png),linear-gradient(to_bottom,#0E1218_0%,#0E1218_50px,#0000_20%,#0E1218_90%)] bg-blend-darken bg-cover bg-center'>
            <div className='max-w-[1440px] mx-auto px-4 pt-[100px] lg:pt-[150px] pb-[150px] lg:pb-[309px]'>
                <h2 className='text-h3 font-squada-one leading-[1.2] text-center mb-[60px]'>
                    2178: The Call from the Abyss
                </h2>
                <div ref={storyRef} className='space-y-3 max-w-[600px] mx-auto text-body font-bold'>
                    <div>In the distant future of 2178, an unnamed catastrophe has submerged Earth, transforming the blue planet into a vast and mysterious ocean world. Once bustling cities now lie deep beneath the cold waters. Sunlight is but a memory, and humanity&apos;s survival clings to technological remnants, facing the peril of dwindling resources.</div>
                    <div>However, from the uncharted depths of The Deep Rift, a mystical and powerful energy source has emerged: Voltide. It is not merely the last hope for survival, but also the key to unlocking the forgotten secrets of the underwater world.</div>
                    <div>You are one of the few remaining &quot;Sea Hunters,&quot; brave souls who dare to confront the darkness and uncertainty of the ocean. Your mission is not only to seek Voltide but also to unravel the mysteries of this transformed world. Beneath the waves, the power of Voltide has given rise to mutated &quot;Voltide-born&quot; creatures, both magnificent and deadly, ready to defend their domain.</div>
                    <div>Prepare your weapons, upgrade your skills, and embark on a harsh journey of survival. Each dive is a voyage of discovery, where vibrant neon-tech blends with raw beauty and lurking threats. Can you decipher the enigmas of 2178, secure Voltide, and become a legend of the deep?</div>
                </div>
            </div>
        </section>
    );
}