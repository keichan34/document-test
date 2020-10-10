// MIT © 2017 azu

import { TxtNode } from "@textlint/ast-node-types";
import type { TextlintRuleContext, TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";

export interface ReportOptions {
    errors?: {
        index: number;
        range: [number, number];
        message: string;
        output: string;
    }[];
}

export const report: TextlintRuleReporter = (
    context: Readonly<TextlintRuleContext>,
    options: ReportOptions | any = {}
) => {
    const errors = options.errors || [];
    const { Syntax, RuleError, report, fixer } = context;
    return {
        [Syntax.Document](node: TxtNode) {
            errors.forEach((error: any) => {
                if (error.range && error.output) {
                    report(
                        node,
                        new RuleError(error.message, {
                            index: error.index,
                            fix: fixer.replaceTextRange(error.range, error.output)
                        })
                    );
                } else {
                    report(
                        node,
                        new RuleError(error.message, {
                            index: error.index
                        })
                    );
                }
            });
        }
    };
};
export const errorRule: TextlintRuleModule = {
    linter: report,
    fixer: report
};
