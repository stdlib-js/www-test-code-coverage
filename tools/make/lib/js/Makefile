#/
# @license Apache-2.0
#
# Copyright (c) 2025 The Stdlib Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#/


# RULES #

#/
# Builds JavaScript.
#
# @example
# make build-js
#/
build-js: $(NODE_MODULES)
	$(QUIET) NODE_PATH="$(NODE_PATH)" $(NODE) "$(ROOT_DIR)/etc/esbuild/build.js"

.PHONY: build-js

#/
# Removes JavaScript bundle.
#
# @example
# make clean-js
#/
clean-js-bundle:
	$(QUIET) $(DELETE) $(BUILD_DIR)/js/bundle.js

.PHONY: clean-js-bundle

