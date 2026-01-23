declare module "@splidejs/react-splide" {
  import * as React from "react";

  export interface SplideProps {
    options?: Record<string, any>;
    hasTrack?: boolean;
    tag?: string;
    className?: string;
    children?: React.ReactNode;
    onMoved?: (splide: any) => void;
    onDrag?: () => void;
    onDragged?: () => void;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<{ children?: React.ReactNode }>;
}

declare module "@splidejs/react-splide/css";
