import { assertEquals } from 'https://deno.land/std@0.178.0/testing/asserts.ts'
import { add } from '../src/main.ts'

Deno.test('Placeholder test', () => {
  assertEquals(add(2, 3), 5)
})
