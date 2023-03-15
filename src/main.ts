import { Command, EnumType } from 'cliffy/command/mod.ts'

import { Color } from './types.ts'
import run from './game.ts'

const colorType = new EnumType(Color)

await new Command()
  .name('tirachess')
  .version('0.0.1')
  .description('Chess simulator for tiralabra')
  .type('color', colorType)
  .option('-c, --color <color:color>', 'Color of the player', {
    default: Color.White as const,
  })
  .action(run)
  .parse(Deno.args)
