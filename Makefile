.PHONY: watch build clean

all: build

watch:
	npm run watch

build:
	npm run build

clean:
	rm -f dist/*