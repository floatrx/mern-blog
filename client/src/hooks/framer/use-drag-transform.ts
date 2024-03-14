import { useMotionValue, useTransform } from 'framer-motion';

type TMotionValue = ReturnType<typeof useMotionValue<number>>;
type TTransform = ReturnType<typeof useTransform<number, number>>;
type TStyle = {
  x: TMotionValue;
  y: TMotionValue;
  rotateX: TTransform;
  rotateY: TTransform;
  cursor: string;
};

type UseDragTransform = () => [
  {
    style: TStyle;
    drag: boolean;
    dragConstraints: { top: number; left: number; right: number; bottom: number };
    dragElastic: number;
    dragTransition: { bounceDamping: number; timeConstant: number };
  },
  {
    style: TStyle;
    x: TMotionValue;
    y: TMotionValue;
    rotateX: TTransform;
    rotateY: TTransform;
  },
];

/**
 * useDragTransform hook
 * @returns tuple with props and other values for framer-motion
 */
export const useDragTransform: UseDragTransform = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);
  const style = { x, y, rotateX, rotateY, cursor: 'grab' };
  /**
   *  style={{ x, y, rotateX, rotateY, cursor: 'grab' }}
   *  drag
   *  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
   *  dragElastic={0.05}
   *  dragTransition={{ bounceDamping: 10, timeConstant: 150 }}
   */
  const props = {
    style,
    drag: true,
    dragConstraints: { top: 0, left: 0, right: 0, bottom: 0 },
    dragElastic: 0.05,
    dragTransition: { bounceDamping: 10, timeConstant: 150 },
  };

  return [props, { style, x, y, rotateX, rotateY }];
};
