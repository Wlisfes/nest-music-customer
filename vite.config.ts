import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import px2rem from 'postcss-plugin-px2rem'
import path from 'path'

// http://www.dhjhj.cn/news/1322.html
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    return {
        plugins: [
            Vue(),
            VueJsx(),
            AutoImport({
                resolvers: [IconsResolver()],
                dts: 'auto-imports.d.ts'
            }),
            Icons({
                scale: 1,
                autoInstall: true,
                compiler: 'vue3',
                customCollections: {
                    icon: FileSystemIconLoader('./src/assets/icons')
                }
            }),
            Components({
                dts: true,
                deep: true,
                extensions: ['vue', 'tsx'],
                include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
                dirs: ['src/components'],
                resolvers: [
                    IconsResolver({
                        prefix: false,
                        enabledCollections: ['icon']
                    })
                ]
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        build: {
            outDir: 'dist',
            assetsDir: 'static'
        },
        css: {
            modules: {
                generateScopedName: '[local]___[hash:5]',
                localsConvention: 'camelCase'
            },
            postcss: {
                plugins: [
                    px2rem({
                        rootValue: 12.8,
                        unitPrecision: 5,
                        exclude: /(node_module)/,
                        mediaQuery: false,
                        minPixelValue: 0
                    })
                ]
            }
        },
        server: {
            hmr: true,
            port: 3633,
            open: true,
            host: '0.0.0.0',
            proxy: {}
        }
    }
})
