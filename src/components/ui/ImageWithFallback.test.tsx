import { fireEvent, render, screen } from '@testing-library/react';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('switches to the fallback source after an image error', () => {
    render(
      <ImageWithFallback
        alt="Broken image"
        fallbackSrc="/fallback.svg"
        src="/missing.svg"
      />,
    );

    const image = screen.getByAltText('Broken image');
    fireEvent.error(image);

    expect((image as HTMLImageElement).src).toContain('/fallback.svg');
  });
});
