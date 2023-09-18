import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({ id, imgSrc, alt, className }) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return inView ? (
    <img id={id} src={imgSrc} alt={alt} className={className} />
  ) : (
    <img ref={ref} alt={alt} className={className} />
  );
};

export default LazyImage;
