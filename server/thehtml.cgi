#!/bin/bash

export PATH="/societies/thehtml/.local/bin:$PATH"
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

pipenv run python runcgi.py

