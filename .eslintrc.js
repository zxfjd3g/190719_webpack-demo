module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    // "extends": "eslint:all",  // 开启所有规则检查
    "extends": "eslint:recommended", // 只开启推荐的
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "no-unused-vars": "off", // 关闭
    }
};