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

# VARIABLES #

# Define the path to the script for generating minified CSS bundles:
css_minifier ?= $(TOOLS_DIR)/scripts/minify_css.js


# RULES #

#/
# Minifies CSS source files.
#
# @example
# make css-minify
#/
css-minify: $(NODE_MODULES) $(css_minifier)
	$(QUIET) NODE_PATH="$(NODE_PATH)" $(NODE) "$(css_minifier)"

.PHONY: css-minify
