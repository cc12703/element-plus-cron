


import { App, Plugin } from 'vue'


import CronEditor from './Index.vue'





export const CronEditorPlugin: Plugin = {
  install(app: App) {
    app.component('cron-editor', CronEditor);
  },
};

export { CronEditor };


