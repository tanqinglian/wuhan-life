import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            探索武汉<span className={styles.highlight}>夜生活</span>
          </h1>
          <p className={styles.heroSubtitle}>
            发现最地道的夜市美食，探索最美的骑行路线
          </p>
          
          {/* Search Box */}
          <div className={styles.searchBox}>
            <div className={styles.searchInputWrapper}>
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索夜市、跑山路线..."
                className={styles.searchInput}
              />
            </div>
            <button className={styles.searchButton}>
              搜索
            </button>
          </div>

          {/* Quick Stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>夜市</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>17+</span>
              <span className={styles.statLabel}>跑山路线</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>用户浏览</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>精选推荐</h2>
        
        <div className={styles.featureGrid}>
          {/* Night Markets Card */}
          <Link href="/markets" className={styles.featureCard}>
            <div className={styles.cardImage}>
              <div className={styles.cardPlaceholder}>🌃</div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>夜市探索</h3>
              <p className={styles.cardDescription}>
                发现武汉最地道的夜市美食，从户部巷到江汉路，探索城市的夜晚魅力
              </p>
              <div className={styles.cardMeta}>
                <span className={styles.cardBadge}>10+ 夜市</span>
                <span className={styles.cardLink}>
                  查看全部 →
                </span>
              </div>
            </div>
          </Link>

          {/* Cycling Routes Card */}
          <Link href="/routes" className={styles.featureCard}>
            <div className={styles.cardImage}>
              <div className={styles.cardPlaceholder}>🏔️</div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>跑山路线</h3>
              <p className={styles.cardDescription}>
                探索武汉周边最美的骑行路线，从东湖绿道到江夏田园，享受骑行的乐趣
              </p>
              <div className={styles.cardMeta}>
                <span className={styles.cardBadge}>17+ 路线</span>
                <span className={styles.cardLink}>
                  查看全部 →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Popular Section */}
      <section className={styles.popular}>
        <h2 className={styles.sectionTitle}>热门推荐</h2>
        <div className={styles.popularGrid}>
          <div className={styles.popularItem}>
            <span className={styles.popularEmoji}>🍜</span>
            <span className={styles.popularText}>户部巷夜市</span>
            <span className={styles.popularRating}>⭐ 4.8</span>
          </div>
          <div className={styles.popularItem}>
            <span className={styles.popularEmoji}>🚴</span>
            <span className={styles.popularText}>东湖绿道</span>
            <span className={styles.popularRating}>⭐ 4.7</span>
          </div>
          <div className={styles.popularItem}>
            <span className={styles.popularEmoji}>🍢</span>
            <span className={styles.popularText}>江汉路夜市</span>
            <span className={styles.popularRating}>⭐ 4.6</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2026 wuhan-life. 探索武汉夜生活
        </p>
      </footer>
    </div>
  );
}
