import { CardMedia } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  component: React.ElementType<any>;
  image: string;
  alt: string;
  height: string | number;
  width: string | number;
  title: string;
  style?: React.CSSProperties;
}
const LazyCardMedia: React.FC<Props> = ({ component, image, alt, height, title, style }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const placeholderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, placeholderRef]);
  return visible ? (
    <CardMedia component={component} style={style} image={image} alt={alt} height={height} title={title} />
  ) : (
    <div style={{ height: height, backgroundColor: '#EEE' }} aria-label={alt} ref={placeholderRef} />
  );
};

export default LazyCardMedia;
