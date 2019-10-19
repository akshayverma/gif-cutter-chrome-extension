# GIF-cutter-chrome-extension

GIF-cutter-chrome-extension, its a chrome extension that allows users to create cool GIFS while watching videos on platforms like Youtube and Twitch.

## Getting Started/ Pre-reqs/ Installing

To get this running in your chrome browser, for now you can just
1. Clone the repository and 
2. Goto chrome://extensions and load unpacked extension and load this. 

## Built With
* Vanilla JS - Used vanilla js to extract out png images in the time window chosen by the user by casting the frame into html5 canvas.
* [GIFEncoder](https://github.com/antimatter15/jsgif) - Used gifencoder for consolidating PNG images into GIF.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Result
* Video :- ![](https://www.youtube.com/watch?v=ei8hPkyJ0bU)
* Gif :- ![](examples/crushcrushcrush.gif)

## TODO list

* Add client side progress bar while the gif generation is in progress for better UX.
* Optimize the process of gif generation, currently to many frames are being casted into PNGs and thus the consolidation into GIF is pretty heavy operation, figure out ways to optimize this.
* Fix UI/UX for taking the input (time window) from the user. Current one is pretty crappy.
