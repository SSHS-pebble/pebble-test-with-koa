module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
    "plugins": ["json", "react"],
    "rules": {
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": ["error", "except-parens"],
        "no-console": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": ["error", {
            "allowEmptyCatch": true
        }],
        "no-empty-character-class": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-parens": ["error", "all", {
            "conditionalAssign": false,
            "ignoreJSX": "multi-line"
        }],
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-inner-declarations": ["error", "both"],
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-misleading-character-class": "error",
        "no-obj-calls": "error",
        "no-regex-spaces": "error",
        "no-sparse-arrays": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "require-atomic-updates": "error",
        "use-isnan": "error",
        "valid-typeof": ["error", {
            "requireStringLiterals": true
        }],
        "accessor-pairs": ["error", {
            "setWithoutGet": true,
            "getWithoutSet": false
        }],
        "array-callback-return": "error",
        "block-scoped-var": "error",
        "consistent-return": "error",
        "curly": "error",
        "dot-location": ["error", "property"],
        "dot-notation": "error",
        "eqeqeq": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-div-regex": "error",
        "no-else-return": ["error", {
            "allowElseIf": true
        }],
        "no-empty-pattern": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-fallthrough": "error",
        "no-global-assign": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-return-assign": ["error", "except-parens"],
        "no-return-await": "error",
        "no-script-url": "error",
        "no-self-assign": ["error", {
            "props": true
        }],
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "error",
        "no-with": "error",
        "prefer-named-capture-group": "error",
        "prefer-promise-reject-errors": "error",
        "require-await": "error",
        "require-unicode-regexp": "error",
        "vars-on-top": "error",
        "wrap-iife": ["error", "inside"],
        "yoda": ["error", "never"],
        "array-bracket-newline": ["error", "consistent"],
        "array-bracket-spacing": ["error", "never"],
        "array-element-newline": ["error", "consistent"],
        "block-spacing": ["error", "always"],
        "brace-style": ["error", "1tbs", {
            "allowSingleLine": true
        }],
        "camelcase": ["error", {
            "properties": "always"
        }],
        "capitalized-comments": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "comma-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "comma-style": ["error", "last"],
        "computed-property-spacing": ["error", "never"],
        "consistent-this": ["error", "that"],
        "eol-last": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "func-name-matching": ["error", "always"],
        "func-names": ["error", "never"],
        "func-style": ["error", "expression"],
        "function-paren-newline": ["error", "never"],
        "implicit-arrow-linebreak": ["error", "beside"],
        "indent": ["error", 4],
        "jsx-quotes": ["error", "prefer-double"],
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict"
        }],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true,
            "overrides": {
                "if": {
                    "after": false
                },
                "for": {
                    "after": false
                },
                "while": {
                    "after": false
                },
                "catch": {
                    "after": false
                },
                "switch": {
                    "after": false
                },
                "with": {
                    "after": false
                }
            }
        }],
        "line-comment-position": ["error", {
            "position": "above"
        }],
        "linebreak-style": ["error", "unix"],
        "lines-around-comment": ["error", {
            "beforeBlockComment": true,
            "allowBlockStart": true,
            "allowObjectStart": true,
            "allowArrayStart": true,
            "allowClassStart": true
        }],

        "lines-between-class-members": ["error", "always", {
            "exceptAfterSingleLine": true
        }],
        "max-len": ["error", {
            "code": 80,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreRegExpLiterals": true
        }],
        "multiline-comment-style": ["error", "bare-block"],
        "multiline-ternary": ["error", "always-multiline"],
        "new-cap": ["error", {
            "newIsCap": true,
            "capIsNew": false,
            "properties": true
        }],
        "new-parens": "error",
        "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 2
        }],
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-lonely-if": "error",
        "no-mixed-operators": ["error", {
            "groups": [
                ["&", "|", "^", "~", "<<", ">>", ">>>"],
                ["&&", "||"]
            ]
        }],
        "no-mixed-spaces-and-tabs": "error",
        "no-multiple-empty-lines": ["error", {
            "max": 1,
            "maxEOF": 1,
            "maxBOF": 0
        }],
        "no-negated-condition": "error",
        "no-new-object": "error",
        "no-restricted-syntax": [
            "warn",
            "ClassDeclaration",
            "ClassExpression",
            "DoWhileStatement",
            "ForStatement",
            "ForInStatement",
            "ForOfStatement",
            "WhileStatement",
            "WithStatement",
            "ExportDefaultDeclaration",
            "ExportNamedDeclaration",
            "ExportAllDeclaration",
            "ExportSpecifier",
            "ImportDeclaration",
            "ImportSpecifier",
            "ImportDefaultSpecifier",
            "ImportNamespaceSpecifier"
        ],
        "no-tabs": "error",
        "no-trailing-spaces": ["error", {
            "skipBlankLines": false,
            "ignoreComments": false
        }],
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "error",
        "object-curly-newline": ["error", {
            "consistent": true
        }],
        "object-curly-spacing": ["error", "always"],
        "operator-assignment": ["error", "always"],
        "operator-linebreak": ["error", "after", {
            "overrides": {
                "?": "before",
                ":": "before"
            }
        }],
        "padded-blocks": ["error", {
            "blocks": "never"
        }],
        "prefer-object-spread": "error",
        "quote-props": ["error", "as-needed"],
        "quotes": ["error", "double", {
            "avoidEscape": true
        }],
        "semi": ["error", "always"],
        "semi-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "semi-style": ["error", "last"],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": "error",
        "space-unary-ops": ["error", {
            "words": true,
            "nonwords": false
        }],
        "spaced-comment": ["error", "always", {
            "block": {
                "balanced": true
            }
        }],
        "switch-colon-spacing": ["error", {
            "after": true,
            "before": false
        }],
        "template-tag-spacing": ["error", "never"]
    }
};
