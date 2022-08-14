export interface Command {
  id: string;
  categoryID: Categories;
  category: string[];
  filepath: string;
  aliases: string[];
  channel: Channel | null;
  ownerOnly: boolean;
  editable: boolean;
  typing: boolean;
  cooldown: number | null;
  ratelimit: number;
  description: string;
  clientPermissions?: string[] | string;
  userPermissions?: string;
  usage?: string[] | string;
}

export enum Categories {
  Administration = "Administration",
  Anime = "Anime",
  Etc = "Etc",
  Fun = "Fun",
  Gambling = "Gambling",
  Nsfw = "NSFW",
  OwnerOnly = "Owner only",
  Reactions = "Reactions",
  Roles = "Roles",
  ServerSettings = "Server settings",
  Utility = "Utility",
}

export enum Channel {
  Guild = "guild",
}

export type Cmds = {
  commands: (
    | (
        | string
        | [
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            }
          ]
      )[]
    | (
        | string
        | [
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            }
          ]
      )[]
    | (
        | string
        | [
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string[];
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            }
          ]
      )[]
    | (
        | string
        | [
            {
              aliases: any[];
              ownerOnly: boolean;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: any[];
              ownerOnly: boolean;
              channel: string;
              description: string;
              id: string;
              userPermissions: string;
            }
          ]
      )[]
    | (
        | string
        | [
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string;
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            },
            {
              aliases: string[];
              ownerOnly: boolean;
              usage: string[];
              channel: null;
              description: string;
              id: string;
              userPermissions: string;
            }
          ]
      )[]
  )[];
};
