import React, { useState, useEffect } from "react";
import "./gallery.css";

const slides = [
  {
    img: "https://vit.ac.in/wp-content/uploads/2023/06/vitlibrary.webp",
    title: "Digital Library",
    desc: " Access a vast collection of e-books, journals, and research papers anytime, anywhere.",
  },
  {
    img: "https://chennai.vit.ac.in/wp-content/uploads/2020/04/Library.jpg",
    title: "Library View",
    desc: "Explore our modern library with a seamless digital catalog and organized book sections.",
  },
  {
    img: "https://content.jdmagicbox.com/v2/comp/chennai/z2/044pxx44.xx44.191204190017.s3z2/catalogue/vit-university-library-chennai-0h5oh5bfmi.jpg",
    title: "Reading Area",
    desc: "A peaceful, well-lit space designed for focused reading and study.",
  },
  {
    img: "https://vit.ac.in/wp-content/uploads/2023/07/course-scaled.webp",
    title: "Digital Display",
    desc: "Stay updated with real-time announcements, book availability, and library events.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/VIT_Library.jpg/1024px-VIT_Library.jpg",
    title: "Main Library",
    desc: "The heart of knowledge at VIT, housing an extensive collection of academic resources.",
  },
];

const SliderComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="slider">
      <div className="list">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`item ${index === currentIndex ? "active" : ""}`}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="content">
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button onClick={prevSlide}>{"<"}</button>
        <button onClick={nextSlide}>{">"}</button>
      </div>
      <div className="thumbnail">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`item ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={slide.img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
