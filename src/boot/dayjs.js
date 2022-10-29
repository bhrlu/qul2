import { boot } from "quasar/wrappers";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'


dayjs.extend(utc)

export default boot(({ app }) => {
  app.config.globalProperties.$dayjs = dayjs;
});

export { dayjs };
