export const NAMES = {
  races: {
    orc: {
      name: 'Orc',
      key: 'orc',
      words: {
        genders: ['male', 'female'],
        male: {
          start: ['Grim', 'Gar', 'Tor', 'Rag', 'Kar', 'Sha', 'Gil', 'Ga'],
          end: ['grand', 'gar', 'tar', 'lok', 'tooth', 'hat', 'gol', 'gul'],
        },
        female: {
          start: ['start1', 'start2'],
          end: ['end1', 'end2'],
        },
        locations: {
          start: ['Org', 'Krish'],
          end: ['rar', 'nar'],
        },
      },
    },
    elf: {
      name: 'Elf',
      key: 'elf',
      words: {
        genders: ['male', 'female'],
        male: {
          start: ['Ele', 'Loth', 'Le', 'Lor'],
          end: ['nar', 'rin'],
        },
        female: {
          start: ['start1', 'start2'],
          end: ['end1', 'end2'],
        },
        locations: {
          start: ['Eve', 'Tele'],
          end: ['nar', 'var'],
        },
      },
    },
  },
}
