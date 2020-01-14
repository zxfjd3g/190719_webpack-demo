module.exports = function (api) {
  api.cache(true); // 内部加快babel处理

  const presets = [ 
    [
      '@babel/preset-env',
      {
        "targets": {
          // "edge": 70,
          "ie": 10,
          "chrome": 67
        },
        "useBuiltIns": "usage", 
        "corejs": 2,
      }
    ],

  ];
  const plugins = [ 
    "@babel/plugin-transform-runtime"
   ];

  return {
    presets,
    plugins
  };
}