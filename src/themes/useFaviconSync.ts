'use client';

import { useEffect } from 'react';
import { ThemeId } from './registry';

/**
 * Synchronizes browser tab favicon and mobile touch icon with active theme.
 * Dark and light use the original brand caret mark (/brand/favicon.svg).
 * Dream uses the soft poppy sprout mark (/brand/dream/favicon-dream.svg).
 */
export function useFaviconSync(theme: ThemeId) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const iconHref =
      theme === 'dream' ? '/brand/dream/favicon-dream.svg' : '/brand/favicon.svg';

    const appleHref =
      theme === 'dream' ? '/brand/dream/app-icon-dream.svg' : '/brand/app-icon.svg';

    // Update or inject <link rel="icon">
    let linkIcon = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    if (linkIcon) {
      linkIcon.href = iconHref;
    } else {
      linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.href = iconHref;
      document.head.appendChild(linkIcon);
    }

    // Update or inject <link rel="apple-touch-icon">
    let linkApple = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (linkApple) {
      linkApple.href = appleHref;
    } else {
      linkApple = document.createElement('link');
      linkApple.rel = 'apple-touch-icon';
      linkApple.href = appleHref;
      document.head.appendChild(linkApple);
    }
  }, [theme]);
}
