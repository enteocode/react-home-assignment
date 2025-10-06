import { globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

/**
 * ESLint configuration (according to new definition requirements)
 */
export default tslint.config(
    globalIgnores([
        // Source related folders

        'node_modules/',
        'dist/',
        'test/',

        // Deployment configuration

        'webpack.config.ts'
    ]),
    eslint.configs.recommended,
    tslint.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    prettier,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react': react,
            'react-hooks': hooks
        },
        settings: {
            react: { version: '19.2' }
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 0,
            '@typescript-eslint/ban-types': 0,
            '@typescript-eslint/explicit-function-return-type': 0,
            '@typescript-eslint/explicit-module-boundary-types': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-vars': 0,
            'react/display-name': 0,
            'react/prop-types': 0,
            'quotes': [1, 'single', { 'allowTemplateLiterals': true }],
            'no-bitwise': 0,
            'no-console': 0,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn'
        }
    }
);
