// 实现懒加载路由
import { lazy } from 'react';

const routers = [
  {
    path: '/',
    component: lazy(() => import('@pages/home/Home'))
  },
  {
    path: '/props',
    component: lazy(() => import('@pages/simpleProps/SimpleProps'))
  },
  {
    path: '/state',
    component: lazy(() => import('@pages/simpleState/SimpleState'))
  },
  {
    path: '/refs',
    component: lazy(() => import('@pages/simpleRefs/index'))
  },
  {
    path: '/life',
    component: lazy(() => import('@pages/simpleLife/SimpleLife'))
  },
  {
    path: '/event',
    component: lazy(() => import('@pages/simpleEvent/SimpleEvent'))
  },
  {
    path: '/render',
    component: lazy(() => import('@pages/simpleRender/SimpleRender'))
  },
  {
    path: '/reverse',
    component: lazy(() => import('@pages/reverseState/ReverseState'))
  },
  {
    path: '/isrender',
    component: lazy(() => import('@pages/isRender/IsRender'))
  },
  {
    path: '/rendertree',
    component: lazy(() => import('@pages/renderTree/RenderTree'))
  },
  {
    path: '/throttle',
    component: lazy(() => import('@pages/throttle/IndexThrottle'))
  },
  {
    path: '/custom',
    component: lazy(() => import('@pages/customThrottle/CustomIndex'))
  }
];
export default routers;

