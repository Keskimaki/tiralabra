# Tirachess [![Maintainability](https://api.codeclimate.com/v1/badges/c9c944ac9abf94eddf74/maintainability)](https://codeclimate.com/github/Keskimaki/tiralabra/maintainability) [![codecov](https://codecov.io/gh/Keskimaki/tiralabra/branch/main/graph/badge.svg?token=Y2NNQ3KPS0)](https://codecov.io/gh/Keskimaki/tiralabra)

### Viikkoraportit

- [Viikko 1](./documentation/viikkoraportti/viikko1.md)
- [Viikko 2](./documentation/viikkoraportti/viikko2.md)
- [Viikko 3](./documentation/viikkoraportti/viikko3.md)
- [Viikko 4](./documentation/viikkoraportti/viikko4.md)

## Lichess bot account

You need a Lichess bot token to run the application. See
https://github.com/lichess-bot-devs/lichess-bot/blob/master/README.md#lichess-oauth
for instructions.

Once you have a token upgrade to a bot account with

```bash
curl -d '' https://lichess.org/api/bot/account/upgrade -H "Authorization: Bearer <yourTokenHere>"
```

https://lichess.org/api#tag/Bot/operation/botAccountUpgrade

## Setup

1. Install Deno (https://deno.land/manual@v1.31.2/getting_started/installation)

2. Copy `.env.template` to `.env` and add your Lichess token

3. Run the application with `deno task run`

4. The app can also be compiled into an executable binary `tirachess` with
   `deno task build`

## Usage

Specify the color of the chess bot with a command line argument e.g.
`deno task run -c b`. Default value is white.

The app automatically fetches active games from Lichess which are associated
with the bot account.

To play against the bot or to use the bot against any of the bots available on
Lichess. First start the game on Lichess and then simply run the application.

## Development

Run the app with `deno task run`

Run tests with `deno task test` and benchmarks with `deno task bench`

Check test coverage with `deno task cov`

Lint and format code with `deno lint` and `deno fmt`
