import { useState, useEffect, createRef, useRef, useCallback } from 'react';

export type ScrollItem = {
  ref: HTMLElement | null;
  isActive: boolean;
};

export default function useScrollSpy(
  numSections: number,
  { root = null, rootMargin = '', threshold = 0.5 } = {} as IntersectionObserverInit
): [ScrollItem[], (ref: HTMLElement | null, index: number) => void] {
  const [scrollItems, setScrollItems] = useState<ScrollItem[]>(Array(numSections).fill({}));

  const observerRef = useRef(
    new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > threshold) {
            window.history.replaceState(null, '', `#${entry.target.id}`);

            setScrollItems((prevState) =>
              prevState.map((scrollItem) => ({ ...scrollItem, isActive: scrollItem.ref?.id === entry.target.id }))
            );
          }
        });
      },
      { root, rootMargin, threshold }
    )
  );

  useEffect(() => {
    setScrollItems((prevState) => {
      const newScrollItems: ScrollItem[] = [];

      // Update scroll items if the sections happen to be dynamic
      for (let i = 0; i < numSections; i++) {
        newScrollItems[i] = {
          ref: prevState[i].ref || createRef<HTMLElement | null>().current,
          isActive: prevState[i].isActive || false,
        };
      }

      return newScrollItems;
    });

    const currentObserver = observerRef.current;
    scrollItems.forEach(({ ref }) => ref && currentObserver.observe(ref));

    return function cleanup() {
      scrollItems.forEach(({ ref }) => ref && currentObserver.unobserve(ref));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numSections]);

  const setScrollItemRef = useCallback(
    (ref: HTMLElement | null, index: number) => {
      if (!ref?.id) {
        console.warn("WARNING: A ref set using use-scroll-spy doesn't have an ID which could be problematic for intended usage.");
      }

      setScrollItems((prevState) => {
        prevState[index] = {
          ...prevState[index],
          ref,
        };
        return prevState;
      });
    },
    [setScrollItems]
  );

  return [scrollItems, setScrollItemRef];
}
