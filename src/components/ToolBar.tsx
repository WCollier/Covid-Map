import React from 'react';

import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 0,
            paddingRight: theme.spacing(2),
        },
    }),
);

export function ToolBar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link component={RouterLink} to="/" color="inherit">
                        Covid Map
                    </Link>
                </Typography>
                <Typography variant="body1" className={classes.title}>
                    <Link component={RouterLink} to="/" color="inherit">
                        World
                    </Link>
                </Typography>
                <Typography variant="body1" className={classes.title}>
                    <Link component={RouterLink} to="/countries" color="inherit">
                        Countries
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}