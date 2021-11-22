const _styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  outerCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '26vh',
    width: '26vh',
    borderRadius: '50%',
    border: '8px solid var(--ion-color-primary-shade)',
    margin: '2em 1em 1em 1em',
    padding: '1em',
  },
  innerCircle: {
    backgroundColor: 'var(--ion-color-primary)',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    fontWeight: '700',
    fontSize: '3vh',
    textTransform: 'uppercase',
  },
  circleText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as const,
    // idk some problem with css typescript flex direction type: https://github.com/cssinjs/jss/issues/1344#issuecomment-695337226
  },
  textSpan: {
    display: 'block',
    color: 'var(--ion-color-light)',
  },
};

export default _styles;
