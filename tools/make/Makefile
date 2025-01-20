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

# DEPENDENCIES #

# Order is important:
include $(TOOLS_MAKE_DIR)/common.mk
include $(TOOLS_MAKE_LIB_DIR)/help/Makefile

# Please keep sorted in alphabetical order:
include $(TOOLS_MAKE_LIB_DIR)/css/Makefile
include $(TOOLS_MAKE_LIB_DIR)/install/Makefile
include $(TOOLS_MAKE_LIB_DIR)/js/Makefile


# RULES #

#/
# Default target.
#
# @example
# make
#
# @example
# make all
#/
all: help

.PHONY: all

#/
# Runs the project's cleanup sequence.
#
# @example
# make clean
#/
clean: clean-node clean-js-bundle
	$(QUIET) $(DELETE) $(DELETE_FLAGS)

.PHONY: clean

#/
# Runs the project's build sequence.
#
# @example
# make build
#/
build: $(NODE_MODULES) build-js css-minify

.PHONY: build