import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default function(eleventyConfig) {
  // Add Vite plugin
  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.setServerOptions({
    port: 8088,
  });

  eleventyConfig.setLayoutsDirectory("_includes")

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("figma-assets");

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
