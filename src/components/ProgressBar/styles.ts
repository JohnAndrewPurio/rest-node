const _styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '1em',
        justifyContent: 'space-between',
    },
    circle: {
        borderRadius: '50%',
        backgroundColor: 'var(--ion-color-secondary)',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleActive: {
        borderRadius: '50%',
        backgroundColor: 'var(--ion-color-primary)',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    connector: {
        flex: 1,
        height: '5px',
        backgroundColor: 'var(--ion-color-secondary)',
    },
    connectorActive: {
        flex: 1,
        height: '5px',
        backgroundColor: 'var(--ion-color-primary)',
    },
};

export default _styles;
