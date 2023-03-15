import { Command, EnumType } from 'cliffy/command/mod.ts'

import { Color, Options } from './types.ts'

const colorType = new EnumType(Color)

const start = (options: Options) => {
  console.log(options)
}

await new Command()
  .name('tirachess')
  .version('0.0.1')
  .description('Chess simulator for tiralabra')
  .type('color', colorType)
  .option('-c, --color <color:color>', 'Color of the player', {
    default: Color.White as const,
  })
  .action(start)
  .parse(Deno.args)
