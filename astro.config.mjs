import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://loic-grancher.github.io",
    base: "/webnotes",
    integrations: [
        starlight({
            title: "🦝 Webnotes",
            social: {
                github: "https://github.com/loic-grancher",
            },
            sidebar: [
               /*  {
                    label: "Guides",
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: "Example Guide", slug: "guides/example" },
                    ],
                },
                {
                    label: "Reference",
                    autogenerate: { directory: "reference" },
                }, */
                {
                    label: "Docker",
                    collapsed: true,
                    autogenerate: { directory: "docker" },
                },
                {
                    label: "Git & Github",
                    collapsed: true,
                    autogenerate: { directory: "git" }
                },
                {
                    label: "React & Next",
                    collapsed: true,
                    autogenerate: { directory: "react-next" },
                },
                {
                    label: "Symfony",
                    collapsed: true,
                    autogenerate: { directory: "symfony" },
                },
                
                {
                    label: "Vue & Nuxt",
                    collapsed: true,
                    autogenerate: { directory: "vue-nuxt" },
                },
                {
                    label: "Wordpress",
                    collapsed: true,
                    autogenerate: { directory: "wordpress" }
                },
            ],
            customCss: ["/src/tailwind.css"],
        }),
        tailwind({ applyBaseStyles: false }),
    ],
});
