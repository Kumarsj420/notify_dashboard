'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.08,
  easing: 'ease',
  trickle: true,
  trickleSpeed: 800,
});

const AppProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Complete any ongoing progress when app loads
    NProgress.done();
  }, []);

  useEffect(() => {
    // Handle route changes - this covers both client and server navigation
    NProgress.start();
    
    // Complete progress after a delay to show the bar
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    // Enhanced link click handling
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a') || target.closest('button[role="link"]');
      
      if (link) {
        // Handle anchor links
        if (link instanceof HTMLAnchorElement && link.href) {
          // Skip external links, mailto, tel, and hash links
          if (
            !link.href.startsWith('mailto:') && 
            !link.href.startsWith('tel:') &&
            !link.href.startsWith('#') &&
            link.href.startsWith(window.location.origin)
          ) {
            const url = new URL(link.href);
            const currentUrl = new URL(window.location.href);
            
            // Only start progress for different pages
            if (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search) {
              NProgress.start();
            }
          }
        }
        // Handle programmatic navigation (router.push calls)
        else if (link.getAttribute('data-loading') !== 'false') {
          NProgress.start();
        }
      }
    };

    // Handle beforeunload for page refreshes
    const handleBeforeUnload = () => {
      NProgress.start();
    };

    // Handle visibility change to complete progress when user comes back
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Small delay to ensure any navigation has completed
        setTimeout(() => {
          NProgress.done();
        }, 100);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleLinkClick);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      NProgress.done();
    };
  }, []);

  return <>{children}</>;
};

export default AppProgressProvider; 