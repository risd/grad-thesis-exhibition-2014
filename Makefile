.PHONY: build install clean

all: build

build:
	npm run build

install:
	npm install
	pip install -r requirements.txt

clean:
	rm -f dist/*