export default () => {
  let config;
  let mode;
  return {
    name: "zyph-plugin",
    config(config, env) {
      console.log("start", env);
      mode = env.mode;
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    // https://vitejs.dev/guide/api-plugin#transformindexhtml
    transformIndexHtml(html) {
      if (mode === "production") return html;
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
