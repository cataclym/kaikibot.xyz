export default {
    "commands":
[
    [
        "Administration",
        [
            {
                "id": "ban",
                "aliases": [
                    "ban",
                    "bean",
                    "b"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@notdreb Your behaviour is harmful",
                "userPermissions": "BAN_MEMBERS",
                "description": "Bans a user by ID or name with an optional message."
            },
            {
                "id": "deletechannel",
                "aliases": [
                    "deletechannel",
                    "dtchnl",
                    "delchan"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "#channel1 #channel2 #channel3",
                "userPermissions": "MANAGE_CHANNELS",
                "description": "Deletes one or more channels. Also deletes categories and voice channels."
            },
            {
                "id": "nsfwtgl",
                "aliases": [
                    "nsfwtgl",
                    "nsfw",
                    "nsfwtoggle"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "MANAGE_CHANNELS",
                "description": "Toggles NSFW in current channel"
            },
            {
                "id": "unban",
                "aliases": [
                    "unban",
                    "ub"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "BAN_MEMBERS",
                "description": ""
            }
        ]
    ],
    [
        "Anime",
        [
            {
                "id": "anime",
                "aliases": [
                    "anime"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "Tsukimonogatari",
                "userPermissions": "",
                "description": "Shows the first result of a query to Anilist"
            },
            {
                "id": "animequote",
                "aliases": [
                    "animequote",
                    "aq"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Shows a random anime quote..."
            },
            {
                "id": "manga",
                "aliases": [
                    "manga"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "Tsukimonogatari",
                "userPermissions": "",
                "description": "Shows the first result of a query to Anilist"
            }
        ]
    ],
    [
        "Emotes",
        [
            {
                "id": "addemote",
                "aliases": [
                    "addemote",
                    "ae"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "image-link Emotename",
                "userPermissions": "MANAGE_EMOJIS_AND_STICKERS",
                "description": "Adds an emote from an image link or attached image, with an optional name."
            },
            {
                "id": "addemotes",
                "aliases": [
                    "addemotes",
                    "aes"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "img-link1 img-link2 img-link3",
                "userPermissions": "MANAGE_EMOJIS_AND_STICKERS",
                "description": "Adds multiple emotes. Cannot specify names."
            },
            {
                "id": "deleteemote",
                "aliases": [
                    "deleteemote",
                    "de"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "<:NadekoSip:>",
                "userPermissions": "MANAGE_EMOJIS_AND_STICKERS",
                "description": "Deletes one or multiple emotes/emoji. Multiple emotes take longer, to avoid ratelimits. Keep a space between all emotes you wish to delete."
            },
            {
                "id": "emotecount",
                "aliases": [
                    "emotecount",
                    "emojicount",
                    "ec"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "-s",
                    "--small"
                ],
                "userPermissions": "",
                "description": "Shows amount of times each emote has been used"
            }
        ]
    ],
    [
        "Etc",
        [
            {
                "id": "dadbot",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "mention",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            }
        ]
    ],
    [
        "Fun",
        [
            {
                "id": "compress",
                "aliases": [
                    "compress"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "@dreb",
                "userPermissions": "",
                "description": "Compresses given member's avatar..."
            },
            {
                "id": "dadjoke",
                "aliases": [
                    "dadjoke",
                    "dadjokes"
                ],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Returns a dadjoke."
            },
            {
                "id": "deadbeat",
                "aliases": [
                    "dead",
                    "deadbeat"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "@dreb",
                "userPermissions": "",
                "description": "Just try it"
            },
            {
                "id": "meow",
                "aliases": [
                    "meow"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Meow."
            },
            {
                "id": "names",
                "aliases": [
                    "name",
                    "names"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "@dreb",
                    "delete"
                ],
                "userPermissions": "",
                "description": "Returns yours or mentioned user's daddy nicknames. Delete your nicknames with 'delete' argument."
            },
            {
                "id": "neofetch",
                "aliases": [
                    "neofetch",
                    "neo"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "opensuse",
                    "list"
                ],
                "userPermissions": "",
                "description": "Displays neofetch ascii art. Provide argument 'list' to get a list of all supported distros."
            },
            {
                "id": "reddit",
                "aliases": [
                    "reddit"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "anime",
                "userPermissions": "",
                "description": "Returns a random reddit post, from a specified subreddit."
            },
            {
                "id": "tictactoe",
                "aliases": [
                    "tictactoe",
                    "ttt"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Dreb",
                "userPermissions": "",
                "description": "Starts a TicTacToe game, where you play against an @mentioned person."
            },
            {
                "id": "woof",
                "aliases": [
                    "woof"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Woof."
            }
        ]
    ],
    [
        "Gambling",
        [
            {
                "id": "award",
                "aliases": [
                    "award"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "50 @Cata",
                "userPermissions": "",
                "description": "For bot owner to award currency"
            },
            {
                "id": "betflip",
                "aliases": [
                    "betflip",
                    "bf"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "5 heads",
                    "10 t"
                ],
                "userPermissions": "",
                "description": "Bet on tails or heads. Guessing correct awards you 1.95x the currency you've bet."
            },
            {
                "id": "betroll",
                "aliases": [
                    "betroll",
                    "br"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "69",
                "userPermissions": "",
                "description": "Bet an amount of currency and roll the dice. Rolling above 66 yields x2 the amount bet. Above 90 - x4 and 100 gives x10!"
            },
            {
                "id": "cash",
                "aliases": [
                    "cash",
                    "currency",
                    "cur",
                    "$",
                    "¥",
                    "£",
                    "€"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Shows specified user's current balance. If no user is specified, shows your balance"
            },
            {
                "id": "currencytransactions",
                "aliases": [
                    "currencytransactions",
                    "curtrs"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "7",
                    "10 @drev"
                ],
                "userPermissions": "",
                "description": "Shows your currency transactions. Bot owner can see other people's transactions."
            },
            {
                "id": "daily",
                "aliases": [
                    "daily"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Claim your daily currency allowance"
            },
            {
                "id": "give",
                "aliases": [
                    "give"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "50 @Cata",
                "userPermissions": "",
                "description": "Gives money to another user"
            },
            {
                "id": "leaderboard",
                "aliases": [
                    "leaderboard",
                    "lb"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "Slots",
                "aliases": [
                    "slots",
                    "slot"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "69",
                "userPermissions": "",
                "description": "Bet a certan amount in the slot machine."
            },
            {
                "id": "take",
                "aliases": [
                    "take"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "50 @Cata",
                "userPermissions": "",
                "description": "Takes money from the specified user"
            }
        ]
    ],
    [
        "Moderation",
        [
            {
                "id": "clear",
                "aliases": [
                    "clear",
                    "prune"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "69",
                "userPermissions": "MANAGE_MESSAGES",
                "description": "Clears up to 100 messages in the current channel."
            },
            {
                "id": "kick",
                "aliases": [
                    "kick",
                    "k"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "<@some Guy> Your behaviour is harmful.",
                "userPermissions": "KICK_MEMBERS",
                "description": "Kicks a user by ID or name with an optional message."
            },
            {
                "id": "savechat",
                "aliases": [
                    "savechat"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "100",
                "userPermissions": "MANAGE_MESSAGES",
                "description": "Saves a number of messages, and sends it to you."
            }
        ]
    ],
    [
        "NSFW",
        [
            {
                "id": "e621",
                "aliases": [
                    "e621"
                ],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": "e621 :hahaa:"
            },
            {
                "id": "hentai",
                "aliases": [
                    "hentai"
                ],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Fetches hentai images from Booru boards"
            },
            {
                "id": "hentaibomb",
                "aliases": [
                    "hentaibomb",
                    "hb"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "waifu",
                    "neko",
                    "femboy",
                    "blowjob"
                ],
                "userPermissions": "",
                "description": "Posts 5 NSFW images, using the waifu.pics API"
            },
            {
                "id": "hentainuke",
                "aliases": [
                    "hentainuke",
                    "hn"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "waifu",
                    "neko",
                    "femboy",
                    "blowjob"
                ],
                "userPermissions": "",
                "description": "Posts 30 NSFW images, using the waifu.pics API"
            }
        ]
    ],
    [
        "Owner only",
        [
            {
                "id": "botconfig",
                "aliases": [
                    "botconfig",
                    "bc"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": [
                    "<setting> <value>",
                    "currencyname Europe Dollars"
                ],
                "userPermissions": "",
                "description": "Change various bot configurations. Run without arguments to see current settings."
            },
            {
                "id": "dailyreset",
                "aliases": [
                    "dailyreset",
                    "resetdaily"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "",
                "userPermissions": "",
                "description": "Resets daily claims that have been made"
            },
            {
                "id": "die",
                "aliases": [
                    "shutdown",
                    "kill",
                    "die"
                ],
                "channel": null,
                "ownerOnly": true,
                "userPermissions": "",
                "description": "Shuts down bot."
            },
            {
                "id": "emit",
                "aliases": [
                    "emit"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "ratelimit <info about event>",
                "userPermissions": "",
                "description": "Emits a specified event. (WIP)"
            },
            {
                "id": "eval",
                "aliases": [
                    "eval"
                ],
                "channel": null,
                "ownerOnly": true,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "exec",
                "aliases": [
                    "exec"
                ],
                "channel": null,
                "ownerOnly": true,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "gencmdlist",
                "aliases": [
                    "gencmdlist",
                    "gencmdlst"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "",
                "userPermissions": "",
                "description": "Uploads a JSON file containing all commands."
            },
            {
                "id": "reload",
                "aliases": [
                    "reload",
                    "re"
                ],
                "channel": null,
                "ownerOnly": true,
                "userPermissions": "",
                "description": "Reloads a command.."
            },
            {
                "id": "setactivity",
                "aliases": [
                    "setactivity",
                    "setac"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": [
                    "<type> <Activity>",
                    "playing with Dreb"
                ],
                "userPermissions": "",
                "description": "Set the bot's activity."
            },
            {
                "id": "setavatar",
                "aliases": [
                    "setavatar",
                    "setav"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "https://discord.com/media/1231231231231312321/1231231312323132.png",
                "userPermissions": "",
                "description": "Assigns the bot a new avatar."
            },
            {
                "id": "setdaily",
                "aliases": [
                    "dailyset",
                    "setdaily"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "",
                "userPermissions": "",
                "description": "Sets the daily currency allowance amount. Set to 0 to disable."
            },
            {
                "id": "setname",
                "aliases": [
                    "setname"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "Medusa",
                "userPermissions": "",
                "description": "Assigns the bot a new name/username."
            },
            {
                "id": "sqlexec",
                "aliases": [
                    "sqlexec"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "UPDATE DiscordUsers SET amount=amount+69420",
                "userPermissions": "",
                "description": "Executes sql queries and returns the number of affected rows. Dangerous."
            },
            {
                "id": "sqlselect",
                "aliases": [
                    "sqlselect"
                ],
                "channel": null,
                "ownerOnly": true,
                "usage": "SELECT * FROM DiscordUsers LIMIT 5",
                "userPermissions": "",
                "description": "Executes sql queries and returns the number of affected rows. Dangerous."
            }
        ]
    ],
    [
        "Reactions",
        [
            {
                "id": "bite",
                "aliases": [
                    "bite"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "Bite someone >:)"
            },
            {
                "id": "blush",
                "aliases": [
                    "blush"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "O//////O"
            },
            {
                "id": "bonk",
                "aliases": [
                    "bonk"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "When you need to bonk some horny teens"
            },
            {
                "id": "bully",
                "aliases": [
                    "bully",
                    "bulli"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Be a bully to someone"
            },
            {
                "id": "cuddle",
                "aliases": [
                    "cuddle"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Cuddle someone!"
            },
            {
                "id": "feed",
                "aliases": [
                    "feed"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "When you need to feed someone...?"
            },
            {
                "id": "hug",
                "aliases": [
                    "hug",
                    "hugs"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Hug a good friend, or maybe someone special ;>"
            },
            {
                "id": "kiss",
                "aliases": [
                    "kiss",
                    "smooch"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "OwO 2lood4me"
            },
            {
                "id": "lick",
                "aliases": [
                    "lick"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Lick someone... I guess...?"
            },
            {
                "id": "miku",
                "aliases": [
                    "miku"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "Spawn a Miku picture"
            },
            {
                "id": "neko",
                "aliases": [
                    "neko"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "Spawn a neko picture"
            },
            {
                "id": "nom",
                "aliases": [
                    "nom"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Nom someone, cus you're hungry"
            },
            {
                "id": "pat",
                "aliases": [
                    "pat"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Pat a cat!\nOr a guildmember..."
            },
            {
                "id": "peek",
                "aliases": [
                    "peek"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "Peek around the corner"
            },
            {
                "id": "pout",
                "aliases": [
                    "pout"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "I am not angry, b-baka"
            },
            {
                "id": "run",
                "aliases": [
                    "run"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "Gotta go fast~"
            },
            {
                "id": "slap",
                "aliases": [
                    "slap"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Slap someone who's being stupid"
            },
            {
                "id": "spank",
                "aliases": [
                    "spank"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "OwO Being naughty are we?"
            },
            {
                "id": "waifu",
                "aliases": [
                    "waifu"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "Spawn a waifu picture"
            },
            {
                "id": "yeet",
                "aliases": [
                    "yeet"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "@dreb"
                ],
                "userPermissions": "",
                "description": "Yeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeet"
            }
        ]
    ],
    [
        "Roles",
        [
            {
                "id": "rolecolor",
                "aliases": [
                    "rolecolor",
                    "roleclr",
                    "rclr"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Gamer ff00ff",
                "userPermissions": "",
                "description": "Sets or displays the color of a given role, or your highest role."
            },
            {
                "id": "rolecreate",
                "aliases": [
                    "createrole",
                    "rolecreate",
                    "cr",
                    "rc"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "GAMERS",
                "userPermissions": "MANAGE_ROLES",
                "description": "Creates a role with a given name."
            },
            {
                "id": "roledelete",
                "aliases": [
                    "deleterole",
                    "roledelete",
                    "dr"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@gamers @streamers @weebs",
                "userPermissions": "MANAGE_ROLES",
                "description": "Deletes one or more roles"
            },
            {
                "id": "rolehoist",
                "aliases": [
                    "hoistrole",
                    "rolehoist",
                    "hoist"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@gamers",
                "userPermissions": "MANAGE_ROLES",
                "description": "Hoists or unhoists a role"
            },
            {
                "id": "roleinfo",
                "aliases": [
                    "roleinfo",
                    "rinfo",
                    "role"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Gamers",
                "userPermissions": "",
                "description": "Shows info about a given role. If no role is supplied, it defaults to current one."
            },
            {
                "id": "inrole",
                "aliases": [
                    "inrole"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Lists all users in role"
            },
            {
                "id": "rolelist",
                "aliases": [
                    "rolelist",
                    "roles"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Lists all roles"
            },
            {
                "id": "listuserroles",
                "aliases": [
                    "listuserroles",
                    "lur"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "List all custom assigned roles."
            },
            {
                "id": "rolementionable",
                "aliases": [
                    "rolementionable",
                    "mentionable",
                    "rolem"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@gamers",
                "userPermissions": "MANAGE_ROLES",
                "description": "Toggles if a role is mentionable"
            },
            {
                "id": "myrole",
                "aliases": [
                    "myrole",
                    "mr"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "icon :someEmoji:",
                    "color FF0000",
                    "icon reset",
                    "name Dreb"
                ],
                "userPermissions": "",
                "description": "Checks your assigned user role. Can set role color, name and icon."
            },
            {
                "id": "roleremove",
                "aliases": [
                    "removerole",
                    "roleremove",
                    "rr"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Dreb Gamer",
                "userPermissions": "MANAGE_ROLES",
                "description": "Takes away a user's role. The role you specify has to be lower in the role hierarchy than your highest role."
            },
            {
                "id": "rolerename",
                "aliases": [
                    "rolerename",
                    "rolename",
                    "rn"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Gamer weeb",
                "userPermissions": "MANAGE_ROLES",
                "description": "Renames a given role. The role you specify has to be lower in the role hierarchy than your highest role. Use 'quotes around rolename with spaces'."
            },
            {
                "id": "restore",
                "aliases": [
                    "restore"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@dreb",
                "userPermissions": "ADMINISTRATOR",
                "description": "Restores roles for a user who has previously left the server."
            },
            {
                "id": "setrole",
                "aliases": [
                    "setrole",
                    "sr"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Dreb Gamer",
                "userPermissions": "MANAGE_ROLES",
                "description": "Gives a role to a user. The role you specify has to be lower in the role hierarchy than your highest role."
            },
            {
                "id": "setuserrole",
                "aliases": [
                    "setuserrole",
                    "sur"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "@Platinum [role]",
                "userPermissions": "MANAGE_ROLES",
                "description": "Assigns a role to a user. Provide the command again to remove the role."
            },
            {
                "id": "myrolecolor",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "myroleicon",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "myrolename",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            }
        ]
    ],
    [
        "Server settings",
        [
            {
                "id": "addemotereact",
                "aliases": [
                    "addemotereact",
                    "emotereact",
                    "aer"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "red :red:",
                    "anime :weeaboosgetout:"
                ],
                "userPermissions": "MANAGE_EMOJIS_AND_STICKERS",
                "description": "Add triggers for the bot to react with emojis/emotes to. Use quotes for triggers with spaces."
            },
            {
                "id": "config-anniversary",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "ADMINISTRATOR",
                "description": ""
            },
            {
                "id": "config",
                "aliases": [
                    "config",
                    "configure",
                    "conf"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "dadbot enable",
                    "anniversary enable",
                    "prefix !",
                    "okcolor <hex>",
                    "errorcolor <hex>"
                ],
                "userPermissions": "MANAGE_MESSAGES",
                "description": "Configure or display guild specific settings. Will always respond to default prefix regardless of server prefix."
            },
            {
                "id": "config-dadbot",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "ADMINISTRATOR",
                "description": ""
            },
            {
                "id": "config-errorcolor",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "ADMINISTRATOR",
                "description": ""
            },
            {
                "id": "excludechannel",
                "aliases": [
                    "excludechannel",
                    "excludechnl",
                    "echnl"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "#channel"
                ],
                "userPermissions": "MANAGE_CHANNELS",
                "description": "Exclude or include a channel from dadbot. Provide no parameter to show a list of excluded channels. "
            },
            {
                "id": "excludestickyroles",
                "aliases": [
                    "excludestickyroles",
                    "estickyroles",
                    "estickyrole",
                    "esrole"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "@excludedRole @anotherRole"
                ],
                "userPermissions": "MANAGE_GUILD",
                "description": "Exclude or include a role from stickyroles. Provide no parameter to show a list of excluded roles.\nIf someone who had one or more excluded roles, re-joins this server, they wont get any excluded roles."
            },
            {
                "id": "goodbye",
                "aliases": [
                    "goodbyetoggle",
                    "goodbye",
                    "byetoggle",
                    "bye"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "#leave-channel"
                ],
                "userPermissions": "MANAGE_GUILD",
                "description": "Toggles leave messages. Bot defaults to current channel if no channel is provided."
            },
            {
                "id": "goodbyedelete",
                "aliases": [
                    "goodbyedelete",
                    "goodbyedel",
                    "byedel"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "10"
                ],
                "userPermissions": "MANAGE_GUILD",
                "description": "Set the time, in seconds, it takes for goodbye messages to be deleted by the bot. Set to 0 to disable."
            },
            {
                "id": "goodbyemessage",
                "aliases": [
                    "goodbyemessage",
                    "goodbyemsg",
                    "byemsg"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "MANAGE_GUILD",
                "description": ""
            },
            {
                "id": "goodbyetest",
                "aliases": [
                    "goodbyetest",
                    "byetest"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "MANAGE_GUILD",
                "description": "Tests goodbye message as it would appear when triggered."
            },
            {
                "id": "listreacts",
                "aliases": [
                    "listreacts",
                    "ler"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    ""
                ],
                "userPermissions": "",
                "description": "List emotereact triggers."
            },
            {
                "id": "config-okcolor",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "ADMINISTRATOR",
                "description": ""
            },
            {
                "id": "config-prefix",
                "aliases": [],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "ADMINISTRATOR",
                "description": ""
            },
            {
                "id": "removereact",
                "aliases": [
                    "removereact",
                    "rer"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "anime"
                ],
                "userPermissions": "MANAGE_EMOJIS_AND_STICKERS",
                "description": "Remove emotereact triggers."
            },
            {
                "id": "stickyroles",
                "aliases": [
                    "stickyroles",
                    "sticky"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "ADMINISTRATOR",
                "description": "Toggles whether bot will give all roles back when someone re-joins the server"
            },
            {
                "id": "togglecategory",
                "aliases": [
                    "togglecategory",
                    "tc"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "Anime",
                "userPermissions": "ADMINISTRATOR",
                "description": "Toggles a category"
            },
            {
                "id": "welcometoggle",
                "aliases": [
                    "welcometoggle",
                    "welcome"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "#welcome-channel"
                ],
                "userPermissions": "MANAGE_GUILD",
                "description": "Toggles welcome messages. Bot defaults to current channel if no channel is provided."
            },
            {
                "id": "welcomedelete",
                "aliases": [
                    "welcomedelete",
                    "welcomedel"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "10"
                ],
                "userPermissions": "MANAGE_GUILD",
                "description": "Set the time it takes for welcome messages to be deleted by the bot"
            },
            {
                "id": "welcomemessage",
                "aliases": [
                    "welcomemessage",
                    "welcomemsg"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "MANAGE_GUILD",
                "description": ""
            },
            {
                "id": "welcometest",
                "aliases": [
                    "welcometest"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "MANAGE_GUILD",
                "description": "Tests welcome message as it would appear for new members."
            }
        ]
    ],
    [
        "Utility",
        [
            {
                "id": "avatar",
                "aliases": [
                    "avatar",
                    "av"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "@dreb",
                "userPermissions": "",
                "description": "Shows a mentioned person's avatar."
            },
            {
                "id": "checkpermissions",
                "aliases": [
                    "checkperms",
                    "perms",
                    "cp"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "",
                    "@user",
                    "@role",
                    "@user #channel"
                ],
                "userPermissions": "",
                "description": "Lists perms for role/member"
            },
            {
                "id": "cmdlist",
                "aliases": [
                    "commands",
                    "cmdlist",
                    "cmds"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "admin"
                ],
                "userPermissions": "",
                "description": "Shows categories, or commands if provided with a category."
            },
            {
                "id": "color",
                "aliases": [
                    "color",
                    "clr"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "#ff00ff",
                    "list"
                ],
                "userPermissions": "",
                "description": "Returns a representation of a color string, or shows list of available color names to use."
            },
            {
                "id": "colorlist",
                "aliases": [
                    "colorlist"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Shows a list of all supported color names for the bot"
            },
            {
                "id": "exclude",
                "aliases": [
                    "exclude",
                    "excl",
                    "e"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Adds or removes excluded role from user. Excludes the user from being targeted by dad-bot."
            },
            {
                "id": "fetch",
                "aliases": [
                    "fetch",
                    "fu"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "<id>",
                "userPermissions": "",
                "description": "Fetches a discord user, shows relevant information. 30sec cooldown."
            },
            {
                "id": "forgetme",
                "aliases": [
                    "forgetme"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Deletes all information about you in the database"
            },
            {
                "id": "google",
                "aliases": [
                    "google",
                    "search",
                    "g"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "bing",
                "userPermissions": "",
                "description": "Search google for something ."
            },
            {
                "id": "help",
                "aliases": [
                    "help",
                    "h"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "ping",
                "userPermissions": "",
                "description": "Shows command info"
            },
            {
                "id": "info",
                "aliases": [
                    "info"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "#channel",
                    "@member",
                    "@role",
                    ":coolCustomEmoji:",
                    "messageID"
                ],
                "userPermissions": "",
                "description": "Returns info on a channel, role, member, emoji, or message"
            },
            {
                "id": "invite",
                "aliases": [
                    "invite",
                    "inv"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": "Get a link to invite the bot to your server."
            },
            {
                "id": "mcping",
                "aliases": [
                    "mcping"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": "",
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "ping",
                "aliases": [
                    "ping",
                    "p"
                ],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Ping the bot and websocket to see if there are latency issues."
            },
            {
                "id": "random",
                "aliases": [
                    "random",
                    "rng"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "1 10",
                    "25"
                ],
                "userPermissions": "",
                "description": "Sends a random number between your two inputs."
            },
            {
                "id": "say",
                "aliases": [
                    "say"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "usage": [
                    "#general hello"
                ],
                "userPermissions": "MANAGE_MESSAGES",
                "description": "Bot will send the message you typed in the specified channel. It also takes embeds"
            },
            {
                "id": "serverinfo",
                "aliases": [
                    "serverinfo",
                    "sinfo"
                ],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Shows information about the current server."
            },
            {
                "id": "shardstats",
                "aliases": [
                    "shardstats",
                    "shards"
                ],
                "channel": "guild",
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Displays the states of all shards"
            },
            {
                "id": "stats",
                "aliases": [
                    "stats"
                ],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": "Statistics and information"
            },
            {
                "id": "todo",
                "aliases": [
                    "note",
                    "todo"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "",
                    "add make cake 07/07/2020",
                    "remove 5",
                    "remove last",
                    "remove first",
                    "remove all",
                    "rm 1",
                    "2"
                ],
                "userPermissions": "",
                "description": "A personal todo list. The items are limited to 204 characters. Intended for small notes."
            },
            {
                "id": "add",
                "aliases": [],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "remove",
                "aliases": [],
                "channel": null,
                "ownerOnly": false,
                "userPermissions": "",
                "description": ""
            },
            {
                "id": "urbandict",
                "aliases": [
                    "urbandict",
                    "urban",
                    "ud"
                ],
                "channel": null,
                "ownerOnly": false,
                "usage": [
                    "Watermelon",
                    "anime"
                ],
                "userPermissions": "",
                "description": "Searches Urban Dictionary for a word or sentence"
            }
        ]
    ]
]
}
