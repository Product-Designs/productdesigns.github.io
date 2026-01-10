import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default function(eleventyConfig) {
  // Add Vite plugin with custom config
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      publicDir: false, // Don't let Vite manage public assets
      build: {
        emptyOutDir: false,
        outDir: "_site",
      }
    }
  });
  eleventyConfig.setServerOptions({
    port: 8088,
  });

  eleventyConfig.setLayoutsDirectory("_includes")

  // Copy static assets - must happen BEFORE Vite processes
  // Images need to be copied to the correct location in _site
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy("figma-assets");

  // Set passthrough copy behavior
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // Watch for changes in JS and SCSS (SCSS compiled separately by sass)
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/assets/scss/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
