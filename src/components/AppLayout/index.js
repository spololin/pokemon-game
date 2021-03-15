import styles from './index.module.css'
import cn from 'classnames'

const Layout = ({title, children, urlBg = 'none', colorBg='none'}) => {
    const styleLayout = {
        backgroundImage: `url(${urlBg})`,
        backgroundColor: colorBg
    }
    return (
        <section className={styles.root} style={styleLayout}>
            <div className={styles.wrapper}>
                <article>
                    <div className={styles.title}>
                        {
                            title && <h3>{title}</h3>
                        }
                        <span className={styles.separator}></span>
                    </div>
                    <div className={cn(styles.desc, styles.full)}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout