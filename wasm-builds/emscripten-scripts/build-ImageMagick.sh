#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf ImageMagick
git clone https://github.com/ImageMagick/ImageMagick.git
cd ImageMagick

autoreconf -fiv
emconfigure ./configure --prefix="$PREFIX" --enable-zero-configuration \
  --without-threads --disable-shared --disable-openmp --enable-static  --without-lcms \
  --enable-delegate-build --without-magick-plus-plus --disable-docs --without-bzlib --without-webp \
  --without-heic --without-raw --without-perl --without-lzma --without-x --without-fontconfig  \
  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" 
testExitCode "ImageMagick emconfigure" $?

emcmake make install CFLAGS="$CFLAGS"
testExitCode "ImageMagick emcmake make install" $?

# # emcmake make install
# # testExitCode "ImageMagick emcmake make install " $?

mkdir -p $PREFIX/wasm
echo "Module.arguments = ['-list', 'format']; " > $PREFIX/wasm/pre-js.js

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0 --pre-js "$PREFIX/wasm/pre-js.js" -o "$PREFIX/wasm/magick.html" utilities/magick.o $PREFIX/lib/*.a 

#"$PREFIX/lib/libMagickCore-7.Q${QUANTUM_DEPTH}HDRI.a" "$PREFIX/lib/libMagickWand-7.Q${QUANTUM_DEPTH}HDRI.a" 

# "$PREFIX/lib/libjpeg.a" "$PREFIX/lib/libtiff.a" "$HOME/.emscripten_cache/asmjs/libz.a" "$HOME/.emscripten_cache/asmjs/libfreetype.a" "$HOME/.emscripten_cache/asmjs/libpng.bc" 


# ./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS --pre-js "$PREFIX/wasm/pre-js.js" -o $PREFIX/wasm/magick.html utilities/magick.o $PREFIX/lib/libMagickCore-7.Q${QUANTUM_DEPTH}HDRI.a $PREFIX/lib/libMagickWand-7.Q${QUANTUM_DEPTH}HDRI.a $PREFIX/lib/libjpeg.a $PREFIX/lib/libtiff.a $PREFIX/lib/libtiffxx.a $PREFIX/lib/libturbojpeg.a $HOME/.emscripten_cache/asmjs/libz.a $HOME/.emscripten_cache/asmjs/libfreetype.a $HOME/.emscripten_cache/asmjs/libpng.bc 


testExitCode "emcc link" $?