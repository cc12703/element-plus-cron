

import { App, Plugin } from 'vue';

import { CronEditorPlugin } from './components/CronEditor'

const CronPlugin: Plugin = {
  install(app: App) {
    CronEditorPlugin.install?.(app);
  },
};

export default CronPlugin;

export * from './components/CronEditor';