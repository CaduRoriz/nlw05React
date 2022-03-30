import styles from './styles.module.scss'
import { mes, diaSemana, dia} from '../Helper/dataHelper';

export function Header() {

  const currentDate = `${diaSemana()}, ${dia()} de ${mes()}`;

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr"/>
      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}