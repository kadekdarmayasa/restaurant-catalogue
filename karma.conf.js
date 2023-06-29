module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['specs/**/*Spec.js'],
    exclude: [],
    preprocessors: { 'specs/**/*Spec.js': ['webpack', 'sourcemap'] },
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
    },
    webpackMiddleware: { stats: 'errors-only' },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
