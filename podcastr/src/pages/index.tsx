import { GetStaticProps } from "next";
import { api } from "../services/api";

import Link from "next/link";

import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { convertDurationToTimeString } from "../utils/convertDurationToTImeString";

import Image from "next/image";

import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: string;
  durationAsString: string; //isso aqui eu acho que vou ter que fazer a conversão na hora
  url: string;
  published_at: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home(props: HomeProps) {
  //fazer um jeito pra usar um objeto criado para eu formatar a data e pegar data separado da duracao, duracao eh pq tenho que pegar do file
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {props.latestEpisodes.map((episode) => {
            return (
              <>
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    {/* esse elemento Link que eue importei é para que quando eu mude de page minha aplicacao nao tenha que
                    carregar todos os componentes e sim apenas os que vão mudar, header e player por exemplo não serao carregados novamente */}
                    <p>{episode.members}</p>
                    <span>{episode.published_at}</span>
                  </div>

                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </li>
              </>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>PodCast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.allEpisodes.map((episode) => {
              return (
                <tr className={styles.tr} key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.title}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td>{episode.published_at}</td>
                  <td>{episode.duration}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    //_limit=12$_sort_=published&_order-desc => to colocando um limite de retorno de 12 objetos episodio, selecionando pela publicação em ordem decrescente(pra usar essa sintaxe só olhando documentacao e acho que isso só serve ppro server j-son), aqui mudei a forma de passar o caminho e os parametros pelo uso do axios
    params: {
      //isso aqui nao deu certo eu acho
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });
  //eu passo para 'data' a resposta do get do server json, e eu desestruturo a variavel pra ele receber como uma array com varios objetos e nao um grande textao

  type File = {
    url: string;
    type: string;
    duration: number;
  };

  type DataEpisode = {
    id: string;
    title: string;
    members: string;
    published_at: string;
    thumbnail: string;
    description: string;
    file: File;
  };

  const episodes = data.map((episode: DataEpisode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishadAat: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
      //ta ocorrendo um erro quando eu uso esse episodes no lugar do data
    };
  }); //vou tentar fazer fora da funcao GetStatic...

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, data?.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

//toda essa parte é mais back do que front
