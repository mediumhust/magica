#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "raw" ]; then
  git clone https://github.com/ImageMagick/LibRaw.git raw
else
  ( cd raw ; make clean )
fi

cd raw

chmod a+x ./configure ./*.sh ./missing

export CFLAGS=$(echo "$CFLAGS" | sed "s/-fno-rtti -fno-exceptions//")
export CXXFLAGS="$CFLAGS"

emconfigure ./configure --prefix=$PREFIX \
  --disable-shared --disable-examples --disable-openmp --disable-jpeg --disable-jasper \
  --disable-openmp --disable-shared --enable-static  --without-threads  \
  CFLAGS="$CFLAGS" CXXFLAGS="$CXXFLAGS" 
  # PKG_CONFIG_PATH="$PKG_CONFIG_PATH" 

testExitCode "raw configure" $?

emcmake make install # CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"

testExitCode "raw make install" $?
