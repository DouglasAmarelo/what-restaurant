'use strict';

var gulp			= require('gulp'),
	$				= require('gulp-load-plugins')(),
	del				= require('del'),
	autoprefixer	= require('autoprefixer'),
	flexibility		= require('postcss-flexibility'),
	cleanCss		= require('postcss-clean'),
	mqpacker		= require('css-mqpacker'),
	browserSync 	= require('browser-sync'),
	named			= require('vinyl-named'),
	path			= require('path'),
	webpack 		= require('webpack-stream');


var paths = {
		webpack : 'src/scripts/*.js',
		scripts : ['src/scripts/**/*.js', '!src/scripts/vendor/**/*.js'],
		styles  : ['src/styles/**/*.scss'],
		images  : 'src/images/**/*.{png,jpeg,jpg,gif,svg}',
		extras  : ['src/*.*', 'src/fonts/**/*', 'src/videos/**/*'],
		dest    : {
			scripts : 'dist/js',
			styles  : 'dist/css',
			images  : 'dist/images',
			extras  : 'dist',
			build   : [ 'dist/**', '!dist/**/*.map' ]
	}
};

gulp.task('lint', function () {
	return gulp.src(paths.scripts)
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['lint'], function () {
	return gulp.src(paths.webpack)
		.pipe($.plumber())
		.pipe(named())
		.pipe(webpack({
			output: {
				filename: '[name].min.js'
			},
			externals: {
				'jquery': 'jQuery'
			},
			resolve: {
				root: path.resolve('./src/scripts')
			},
			module: {
				loaders: [
					{ test: /\.html$/, loader: 'handlebars-loader' }
				]
			},
			plugins: [
				$.util.env.production ? new webpack.webpack.optimize.UglifyJsPlugin({
					minimize: true,
					compress: {
						warnings: false
					}
				}) : $.util.noop,
			],
			devtool: $.util.env.production ? '': '#source-map'
		}))
		.pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('sasslint', function () {
	return gulp.src(paths.styles
		.concat('!src/styles/helpers/_normalize.scss')
		.concat('!src/styles/base/_main.scss')
		.concat('!src/styles/components/_grid.scss')
		.concat('!src/styles/base/_fonts.scss'))
		.pipe($.sassLint({
			options: {
				'config-file': './sass-lint.yml'
			}
		}))
		.pipe($.sassLint.format());
});

gulp.task('styles', ['sasslint'], function () {
	return gulp.src(paths.styles)
		.pipe($.plumber())
		.pipe($.util.env.production ? $.util.noop() : $.sourcemaps.init() )
		.pipe($.sass({
			outputStyle: $.util.env.production ? 'compressed' : 'nested',
			includePaths: [
				'node_modules',
				'node_modules/bootstrap-sass/assets/stylesheets',
				'./src/styles'
			]
		}).on('error', $.sass.logError))
		.pipe($.util.env.production ? $.purifycss(['./dist/js/**/*.js', './dist/**/*.html']) : $.util.noop())
		.pipe($.postcss([ autoprefixer(), flexibility() ]))
		.pipe($.util.env.production ? $.postcss([ mqpacker({sort: true}), cleanCss({keepSpecialComments: 1}) ]) : $.util.noop())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dest.styles));
});

gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe($.plumber())
		.pipe($.newer(paths.dest.images))
		.pipe($.imagemin({
			optimizationLevel: $.util.env.production ? 5 : 1,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(paths.dest.images));
});

gulp.task('extras', function () {
	return gulp.src(paths.extras, {base: 'src'})
		.pipe($.newer(paths.dest.extras))
		.pipe(gulp.dest(paths.dest.extras));
});

gulp.task('clean', function () {
	return del([paths.dest.extras]);
});

gulp.task('serve', ['watch'], function () {
	browserSync({
		files: [ 'dist/**', '!dist/**/*.map' ],
		server: {
			baseDir: ['dist']
		},
		open: !$.util.env.no
	});
});

gulp.task('watch', ['scripts', 'styles', 'images', 'extras'], function(){
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.extras, ['extras']);
});

gulp.task('default', ['clean'], function () {
	gulp.start('serve');
});

gulp.task('publish', [ 'images', 'styles', 'scripts', 'html'], function() {

	var credentials = JSON.parse( fs.readFileSync('aws-credentials.json') ),
		publisher = $.awspublish.create( credentials );

	return gulp
		.src([ 'dist/**', '!dist/**/*.map' ])
		.pipe($.awspublish.gzip())
		.pipe(publisher.publish({
			'Cache-Control': 'public, max-age=315360000'
		}))
		.pipe(publisher.cache())
		.pipe($.awspublish.reporter())
		.pipe($.cloudfrontInvalidate(credentials));
});

//DEPLOY TASKS
gulp.task('bump', function(){
	return gulp.src('./package.json')
		.pipe($.bump())
		.pipe(gulp.dest('.'));
});

gulp.task('zip', function(){
	return gulp
		.src(paths.dest.build)
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['images', 'scripts', 'styles', 'extras', 'bump'], function(){
	gulp.start(['zip']);
});

gulp.task('deploy', ['clean'], function(){
	$.util.env.production = true;
	gulp.start('build');
});