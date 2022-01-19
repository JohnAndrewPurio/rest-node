const _styles = {
  container: {
    padding: '1em',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperPart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  instructionsList: {
    alignSelf: 'flex-start',
  },
  instructionsHeader: {
    fontSize: '1rem',
    fontWeight: 700,
    padding: 0,
  },
  instructions: {
    '--padding-top': '0em',
    '--background': 'transparent',
  },
  bottomPart: {
    display: 'flex',
    flexDirection: 'column',
  },
  nextBtn: {
    width: '150px',
    alignSelf: 'center',
    marginBottom: '20px',
  },
  openManualText: {
    marginTop: '50px',
  },
  openManualLink: {
    textTransform: 'none',
    marginTop: '10px',
    textDecoration: 'underline',
  },
  bodyText: {
    textAlign: 'center',
  },
  check: {
    whiteSpace: 'pre',
  },
};

export default _styles;
