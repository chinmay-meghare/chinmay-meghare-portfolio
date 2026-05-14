"use client"

import "./StickyCards.css"

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function StickyCards() {

    const stickyCardsData = [
        { index: "01", title: "Modularity", image: "/assets/images/sticky-cards/card-1.jpg", description: "" },
        { index: "02", title: "Materials", image: "/assets/images/sticky-cards/card-2.jpg", description: "From soft gradients to hand edges, our design language draws from real-world materials-elevating interfaces that feel both digital and tangible" },
        { index: "03", title: "Precision", image: "/assets/images/sticky-cards/card-3.jpg", description: "Details matter. We work with intention-aligning pixels, calibrating contrast, and obsessing" },
        { index: "04", title: "Character", image: "/assets/images/sticky-cards/card-4.jpg", description: "Interfaces should have personality. We embed small moments of play and irregularity to bring warmth, charm, and a human feel to the digital." },
    ];

    const container = useRef(null);

    useGSAP(() => {

        const stickyCards = document.querySelectorAll(".sticky-card");
        stickyCards.forEach((card, index) => {
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                });
            }

            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale, rotation: rotation, "--after-opacity": afterOpacity,
                        });
                    }
                })
            }

        });
    },
        { scope: container }
    );



    return (
        <div className="sticky-cards" ref={container}>

            {stickyCardsData.map((cardData, index) => (
                <div className="sticky-card" key={index}>
                    <div className="sticky-card-index">
                        <h1 className="text-8xl">{cardData.index}</h1>
                    </div>
                    <div className="sticky-card-content">
                        <div className="sticky-card-content-wrapper">
                            <h1 className="sticky-card-header text-8xl">{cardData.title}</h1>

                            <div className="sticky-card-img">
                                <img className="object-cover" src={cardData.image} alt="" />
                            </div>

                            <div className="sticky-card-copy">
                                <div className="sticky-card-copy-title">
                                    <p>(About the state)</p>
                                </div>
                                <div className="sticky-card-copy-description">
                                    <p>{cardData.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
};