import { assertEquals } from 'std/testing/asserts.ts'

import { lastMoveToUci, move, reset, UciToAn } from '../src/util/chess.ts'

Deno.test('Last move to Uci returns correct value', () => {
  move('e4')
  const lastMove = lastMoveToUci()

  assertEquals(lastMove, 'e2e4')
  reset()
})

Deno.test('Uci to An conversion works', async (t) => {
  await t.step('Simple move', () => {
    const simpleUci = 'e2e4'
    const simpleAn = UciToAn(simpleUci)

    assertEquals(simpleAn, 'pe2e4')
  })

  await t.step('Promotion', () => {
    const promotionUci = 'e7e8q'
    const promotionAn = UciToAn(promotionUci)

    assertEquals(promotionAn, 'pe7e8q')
  })
})
