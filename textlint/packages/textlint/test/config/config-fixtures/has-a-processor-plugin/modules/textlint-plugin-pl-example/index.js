// LICENSE : MIT
"use strict";
class TestProcessor {
    static availableExtensions() {
        return [".test1", ".test2"];
    }

    processor(ext) {
        return {
            preProcess(text, filePath) {
                return text;
            },
            postProcess(messages, filePath) {
                return {
                    messages,
                    filePath
                };
            }
        };
    }
}
module.exports = {
    Processor: TestProcessor
};
