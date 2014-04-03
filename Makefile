.PHONY: build install clean

all: build

build:
	npm run build

install:
	npm install

clean:
	rm -f dist/*