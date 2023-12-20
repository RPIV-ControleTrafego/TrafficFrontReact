// babel.config.js
module.exports = function(api) {
    api.cache(true);

    return {
        async: true,
        presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-react',
        ],
    };
};