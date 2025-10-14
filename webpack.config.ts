'use strict';

/*
 * Webpack configuration
 *
 * This is the main configuration file for Webpack 5.
 *
 * To keep this file in the root with the exact same name can be essential
 * for different parallel processes like JEST, which can support ES6+ if this
 * file is present.
 *
 * @private
 */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { DefinePlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { resolve } from 'path';

import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

/**
 * Extended configuration with Dev Server
 *
 * @interface
 */
interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

/**
 * Returns the proper hashing format of CSS Module classes
 *
 * @private
 * @param isProduction
 */
const getLocalIdentName = (isProduction: boolean): string => {
    return isProduction ? '[md5:hash:6]' : '[local]__[md5:hash:4]';
};

/**
 * Returns only non-falsy values
 *
 * @private
 * @param list
 */
const getFiltered = <T>(list: T[]): T[] => {
    return list.filter(Boolean);
}

/**
 * Returns the appropriate environment needed for React to decide
 * to include dev tools or not
 *
 * @private
 * @param isProduction
 */
const getEnvironment = (isProduction: boolean): string => {
    return isProduction ? 'production' : process.env.NODE_ENV || 'development';
}

/**
 * Configuration Factory
 */
const createConfig = (): Configuration => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? void 0 : 'inline-source-map',
        stats: {
            warnings: false
        },
        entry: {
            app: getFiltered([isProduction ? '' : 'react-refresh/runtime', './src/bootstrap.tsx'])
        },
        output: {
            filename: 'static/[name].[contenthash:6].js',
            path: resolve('dist'),
            iife: true,
            publicPath: '/'
        },
        devServer: {
            static: resolve('./src/ui/static/')
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        parse: {
                            ecma: 2020
                        },
                        compress: {
                            drop_console: false,
                            passes: 3
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ascii_only: false,
                            ecma: 5,
                            comments: false
                        }
                    }
                })
            ],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    reactVendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'react',
                        chunks: 'all',
                        priority: 20,
                        enforce: true
                    },
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: -10,
                    }
                }
            }
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx']
        },
        plugins: getFiltered([
            !isProduction ? new ReactRefreshPlugin() : new MiniCssExtractPlugin({
                filename: 'static/[name].[contenthash:6].css'
            }),
            isProduction && new CopyPlugin({
                patterns: [
                    { from: './src/ui/static', to: '' }
                ]
            }),

            new CleanWebpackPlugin(),
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(getEnvironment(isProduction))
            }),
            new DotenvPlugin({
                path: './.env'
            }),
            new HtmlPlugin({
                publicPath: '/',
                template: resolve('src/index.hbs'),
                filename: 'index.html',
                inject: 'body',
                minify: true,
                templateParameters: {
                    title: 'SHA-256 Digest Calculator | Reversing Labs',
                    lang: 'en'
                },
                scriptLoading: 'defer'
            })
        ]),
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.[tj]sx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                configFile: resolve('./.babelrc'),
                                plugins: isProduction ? void 0 : ['react-refresh/babel'],
                                cacheDirectory: true
                            }
                        }
                    ]
                },
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },

                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 3,
                                url: true,
                                modules: {
                                    localIdentName: getLocalIdentName(isProduction)
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                postcssOptions: {
                                    plugins: [['autoprefixer'], ['cssnano', { preset: 'default' }]]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg|webp)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/image/[name].[contenthash:6][ext]'
                    }
                },
                {
                    test: /\.(ttf|woff2?)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/font/[name].[contenthash:6][ext]'
                    }
                }
            ]
        }
    };
};

export default createConfig;
