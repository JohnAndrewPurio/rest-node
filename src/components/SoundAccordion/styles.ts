const _styles = {
    accordion: {
        border: ' 3px solid var(--ion-color-primary)',
        margin: '1em',
        borderRadius: '10px',
        transition: 'height 200ms linear',
        display: 'flex',
        flexDirection: 'column',
        height: '10%',
        backgroundColor: 'transparent',
        color: 'var(--ion-color-dark)',
    },
    titleHead: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 700,
        fontSize: '1.1rem',
        alignItems: 'center',
        width: '100%',
        padding: '0em .5em',
        // height: "100%"
    },
    accContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
    },
    closeIcon: {
        fontSize: '10vw',
    },
    listHeaderTitle: {
        fontSize: '1.1rem',
    },
    playVolumeGrid: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        maxHeight: '120px',
    },
    sliderCloseBtn: {
        height: '10vw',
        width: '10vw',
        margin: '.5em',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    songListContainer: {
        margin: '1em .5em',
        borderRadius: '10px',
        flex: 1,
        backgroundColor: 'var(--ion-color-light)',
        height: '70%',
        flexDirection: 'column',
        padding: '0px 0px 10px 0px',
    },
    songListContent: {
        width: '100%',
        background: 'transparent',
        borderRadius: '10px',
        '--background': 'transparent',
    },
};

export default _styles;
