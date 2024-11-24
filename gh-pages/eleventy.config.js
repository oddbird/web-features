const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  const mdOpts = {
    html: true,
    breaks: true,
    linkify: true,
  };
  eleventyConfig.setLibrary("md", markdownIt(mdOpts).use(markdownItAnchor));
  eleventyConfig.addGlobalData("features", async () => {
    // Requires build from root- `cd ..; npm run build`.
    const { features } = await import('../packages/web-features/index.js')
    return Object.keys(features).map(id=> ({...features[id], id}));
  });

  return {
    dir: {
      input: "src",
      output: "../_site",
    },
  };
};
