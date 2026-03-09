import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import PopularRecommendations from '@/components/PopularRecommendations';
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
          <SearchBox />

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
        <PopularRecommendations />
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
