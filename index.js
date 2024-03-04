import { readFile } from "fs/promises";
import { join } from "path";

export default () => {
  let jsonConfig;
  let config;
  let mode;
  return {
    name: "zyph-plugin",
    async config(config, env) {
      // console.log("start", env);
      try {
        jsonConfig = await readFile(join(process.cwd(), "zyph/config.json"), {
          encoding: "utf-8",
        });
      } catch (error) {
        console.log(error);
      }
      jsonConfig = JSON.parse(jsonConfig);
      mode = env.mode;
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transform(code, id) {
      if (!id.endsWith(".css") || !jsonConfig) return;
      return {
        code: `[data-component="${jsonConfig.id}"]{ ${code} }`,
      };
    },
    // https://vitejs.dev/guide/api-plugin#transformindexhtml
    transformIndexHtml(html) {
      if (mode === "production" || !jsonConfig) return html;
      return html.replace(
        /<\/head>/,
        `
      <style>
        @import url("./zyph/vars.css");
      </style>
      <script type="module" src="zyph">
      </script>
    </head>
      `
      );
    },
  };
};
