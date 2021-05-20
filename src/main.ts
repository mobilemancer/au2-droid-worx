import Aurelia, { Registration } from "aurelia";
import { RouterConfiguration } from "aurelia-direct-router";

import { MyApp } from "./my-app";

import { DataService, IDataService } from "./services/dataService";

import * as Components from "./components/globalComponents";
import * as Modules from "./modules/globalModules";
import * as ValueConverters from "./value-converters/globalValueConverters";

Aurelia.register(
  RouterConfiguration.customize({ useUrlFragmentHash: true, title: "Doop's Droid Emporium" }),
  Registration.singleton(IDataService, DataService),
  Modules,
  Components,
  ValueConverters
)
  .app(MyApp)
  .start();
