MAKE="make"
INSTALL="install"
TAR="tar"
GREP="grep"
NODE="node"
NPM="yarn" # after working with yarn, fuck npm
DESTDIR="./dist"
PKG_VERSION := $( $(GREP) -Po '(?<="version": ")[^"]*' )
TMPDIR := $(shell mktemp -d)
# default modules

all: builddirs npm_dependencies swig htmlmin min-css min-js copy-img submodules
	
swig:
	$(NODE) node_modules/swig/bin/swig.js render -j dist.json templates/faq.swig > $(CURDIR)/build/faq.html 
	$(NODE) node_modules/swig/bin/swig.js render -j dist.json templates/index.swig > $(CURDIR)/build/index.html 
	$(NODE) node_modules/swig/bin/swig.js render -j dist.json templates/tools.swig > $(CURDIR)/build/tools.html 

htmlmin:
	$(NODE) node_modules/htmlmin/bin/htmlmin $(CURDIR)/build/index.html -o $(CURDIR)/build/index.html 
	$(NODE) node_modules/htmlmin/bin/htmlmin $(CURDIR)/build/faq.html -o $(CURDIR)/build/faq.html 
	$(NODE) node_modules/htmlmin/bin/htmlmin $(CURDIR)/build/tools.html -o $(CURDIR)/build/tools.html 

installdirs:
	mkdir -p $(DESTDIR)/ $(DESTDIR)/img
	
min-css:
	$(NODE) $(CURDIR)/node_modules/.bin/cleancss --skip-rebase --level 2 $(CURDIR)/static/css/pomf.css > $(CURDIR)/build/pomf.min.css

min-js:
	echo "// @source https://github.com/Maldaris/pomf-js/tree/master/static/js" > $(CURDIR)/build/pomf.min.js 
	echo "// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat" >> $(CURDIR)/build/pomf.min.js
	$(NODE) $(CURDIR)/node_modules/.bin/uglifyjs  --screw-ie8 ./static/js/app.js >> $(CURDIR)/build/pomf.min.js 
	echo "// @license-end" >> $(CURDIR)/build/pomf.min.js

copy-img:
	cp -v $(CURDIR)/static/img/*.png $(CURDIR)/build/img/
	cp -vT $(CURDIR)/static/img/favicon.ico $(CURDIR)/build/favicon.ico

install: installdirs
	cp -rv $(CURDIR)/build/* $(DESTDIR)/

dist:
	DESTDIR=$(TMPDIR)/pomf-$(PKGVERSION)
	export DESTDIR
	install
	$(TAR) cJf pomf-$(PKG_VERSION).tar.xz $(DESTDIR)
	rm -rf $(TMPDIR)
	
clean:
	rm -rvf $(CURDIR)/node_modules 
	rm -rvf $(CURDIR)/build
	
uninstall:
	rm -rvf $(DESTDIR)/
	
npm_dependencies:
	$(NPM) install

builddirs:
	mkdir -p $(CURDIR)/build $(CURDIR)/build/img 
