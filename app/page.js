import styles from './page.module.css'
import Header from '@/app/components/Header'
import Table from '@/app/components/Table'

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <Header />
      </div>
      {/* End header */}
      <Table />
    </div>
  )
}
