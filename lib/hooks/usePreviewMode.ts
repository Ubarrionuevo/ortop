import { useEffect, useState } from 'react';

export function usePreviewMode() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isDemo = urlParams.get('demo') === 'true';
      const isPreview = urlParams.get('preview') === 'true';
      setIsPreviewMode(isDemo && isPreview);
    }
  }, []);

  return isPreviewMode;
} 