export default function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 8088,
  });

  eleventyConfig.setLayoutsDirectory("_includes")

  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  // CSS is handled by sass:watch/sass:build in package.json, which writes directly to _site/assets/css

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
