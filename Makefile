test:
	@expresso test/lib/state/*.js; expresso test/lib/fsm/*.js; expresso test/examples/*.js
.PHONY: test
