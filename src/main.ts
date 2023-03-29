import { Command, EnumType } from 'cliffy/command/mod.ts'

import { ColorOption } from './types.ts'
import run from './game.ts'

const colorType = new EnumType(ColorOption)

await new Command()
  .name('tirachess')
  .version('1.0.0')
  .description('Chess simulator for tiralabra')
  .type('color', colorType)
  .option('-c, --color <color:color>', 'Color of the bot', {
    default: ColorOption.White as const,
  })
  .action(run)
  .parse(Deno.args)
