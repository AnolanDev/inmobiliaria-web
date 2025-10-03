import { ref, onMounted, onUnmounted } from "vue";

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  delay?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    animationClass = "animate-fade-in-up",
    delay = 0,
  } = options;

  const elements = ref<HTMLElement[]>([]);
  const observer = ref<IntersectionObserver | null>(null);

  const registerElement = (el: HTMLElement) => {
    if (el && !elements.value.includes(el)) {
      elements.value.push(el);
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

      if (observer.value) {
        observer.value.observe(el);
      }
    }
  };

  const unregisterElement = (el: HTMLElement) => {
    const index = elements.value.indexOf(el);
    if (index > -1) {
      elements.value.splice(index, 1);
      if (observer.value) {
        observer.value.unobserve(el);
      }
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;

        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          element.classList.add(animationClass);
        }, delay);

        // Unobserve after animation to improve performance
        if (observer.value) {
          observer.value.unobserve(element);
        }
      }
    });
  };

  onMounted(() => {
    observer.value = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    // Observe existing elements
    elements.value.forEach((el) => {
      if (observer.value) {
        observer.value.observe(el);
      }
    });
  });

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  return {
    registerElement,
    unregisterElement,
  };
}
