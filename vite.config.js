import {
	fileURLToPath,
	URL
} from 'node:url'

import CompressionPlugin from 'vite-plugin-compression'
import replace from 'rollup-plugin-replace'
import {
	createHtmlPlugin as html
} from 'vite-plugin-html'

const {
	resolve
} = require("path");
import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), CompressionPlugin({
		algorithm: 'gzip', //压缩算法，默认为 gzip。
		ext: '.gz', //压缩后的文件扩展名，默认为 .gz。
		threshold: 10240, //只有大小超过此值（以字节为单位）的文件才会被压缩，默认为 10240 字节（即 10KB）。
		minRatio: 0.8, //只有压缩比率低于此值的文件才会被压缩，默认为 0.8。
		deleteOriginFile: false, //是否删除原始文件，默认为 false，即保留原始文件。
		include: /\.(js|css)$/, //用于匹配需要压缩的文件类型的正则表达式，默认为 /\.(js|css|html|svg)$/，即匹配 js、css、html 和 svg 文件。
	}), html({
		inject: {
			data: {
				VUE_APP_NAME: '浙江绿色电力管理中心',
			}
		}
	})],
	rollupOptions: {
		plugins: [
			replace({
				// 忽略 Moment.js 的所有语言包，只保留中文语言包
				include: 'node_modules/moment/src/lib/locale/*.js',
				exclude: 'node_modules/moment/src/lib/locale/zh-cn.js',
				delimiters: ['', ''],
				values: {
					// 将其他语言包的语言代码全部替换为空字符串
					// 只保留中文语言包的语言代码 "zh-cn"
					'define.amd': 'false',
					'localeSorted': '[]',
					'locales': '{}',
					'longDateFormat': '{}',
					'invalidDate': '""',
					'dayOfMonthOrdinalParse': '/^\\d{1,2}(th|st|nd|rd)/',
					'relativeTime': '{}',
					'months': '""',
					'monthsShort': '""',
					'week': '{}',
					'weekdays': '{}',
					'weekdaysMin': '{}',
					'weekdaysShort': '{}'
				}
			})
		]
	},
	entry: ['main'], // main是入口js文件,加上es6+的编译环境
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"), //运行使用@符代替src目录
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					'text-color': '#333',
					'text-gray': '#999'
				},
				javascriptEnabled: true
			},
		},
		modules: {
			// 自动将 .module.less 结尾的文件视为 CSS Modules 模块
			// 其他的文件仍然按照普通的 CSS 文件处理
			auto: /\.module\.\w+$/i,
		}
	},
	optimizeDeps: {
		include: [
			"ant-design-vue/es/locale/zh_CN"
		]
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'ant-design-vue': ['ant-design-vue']
				}
			}
		}
	},
	babel: {
		presets: ['@babel/preset-env'],
		plugins: [
			['import', {
				libraryName: 'ant-design-vue',
				libraryDirectory: 'es',
				style: true
			}]
		]
	}
})
