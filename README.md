# raspberry-fi

Don't forget to install your local node modules!!!
```
npm i
```
Install dependencies
```
sudo apt-get install ffmpeg
```
To run server
```
export DEBUG=r-fi:*
node server/server.js
```

To build the client
```
gulp build
```

Build then watch?
```
gulp
```
The pi has to do some extra work to work. You should execute `./scripts/deploy.sh` on your pi. Make sure you have `chmod +x` permissions on it too!

To connect to the pi, the Pi's IP address is: 129.170.71.165

Build with Node 6.6.0, NPM 3.10.3
