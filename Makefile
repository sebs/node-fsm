test:
	@find test/lib/test-*.js | xargs -n 1 -t node
.PHONY: test
