import { memo, useEffect, useState } from 'react';
import shoppy from './images/shoppy.gif';
import { classNames } from '~/utils/classNames';
import styles from './LoadingDots.module.scss';

export const LoadingDots = memo(() => {
  const [dotCount, setDotCount] = useState(0);
  const [loadingText, setText] = useState('LFG');
  const getRandomLoadingText = () => {
    const loadingTexts = [
      'Killing wizards',
      'Removing toil',
      'Finding unobvious but correct ideas',
      'Rounding up unicorns',
      'Putting the Ruby on the Rails',
      'Making it more boring',
      'Shifting the overton window',
      'Repairing broken windows',
      'Walking down the green path',
    ];
    const random = Math.floor(Math.random() * loadingTexts.length);

    return loadingTexts[random];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevDotCount) => (prevDotCount + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(getRandomLoadingText());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center flex-col items-center h-full gap-2">
      <img style={{ width: '40px', height: '40px' }} src={shoppy} />
      <div className="flex relative">
        <div className="text-bolt-elements-textPrimary text-sm">{loadingText}</div>
        <div className={classNames(['text-bolt-elements-textPrimary text-sm', styles.Dots])}>
          {'.'.repeat(dotCount)}
        </div>
      </div>
    </div>
  );
});
