.PHONY: build install data clean

all: build

build: data
	npm run build

install:
	npm install
	pip install -r requirements.txt

data:
	python data/fetch.py

clean:
	rm -f dist/*