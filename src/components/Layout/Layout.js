import React from 'react';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

function Layout({children}) {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}

Layout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
}

export default Layout;