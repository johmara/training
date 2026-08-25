#!/usr/bin/env sh

# Deploys to https://johmara.github.io/training/ via the gh-pages branch
# of this repo's origin remote.

set -e

npx ng build --base-href=/training/

cd dist/hybrid-training/browser

git init
git add -A
git commit -m 'deploy'

git push -f "$(git -C ../.. remote get-url origin)" HEAD:gh-pages

cd -
