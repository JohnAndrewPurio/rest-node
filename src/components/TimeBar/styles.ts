const _styles = {
  timeBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: ' 0ch 2ch',
    marginBottom: '.5em',
  },
  timeBar: {
    height: '12px',
    width: '95%',
    margin: '1em 1em 0em 1em',
    backgroundColor: 'var(--ion-color-tertiary-tint)',
    borderRadius: '10px',
    position: 'relative',
  },
  start: {
    fontSize: '.8rem',
    fontWeight: 700,
    top: '100%',
    position: 'absolute' as const,
    left: '-3.2ch',
    color: 'var(--ion-color-tertiary)',
  },
  end: {
    fontSize: '.8rem',
    fontWeight: 700,
    top: '100%',
    position: 'absolute' as const,
    marginLeft: '-1ch',
    left: '100%',
    color: 'var(--ion-color-primary)',
  },
  oneBar: {
    display: 'flex',
    position: 'absolute' as const,
    height: '100%',
    borderRadius: '10px',
    backgroundColor: 'var(--ion-color-tertiary)',
  },
};

export default _styles;
