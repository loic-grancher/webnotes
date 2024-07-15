import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://loic-grancher.github.io",
    base: "/webnotes",
    integrations: [
        starlight({
            title: "My very own docs",
            social: {
                github: "https://github.com/loic-grancher",
            },
            sidebar: [
                {
                    label: "Guides",
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: "Example Guide", slug: "guides/example" },
                    ],
                },
                {
                    label: "Reference",
                    autogenerate: { directory: "reference" },
                },
            ],
            customCss: ["/src/tailwind.css"],
        }),
        tailwind({ applyBaseStyles: false }),
    ],
});
