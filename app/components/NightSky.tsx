import { useEffect } from 'react';
import styles from './NightSky.module.scss';
import getStars from '~/utils/stars';

export const NightSky = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    getStars();
  }, []);

  return (
    <div className={styles.NightSky}>
      <canvas id="canv"></canvas>
      {children}
    </div>
  );
};
