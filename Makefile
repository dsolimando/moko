NPM_BIN=./node_modules/.bin
VERSION=1.0
ROLLUP_CONFIG=./rollup.config.js
	
all: back-icon drawer hamburger-icon navigation-bar tab-bar view icon zone-navigator push-navigator stack-navigator routing moko-mixins ce navigators

clean:
	rm -rf ./dist/*

back-icon:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/back-icon/back-icon.js  --o ./dist/back-icon-ce.js

drawer:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/drawer/drawer.js --o ./dist/drawer-ce.js

hamburger-icon:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/hamburger-icon/hamburger-icon.js --o ./dist/hamburger-icon-ce.js

navigation-bar:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/navigation-bar/navigation-bar.js --o ./dist/navigation-bar-ce.js

tab-bar:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/tab-bar/tab-bar.js --o ./dist/tab-bar-ce.js

view:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/view-controller/view-controller.js --o ./dist/view-controller-ce.js

zone-navigator:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/zone-navigator/zone-navigator.js --o ./dist/zone-navigator-ce.js

text-input:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/text-input/input.js --o ./dist/text-input-ce.js

icon:
	$(NPM_BIN)/rollup -c $(ROLLUP_CONFIG) -f es ./custom-elements/feather-icons/icon.js --o ./dist/icon-ce.js

push-navigator:
	$(NPM_BIN)/uglifyjs js/push-navigator.js -o dist/push-navigator.js -c -m 

stack-navigator:
	$(NPM_BIN)/uglifyjs js/stack-navigator.js -o dist/stack-navigator.js -c -m

routing:
	$(NPM_BIN)/uglifyjs js/routing.js -o dist/routing.js -c -m 

moko-mixins:
	$(NPM_BIN)/uglifyjs js/mc-mixins.js -o dist/moko-mixins.js -c -m

tar:
	tar -czvf moko-$(VERSION).tar.gz dist

ce:
	$(NPM_BIN)/webpack --mode production --module-bind html=raw-loader --module-bind svg=raw-loader \
		 ./custom-elements/back-icon/back-icon.js \
		 ./custom-elements/drawer/drawer.js \
		 ./custom-elements/feather-icons/icon.js \
		 ./custom-elements/text-input/input.js \
		 ./custom-elements/hamburger-icon/hamburger-icon.js \
		 ./custom-elements/navigation-bar/navigation-bar.js \
		 ./custom-elements/tab-bar/tab-bar.js \
		 ./custom-elements/view-controller/view-controller.js -o ./dist/moko-ce.js

navigators:
	$(NPM_BIN)/webpack --mode production --module-bind html=raw-loader \
		./js/routing.js \
		./js/push-navigator.js \
		./custom-elements/zone-navigator/zone-navigator.js \
		./js/stack-navigator.js  -o ./dist/moko-navigators.js