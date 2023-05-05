module.exports = function (content, map, meta) {
    const options = this.getOptions()
    if (/monaco-editor[\\\/]esm[\\\/]vs.+\.js$/.test(this.resourcePath)) {
        const vsPath = this.resourcePath.split(/monaco-editor[\\\/]esm[\\\/]/).pop();
        if (vsPath) {
            const path = vsPath.replace(/\\/g, '/').replace('.js', '');
            // return content.replace(/localize\(/g, `localize('${path}', `);
            return content.replace(/(\bfunction\s+localize\()|(\blocalize\()/g, function (text) {
                if (/function\s+localize/.test(text)) {
                    return text;
                }
                return `localize('${path}', `;
            });
        }
    }
    if (/monaco-editor-esm-nls-webpack-plugin[\\\/]vscode-nls.js$/.test(this.resourcePath)) {
        let locale = options.locale || "es"
        return content.replace('./locale/es.json', function (text) {
            return `./locale/${locale}.json`;
        });
    }
    return content;
}