

# Clean and Build
When switching branches you may need to do a full clean before the project will run.
- Run _npm install_  (since npm modules are not checked in, any new ones added by other devs need to install)
- Kill all react packages processes.  Sometimes two packager processes are running, or it just gets confused.  Do:
	ps -ef | grep react
	kill -9 (any process ids for react processes)
- In xcode, open project and run product > clean
- The above is usually sufficient, but if it still breaks try opening the xcode simulator and pressing the app icon to delete the app from the simulator.


