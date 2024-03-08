module.exports = function (api) {
    const isTest = api.env('test');
    return {
        presets: [['next/babel']],
        plugins: [...(isTest ? ['babel-plugin-istanbul'] : [])],
    };
};
