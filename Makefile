test:
	@find test/*/*/*.js | xargs -n 1 -t node; find test/*/*.js | xargs -n 1 -t node 
.PHONY: test
