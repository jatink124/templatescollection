import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
  options = { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { elementRef, isVisible };
};

export const useParallax = (speed = 0.1) => {
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const scrollPosition = window.scrollY;
      const offset = scrollPosition * speed;
      
      elementRef.current.style.transform = `translateY(${offset}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return elementRef;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const element = document.querySelector(href);
      if (!element) return;
      
      e.preventDefault();
      
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};