import Preorders from './Components/Preorders';
import Configurations from './Components/Configurations';
import Datacenters from './Components/Datacenters';
import Environments from './Components/Environments';
import ConfigurationsChart from './Components/ConfigurationsChart';
import CreateModal from './Components/CreateItems/CreateModal';

const routes = [
  {
    path: '/preorders',
    component: Preorders,
  },
  {
    path: '/configurations',
    component: Configurations,
  },
  {
    path: '/datacenters',
    component: Datacenters,
  },
  {
    path: '/environments',
    component: Environments,
  },
  {
    path: '/configurations_chart',
    component: ConfigurationsChart,
  },
  {
    path: '/preorders/:id',
    component: CreateModal,
  },
  {
    path: '/configurations/:id',
    component: CreateModal,
  },
  {
    path: '/datacenters/:id',
    component: CreateModal,
  },
  {
    path: '/environments/:id',
    component: CreateModal,
  },
];

export default routes;
