"use client";

import { useState, useEffect } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import "./heroPage.css"

const HeroPage = () => {
    const carousel = [
        {
            background: "/dist1.jpeg",
       },
        {
            background: "/dist2.jpg",
       },
        {
            background: "/dist3.jpg",
       },
        {
            background: "/dist4.jpg",
       },
        { 
            background: "/dist5.jpg",
       },
        {
            background: "/dist6.jpg",
       },
        {
            background: "/dist7.jpg",
       },
        {
            background: "/dist8.jpg",
       },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const [animationKey, setAnimationKey] = useState(0)

    // Trigger animation whenever currentIndex changes
    useEffect(() => {
        setAnimationKey(prev => prev + 1)
    }, [currentIndex])

    // Auto-play functionality - move to next slide every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
            )
        }, 8000)

        return () => clearInterval(interval)
    }, [carousel.length])

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? carousel.length - 1 : currentIndex - 1)
    }

    const goToNext = () => {
        setCurrentIndex(currentIndex === carousel.length - 1 ? 0 : currentIndex + 1)
    }

    return (
        <div className="heropage">
            <div className="heropage-carousel">
                <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
                    <IoChevronBack />
                </button>
                
                <div className="heropage-carousel-wrapper">
                    <div 
                        className="heropage-carousel-content"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: 'transform 0.5s ease-in-out'
                        }}
                    >
                        {carousel.map((item, index) => (
                            <div 
                                key={index} 
                                className="heropage-carousel-item"
                                style={{ backgroundImage: `url(${item.background})` }}
                            >
                                <div 
                                    key={`${index}-${animationKey}`}
                                    className={`carousel-item-overlay ${index === currentIndex ? 'animate' : ''}`}
                                >
                                    <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
                                    <p>{item?.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
                    <IoChevronForward />
                </button>
            </div>
        </div>
    )
}

export default HeroPage