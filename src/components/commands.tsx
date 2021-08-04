import React, { Component } from "react";
import commandslist from "./cmdlist.json";
import "../css/commands.css";

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
  userPermissions?: string[] | string;
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

export default class Commands extends Component {
  render() {
    return commandslist.map((c) => {
      if ("Etc" === c[0].toString()) return;
      return (
        <div className="bounds" id={c[0].toString()}>
          <h2 onClick={() => collapse(c[0] as any)} className="categoryTitle">
            {c[0]}
            <text id={c[0].toString()} className="click2Exp">
              Click to expand
            </text>
          </h2>
          {c.map((com) => {
            console.log(c[0]);
            // @ts-ignore
            if (Categories[com] || com === c[0]) return;
            return (
              com
                // @ts-ignore
                .map((cmd) => {
                  if (!cmd.aliases.length) return;
                  return (
                    <object
                      name={c[0].toString()}
                      style={{
                        display: "none",
                      }}
                    >
                      <p className="command">
                        {new JSONCommand(cmd as any).createOutput()}
                      </p>
                    </object>
                  );
                })
            );
          })}
        </div>
      );
    });
  }
}

function collapse(c: any) {
  const doc = document.getElementsByName(c);
  doc.forEach((e) => {
    if (e.style.display !== "none") {
      const bounds = document.getElementById(c);
      const thing = document.getElementById(c);
      console.log(thing);
      if (thing)
        thing.getElementsByTagName("text")[0].textContent = "Click to expand";
      e.style.display = "none";
    } else {
      const bounds = document.getElementById(c);
      const thing = document.getElementById(c);
      console.log(thing);
      if (thing)
        thing.getElementsByTagName("text")[0].textContent = "Click to minimize";
      e.style.display = "inline";
    }
    return;
  });
}

class JSONCommand {
  private readonly id: string;
  private readonly aliases: string[];
  private channel: Channel | null;
  private readonly description: string;
  private ownerOnly: boolean;
  private readonly userPermissions: string[] | string | undefined;
  private readonly usage: string[] | string | undefined;
  createOutput: () => JSX.Element;

  constructor(props: Command) {
    this.id = props.id;
    this.aliases = props.aliases;
    this.channel = props.channel;
    this.description = props.description;
    this.ownerOnly = props.ownerOnly;
    this.usage = props.usage;
    this.userPermissions = props.userPermissions;
    this.createOutput = () => {
      const perms = this.userPermissions
        ? Array.isArray(this.userPermissions)
          ? this.userPermissions.join("\u000A")
          : this.userPermissions
        : null;

      return (
        <div>
          {this.id.toUpperCase()}
          <p className="key">
            Aliases:{" "}
            {
              <text className="value">
                {Array.isArray(this.aliases)
                  ? this.aliases
                      .sort((a, b) => b.length - a.length || a.localeCompare(b))
                      .join(", ")
                  : this.aliases}
              </text>
            }
          </p>
          <p className="key">
            Description: <text className="value">{this.description}</text>
          </p>

          <p className="key">
            Usage:{" "}
            <text className="value usage">
              {this.usage
                ? Array.isArray(this.usage)
                  ? this.usage.map((u, i) => {
                      if (i > 0) {
                        return (
                          <p className="value usage joined">
                            ;{this.id} {u}
                          </p>
                        );
                      }
                      return `;${this.id}`;
                    })
                  : `;${this.id} ${this.usage}`
                : `;${this.id}`}
            </text>
          </p>

          {perms && (
            <p className="key">
              Required permissions: <text className="value">{perms}</text>
            </p>
          )}
        </div>
      );
    };
  }
}
