import { forwardRef } from "react";

const Component = forwardRef(({ useWebp, src }, ref) => {
  return (
    <picture ref={ref}>
      {!!useWebp && (
        <source srcSet={src.replace(".png", ".webp")} type="image/webp" />
      )}
      <source srcSet={src} type="image/png" />
      <img src={src} alt="" />
    </picture>
  );
});

export default Component;
