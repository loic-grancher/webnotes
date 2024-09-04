import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://loic-grancher.github.io",
    base: "/webnotes",
    integrations: [
        starlight({
            title: "Webnotes",
            logo: {
                src: './src/assets/webnotes_icon.png',
              },
            favicon: './src/assets/webnotes_icon.png',
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
                    label: "Laravel",
                    collapsed: true,
                    autogenerate: { directory: "laravel" }
                },
                {
                    label: "React & Next",
                    collapsed: true,
                    autogenerate: { directory: "react-next" },
                },
                {
                    label: "React Native & Expo",
                    collapsed: true,
                    autogenerate: { directory: "react-native" }
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
