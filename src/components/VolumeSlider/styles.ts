const _styles = {
    sliderContainer: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'var(--ion-color-light)',
        borderRadius: '10px',
        maxWidth: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0em 0em 0em .5em',
        transition: 'all 500ms linear',
        boxSizing: 'border-box' as const,
    },
    openSlider: {
        transition: 'all 500ms linear',
        maxWidth: '500px',
    },
    rangeSlider: {
        width: '100%',
    },
    icon: {
        fontSize: '7vh',
    },
};

export default _styles;
