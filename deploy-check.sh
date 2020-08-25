#!/bin/bash
#
# CI script to verify version tag against the version 
# in the package.json file. When failed, it needs to be fixed manually.
#

# Path to the package.json file
PACKAGE="package.json"
# Tag version to verify against
TAG_VER=$1

cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

VER_RE="\"version\": *\"([0-9.]+)\""

if [[ ! `cat $PACKAGE` =~ $VER_RE ]] || [ ${BASH_REMATCH[1]} != "$TAG_VER" ]; then
    >&2 echo "ERROR: Tag version '$TAG_VER' does not match package version!"
fi
