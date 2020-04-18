import { isNullOrUndefined, isParticipant } from '../general';

test('is null or undefined', () => {
  expect(isNullOrUndefined(null)).toBe(true);
  expect(isNullOrUndefined(undefined)).toBe(true);
  expect(isNullOrUndefined('')).toBe(false);
});

test('is event participant', () => {
  const participants = [
    {
      sub: '1',
    },
    {
      sub: '2',
    },
    {
      sub: '3',
    },
  ];

  expect(
    isParticipant(
      {
        sub: '1',
      },
      participants
    )
  ).toBe(true);
  expect(
    isParticipant(
      {
        sub: '2',
      },
      participants
    )
  ).toBe(true);
  expect(isParticipant({ sub: '150' }, participants)).toBe(false);
  expect(isParticipant({ sub: '150' }, [])).toBe(false);
});


