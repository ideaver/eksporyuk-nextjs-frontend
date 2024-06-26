import { useEffect, useRef } from "react";
import { Tab } from "bootstrap";
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  SwapperComponent,
  ToggleComponent,
} from "../assets/ts/components";
import { ThemeModeComponent } from "../assets/ts/layout";

import { useLayout } from "./core";
import { ButtonComponent } from "../assets/ts/components/_ButtonComponent";

export function MasterInit() {
  const { config } = useLayout();
  const isFirstRun = useRef(true);

  const pluginsInitialization = () => {
    isFirstRun.current = false;
    ThemeModeComponent.init();
    setTimeout(() => {
      ButtonComponent.bootstrap();
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
      SwapperComponent.bootstrap();
      if (typeof window !== undefined) {
        document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
          Tab.getOrCreateInstance(tab);
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (typeof window !== undefined) {
        pluginsInitialization();
      }
    }
  }, [config]);

  return <></>;
}
