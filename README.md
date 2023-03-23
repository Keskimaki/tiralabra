# Tirachess [![Maintainability](https://api.codeclimate.com/v1/badges/c9c944ac9abf94eddf74/maintainability)](https://codeclimate.com/github/Keskimaki/tiralabra/maintainability) [![codecov](https://codecov.io/gh/Keskimaki/tiralabra/branch/main/graph/badge.svg?token=Y2NNQ3KPS0)](https://codecov.io/gh/Keskimaki/tiralabra)

### Viikkoraportit

- [Viikko 1](./documentation/viikkoraportti/viikko1.md)

## Lichess bot account

You need a Lichess bot token to run the application. See
https://github.com/lichess-bot-devs/lichess-bot/blob/master/README.md#lichess-oauth
for instructions.

Once you have a token upgrade to a bot account with

```bash
curl -d '' https://lichess.org/api/bot/account/upgrade -H "Authorization: Bearer <yourTokenHere>"
```

https://lichess.org/api#tag/Bot/operation/botAccountUpgrade

## Usage

1. Install Deno (https://deno.land/manual@v1.31.2/getting_started/installation)

2. Copy `.env.template` to `.env` and add your Lichess token

3. Run the application with `deno task run`
