Installation:

1) Copy .env.example to .env and configure the values. The DISCORD_TOKEN comes
from creating an application at https://discordapp.com/developers/applications.

2) Configure config.js. Add regular expressions as appropriate for each channel.

3) Run the program, it must always be running. To run forever look at forever
(https://github.com/foreverjs/forever) for Windows or if on Linux use screen
(https://linux.die.net/man/1/screen) or nohup or something else.