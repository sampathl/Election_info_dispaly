import { type ImgHTMLAttributes, useEffect, useState } from 'react';

import { FALLBACK_IMAGE_SRC } from '@/lib/image';

type ImageWithFallbackProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  fallbackSrc?: string;
};

export function ImageWithFallback({
  alt,
  fallbackSrc = FALLBACK_IMAGE_SRC,
  onError,
  src,
  ...rest
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasFailed(false);
  }, [src]);

  return (
    <img
      {...rest}
      alt={alt}
      onError={(event) => {
        onError?.(event);

        if (!hasFailed) {
          setCurrentSrc(fallbackSrc);
          setHasFailed(true);
        }
      }}
      src={currentSrc}
    />
  );
}
