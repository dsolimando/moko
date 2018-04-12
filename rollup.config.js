import html from 'rollup-plugin-html'
import uglify from 'rollup-plugin-uglify'
import string from 'rollup-plugin-string'

export default {
    plugins: [
        html({ 
            include: '**/*.html',
            htmlMinifierOptions: {
				collapseWhitespace: true
			}
        }), 
        string(
            {include: '**/*.svg'}
        ),
        uglify(),
    ]
}