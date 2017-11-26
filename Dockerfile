FROM jekyll/jekyll:latest
COPY . /srv/jekyll
EXPOSE 4000
CMD ["jekyll", "serve"]
