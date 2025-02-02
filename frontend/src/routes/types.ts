import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

enum Pages {
  CreateSeed,
  ViewSeeds
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
