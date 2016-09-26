sudo apt-get install build-essential libbluetooth-dev

cd /usr/src
sudo git clone git://git.videolan.org/x264
cd x264
./configure --host=arm-unknown-linux-gnueabi --enable-static --disable-opencl
make
sudo make install

sudo apt-get install libmp3lame-dev
sudo apt-get install lame

cd /usr/src
git clone https://github.com/FFmpeg/FFmpeg.git
cd ffmpeg
sudo ./configure --enable-libmp3lame --arch=armel --target-os=linux --enable-gpl --enable-libx264 --enable-nonfree
make
sudo make install