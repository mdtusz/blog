FROM jekyll/jekyll:3.8
COPY . /srv/jekyll
EXPOSE 4000
CMD ["jekyll", "serve"]
