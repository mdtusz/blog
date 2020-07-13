.PHONY: dev

WORKDIR = $(shell pwd)

dev:
	docker run --rm -ti -p 4000:4000 --volume $(WORKDIR):/srv/jekyll \
		jekyll/jekyll jekyll serve --drafts
